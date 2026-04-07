import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { PenLine, Database, Package } from 'lucide-react';
const columns = [{ key: 'Issue_No', label: 'Issue No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Issue_Qty', label: 'Issued' },{ key: 'Return_Qty', label: 'Returned' }];
const emptyForm = {
    ID: '', Item_ID: '', Created_by: '', Customer_Code_ID: '', Old_Customer_Code_ID: '',
    Issue_No: '', Item_Code: '', Outward_Ref_No: '', Customer_Code: '', old_Customer_Code: '',
    Issue_Date: '', Created_date: new Date().toISOString().slice(0, 10),
    Remarks: '', Item_Name: '', Qty: 0, UOM: '', Return_Qty: 0, Issue_Qty: 0, Barcode: '', Item_Spec: '',
};
const StockOutwardCorrection = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('stockOutwardCorrection', editId, form); else addRecord('stockOutwardCorrection', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Stock Outward Correction" description="Corrections to outward stock entries" icon={PenLine} />
            <DataTable columns={columns} data={state.stockOutwardCorrection || []} onAdd={openAdd} addLabel="New Correction" onEdit={openEdit} onDelete={(r) => deleteRecord('stockOutwardCorrection', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Correction'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Correction Details" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Issue No" id="Issue_No" value={form.Issue_No} onChange={(e) => set('Issue_No', e.target.value)} required />
                            <FormField label="Outward Ref No" id="Outward_Ref_No" value={form.Outward_Ref_No} onChange={(e) => set('Outward_Ref_No', e.target.value)} />
                            <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                            <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                            <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                            <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} />
                            <FormField label="Issue Qty" id="Issue_Qty" type="number" value={form.Issue_Qty} onChange={(e) => set('Issue_Qty', e.target.value)} />
                            <FormField label="Return Qty" id="Return_Qty" type="number" value={form.Return_Qty} onChange={(e) => set('Return_Qty', e.target.value)} />
                            <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                            <FormField label="Issue Date" id="Issue_Date" type="date" value={form.Issue_Date} onChange={(e) => set('Issue_Date', e.target.value)} />
                            <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
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
export default StockOutwardCorrection;
