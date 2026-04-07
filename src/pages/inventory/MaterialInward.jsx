import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowDownToLine, Database, DollarSign } from 'lucide-react';
const columns = [{ key: 'MI_Document_Number', label: 'Document No' },{ key: 'MI_Vendor_Name', label: 'Vendor' },{ key: 'MI_Item_Description', label: 'Item' },{ key: 'MI_Qty', label: 'Qty' },{ key: 'MI_TotalAmount', label: 'Total' }];
const emptyForm = {
    MI_ID: '', MI_Item_ID: '', MI_Internal_ID: '',
    MI_Document_Number: '', MI_Reference_No: '', MI_Purchse_Req_No: '', MI_Vendor_Code: '', MI_Item_No: '',
    MI_Posting_Date: '', MI_Created_date: new Date().toISOString().slice(0, 10), MI_Created_by: '',
    MI_Vendor_Name: '', MI_Item_Description: '',
    MI_Price: 0, MI_GST_Per: 0, MI_GST_Amount: 0, MI_TotalAmount: 0,
    MI_Size: '', MI_Qty: 0, MI_Status: 'A',
};
const MaterialInward = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('materialInward', editId, form); else addRecord('materialInward', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Material Inward" description="Material inward entries from vendors with pricing" icon={ArrowDownToLine} />
            <DataTable columns={columns} data={state.materialInward || []} onAdd={openAdd} addLabel="New Inward" onEdit={openEdit} onDelete={(r) => deleteRecord('materialInward', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Inward' : 'New Material Inward'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Document & Vendor" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Document No" id="MI_Document_Number" value={form.MI_Document_Number} onChange={(e) => set('MI_Document_Number', e.target.value)} required />
                            <FormField label="Reference No" id="MI_Reference_No" value={form.MI_Reference_No} onChange={(e) => set('MI_Reference_No', e.target.value)} />
                            <FormField label="Purchase Req No" id="MI_Purchse_Req_No" value={form.MI_Purchse_Req_No} onChange={(e) => set('MI_Purchse_Req_No', e.target.value)} />
                            <FormField label="Vendor Code" id="MI_Vendor_Code" value={form.MI_Vendor_Code} onChange={(e) => set('MI_Vendor_Code', e.target.value)} />
                            <FormField label="Vendor Name" id="MI_Vendor_Name" value={form.MI_Vendor_Name} onChange={(e) => set('MI_Vendor_Name', e.target.value)} required />
                            <FormField label="Posting Date" id="MI_Posting_Date" value={form.MI_Posting_Date} onChange={(e) => set('MI_Posting_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Item & Pricing" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Item No" id="MI_Item_No" value={form.MI_Item_No} onChange={(e) => set('MI_Item_No', e.target.value)} />
                            <FormField label="Item Description" id="MI_Item_Description" value={form.MI_Item_Description} onChange={(e) => set('MI_Item_Description', e.target.value)} required />
                            <FormField label="Size" id="MI_Size" value={form.MI_Size} onChange={(e) => set('MI_Size', e.target.value)} />
                            <FormField label="Qty" id="MI_Qty" type="number" value={form.MI_Qty} onChange={(e) => set('MI_Qty', e.target.value)} required />
                            <FormField label="Price" id="MI_Price" type="number" value={form.MI_Price} onChange={(e) => set('MI_Price', e.target.value)} />
                            <FormField label="GST %" id="MI_GST_Per" type="number" value={form.MI_GST_Per} onChange={(e) => set('MI_GST_Per', e.target.value)} />
                            <FormField label="GST Amount" id="MI_GST_Amount" type="number" value={form.MI_GST_Amount} onChange={(e) => set('MI_GST_Amount', e.target.value)} />
                            <FormField label="Total Amount" id="MI_TotalAmount" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.MI_TotalAmount} onChange={(e) => set('MI_TotalAmount', e.target.value)} />
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
export default MaterialInward;
