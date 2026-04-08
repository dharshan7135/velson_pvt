import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { BookOpen, Database, Calendar, DollarSign, Shield, Settings, AlignLeft } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'Narration1', label: 'Narration' },
    { key: 'AC_Date', label: 'Date' },
    { key: 'AC_CRAMT1', label: 'Credit 1' },
    { key: 'AC_DBAMT1', label: 'Debit 1' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    Trans_ID: '', Ledger_ID: '', COMPANY: '', CREATED_BY: '',
    VOUR_REFNO: '', BILLNO: '',
    AC_Date: '',
    Narration1: '', Narration2: '', Narration3: '',
    AC_CRAMT1: 0, AC_DBAMT1: 0, AC_CRAMT2: 0, AC_DBAMT2: 0,
    VOURTYPE: '',
    Verified_Flag: '', STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    USERID: '', BRANCHID: '', BILL_MODE: '',
};

const DayBook1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('dayBook1', editId, form); else addRecord('dayBook1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Day Book" description="Daily accounting entries with dual credit/debit columns and narrations" icon={BookOpen} />
            <DataTable columns={columns} data={state.dayBook1 || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('dayBook1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Day Book Entry' : 'New Day Book Entry'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Primary Key" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Trans ID (PK)" id="Trans_ID" type="number" value={form.Trans_ID} onChange={(e) => set('Trans_ID', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Foreign Key / Reference" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Ledger ID" id="Ledger_ID" type="number" value={form.Ledger_ID} onChange={(e) => set('Ledger_ID', e.target.value)} />
                            <FormField label="Company" id="COMPANY" type="number" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Document No / Code" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Voucher Ref No" id="VOUR_REFNO" type="number" value={form.VOUR_REFNO} onChange={(e) => set('VOUR_REFNO', e.target.value)} />
                            <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Date / Time" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="AC Date" id="AC_Date" type="date" value={form.AC_Date} onChange={(e) => set('AC_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Narrations" icon={AlignLeft}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Narration 1" id="Narration1" value={form.Narration1} onChange={(e) => set('Narration1', e.target.value)} />
                            <FormField label="Narration 2" id="Narration2" value={form.Narration2} onChange={(e) => set('Narration2', e.target.value)} />
                            <FormField label="Narration 3" id="Narration3" value={form.Narration3} onChange={(e) => set('Narration3', e.target.value)} />
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
                    <FormContainer title="Type / Status" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Voucher Type" id="VOURTYPE" value={form.VOURTYPE} onChange={(e) => set('VOURTYPE', e.target.value)} />
                            <FormField label="Verified Flag" id="Verified_Flag" type="number" value={form.Verified_Flag} onChange={(e) => set('Verified_Flag', e.target.value)} />
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                            <FormField label="User ID" id="USERID" type="number" value={form.USERID} onChange={(e) => set('USERID', e.target.value)} />
                            <FormField label="Branch ID" id="BRANCHID" type="number" value={form.BRANCHID} onChange={(e) => set('BRANCHID', e.target.value)} />
                            <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
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
export default DayBook1;
