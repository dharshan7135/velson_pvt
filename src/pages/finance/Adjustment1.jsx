import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowRightLeft, Database, Calendar, DollarSign, Shield, Settings, AlignLeft } from 'lucide-react';

const columns = [
    { key: 'BOOKNO', label: 'Book No' },
    { key: 'SLEDGER_NAME', label: 'Sub Ledger' },
    { key: 'AC_DATE', label: 'Date' },
    { key: 'CRAMT', label: 'Credit' },
    { key: 'DBAMT', label: 'Debit' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    ROWID: '', LEDGERID: '', COMPANY: '', CREATED_BY: '', SLEDGER_ID: '',
    BOOKNO: '', REFNO: '',
    AC_DATE: '',
    NARRATION: '', NARRATION1: '', SLEDGER_NAME: '',
    CRAMT: 0, DBAMT: 0,
    TYPE: '', VOUTYPE: '',
    STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    USERID: '', Liability_ID: '',
};

const Adjustment1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('adjustment1', editId, form); else addRecord('adjustment1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Adjustment Entry" description="Credit/Debit adjustment entries with ledger references" icon={ArrowRightLeft} />
            <DataTable columns={columns} data={state.adjustment1 || []} onAdd={openAdd} addLabel="New Adjustment" onEdit={openEdit} onDelete={(r) => deleteRecord('adjustment1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Adjustment' : 'New Adjustment'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Primary Key" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Row ID (PK)" id="ROWID" type="number" value={form.ROWID} onChange={(e) => set('ROWID', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Foreign Key / Reference" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Ledger ID" id="LEDGERID" type="number" value={form.LEDGERID} onChange={(e) => set('LEDGERID', e.target.value)} />
                            <FormField label="Company" id="COMPANY" type="number" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                            <FormField label="Sub Ledger ID" id="SLEDGER_ID" type="number" value={form.SLEDGER_ID} onChange={(e) => set('SLEDGER_ID', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Document No / Code" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Book No" id="BOOKNO" value={form.BOOKNO} onChange={(e) => set('BOOKNO', e.target.value)} required />
                            <FormField label="Ref No" id="REFNO" type="number" value={form.REFNO} onChange={(e) => set('REFNO', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Date / Time" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="AC Date" id="AC_DATE" type="date" value={form.AC_DATE} onChange={(e) => set('AC_DATE', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Name / Description" icon={AlignLeft}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Sub Ledger Name" id="SLEDGER_NAME" value={form.SLEDGER_NAME} onChange={(e) => set('SLEDGER_NAME', e.target.value)} required />
                            <FormField label="Narration" id="NARRATION" value={form.NARRATION} onChange={(e) => set('NARRATION', e.target.value)} required />
                            <FormField label="Narration 1" id="NARRATION1" value={form.NARRATION1} onChange={(e) => set('NARRATION1', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Amount / Financial" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Credit Amount" id="CRAMT" type="number" value={form.CRAMT} onChange={(e) => set('CRAMT', e.target.value)} required />
                            <FormField label="Debit Amount" id="DBAMT" type="number" value={form.DBAMT} onChange={(e) => set('DBAMT', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Type / Category" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Type" id="TYPE" value={form.TYPE} onChange={(e) => set('TYPE', e.target.value)} required />
                            <FormField label="Voucher Type" id="VOUTYPE" value={form.VOUTYPE} onChange={(e) => set('VOUTYPE', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                            <FormField label="User ID" id="USERID" type="number" value={form.USERID} onChange={(e) => set('USERID', e.target.value)} />
                            <FormField label="Liability ID" id="Liability_ID" type="number" value={form.Liability_ID} onChange={(e) => set('Liability_ID', e.target.value)} />
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
export default Adjustment1;
