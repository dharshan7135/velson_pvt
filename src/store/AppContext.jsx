import React, { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';
import { generateMockData } from '../utils/mockData';
import { fetchAll, createRecord, updateRecord, deleteRecord } from '../utils/api';

// ── Initial state (mock data as fallback until API loads) ──
const initialState = {
  user: { id: 1, username: 'admin', firstName: 'Admin', role: 'SuperAdmin' },
  isAuthenticated: false,

  // Config Hub
  referenceGroups: generateMockData('referenceGroups'),
  referenceGroupValues: generateMockData('referenceGroupValues'),
  ledgerMasters: generateMockData('ledgerMasters'),
  taxMasters: generateMockData('taxMasters'),

  // Masters
  companies: generateMockData('companies'),
  employees: generateMockData('employees'),
  customers: generateMockData('customers'),
  suppliers: generateMockData('suppliers'),
  contractors: generateMockData('contractors'),
  machines: generateMockData('machines'),
  processes: generateMockData('processes'),
  vehicles: generateMockData('vehicles'),

  // Inventory
  items: generateMockData('items'),
  itemGroups: generateMockData('itemGroups'),

  // Sales
  quotations: generateMockData('quotations'),

  // Users
  users: generateMockData('users'),
  roles: generateMockData('roles'),
  menus: generateMockData('menus'),

  // QC
  qcCheckMethods: generateMockData('qcCheckMethods'),
  qcInspectionChars: generateMockData('qcInspectionChars'),

  // System
  systemInfo: generateMockData('systemInfo'),
};

function reducer(state, action) {
  const { type, entity, payload } = action;

  switch (type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'SET':
      return { ...state, [entity]: payload };
    case 'LOAD_ALL':
      // Merge all entities from API bulk response into state
      return { ...state, ...payload };
    case 'ADD':
      return {
        ...state,
        [entity]: [...(state[entity] || []), payload],
      };
    case 'UPDATE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };
    case 'DELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).filter((item) => item.id !== payload),
      };
    case 'SOFT_DELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          item.id === payload ? { ...item, status: 'D' } : item
        ),
      };
    case 'UNDELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          item.id === payload ? { ...item, status: 'A' } : item
        ),
      };
    default:
      return state;
  }
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Load all data from API on mount ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAll();
        if (!cancelled) {
          dispatch({ type: 'LOAD_ALL', payload: data });
        }
      } catch (err) {
        console.error('Failed to load data from API, using mock data:', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── API-aware dispatch helpers ──
  const apiAdd = useCallback(async (entity, data) => {
    try {
      const created = await createRecord(entity, data);
      dispatch({ type: 'ADD', entity, payload: created });
      return created;
    } catch (err) {
      console.error(`Failed to create ${entity}:`, err);
      // Fallback: add locally with temp id
      dispatch({ type: 'ADD', entity, payload: { ...data, id: Date.now() } });
      throw err;
    }
  }, []);

  const apiUpdate = useCallback(async (entity, id, data) => {
    try {
      const updated = await updateRecord(entity, id, data);
      dispatch({ type: 'UPDATE', entity, payload: updated });
      return updated;
    } catch (err) {
      console.error(`Failed to update ${entity}:`, err);
      dispatch({ type: 'UPDATE', entity, payload: { ...data, id } });
      throw err;
    }
  }, []);

  const apiDelete = useCallback(async (entity, id) => {
    try {
      await deleteRecord(entity, id);
      dispatch({ type: 'DELETE', entity, payload: id });
    } catch (err) {
      console.error(`Failed to delete ${entity}:`, err);
      dispatch({ type: 'DELETE', entity, payload: id });
      throw err;
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, loading, error, apiAdd, apiUpdate, apiDelete }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default AppContext;
