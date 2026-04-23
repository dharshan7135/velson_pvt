import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import * as api from '../utils/api';

// ═══════════════════════════════════════════════════════════════
//  Initial state — empty arrays, will be hydrated from backend
// ═══════════════════════════════════════════════════════════════
const initialState = {
  user: { id: 1, username: 'admin', firstName: 'Admin', role: 'SuperAdmin' },
  isAuthenticated: false,
  _loading: true,       // true until first bulk fetch completes
  _error: null,         // last API error (cleared on retry)

  // Config Hub
  referenceGroups: [],
  referenceGroupValues: [],
  ledgerMasters: [],
  taxMasters: [],

  // Masters
  companies: [],
  employees: [],
  customers: [],
  suppliers: [],
  contractors: [],
  machines: [],
  processes: [],
  vehicles: [],

  // Inventory
  items: [],
  itemGroups: [],

  // Sales
  quotations: [],

  // Users
  users: [],
  roles: [],
  menus: [],

  // QC
  qcCheckMethods: [],
  qcInspectionChars: [],

  // System
  systemInfo: [],
};

// ═══════════════════════════════════════════════════════════════
//  Reducer — same actions as before + new HYDRATE / LOADING / ERROR
// ═══════════════════════════════════════════════════════════════
function reducer(state, action) {
  const { type, entity, payload } = action;

  switch (type) {
    // ── Bulk hydrate from backend ─────────────────────────────
    case 'HYDRATE':
      return { ...state, ...payload, _loading: false, _error: null };

    case 'LOADING':
      return { ...state, _loading: true, _error: null };

    case 'ERROR':
      return { ...state, _loading: false, _error: payload };

    // ── Auth ──────────────────────────────────────────────────
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };

    // ── CRUD — update local state optimistically ─────────────
    case 'SET':
      return { ...state, [entity]: payload };

    case 'ADD':
      return {
        ...state,
        [entity]: [...(state[entity] || []), payload],
      };

    case 'UPDATE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          String(item.id) === String(payload.id) ? { ...item, ...payload } : item
        ),
      };

    case 'DELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).filter((item) => String(item.id) !== String(payload)),
      };

    case 'SOFT_DELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          String(item.id) === String(payload) ? { ...item, status: 'D' } : item
        ),
      };

    case 'UNDELETE':
      return {
        ...state,
        [entity]: (state[entity] || []).map((item) =>
          String(item.id) === String(payload) ? { ...item, status: 'A' } : item
        ),
      };

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════════════
//  Context + Provider
// ═══════════════════════════════════════════════════════════════
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, rawDispatch] = useReducer(reducer, initialState);
  const mountedRef = useRef(true);

  // ── Fetch all data from backend on mount ───────────────────
  const loadAll = useCallback(async () => {
    rawDispatch({ type: 'LOADING' });
    try {
      const bulk = await api.fetchAll();
      if (!mountedRef.current) return;

      // The bulk endpoint returns { entityKey: [...records], ... }
      // We only pick keys that exist in our state to avoid noise
      const hydration = {};
      for (const key of Object.keys(initialState)) {
        if (key.startsWith('_') || key === 'user' || key === 'isAuthenticated') continue;
        if (Array.isArray(bulk[key])) {
          hydration[key] = bulk[key];
        }
      }
      rawDispatch({ type: 'HYDRATE', payload: hydration });
    } catch (err) {
      console.error('❌ Failed to load data from backend:', err);
      if (mountedRef.current) {
        rawDispatch({ type: 'ERROR', payload: err.message });
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadAll();
    return () => { mountedRef.current = false; };
  }, [loadAll]);

  // ── Smart dispatch: calls backend API then updates local state ──
  const dispatch = useCallback(async (action) => {
    const { type, entity, payload } = action;

    // Non-entity actions pass through immediately
    if (!entity || type === 'LOGIN' || type === 'LOGOUT' || type === 'SET') {
      rawDispatch(action);
      return;
    }

    try {
      switch (type) {
        case 'ADD': {
          const created = await api.createRecord(entity, payload);
          rawDispatch({ type: 'ADD', entity, payload: created });
          break;
        }

        case 'UPDATE': {
          const updated = await api.updateRecord(entity, payload.id, payload);
          rawDispatch({ type: 'UPDATE', entity, payload: updated });
          break;
        }

        case 'DELETE': {
          await api.deleteRecord(entity, payload);
          rawDispatch({ type: 'DELETE', entity, payload });
          break;
        }

        case 'SOFT_DELETE': {
          await api.softDeleteRecord(entity, payload);
          rawDispatch({ type: 'SOFT_DELETE', entity, payload });
          break;
        }

        case 'UNDELETE': {
          await api.undeleteRecord(entity, payload);
          rawDispatch({ type: 'UNDELETE', entity, payload });
          break;
        }

        default:
          rawDispatch(action);
      }
    } catch (err) {
      console.error(`❌ API ${type} failed for ${entity}:`, err);
      // Still show error to user but don't crash the app
      rawDispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, reload: loadAll }}>
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
