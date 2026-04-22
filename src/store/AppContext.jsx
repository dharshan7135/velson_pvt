import React, { createContext, useContext, useReducer } from 'react';
import { generateMockData } from '../utils/mockData';

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
    case 'ADD':
      return {
        ...state,
        [entity]: [...(state[entity] || []), { ...payload, id: Date.now() }],
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
