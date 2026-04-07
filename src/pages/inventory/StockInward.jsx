import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowDownToLine, Database, DollarSign, Package } from 'lucide-react';
const columns = [{ key: 'GRN_No', label: 'GRN No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Qty', label: 'Qty' },{ key: 'Amount', label: 'Amt' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    ID: '', Item_ID: '', Created_by: '',
    GRN_No: '', INV_No: '', Supplier_Code: '', Item_Code: '', Job_No: '',
    GRN_Date: '', INV_Date: '', Edited_Date: '', Created_date: new Date().toISOString().slice(0, 10),
    Supplier_Name: '', Item_Name: '', Remark: '', Supplier_Adderess: '', Item_Spec: '',
    Rate: 0, Amount: 0, Qty: 0, UOM: '', Old_Qty: 0,
    Barcode_Type: '', Barcode: '', Status: 'A', Edited_By: '',
};
const StockInward = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('stockInward', editId, form); else addRecord('stockInward', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Stock Inward" description="Inward stock ledger entries with supplier and barcode" icon={ArrowDownToLine} />
            <DataTable columns={columns} data={state.stockInward || []} onAdd={openAdd} addLabel="New Inward" onEdit={openEdit} onDelete={(r) => deleteRecord('stockInward', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Inward' : 'New Stock Inward'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Document & Supplier" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} required />
                                <FormField label="Invoice No" id="INV_No" value={form.INV_No} onChange={(e) => set('INV_No', e.target.value)} />
                                <FormField label="Supplier Code" id="Supplier_Code" value={form.Supplier_Code} onChange={(e) => set('Supplier_Code', e.target.value)} />
                                <FormField label="Supplier Name" id="Supplier_Name" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} />
                                <FormField label="GRN Date" id="GRN_Date" type="date" value={form.GRN_Date} onChange={(e) => set('GRN_Date', e.target.value)} />
                                <FormField label="Invoice Date" id="INV_Date" type="date" value={form.INV_Date} onChange={(e) => set('INV_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Item & Stock" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Rate" id="Rate" type="number" value={form.Rate} onChange={(e) => set('Rate', e.target.value)} />
                                <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} />
                                <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default StockInward;
