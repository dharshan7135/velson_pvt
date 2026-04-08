import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Receipt, Database, Calendar, DollarSign, Shield, Settings, AlignLeft } from 'lucide-react';

const columns = [
    { key: 'BOOK_NO', label: 'Book No' },
    { key: 'PRINT_NAME', label: 'Print Name' },
    { key: 'VOUDATE', label: 'Voucher Date' },
    { key: 'VOU_AMT', label: 'Amount' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    ROWID: '', LEDGER_ID: '', COMPANY: '', CREATED_BY: '',
    BOOK_NO: '', CHQ_NO: '', COMM_CODE: '',
    VOUDATE: '', CHQ_DATE: '', COLL_DATE: '',
    PRINT_NAME: '', BILL_REMARKS: '',
    VOU_AMT: 0, COLL_CHARGE: 0, ADV_AMT: 0, SHIFTAMT: 0,
    VOUTYPE: '', CHQ_TYPE: '', PAYMEN_TYPE: '',
    COLL_STATUS: '', STATUS: 'A', DIS_AMT: 0,
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    VOUNO: '', MODE: '', BANK: '', COLL_BANK: '', DETAILS: '',
    BANK_COM: '', BANK_ID: '', USERID: '',
};

const ReceiptMaster1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('receiptMaster1', editId, form); else addRecord('receiptMaster1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Receipt Master" description="Receipt voucher management with cheque, bank and collection details" icon={Receipt} />
            <DataTable columns={columns} data={state.receiptMaster1 || []} onAdd={openAdd} addLabel="New Receipt" onEdit={openEdit} onDelete={(r) => deleteRecord('receiptMaster1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Receipt' : 'New Receipt'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Primary & Reference" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Row ID (PK)" id="ROWID" type="number" value={form.ROWID} onChange={(e) => set('ROWID', e.target.value)} required />
                                <FormField label="Ledger ID" id="LEDGER_ID" type="number" value={form.LEDGER_ID} onChange={(e) => set('LEDGER_ID', e.target.value)} />
                                <FormField label="Company" id="COMPANY" type="number" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                                <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                            </div>
                        </FormContainer>
                        <FormContainer title="Document & Dates" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Book No" id="BOOK_NO" value={form.BOOK_NO} onChange={(e) => set('BOOK_NO', e.target.value)} required />
                                <FormField label="Cheque No" id="CHQ_NO" value={form.CHQ_NO} onChange={(e) => set('CHQ_NO', e.target.value)} required />
                                <FormField label="Voucher Date" id="VOUDATE" type="date" value={form.VOUDATE} onChange={(e) => set('VOUDATE', e.target.value)} />
                                <FormField label="Cheque Date" id="CHQ_DATE" type="date" value={form.CHQ_DATE} onChange={(e) => set('CHQ_DATE', e.target.value)} />
                                <FormField label="Collection Date" id="COLL_DATE" type="date" value={form.COLL_DATE} onChange={(e) => set('COLL_DATE', e.target.value)} />
                                <FormField label="Comm Code" id="COMM_CODE" type="number" value={form.COMM_CODE} onChange={(e) => set('COMM_CODE', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Name / Description" icon={AlignLeft}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Print Name" id="PRINT_NAME" value={form.PRINT_NAME} onChange={(e) => set('PRINT_NAME', e.target.value)} required />
                            <FormField label="Bill Remarks" id="BILL_REMARKS" value={form.BILL_REMARKS} onChange={(e) => set('BILL_REMARKS', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Amount / Financial" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Voucher Amt" id="VOU_AMT" type="number" value={form.VOU_AMT} onChange={(e) => set('VOU_AMT', e.target.value)} required />
                            <FormField label="Coll Charge" id="COLL_CHARGE" type="number" value={form.COLL_CHARGE} onChange={(e) => set('COLL_CHARGE', e.target.value)} required />
                            <FormField label="Advance Amt" id="ADV_AMT" type="number" value={form.ADV_AMT} onChange={(e) => set('ADV_AMT', e.target.value)} required />
                            <FormField label="Shift Amt" id="SHIFTAMT" type="number" value={form.SHIFTAMT} onChange={(e) => set('SHIFTAMT', e.target.value)} required />
                            <FormField label="Discount Amt" id="DIS_AMT" type="number" value={form.DIS_AMT} onChange={(e) => set('DIS_AMT', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Type / Config / Status" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Voucher Type" id="VOUTYPE" value={form.VOUTYPE} onChange={(e) => set('VOUTYPE', e.target.value)} required />
                            <FormField label="Cheque Type" id="CHQ_TYPE" value={form.CHQ_TYPE} onChange={(e) => set('CHQ_TYPE', e.target.value)} required />
                            <FormField label="Payment Type" id="PAYMEN_TYPE" value={form.PAYMEN_TYPE} onChange={(e) => set('PAYMEN_TYPE', e.target.value)} required />
                            <FormField label="Coll Status" id="COLL_STATUS" value={form.COLL_STATUS} onChange={(e) => set('COLL_STATUS', e.target.value)} required />
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                            <FormField label="Mode" id="MODE" value={form.MODE} onChange={(e) => set('MODE', e.target.value)} required />
                            <FormField label="Voucher No" id="VOUNO" type="number" value={form.VOUNO} onChange={(e) => set('VOUNO', e.target.value)} />
                            <FormField label="Bank" id="BANK" type="number" value={form.BANK} onChange={(e) => set('BANK', e.target.value)} />
                            <FormField label="Coll Bank" id="COLL_BANK" value={form.COLL_BANK} onChange={(e) => set('COLL_BANK', e.target.value)} required />
                            <FormField label="Details" id="DETAILS" value={form.DETAILS} onChange={(e) => set('DETAILS', e.target.value)} required />
                            <FormField label="Bank Com" id="BANK_COM" type="number" value={form.BANK_COM} onChange={(e) => set('BANK_COM', e.target.value)} />
                            <FormField label="Bank ID" id="BANK_ID" type="number" value={form.BANK_ID} onChange={(e) => set('BANK_ID', e.target.value)} />
                            <FormField label="User ID" id="USERID" type="number" value={form.USERID} onChange={(e) => set('USERID', e.target.value)} />
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
export default ReceiptMaster1;
