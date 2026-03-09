import React, { createContext, useContext, useReducer } from 'react';
import * as mock from './mockData';

const AppContext = createContext();

const initialState = {
    companies: [...mock.companies],
    employees: [...mock.employees],
    contractors: [...mock.contractors],
    suppliers: [...mock.suppliers],
    machines: [...mock.machines],
    processes: [...mock.processes],
    groupMaster: [...mock.groupMaster],
    accounts: [...mock.accounts],
    itemGroups: [...mock.itemGroups],
    items: [...mock.items],
    characteristics: [...mock.characteristics],
    serviceJobs: [...mock.serviceJobs],
    referenceGroups: [...mock.referenceGroups],
    references: [...mock.references],
    taxes: [...mock.taxes],
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_RECORD': {
            const { entity, data } = action.payload;
            const list = state[entity] || [];
            const newId = list.length > 0 ? Math.max(...list.map((r) => r.id)) + 1 : 1;
            return { ...state, [entity]: [...list, { ...data, id: newId }] };
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
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addRecord = (entity, data) => dispatch({ type: 'ADD_RECORD', payload: { entity, data } });
    const updateRecord = (entity, id, data) => dispatch({ type: 'UPDATE_RECORD', payload: { entity, id, data } });
    const deleteRecord = (entity, id) => dispatch({ type: 'DELETE_RECORD', payload: { entity, id } });

    return (
        <AppContext.Provider value={{ state, addRecord, updateRecord, deleteRecord }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
}
