import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { productionAlerts } from '../data/commandCenterData';

const AppContext = createContext();

const API_BASE = '/api';

const ENTITIES = [
    'companies', 'employees', 'contractors', 'suppliers', 'machines',
    'processes', 'groupMaster', 'accounts', 'itemGroups', 'items',
    'characteristics', 'serviceJobs', 'referenceGroups', 'references', 'taxes',
];

const initialState = {
    companies: [],
    employees: [],
    contractors: [],
    suppliers: [],
    machines: [],
    processes: [],
    groupMaster: [],
    accounts: [],
    itemGroups: [],
    items: [],
    characteristics: [],
    serviceJobs: [],
    referenceGroups: [],
    references: [],
    taxes: [],
    dropdownState: {},
    emergencyAlerts: productionAlerts || [], // Load initial alerts
    loading: true,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_BULK_DATA': {
            const updates = {};
            for (const key of ENTITIES) {
                if (action.payload[key]) {
                    updates[key] = action.payload[key];
                }
            }
            // Also load dropdownState from the bulk response
            if (action.payload.dropdownState) {
                updates.dropdownState = action.payload.dropdownState;
            }
            return { ...state, ...updates };
        }
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_RECORD': {
            const { entity, data } = action.payload;
            return { ...state, [entity]: [...(state[entity] || []), data] };
        }
        case 'UPDATE_RECORD': {
            const { entity, id, data } = action.payload;
            return {
                ...state,
                [entity]: state[entity].map((r) => (r.id === id ? { ...r, ...data } : r)),
            };
        }
        case 'DELETE_RECORD': {
            const { entity, id } = action.payload;
            return { ...state, [entity]: state[entity].filter((r) => r.id !== id) };
        }
        case 'UPDATE_DROPDOWN': {
            const { key, data } = action.payload;
            return {
                ...state,
                dropdownState: { ...state.dropdownState, [key]: data },
            };
        }
        case 'DISMISS_ALERT': {
            return {
                ...state,
                emergencyAlerts: state.emergencyAlerts.filter(a => a.id !== action.payload),
            };
        }
        default:
            return state;
    }
}

// ── Loading Spinner component ─────────────────────────────────
const LoadingScreen = () => (
    <div style={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        zIndex: 9999,
    }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{
                width: 48, height: 48, border: '4px solid #e2e8f0',
                borderTopColor: '#0097A7', borderRadius: '50%',
                animation: 'spin 0.7s linear infinite', margin: '0 auto 16px',
            }} />
            <p style={{ color: '#475569', fontSize: 14, fontWeight: 600 }}>Loading data...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    </div>
);

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // ── Single bulk fetch — ONE request for all entities + dropdown state ───
    useEffect(() => {
        let cancelled = false;

        const fetchAll = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });

            try {
                const res = await fetch(`${API_BASE}/bulk`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();

                if (!cancelled) {
                    dispatch({ type: 'SET_BULK_DATA', payload: data });
                }
            } catch (err) {
                console.error('❌ Failed to fetch data from API:', err);
                if (!cancelled) {
                    dispatch({ type: 'SET_ERROR', payload: err.message });
                }
            } finally {
                if (!cancelled) {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            }
        };

        fetchAll();
        return () => { cancelled = true; };
    }, []);

    // ── CREATE — POST to backend, then add to local state ─────
    const addRecord = useCallback(async (entity, data) => {
        try {
            const res = await fetch(`${API_BASE}/${entity}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to create ${entity}`);
            }

            const created = await res.json();
            dispatch({ type: 'ADD_RECORD', payload: { entity, data: created } });
            return created;
        } catch (err) {
            console.error(`❌ Error adding ${entity}:`, err);
            alert(`Error: ${err.message}`);
            throw err;
        }
    }, []);

    // ── UPDATE — PUT to backend, then update local state ──────
    const updateRecord = useCallback(async (entity, id, data) => {
        try {
            const res = await fetch(`${API_BASE}/${entity}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to update ${entity}`);
            }

            const updated = await res.json();
            dispatch({ type: 'UPDATE_RECORD', payload: { entity, id, data: updated } });
            return updated;
        } catch (err) {
            console.error(`❌ Error updating ${entity}:`, err);
            alert(`Error: ${err.message}`);
            throw err;
        }
    }, []);

    // ── DELETE — DELETE from backend, then remove from local state
    const deleteRecord = useCallback(async (entity, id) => {
        try {
            const res = await fetch(`${API_BASE}/${entity}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to delete ${entity}`);
            }

            dispatch({ type: 'DELETE_RECORD', payload: { entity, id } });
        } catch (err) {
            console.error(`❌ Error deleting ${entity}:`, err);
            alert(`Error: ${err.message}`);
            throw err;
        }
    }, []);

    // ── Dropdown state — persist to backend ───────────────────
    const updateDropdown = useCallback((key, data) => {
        // Update local state immediately
        dispatch({ type: 'UPDATE_DROPDOWN', payload: { key, data } });

        // Persist to the backend in the background
        fetch(`${API_BASE}/dropdownOptions/${encodeURIComponent(key)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).catch((err) => {
            console.error('❌ Failed to persist dropdown option:', err);
        });
    }, []);

    return (
        <AppContext.Provider value={{ state, addRecord, updateRecord, deleteRecord, updateDropdown }}>
            {state.loading ? <LoadingScreen /> : children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
}
