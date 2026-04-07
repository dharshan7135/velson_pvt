import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListOrdered, Database, DollarSign, Package, Calendar } from 'lucide-react';

const columns = [
    { key: 'PO_NO', label: 'PO No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Net_Amt', label: 'Net Amt' },
    { key: 'Statsu', label: 'Status' },
];

const emptyForm = {
    ID: '', Item_ID: '', Created_by: '', Tax_Id: '', Auto_po_Id: '',
    PR_NO: '', PO_NO: '', Item_Code: '', HSN_Code: '', Material_Req_No: '', Material_Req_ID_No: '', Supplier_Part_No: '',
    PO_Date: '', Mate_Due_Date: '', GRN_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Item_Name: '', Description: '',
    Unit_Price: 0, Desc_Amt: 0, Final_Price: 0, Sub_total: 0,
    IGST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, GST_Per: 0, GST_Amt: 0, Net_Amt: 0, Disc_Per: 0,
    UOM: '', Qty: 0, Grn_Qty: 0, GRN_No: '',
    Statsu: 'A',
};

const PurchaseOrderDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('purchaseOrderDetails', editId, form); else addRecord('purchaseOrderDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="PO Line Items" description="Purchase Order line-level items with GST and GRN tracking" icon={ListOrdered} />
            <DataTable columns={columns} data={state.purchaseOrderDetails || []} onAdd={openAdd} addLabel="Add PO Line" onEdit={openEdit} onDelete={(r) => deleteRecord('purchaseOrderDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit PO Line' : 'New PO Line Item'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Item & PO Reference" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="PO No" id="PO_NO" value={form.PO_NO} onChange={(e) => set('PO_NO', e.target.value)} required />
                                <FormField label="PR No" id="PR_NO" value={form.PR_NO} onChange={(e) => set('PR_NO', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="HSN Code" id="HSN_Code" value={form.HSN_Code} onChange={(e) => set('HSN_Code', e.target.value)} />
                                <FormField label="Material Req No" id="Material_Req_No" value={form.Material_Req_No} onChange={(e) => set('Material_Req_No', e.target.value)} />
                                <FormField label="Supplier Part No" id="Supplier_Part_No" value={form.Supplier_Part_No} onChange={(e) => set('Supplier_Part_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Qty, Dates & GRN" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="GRN Qty" id="Grn_Qty" type="number" value={form.Grn_Qty} onChange={(e) => set('Grn_Qty', e.target.value)} />
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} />
                                <FormField label="PO Date" id="PO_Date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="Material Due Date" id="Mate_Due_Date" type="date" value={form.Mate_Due_Date} onChange={(e) => set('Mate_Due_Date', e.target.value)} />
                                <FormField label="Description" id="Description" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Pricing & Tax" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Unit Price" id="Unit_Price" type="number" value={form.Unit_Price} onChange={(e) => set('Unit_Price', e.target.value)} />
                            <FormField label="Disc %" id="Disc_Per" type="number" value={form.Disc_Per} onChange={(e) => set('Disc_Per', e.target.value)} />
                            <FormField label="Disc Amt" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                            <FormField label="Final Price" id="Final_Price" type="number" value={form.Final_Price} onChange={(e) => set('Final_Price', e.target.value)} />
                            <FormField label="Sub Total" id="Sub_total" type="number" value={form.Sub_total} onChange={(e) => set('Sub_total', e.target.value)} />
                            <FormField label="GST %" id="GST_Per" type="number" value={form.GST_Per} onChange={(e) => set('GST_Per', e.target.value)} />
                            <FormField label="GST Amt" id="GST_Amt" type="number" value={form.GST_Amt} onChange={(e) => set('GST_Amt', e.target.value)} />
                            <FormField label="Net Amt" id="Net_Amt" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
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
export default PurchaseOrderDetails;
