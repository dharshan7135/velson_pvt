import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Banknote, Database, DollarSign, Calendar, Settings } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'REFBILL_NO', label: 'Ref Bill' },
    { key: 'BILL_AMT', label: 'Bill Amt' },
    { key: 'PAIDAMT', label: 'Paid' },
    { key: 'BILL_STATUS', label: 'Status' },
];

const emptyForm = {
    ROWID: '', LEDGER_ID: '', COMPANY: '', CREATED_BY: '', ACCount_id: '',
    AG_CODE: '', BILLNO: '', REFBILL_NO: '', VOUR_REFNO: '',
    BILLDATE: '', REFBILL_DATE: '', CREATED_DATE: new Date().toISOString().slice(0, 10),
    REMARK: '', REFBILLSTATE: '',
    AG_AMT: 0, BILL_AMT: 0, TAX_AMT: 0, CRAMT: 0, DBAMT: 0, PAIDAMT: 0, CESSAMT: 0, DIS_AMT: 0, OPPAID: 0,
    BILL_TYPE: '', PAYTYPE: '', VOURTYPE: '', REFTYPE: '',
    BILL_STATUS: 'Unpaid', STATUS: 'A', DUEDATE: '', Entry_Model: '',
};

const BillsOut = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('billsOut', editId, form); else addRecord('billsOut', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Bills Outstanding" description="Track outstanding bills, payments, and collection status" icon={Banknote} />
            <DataTable columns={columns} data={state.billsOut || []} onAdd={openAdd} addLabel="Add Bill" onEdit={openEdit} onDelete={(r) => deleteRecord('billsOut', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Bill' : 'New Outstanding Bill'} size="lg">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Bill Identification" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Ref Bill No" id="REFBILL_NO" value={form.REFBILL_NO} onChange={(e) => set('REFBILL_NO', e.target.value)} required />
                                <FormField label="Bill Type" id="BILL_TYPE" value={form.BILL_TYPE} onChange={(e) => set('BILL_TYPE', e.target.value)} required />
                                <FormField label="Voucher Type" id="VOURTYPE" value={form.VOURTYPE} onChange={(e) => set('VOURTYPE', e.target.value)} required />
                                <FormField label="Pay Type" id="PAYTYPE" value={form.PAYTYPE} onChange={(e) => set('PAYTYPE', e.target.value)} required />
                                <FormField label="Entry Model" id="Entry_Model" value={form.Entry_Model} onChange={(e) => set('Entry_Model', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Dates & Status" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                                <FormField label="Ref Bill Date" id="REFBILL_DATE" type="date" value={form.REFBILL_DATE} onChange={(e) => set('REFBILL_DATE', e.target.value)} />
                                <FormField label="Due Date (days)" id="DUEDATE" value={form.DUEDATE} onChange={(e) => set('DUEDATE', e.target.value)} />
                                <FormField label="Bill Status" id="BILL_STATUS" value={form.BILL_STATUS} onChange={(e) => set('BILL_STATUS', e.target.value)} required />
                                <FormField label="Remarks" id="REMARK" value={form.REMARK} onChange={(e) => set('REMARK', e.target.value)} required />
                                <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Payment & Settlement" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Bill Amt" id="BILL_AMT" type="number" value={form.BILL_AMT} onChange={(e) => set('BILL_AMT', e.target.value)} required />
                            <FormField label="Tax Amt" id="TAX_AMT" type="number" value={form.TAX_AMT} onChange={(e) => set('TAX_AMT', e.target.value)} required />
                            <FormField label="Credit Amt" id="CRAMT" type="number" value={form.CRAMT} onChange={(e) => set('CRAMT', e.target.value)} required />
                            <FormField label="Debit Amt" id="DBAMT" type="number" value={form.DBAMT} onChange={(e) => set('DBAMT', e.target.value)} required />
                            <FormField label="Paid Amt" id="PAIDAMT" type="number" value={form.PAIDAMT} onChange={(e) => set('PAIDAMT', e.target.value)} required />
                            <FormField label="Cess Amt" id="CESSAMT" type="number" value={form.CESSAMT} onChange={(e) => set('CESSAMT', e.target.value)} />
                            <FormField label="Disc Amt" id="DIS_AMT" type="number" value={form.DIS_AMT} onChange={(e) => set('DIS_AMT', e.target.value)} required />
                            <FormField label="Op. Paid" id="OPPAID" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.OPPAID} onChange={(e) => set('OPPAID', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="References" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Ledger ID" id="LEDGER_ID" value={form.LEDGER_ID} onChange={(e) => set('LEDGER_ID', e.target.value)} />
                            <FormField label="Company ID" id="COMPANY" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            <FormField label="Account ID" id="ACCount_id" value={form.ACCount_id} onChange={(e) => set('ACCount_id', e.target.value)} />
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Bill'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default BillsOut;
