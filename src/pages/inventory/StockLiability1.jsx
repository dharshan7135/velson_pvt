import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { BookOpen, Database, DollarSign, Package } from 'lucide-react';
const columns = [{ key: 'VOUCHER_NO', label: 'Voucher No' },{ key: 'VOURTYPE', label: 'Type' },{ key: 'INWARD_QTY', label: 'Inward' },{ key: 'OUTWARD_QTY', label: 'Outward' },{ key: 'AMOUNT', label: 'Amount' }];
const emptyForm = {
    ID: '', ITEM_ID: '', CREATED_BY: '', LEDGER_ID: '',
    VOUR_REFNO: '', ORDER_NO: '', VOUCHER_NO: '', VOURTYPE: '',
    VOUCHER_DATE: '', Edited_Date: '', Return_Date: '', CREATED_DATE: new Date().toISOString().slice(0, 10),
    RATE: 0, AMOUNT: 0, CREDIT_AMT: 0, DEBIT_AMT: 0,
    INWARD_QTY: 0, OUTWARD_QTY: 0, TRANSFER_QTY: 0, Old_Qty: 0, Return_Qty: 0,
    STATUES: 'A', Barcode: '',
    Reserve_IN: 0, Reserve_Out: 0, Vendor_IN: 0, Vendor_Out: 0, Edited_By: '', Return_By: '',
};
const StockLiability1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('stockLiability1', editId, form); else addRecord('stockLiability1', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Stock Liability" description="Stock liability ledger with inward/outward/transfer quantities" icon={BookOpen} />
            <DataTable columns={columns} data={state.stockLiability1 || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('stockLiability1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Liability Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Voucher Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Voucher No" id="VOUCHER_NO" value={form.VOUCHER_NO} onChange={(e) => set('VOUCHER_NO', e.target.value)} required />
                                <FormField label="Voucher Type" id="VOURTYPE" value={form.VOURTYPE} onChange={(e) => set('VOURTYPE', e.target.value)} />
                                <FormField label="Voucher Date" id="VOUCHER_DATE" type="date" value={form.VOUCHER_DATE} onChange={(e) => set('VOUCHER_DATE', e.target.value)} />
                                <FormField label="Order No" id="ORDER_NO" value={form.ORDER_NO} onChange={(e) => set('ORDER_NO', e.target.value)} />
                                <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                                <FormField label="Status" id="STATUES" value={form.STATUES} onChange={(e) => set('STATUES', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantities" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Inward Qty" id="INWARD_QTY" type="number" value={form.INWARD_QTY} onChange={(e) => set('INWARD_QTY', e.target.value)} />
                                <FormField label="Outward Qty" id="OUTWARD_QTY" type="number" value={form.OUTWARD_QTY} onChange={(e) => set('OUTWARD_QTY', e.target.value)} />
                                <FormField label="Transfer Qty" id="TRANSFER_QTY" type="number" value={form.TRANSFER_QTY} onChange={(e) => set('TRANSFER_QTY', e.target.value)} />
                                <FormField label="Return Qty" id="Return_Qty" type="number" value={form.Return_Qty} onChange={(e) => set('Return_Qty', e.target.value)} />
                                <FormField label="Reserve IN" id="Reserve_IN" type="number" value={form.Reserve_IN} onChange={(e) => set('Reserve_IN', e.target.value)} />
                                <FormField label="Reserve Out" id="Reserve_Out" type="number" value={form.Reserve_Out} onChange={(e) => set('Reserve_Out', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Financials" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Rate" id="RATE" type="number" value={form.RATE} onChange={(e) => set('RATE', e.target.value)} />
                            <FormField label="Amount" id="AMOUNT" type="number" value={form.AMOUNT} onChange={(e) => set('AMOUNT', e.target.value)} />
                            <FormField label="Credit" id="CREDIT_AMT" type="number" value={form.CREDIT_AMT} onChange={(e) => set('CREDIT_AMT', e.target.value)} />
                            <FormField label="Debit" id="DEBIT_AMT" type="number" value={form.DEBIT_AMT} onChange={(e) => set('DEBIT_AMT', e.target.value)} />
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
export default StockLiability1;
