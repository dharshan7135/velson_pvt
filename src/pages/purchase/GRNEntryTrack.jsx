import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { History, Database, DollarSign, Building2, Settings, Shield } from 'lucide-react';

const columns = [
    { key: 'GRN_No', label: 'GRN No' },
    { key: 'Supplier_Name', label: 'Supplier' },
    { key: 'PO_No', label: 'PO No' },
    { key: 'Bill_Amt', label: 'Bill Amt' },
    { key: 'Track_details', label: 'Track' },
];

const emptyForm = {
    ID: '', Supplier_ID: '', Created_by: '', LEDGER_ID: '', Purchase_Ledger_Id: '', Freight_Ledger_Id: '', TCS_Ledger_Id: '', Account_Id: '', USERID: '',
    GRN_No: '', Invoice_No: '', Gate_Entry_No: '', PO_No: '', Contact_No: '', Purchase_Req_No: '',
    GRN_Date: '', Invoice_Date: '', PO_Date: '', Delivery_Date: '', deleted_date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Supplier_Name: '', Supplier_Address: '', Contact_Person: '', Remarks: '', Desc_Per: 0, System_Name: '', Purchase_Ledger_Name: '', TCS_Ledger_Name: '', Freight_Ledger_Name: '',
    Total_Before_Disc: 0, Desc_Amt: 0, Freight_Amount: 0, Taxable_Amount: 0, Tax_Per: 0,
    IGST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, Net_Amt: 0,
    Freight_Terms: '', Freight_Tax_Amt: 0, TCS_Amt: 0, Gst_Amt: 0, Tax_Amt: 0, Bill_Amt: 0, Currency_Rate_M: 0, GST_Type: '', CurrencyM: '', Roundoff: 0,
    PO_Type: '', Inward_Type: '', QC_Type: '', GRN_Inward_Type: '', Bill_Mode: '',
    Status: 'A', Approval_Status: 'Pending', PO_Status: '',
    Updated_By: '', Updated_date: '', Updated_system: '',
    Validity_Until: '', Payment_Terms: '', Vendor_Ref: '', Insurence: '', Delivery_Terms: '', Packing_Forward: '',
    Mode_Of_Despatch: '', Special_Instruction: '', Project: '', Grade: '', TCS_Per: 0,
    Track_details: '', deleted_by: '', deleted_system: '',
};

const GRNEntryTrack = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('grnEntryTrack', editId, form); else addRecord('grnEntryTrack', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="GRN Entry Track" description="Tracked GRN headers with deletion audit trail" icon={History} />
            <DataTable columns={columns} data={state.grnEntryTrack || []} onAdd={openAdd} addLabel="New Tracked GRN" onEdit={openEdit} onDelete={(r) => deleteRecord('grnEntryTrack', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Tracked GRN' : 'New Tracked GRN'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="GRN Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} required />
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} required />
                                <FormField label="Invoice No" id="Invoice_No" value={form.Invoice_No} onChange={(e) => set('Invoice_No', e.target.value)} />
                                <FormField label="Gate Entry No" id="Gate_Entry_No" value={form.Gate_Entry_No} onChange={(e) => set('Gate_Entry_No', e.target.value)} />
                                <FormField label="GRN Date" id="GRN_Date" type="date" value={form.GRN_Date} onChange={(e) => set('GRN_Date', e.target.value)} />
                                <FormField label="Invoice Date" id="Invoice_Date" type="date" value={form.Invoice_Date} onChange={(e) => set('Invoice_Date', e.target.value)} />
                                <FormField label="PO Type" id="PO_Type" value={form.PO_Type} onChange={(e) => set('PO_Type', e.target.value)} />
                                <FormField label="Bill Mode" id="Bill_Mode" value={form.Bill_Mode} onChange={(e) => set('Bill_Mode', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Supplier" icon={Building2}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Supplier Name" id="Supplier_Name" className="md:col-span-2" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Address" id="Supplier_Address" className="md:col-span-2" value={form.Supplier_Address} onChange={(e) => set('Supplier_Address', e.target.value)} />
                                <FormField label="Contact" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                                <FormField label="Vendor Ref" id="Vendor_Ref" value={form.Vendor_Ref} onChange={(e) => set('Vendor_Ref', e.target.value)} />
                                <FormField label="GST Type" id="GST_Type" value={form.GST_Type} onChange={(e) => set('GST_Type', e.target.value)} />
                                <FormField label="Track Details" id="Track_details" value={form.Track_details} onChange={(e) => set('Track_details', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Financials" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Total Before Disc" id="Total_Before_Disc" type="number" value={form.Total_Before_Disc} onChange={(e) => set('Total_Before_Disc', e.target.value)} />
                            <FormField label="Discount" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                            <FormField label="Freight" id="Freight_Amount" type="number" value={form.Freight_Amount} onChange={(e) => set('Freight_Amount', e.target.value)} />
                            <FormField label="Taxable" id="Taxable_Amount" type="number" value={form.Taxable_Amount} onChange={(e) => set('Taxable_Amount', e.target.value)} />
                            <FormField label="CGST" id="CGST_Amt" type="number" value={form.CGST_Amt} onChange={(e) => set('CGST_Amt', e.target.value)} />
                            <FormField label="SGST" id="SGST_Amt" type="number" value={form.SGST_Amt} onChange={(e) => set('SGST_Amt', e.target.value)} />
                            <FormField label="IGST" id="IGST_Amt" type="number" value={form.IGST_Amt} onChange={(e) => set('IGST_Amt', e.target.value)} />
                            <FormField label="TCS" id="TCS_Amt" type="number" value={form.TCS_Amt} onChange={(e) => set('TCS_Amt', e.target.value)} />
                            <FormField label="Round Off" id="Roundoff" type="number" value={form.Roundoff} onChange={(e) => set('Roundoff', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            <FormField label="Bill Amt" id="Bill_Amt" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Bill_Amt} onChange={(e) => set('Bill_Amt', e.target.value)} />
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
export default GRNEntryTrack;
