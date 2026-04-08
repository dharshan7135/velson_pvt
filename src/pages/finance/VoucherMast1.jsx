import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { BookOpen, Database, Calendar, DollarSign, Shield, Settings } from 'lucide-react';

const columns = [
    { key: 'REFNO', label: 'Ref No' },
    { key: 'VouType', label: 'Voucher Type' },
    { key: 'Ac_Date', label: 'Date' },
    { key: 'Amount', label: 'Amount' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    Rowid: '', COMPANY: '', CREATED_BY: '',
    REFNO: '', BOOKNO: '',
    Ac_Date: '',
    Amount: 0,
    VouType: '',
    STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    Book: '', Details: '',
    USERID: '', Liability_ID: '',
};

const VoucherMast1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('voucherMast1', editId, form); else addRecord('voucherMast1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Voucher Master" description="Manage voucher master entries for journal and accounting" icon={BookOpen} />
            <DataTable columns={columns} data={state.voucherMast1 || []} onAdd={openAdd} addLabel="New Voucher" onEdit={openEdit} onDelete={(r) => deleteRecord('voucherMast1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Voucher' : 'New Voucher'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Primary Key" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Rowid (PK)" id="Rowid" type="number" value={form.Rowid} onChange={(e) => set('Rowid', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Foreign Key / Reference" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Company" id="COMPANY" type="number" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Document No / Code" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Ref No" id="REFNO" type="number" value={form.REFNO} onChange={(e) => set('REFNO', e.target.value)} />
                            <FormField label="Book No" id="BOOKNO" type="number" value={form.BOOKNO} onChange={(e) => set('BOOKNO', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Date / Time" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Ac Date" id="Ac_Date" type="date" value={form.Ac_Date} onChange={(e) => set('Ac_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Amount / Financial" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Type / Category / Config" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Voucher Type" id="VouType" value={form.VouType} onChange={(e) => set('VouType', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                            <FormField label="Book" id="Book" value={form.Book} onChange={(e) => set('Book', e.target.value)} required />
                            <FormField label="Details" id="Details" value={form.Details} onChange={(e) => set('Details', e.target.value)} />
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
export default VoucherMast1;
