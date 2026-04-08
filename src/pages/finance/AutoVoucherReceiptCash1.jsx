import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Wallet, Database, Calendar, Settings } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'SYSTEM_NAME', label: 'System Name' },
    { key: 'VOUDATE', label: 'Voucher Date' },
    { key: 'VOUCHER_TYPE', label: 'Voucher Type' },
    { key: 'ENTRY_TYPE', label: 'Entry Type' },
];

const emptyForm = {
    ROWID: '', ADD_USER_ID: '', EDIT_USER_ID: '', DELETE_USER_ID: '',
    BILLNO: '',
    VOUDATE: '', ENTRYDATE: '',
    SYSTEM_NAME: '',
    VOUCHER_TYPE: '', BOOK_TYPE: '', ENTRY_TYPE: '',
    VOUNO: '', REF_VOUNO: '',
};

const AutoVoucherReceiptCash1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('autoVoucherReceiptCash1', editId, form); else addRecord('autoVoucherReceiptCash1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Auto Voucher — Receipt Cash" description="Automated cash receipt voucher entries" icon={Wallet} />
            <DataTable columns={columns} data={state.autoVoucherReceiptCash1 || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('autoVoucherReceiptCash1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Entry'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Primary Key" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Row ID (PK)" id="ROWID" type="number" value={form.ROWID} onChange={(e) => set('ROWID', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Foreign Key / Reference" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Add User ID" id="ADD_USER_ID" type="number" value={form.ADD_USER_ID} onChange={(e) => set('ADD_USER_ID', e.target.value)} />
                            <FormField label="Edit User ID" id="EDIT_USER_ID" type="number" value={form.EDIT_USER_ID} onChange={(e) => set('EDIT_USER_ID', e.target.value)} />
                            <FormField label="Delete User ID" id="DELETE_USER_ID" type="number" value={form.DELETE_USER_ID} onChange={(e) => set('DELETE_USER_ID', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Document No" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Date / Time" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Voucher Date" id="VOUDATE" type="date" value={form.VOUDATE} onChange={(e) => set('VOUDATE', e.target.value)} />
                            <FormField label="Entry Date" id="ENTRYDATE" type="date" value={form.ENTRYDATE} onChange={(e) => set('ENTRYDATE', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Name & Type" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="System Name" id="SYSTEM_NAME" value={form.SYSTEM_NAME} onChange={(e) => set('SYSTEM_NAME', e.target.value)} required />
                            <FormField label="Voucher Type" id="VOUCHER_TYPE" value={form.VOUCHER_TYPE} onChange={(e) => set('VOUCHER_TYPE', e.target.value)} required />
                            <FormField label="Book Type" id="BOOK_TYPE" value={form.BOOK_TYPE} onChange={(e) => set('BOOK_TYPE', e.target.value)} required />
                            <FormField label="Entry Type" id="ENTRY_TYPE" value={form.ENTRY_TYPE} onChange={(e) => set('ENTRY_TYPE', e.target.value)} required />
                            <FormField label="Voucher No" id="VOUNO" type="number" value={form.VOUNO} onChange={(e) => set('VOUNO', e.target.value)} />
                            <FormField label="Ref Voucher No" id="REF_VOUNO" type="number" value={form.REF_VOUNO} onChange={(e) => set('REF_VOUNO', e.target.value)} />
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
export default AutoVoucherReceiptCash1;
