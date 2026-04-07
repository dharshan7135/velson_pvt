import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { History, Database, DollarSign, Package } from 'lucide-react';
const columns = [{ key: 'VOUCHER_NO', label: 'Voucher No' },{ key: 'VOURTYPE', label: 'Type' },{ key: 'INWARD_QTY', label: 'In' },{ key: 'OUTWARD_QTY', label: 'Out' },{ key: 'Remarks', label: 'Remarks' }];
const emptyForm = {
    ID: '', ITEM_ID: '', CREATED_BY: '', LEDGER_ID: '', Row_id: '',
    VOUR_REFNO: '', ORDER_NO: '', VOUCHER_NO: '', VOURTYPE: '',
    VOUCHER_DATE: '', Edited_Date: '', Return_Date: '', Alter_Date: '', deleted_date: '', CREATED_DATE: new Date().toISOString().slice(0, 10),
    Remarks: '', Machine_Name: '', Username: '',
    RATE: 0, AMOUNT: 0, CREDIT_AMT: 0, DEBIT_AMT: 0,
    INWARD_QTY: 0, OUTWARD_QTY: 0, TRANSFER_QTY: 0, Old_Qty: 0, Return_Qty: 0,
    STATUES: 'A', Barcode: '', Reserve_IN: 0, Reserve_Out: 0, Vendor_IN: 0, Vendor_Out: 0, Edited_By: '', Return_By: '',
};
const StockLiabilityTrack = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('stockLiabilityTrack', editId, form); else addRecord('stockLiabilityTrack', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Stock Liability Track" description="Tracked stock liability with audit trail and remarks" icon={History} />
            <DataTable columns={columns} data={state.stockLiabilityTrack || []} onAdd={openAdd} addLabel="New Track" onEdit={openEdit} onDelete={(r) => deleteRecord('stockLiabilityTrack', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Track Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Voucher & Track" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Voucher No" id="VOUCHER_NO" value={form.VOUCHER_NO} onChange={(e) => set('VOUCHER_NO', e.target.value)} required />
                                <FormField label="Voucher Type" id="VOURTYPE" value={form.VOURTYPE} onChange={(e) => set('VOURTYPE', e.target.value)} />
                                <FormField label="Voucher Date" id="VOUCHER_DATE" type="date" value={form.VOUCHER_DATE} onChange={(e) => set('VOUCHER_DATE', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                                <FormField label="Machine Name" id="Machine_Name" value={form.Machine_Name} onChange={(e) => set('Machine_Name', e.target.value)} />
                                <FormField label="Username" id="Username" value={form.Username} onChange={(e) => set('Username', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantities" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Inward" id="INWARD_QTY" type="number" value={form.INWARD_QTY} onChange={(e) => set('INWARD_QTY', e.target.value)} />
                                <FormField label="Outward" id="OUTWARD_QTY" type="number" value={form.OUTWARD_QTY} onChange={(e) => set('OUTWARD_QTY', e.target.value)} />
                                <FormField label="Transfer" id="TRANSFER_QTY" type="number" value={form.TRANSFER_QTY} onChange={(e) => set('TRANSFER_QTY', e.target.value)} />
                                <FormField label="Return" id="Return_Qty" type="number" value={form.Return_Qty} onChange={(e) => set('Return_Qty', e.target.value)} />
                                <FormField label="Rate" id="RATE" type="number" value={form.RATE} onChange={(e) => set('RATE', e.target.value)} />
                                <FormField label="Amount" id="AMOUNT" type="number" value={form.AMOUNT} onChange={(e) => set('AMOUNT', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default StockLiabilityTrack;
