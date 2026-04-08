import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Calculator, Database, Calendar, DollarSign, Shield } from 'lucide-react';

const columns = [
    { key: 'AC_DATE', label: 'Date' },
    { key: 'AC_CRAMT1', label: 'Credit 1' },
    { key: 'AC_DBAMT1', label: 'Debit 1' },
    { key: 'AC_CRAMT2', label: 'Credit 2' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    TRANS_ID: '', COMPANY: '', CREATED_BY: '',
    AC_DATE: '',
    AC_CRAMT1: 0, AC_CRAMT2: 0, AC_DBAMT1: 0, AC_DBAMT2: 0,
    STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
};

const DayTotal1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('dayTotal1', editId, form); else addRecord('dayTotal1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Day Total" description="Aggregated daily credit/debit totals for reconciliation" icon={Calculator} />
            <DataTable columns={columns} data={state.dayTotal1 || []} onAdd={openAdd} addLabel="New Total" onEdit={openEdit} onDelete={(r) => deleteRecord('dayTotal1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Day Total' : 'New Day Total'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="Primary Key" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Trans ID (PK)" id="TRANS_ID" type="number" value={form.TRANS_ID} onChange={(e) => set('TRANS_ID', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Foreign Key / Reference" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Company" id="COMPANY" type="number" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Date / Time" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="AC Date" id="AC_DATE" type="date" value={form.AC_DATE} onChange={(e) => set('AC_DATE', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Amount / Financial" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Credit Amt 1" id="AC_CRAMT1" type="number" value={form.AC_CRAMT1} onChange={(e) => set('AC_CRAMT1', e.target.value)} />
                            <FormField label="Debit Amt 1" id="AC_DBAMT1" type="number" value={form.AC_DBAMT1} onChange={(e) => set('AC_DBAMT1', e.target.value)} />
                            <FormField label="Credit Amt 2" id="AC_CRAMT2" type="number" value={form.AC_CRAMT2} onChange={(e) => set('AC_CRAMT2', e.target.value)} />
                            <FormField label="Debit Amt 2" id="AC_DBAMT2" type="number" value={form.AC_DBAMT2} onChange={(e) => set('AC_DBAMT2', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
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
export default DayTotal1;
