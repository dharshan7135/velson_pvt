import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileOutput, Database, DollarSign, Truck, Shield } from 'lucide-react';
const columns = [{ key: 'Doc_No', label: 'Doc No' },{ key: 'Supplier_Name', label: 'Supplier' },{ key: 'Net_Amt', label: 'Net Amt' },{ key: 'Chellan_Type', label: 'Type' },{ key: 'PO_Status', label: 'Status' }];
const emptyForm = {
    ID: '', Supplier_ID: '', Created_by: '',
    Doc_No: '', Contact_No: '', Purchase_Req_No: '', Vendor_Ref: '', Project: '', No_of_Pack: '',
    Doc_Date: '', Expert_Retrunable_Date: '', Delivery_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Supplier_Name: '', Supplier_Address: '', Contact_Person: '', Remarks: '', Carrier_Name: '', Vehicle_Name: '',
    Total_Before_Disc: 0, Desc_Per: 0, Desc_Amt: 0, Freight_Amount: 0, Taxable_Amount: 0,
    Tax_Per: 0, IGST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, Net_Amt: 0,
    Freight_Terms: '', Net_Weight: '', Gross_Weight: '', Chellan_Type: '',
    PO_Status: '', Approval_Status: 'Pending', Statsu: 'A',
    Department: '', Team: '', Purpose: '', Validity_Until: '', Payment_Terms: '',
    Insurence: '', Delivery_Terms: '', Packing_Forward: '', Mode_Of_Despatch: '', Special_Instruction: '',
};
const DeliveryChallan = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('deliveryChallans', editId, form); else addRecord('deliveryChallans', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Delivery Challan" description="Delivery challan with supplier, GST, and freight details" icon={FileOutput} />
            <DataTable columns={columns} data={state.deliveryChallans || []} onAdd={openAdd} addLabel="New Challan" onEdit={openEdit} onDelete={(r) => deleteRecord('deliveryChallans', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Challan' : 'New Delivery Challan'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document & Supplier" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Doc No" id="Doc_No" value={form.Doc_No} onChange={(e) => set('Doc_No', e.target.value)} required />
                                <FormField label="Doc Date" id="Doc_Date" type="date" value={form.Doc_Date} onChange={(e) => set('Doc_Date', e.target.value)} />
                                <FormField label="Supplier Name" id="Supplier_Name" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Supplier Address" id="Supplier_Address" value={form.Supplier_Address} onChange={(e) => set('Supplier_Address', e.target.value)} />
                                <FormField label="Contact Person" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                                <FormField label="Contact No" id="Contact_No" value={form.Contact_No} onChange={(e) => set('Contact_No', e.target.value)} />
                                <FormField label="Challan Type" id="Chellan_Type" value={form.Chellan_Type} onChange={(e) => set('Chellan_Type', e.target.value)} />
                                <FormField label="Department" id="Department" value={form.Department} onChange={(e) => set('Department', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="GST & Financials" icon={DollarSign}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Total Before Disc" id="Total_Before_Disc" type="number" value={form.Total_Before_Disc} onChange={(e) => set('Total_Before_Disc', e.target.value)} />
                                <FormField label="Disc %" id="Desc_Per" type="number" value={form.Desc_Per} onChange={(e) => set('Desc_Per', e.target.value)} />
                                <FormField label="Disc Amt" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                                <FormField label="Taxable Amt" id="Taxable_Amount" type="number" value={form.Taxable_Amount} onChange={(e) => set('Taxable_Amount', e.target.value)} />
                                <FormField label="IGST %" id="IGST_Per" type="number" value={form.IGST_Per} onChange={(e) => set('IGST_Per', e.target.value)} />
                                <FormField label="SGST %" id="SGST_Per" type="number" value={form.SGST_Per} onChange={(e) => set('SGST_Per', e.target.value)} />
                                <FormField label="CGST %" id="CGST_Per" type="number" value={form.CGST_Per} onChange={(e) => set('CGST_Per', e.target.value)} />
                                <FormField label="Net Amt" id="Net_Amt" type="number" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Dispatch & Terms" icon={Truck}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Carrier" id="Carrier_Name" value={form.Carrier_Name} onChange={(e) => set('Carrier_Name', e.target.value)} />
                            <FormField label="Vehicle" id="Vehicle_Name" value={form.Vehicle_Name} onChange={(e) => set('Vehicle_Name', e.target.value)} />
                            <FormField label="Net Weight" id="Net_Weight" value={form.Net_Weight} onChange={(e) => set('Net_Weight', e.target.value)} />
                            <FormField label="Gross Weight" id="Gross_Weight" value={form.Gross_Weight} onChange={(e) => set('Gross_Weight', e.target.value)} />
                            <FormField label="Delivery Date" id="Delivery_Date" type="date" value={form.Delivery_Date} onChange={(e) => set('Delivery_Date', e.target.value)} />
                            <FormField label="Freight Amt" id="Freight_Amount" type="number" value={form.Freight_Amount} onChange={(e) => set('Freight_Amount', e.target.value)} />
                            <FormField label="Mode of Despatch" id="Mode_Of_Despatch" value={form.Mode_Of_Despatch} onChange={(e) => set('Mode_Of_Despatch', e.target.value)} />
                            <FormField label="Status" id="PO_Status" value={form.PO_Status} onChange={(e) => set('PO_Status', e.target.value)} />
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
export default DeliveryChallan;
