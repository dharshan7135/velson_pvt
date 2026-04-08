import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ShoppingCart, Database, DollarSign, Truck, Settings, Shield } from 'lucide-react';

const columns = [
    { key: 'PO_No', label: 'PO No' },
    { key: 'Supplier_Name', label: 'Supplier' },
    { key: 'PO_Date', label: 'PO Date' },
    { key: 'Net_Amt', label: 'Net Amt' },
    { key: 'PO_Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Supplier_ID: '', Created_by: '',
    PO_No: '', Contact_No: '', Purchase_Req_No: '',
    PO_Date: '', Delivery_Date: '',
    Supplier_Name: '', Supplier_Address: '', Contact_Person: '', Remarks: '', Desc_Per: 0,
    Total_Before_Disc: 0, Desc_Amt: 0, Freight_Amount: 0, Taxable_Amount: 0,
    Tax_Per: 0, IGST_Per: 0, SGST_Per: 0, CGST_Per: 0,
    IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, Net_Amt: 0, Freight_Terms: '',
    PO_Type: '', PO_Status: 'Open', Approval_Status: 'Pending',
    Created_Date: new Date().toISOString().slice(0, 10),
    Validity_Until: '', Payment_Terms: '', Vendor_Ref: '', Insurence: 0,
    Delivery_Terms: '', Packing_Forward: 0, Mode_Of_Despatch: '',
    Special_Instruction: '', Project: '', Grade: '', Statsu: 'A',
};

const ServiceOrder = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('serviceOrders', editId, form); else addRecord('serviceOrders', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Service Order" description="Create and manage service purchase orders" icon={ShoppingCart} />
            <DataTable columns={columns} data={state.serviceOrders || []} onAdd={openAdd} addLabel="New Service PO" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceOrders', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Service Order' : 'New Service Order'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Order Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} required />
                                <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="PO Type" id="PO_Type" value={form.PO_Type} onChange={(e) => set('PO_Type', e.target.value)} />
                                <FormField label="Purchase Req No" id="Purchase_Req_No" value={form.Purchase_Req_No} onChange={(e) => set('Purchase_Req_No', e.target.value)} />
                                <FormField label="Supplier Name" id="Supplier_Name" className="md:col-span-2" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Supplier Address" id="Supplier_Address" className="md:col-span-2" value={form.Supplier_Address} onChange={(e) => set('Supplier_Address', e.target.value)} />
                                <FormField label="Contact Person" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                                <FormField label="Contact No" id="Contact_No" value={form.Contact_No} onChange={(e) => set('Contact_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Delivery & Terms" icon={Truck}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Delivery Date" id="Delivery_Date" type="date" value={form.Delivery_Date} onChange={(e) => set('Delivery_Date', e.target.value)} />
                                <FormField label="Validity Until" id="Validity_Until" value={form.Validity_Until} onChange={(e) => set('Validity_Until', e.target.value)} />
                                <FormField label="Vendor Ref" id="Vendor_Ref" value={form.Vendor_Ref} onChange={(e) => set('Vendor_Ref', e.target.value)} />
                                <FormField label="Mode of Despatch" id="Mode_Of_Despatch" value={form.Mode_Of_Despatch} onChange={(e) => set('Mode_Of_Despatch', e.target.value)} />
                                <FormField label="Project" id="Project" value={form.Project} onChange={(e) => set('Project', e.target.value)} />
                                <FormField label="Grade" id="Grade" value={form.Grade} onChange={(e) => set('Grade', e.target.value)} />
                                <FormField label="Special Instruction" id="Special_Instruction" className="md:col-span-2" value={form.Special_Instruction} onChange={(e) => set('Special_Instruction', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Financial Summary" icon={DollarSign}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Total Before Disc" id="Total_Before_Disc" type="number" value={form.Total_Before_Disc} onChange={(e) => set('Total_Before_Disc', e.target.value)} />
                                <FormField label="Discount Amt" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                                <FormField label="Freight" id="Freight_Amount" type="number" value={form.Freight_Amount} onChange={(e) => set('Freight_Amount', e.target.value)} />
                                <FormField label="Taxable" id="Taxable_Amount" type="number" value={form.Taxable_Amount} onChange={(e) => set('Taxable_Amount', e.target.value)} />
                                <FormField label="CGST" id="CGST_Amt" type="number" value={form.CGST_Amt} onChange={(e) => set('CGST_Amt', e.target.value)} />
                                <FormField label="SGST" id="SGST_Amt" type="number" value={form.SGST_Amt} onChange={(e) => set('SGST_Amt', e.target.value)} />
                                <FormField label="IGST" id="IGST_Amt" type="number" value={form.IGST_Amt} onChange={(e) => set('IGST_Amt', e.target.value)} />
                                <FormField label="Insurance" id="Insurence" type="number" value={form.Insurence} onChange={(e) => set('Insurence', e.target.value)} />
                                <FormField label="Net Amt" id="Net_Amt" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Terms & Conditions" icon={Settings}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Payment Terms" id="Payment_Terms" value={form.Payment_Terms} onChange={(e) => set('Payment_Terms', e.target.value)} />
                                <FormField label="Delivery Terms" id="Delivery_Terms" value={form.Delivery_Terms} onChange={(e) => set('Delivery_Terms', e.target.value)} />
                                <FormField label="Freight Terms" id="Freight_Terms" value={form.Freight_Terms} onChange={(e) => set('Freight_Terms', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Status & Approval" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="PO Status" id="PO_Status" value={form.PO_Status} onChange={(e) => set('PO_Status', e.target.value)} />
                            <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                            <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                            <FormField label="Status" id="Statsu" value={form.Statsu} onChange={(e) => set('Statsu', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Order'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ServiceOrder;
