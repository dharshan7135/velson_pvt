import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowRightLeft, Database, Calendar, DollarSign, Shield, Settings, AlignLeft } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'NARRATION', label: 'Narration' },
    { key: 'VOUDATE', label: 'Voucher Date' },
    { key: 'VOU_AMT', label: 'Voucher Amt' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    ROWID: '', LEDGER_ID: '', COMPANY: '', CREATED_BY: '',
    BILLNO: '', BOOK_NO: '',
    VOUDATE: '', BILLDATE: '',
    NARRATION: '',
    VOU_AMT: 0, BILL_AMT: 0, ADJ_AMT: 0, REC_AMT: 0,
    ADV_AMT: 0, SET_AMT: 0, BAL_AMT: 0, ODINT_AMT: 0,
    ACCOUNT_ID: '',
    VOUTYPE: '', BILL_TYPE: '', PAYTYPE: '',
    DIS_AMT: 0, DIS_CODE: '', DIS_PER: 0,
    STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    REF_VOUNO: '', ADV_VOUNO: '',
    LEDGER_POSTOS: 0, AGENT_ID: '', SUB_BOOK: '',
};

const ReceiptTrans1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('receiptTrans1', editId, form); else addRecord('receiptTrans1', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Receipt Transaction" description="Receipt transaction details with billing, adjustment and settlement amounts" icon={ArrowRightLeft} />
            <DataTable columns={columns} data={state.receiptTrans1 || []} onAdd={openAdd} addLabel="New Transaction" onEdit={openEdit} onDelete={(r) => deleteRecord('receiptTrans1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Transaction' : 'New Transaction'} size="full">
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
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Book No" id="BOOK_NO" value={form.BOOK_NO} onChange={(e) => set('BOOK_NO', e.target.value)} required />
                                <FormField label="Voucher Date" id="VOUDATE" type="date" value={form.VOUDATE} onChange={(e) => set('VOUDATE', e.target.value)} />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Narration" icon={AlignLeft}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Narration" id="NARRATION" value={form.NARRATION} onChange={(e) => set('NARRATION', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Amount / Financial" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Voucher Amt" id="VOU_AMT" type="number" value={form.VOU_AMT} onChange={(e) => set('VOU_AMT', e.target.value)} required />
                            <FormField label="Bill Amt" id="BILL_AMT" type="number" value={form.BILL_AMT} onChange={(e) => set('BILL_AMT', e.target.value)} required />
                            <FormField label="Adj Amt" id="ADJ_AMT" type="number" value={form.ADJ_AMT} onChange={(e) => set('ADJ_AMT', e.target.value)} required />
                            <FormField label="Rec Amt" id="REC_AMT" type="number" value={form.REC_AMT} onChange={(e) => set('REC_AMT', e.target.value)} required />
                            <FormField label="Advance Amt" id="ADV_AMT" type="number" value={form.ADV_AMT} onChange={(e) => set('ADV_AMT', e.target.value)} required />
                            <FormField label="Set Amt" id="SET_AMT" type="number" value={form.SET_AMT} onChange={(e) => set('SET_AMT', e.target.value)} required />
                            <FormField label="Balance Amt" id="BAL_AMT" type="number" value={form.BAL_AMT} onChange={(e) => set('BAL_AMT', e.target.value)} required />
                            <FormField label="OD Int Amt" id="ODINT_AMT" type="number" value={form.ODINT_AMT} onChange={(e) => set('ODINT_AMT', e.target.value)} required />
                            <FormField label="Ledger Post OS" id="LEDGER_POSTOS" type="number" value={form.LEDGER_POSTOS} onChange={(e) => set('LEDGER_POSTOS', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Type / Config / Status" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Account ID" id="ACCOUNT_ID" type="number" value={form.ACCOUNT_ID} onChange={(e) => set('ACCOUNT_ID', e.target.value)} />
                            <FormField label="Voucher Type" id="VOUTYPE" value={form.VOUTYPE} onChange={(e) => set('VOUTYPE', e.target.value)} required />
                            <FormField label="Bill Type" id="BILL_TYPE" value={form.BILL_TYPE} onChange={(e) => set('BILL_TYPE', e.target.value)} required />
                            <FormField label="Pay Type" id="PAYTYPE" value={form.PAYTYPE} onChange={(e) => set('PAYTYPE', e.target.value)} required />
                            <FormField label="Discount Amt" id="DIS_AMT" type="number" value={form.DIS_AMT} onChange={(e) => set('DIS_AMT', e.target.value)} required />
                            <FormField label="Discount Code" id="DIS_CODE" type="number" value={form.DIS_CODE} onChange={(e) => set('DIS_CODE', e.target.value)} />
                            <FormField label="Discount %" id="DIS_PER" type="number" value={form.DIS_PER} onChange={(e) => set('DIS_PER', e.target.value)} required />
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                            <FormField label="Ref Voucher No" id="REF_VOUNO" type="number" value={form.REF_VOUNO} onChange={(e) => set('REF_VOUNO', e.target.value)} />
                            <FormField label="Adv Voucher No" id="ADV_VOUNO" type="number" value={form.ADV_VOUNO} onChange={(e) => set('ADV_VOUNO', e.target.value)} />
                            <FormField label="Agent ID" id="AGENT_ID" type="number" value={form.AGENT_ID} onChange={(e) => set('AGENT_ID', e.target.value)} />
                            <FormField label="Sub Book" id="SUB_BOOK" type="number" value={form.SUB_BOOK} onChange={(e) => set('SUB_BOOK', e.target.value)} />
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
export default ReceiptTrans1;
