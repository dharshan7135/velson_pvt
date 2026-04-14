import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AppContext = createContext();

const API_BASE = '/api';

const ENTITIES = [
    'companies', 'employees', 'contractors', 'suppliers', 'machines',
    'processes', 'groupMaster', 'accounts', 'itemGroups', 'items',
    'characteristics', 'serviceJobs', 'referenceGroups', 'references', 'taxes',
    'quotations', 'quotationDetails', 'quotationFileUploads', 'quotationMasters', 'quotationTrans', 'quotationSalesMasters', 'quotationSalesTrans', 'quoteRequests', 'quoteRequestDetails',
    'salesMasters', 'salesTrans', 'salesPlans', 'billsOut', 'dcSalesMasters', 'dcSalesTrans',
    'conformationMasters', 'conformationDetails', 'conformationFinalMasters', 'conformationFinalDetails',
    'purchaseRequests', 'purchaseOrders', 'purchaseOrders2', 'purchaseOrderDetails', 'purchaseOrderDetails2',
    'purchaseFreight', 'purchasePriceLink', 'poMasters', 'poOrders', 'poOrderDetails',
    'gateEntries', 'gateEntryDetails', 'grnEntries', 'grnEntryDetails', 'grnEntryDetailsTrack', 'grnEntryTrack',
    'grnFreightDetails', 'grnReturnDetails',
    'materialRequests', 'materialRequests1', 'materialInward', 'materialIssue', 'materialIssue1',
    'stockInward', 'stockOutward', 'stockOutwardCorrection', 'stockOutwardCorrectionDel',
    'stockLiability1', 'stockLiability3', 'stockLiabilityTrack',
    'indexMasters', 'indexCreation', 'indexCreationTrack',
    'mainIndexMasters', 'mainIndexDetails', 'ccmsEntries',
    'jobEntries', 'jobEntryDetails', 'jobEntryDetailsUpdate', 'jobEntryDetailsAudit',
    'jobFileUploads', 'jobSpareEntries', 'approvedDetails',
    'processCardMain', 'processCardDetails', 'processCardTracking',
    'jobcardRMIssueMaster', 'jobcardRMIssueDetails', 'breakdownEntries',
    'deliveryChallans', 'deliveryChallanDetails', 'dcMains', 'dcDetails', 'ncDCMains', 'ncDCDetails',
    'bookingMasters', 'bookingServiceDetails', 'bookingServiceSpareLists',
    'serviceOrders', 'serviceOrderDetails', 'serviceRequests', 'serviceTrans', 'partSpareLists',
    'serviceBillMasters', 'serviceBillTrans', 'serviceBillLabourCharges',
    'tempServiceBillMasters', 'tempServiceBillTrans', 'tempServiceBillLabourCharges',
    'qcEntries', 'qcEntryDetails', 'grnQCDetails', 'ncDetails',
    'prnFiles', 'fastenerListLinks', 'partFileDrawings',
    'drawingMasters', 'drawingDetails', 'drawingRevisionDetails',
    'autoPoDetails', 'autoPoDetailsTrack', 'generalFileUploads',
    'currentEditDetails', 'errorLogs', 'backupEntries', 'backupTbl',
    'tempEntries', 'testEntries', 'test66Entries', 'table1Entries',
    'voucherMast1', 'voucherEntry1', 'adjustment1', 'accountTran1',
    'dayBook1', 'dayTotal1', 'paymentMaster1', 'autoVoucherPaymentAdj1',
    'autoVoucherPaymentCash1', 'receiptMaster1', 'receiptTrans1',
    'autoVoucherReceiptAdj1', 'autoVoucherReceiptCash1',
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
    quotations: [],
    quotationDetails: [],
    quotationFileUploads: [],
    quotationMasters: [],
    quotationTrans: [],
    quotationSalesMasters: [],
    quotationSalesTrans: [],
    quoteRequests: [],
    quoteRequestDetails: [],
    salesMasters: [],
    salesTrans: [],
    salesPlans: [],
    billsOut: [],
    dcSalesMasters: [],
    dcSalesTrans: [],
    conformationMasters: [],
    conformationDetails: [],
    conformationFinalMasters: [],
    conformationFinalDetails: [],
    purchaseRequests: [],
    purchaseOrders: [],
    purchaseOrders2: [],
    purchaseOrderDetails: [],
    purchaseOrderDetails2: [],
    purchaseFreight: [],
    purchasePriceLink: [],
    poMasters: [],
    poOrders: [],
    poOrderDetails: [],
    gateEntries: [],
    gateEntryDetails: [],
    grnEntries: [],
    grnEntryDetails: [],
    grnEntryDetailsTrack: [],
    grnEntryTrack: [],
    grnFreightDetails: [],
    grnReturnDetails: [],
    materialRequests: [],
    materialRequests1: [],
    materialInward: [],
    materialIssue: [],
    materialIssue1: [],
    stockInward: [],
    stockOutward: [],
    stockOutwardCorrection: [],
    stockOutwardCorrectionDel: [],
    stockLiability1: [],
    stockLiability3: [],
    stockLiabilityTrack: [],
    indexMasters: [],
    indexCreation: [],
    indexCreationTrack: [],
    mainIndexMasters: [],
    mainIndexDetails: [],
    ccmsEntries: [],
    jobEntries: [],
    jobEntryDetails: [],
    jobEntryDetailsUpdate: [],
    jobEntryDetailsAudit: [],
    jobFileUploads: [],
    jobSpareEntries: [],
    approvedDetails: [],
    processCardMain: [],
    processCardDetails: [],
    processCardTracking: [],
    jobcardRMIssueMaster: [],
    jobcardRMIssueDetails: [],
    breakdownEntries: [],
    deliveryChallans: [],
    deliveryChallanDetails: [],
    dcMains: [],
    dcDetails: [],
    ncDCMains: [],
    ncDCDetails: [],
    bookingMasters: [],
    bookingServiceDetails: [],
    bookingServiceSpareLists: [],
    serviceOrders: [],
    serviceOrderDetails: [],
    serviceRequests: [],
    serviceTrans: [],
    partSpareLists: [],
    serviceBillMasters: [],
    serviceBillTrans: [],
    serviceBillLabourCharges: [],
    tempServiceBillMasters: [],
    tempServiceBillTrans: [],
    tempServiceBillLabourCharges: [],
    qcEntries: [],
    qcEntryDetails: [],
    grnQCDetails: [],
    ncDetails: [],
    prnFiles: [],
    fastenerListLinks: [],
    partFileDrawings: [],
    drawingMasters: [],
    drawingDetails: [],
    drawingRevisionDetails: [],
    autoPoDetails: [],
    autoPoDetailsTrack: [],
    generalFileUploads: [],
    currentEditDetails: [],
    errorLogs: [],
    backupEntries: [],
    backupTbl: [],
    tempEntries: [],
    testEntries: [],
    test66Entries: [],
    table1Entries: [],
    voucherMast1: [],
    voucherEntry1: [],
    adjustment1: [],
    accountTran1: [],
    dayBook1: [],
    dayTotal1: [],
    paymentMaster1: [],
    autoVoucherPaymentAdj1: [],
    autoVoucherPaymentCash1: [],
    receiptMaster1: [],
    receiptTrans1: [],
    autoVoucherReceiptAdj1: [],
    autoVoucherReceiptCash1: [],
    dropdownState: {},
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
        case 'DELETE_ALL_RECORDS': {
            const { entity } = action.payload;
            return { ...state, [entity]: [] };
        }
        case 'UPDATE_DROPDOWN': {
            const { key, data } = action.payload;
            return {
                ...state,
                dropdownState: { ...state.dropdownState, [key]: data },
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

    // ── DELETE ALL — DELETE all records for an entity ─────────
    const deleteAllRecords = useCallback(async (entity) => {
        try {
            const res = await fetch(`${API_BASE}/${entity}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Failed to delete all ${entity}`);
            }

            dispatch({ type: 'DELETE_ALL_RECORDS', payload: { entity } });
        } catch (err) {
            console.error(`❌ Error deleting all ${entity}:`, err);
            // Fallback: delete records one-by-one from local state
            dispatch({ type: 'DELETE_ALL_RECORDS', payload: { entity } });
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
        <AppContext.Provider value={{ state, addRecord, updateRecord, deleteRecord, deleteAllRecords, updateDropdown }}>
            {state.loading ? <LoadingScreen /> : children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
}
