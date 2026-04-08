import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Table, Database, Calendar, Shield } from 'lucide-react';

const columns = [
    { key: 'PO_PO_NO', label: 'PO No' },
    { key: 'PO_Invoice_No', label: 'Invoice No' },
    { key: 'PO_Date', label: 'PO Date' },
    { key: 'PO_Status', label: 'Status' },
    { key: 'PO_CreatedBy', label: 'Created By' },
];

const emptyForm = {
    PO_PO_NO: '', PO_Invoice_No: '',
    PO_Date: '', PO_Invoice_Date: '',
    PO_Status: 'A',
    PO_Created_Date: new Date().toISOString().slice(0, 10),
    PO_TransID: '', PO_Supllier_Id: '',
    PO_CreatedBy: '',
};

const Table1Entry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('table1Entries', editId, form); else addRecord('table1Entries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Table 1 (PO)" description="Purchase order reference table for tracking and reconciliation" icon={Table} />
            <DataTable columns={columns} data={state.table1Entries || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('table1Entries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Entry'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="Document Info" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="PO No" id="PO_PO_NO" value={form.PO_PO_NO} onChange={(e) => set('PO_PO_NO', e.target.value)} required />
                            <FormField label="Invoice No" id="PO_Invoice_No" value={form.PO_Invoice_No} onChange={(e) => set('PO_Invoice_No', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Dates" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                            <FormField label="Invoice Date" id="PO_Invoice_Date" type="date" value={form.PO_Invoice_Date} onChange={(e) => set('PO_Invoice_Date', e.target.value)} />
                            <FormField label="Created Date" id="PO_Created_Date" type="date" value={form.PO_Created_Date} onChange={(e) => set('PO_Created_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Status" id="PO_Status" value={form.PO_Status} onChange={(e) => set('PO_Status', e.target.value)} />
                            <FormField label="Created By" id="PO_CreatedBy" value={form.PO_CreatedBy} onChange={(e) => set('PO_CreatedBy', e.target.value)} />
                            <FormField label="Trans ID" id="PO_TransID" value={form.PO_TransID} onChange={(e) => set('PO_TransID', e.target.value)} />
                            <FormField label="Supplier ID" id="PO_Supllier_Id" value={form.PO_Supllier_Id} onChange={(e) => set('PO_Supllier_Id', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default Table1Entry;
