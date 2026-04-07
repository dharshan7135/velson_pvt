import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileText, Plus, Database, Calendar, DollarSign, Activity, Info, Files } from 'lucide-react';

const columns = [
    { key: 'PO_No', label: 'PO No' },
    { key: 'Supplier_Name', label: 'Supplier Name' },
    { key: 'PO_Date', label: 'PO Date' },
    { key: 'Net_Amt', label: 'Net Amount' },
    { key: 'PO_Status', label: 'Status' },
];

const emptyForm = {
    // Reference / Foreign Key
    Supplier_ID: '', Created_by: '', Tax_id: '', Proforma_tax_per_Id: '',
    // Document / Code
    PO_No: '', Revision_No: '', Contact_No: '', Purchase_Req_No: '', Service_No: '', Proforma_Invoice_No: '',
    // Date / Time
    PO_Date: '', Delivery_Date: '', Proforma_Invoice_Date: '', Invoice_Date: '',
    // Name / Description / Address
    Supplier_Name: '', Supplier_Address: '', Contact_Person: '', Remarks: '', Desc_Per: 0, Currency_Name: '', Confirmation_remarks: '', upload_File_Name: '',
    // Amount / Financial
    Total_Before_Disc: 0, Desc_Amt: 0, Freight_Amount: 0, Taxable_Amount: 0, Tax_Per: 0, IGST_Per: 0, SGST_Per: 0, CGST_Per: 0,
    IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, Net_Amt: 0,
    Freight_Terms: '', LM_Tax_Type: '', LM_Tax_Type_name: '', special_discount: 0, Gst_Amt: 0, igstper: 0, gstper: 0,
    Proforma_tax_per: 0, Proforma_GST_Amount: 0, Proforma_IGST_Amount: 0, Proforma_Freight_Charge_Percentage: 0,
    Currency_Total_Value: 0, Exchange_Rate: 1,
    // Type / Category
    PO_Type: '',
    // Status / Flag
    PO_Status: 'Pending', Approval_Status: 'Pending', Invoice_Status: 'Pending',
    Proforma_Dis_Amount: 0, Proforma_Before_Dis_total: 0, Proforma_Defore_Dis_total: 0, Proforma_Dis_Per: 0,
    Quotation_Status: 'Active', Quotation_Status_by: '', Quotation_Status_date: '',
    // General / Other
    Validity_Until: '', Payment_Terms: '', Vendor_Ref: '', Insurence: 0, Delivery_Terms: '', Packing_Forward: 0,
    Mode_Of_Despatch: '', Special_Instruction: '', Project: '', Grade: '', Statsu: '',
    vehicle_Model: '', Entry_Model: '', Proforma_Bank_Details: '', Round_Off: 0,
    Proforma_Packingandforwarding_Per: 0, Currency_Id: '',
    // File / Attachment
    File_Location: '',
    // Audit / Tracking
    Created_Date: new Date().toISOString().split('T')[0],
};

const QuotationEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => {
        setForm((f) => ({ ...f, [field]: val }));
    };

    const save = () => {
        if (editId) updateRecord('quotations', editId, form);
        else addRecord('quotations', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Quotation Entry" description="Manage Quotation and Purchase Order details" icon={FileText} />
            
            <DataTable 
                columns={columns} 
                data={state.quotations || []} 
                onAdd={openAdd} 
                addLabel="Add Quotation" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quotations', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Quotation' : 'Add Quotation'} size="full">
                <div className="p-6 space-y-6">
                    {/* Reference & Document Info */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Reference Details" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Supplier ID" id="Supplier_ID" value={form.Supplier_ID} onChange={(e) => set('Supplier_ID', e.target.value)} required />
                                <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                                <FormField label="Tax ID" id="Tax_id" value={form.Tax_id} onChange={(e) => set('Tax_id', e.target.value)} />
                                <FormField label="Proforma Tax ID" id="Proforma_tax_per_Id" value={form.Proforma_tax_per_Id} onChange={(e) => set('Proforma_tax_per_Id', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Document Information" icon={Files}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} />
                                <FormField label="Revision No" id="Revision_No" value={form.Revision_No} onChange={(e) => set('Revision_No', e.target.value)} />
                                <FormField label="Contact No" id="Contact_No" value={form.Contact_No} onChange={(e) => set('Contact_No', e.target.value)} />
                                <FormField label="Purchase Req No" id="Purchase_Req_No" value={form.Purchase_Req_No} onChange={(e) => set('Purchase_Req_No', e.target.value)} />
                                <FormField label="Service No" id="Service_No" value={form.Service_No} onChange={(e) => set('Service_No', e.target.value)} />
                                <FormField label="Proforma Invoice No" id="Proforma_Invoice_No" value={form.Proforma_Invoice_No} onChange={(e) => set('Proforma_Invoice_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Dates & Supplier Details */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Dates & Status" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="Delivery Date" id="Delivery_Date" type="date" value={form.Delivery_Date} onChange={(e) => set('Delivery_Date', e.target.value)} />
                                <FormField label="Proforma Invoice Date" id="Proforma_Invoice_Date" type="date" value={form.Proforma_Invoice_Date} onChange={(e) => set('Proforma_Invoice_Date', e.target.value)} />
                                <FormField label="Invoice Date" id="Invoice_Date" type="date" value={form.Invoice_Date} onChange={(e) => set('Invoice_Date', e.target.value)} />
                                <FormField label="PO Status" id="PO_Status" value={form.PO_Status} onChange={(e) => set('PO_Status', e.target.value)} />
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Supplier Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Supplier Name" id="Supplier_Name" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Contact Person" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                                <FormField label="Supplier Address" id="Supplier_Address" className="md:col-span-2" value={form.Supplier_Address} onChange={(e) => set('Supplier_Address', e.target.value)} />
                                <FormField label="Currency Name" id="Currency_Name" value={form.Currency_Name} onChange={(e) => set('Currency_Name', e.target.value)} />
                                <FormField label="Exchange Rate" id="Exchange_Rate" type="number" value={form.Exchange_Rate} onChange={(e) => set('Exchange_Rate', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Financial Information */}
                    <FormContainer title="Financial & Amounts" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            <FormField label="Total Before Disc" id="Total_Before_Disc" type="number" value={form.Total_Before_Disc} onChange={(e) => set('Total_Before_Disc', e.target.value)} />
                            <FormField label="Disc Per (%)" id="Desc_Per" type="number" value={form.Desc_Per} onChange={(e) => set('Desc_Per', e.target.value)} />
                            <FormField label="Disc Amount" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                            <FormField label="Taxable Amount" id="Taxable_Amount" type="number" value={form.Taxable_Amount} onChange={(e) => set('Taxable_Amount', e.target.value)} />
                            <FormField label="Tax Per (%)" id="Tax_Per" type="number" value={form.Tax_Per} onChange={(e) => set('Tax_Per', e.target.value)} />
                            <FormField label="Freight Amount" id="Freight_Amount" type="number" value={form.Freight_Amount} onChange={(e) => set('Freight_Amount', e.target.value)} />
                            <FormField label="Net Amount" id="Net_Amt" type="number" className="font-bold text-cyan-700" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
                            <FormField label="GST Amount" id="Gst_Amt" type="number" value={form.Gst_Amt} onChange={(e) => set('Gst_Amt', e.target.value)} />
                        </div>
                    </FormContainer>

                    {/* Tax Breakdown */}
                    <FormContainer title="Tax Breakdown (GST/IGST)">
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
                            <div className="space-y-4 border-r pr-4">
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Central & State (CGST/SGST)</h4>
                                <FormField label="CGST %" id="CGST_Per" type="number" value={form.CGST_Per} onChange={(e) => set('CGST_Per', e.target.value)} />
                                <FormField label="CGST Amt" id="CGST_Amt" type="number" value={form.CGST_Amt} onChange={(e) => set('CGST_Amt', e.target.value)} />
                                <FormField label="SGST %" id="SGST_Per" type="number" value={form.SGST_Per} onChange={(e) => set('SGST_Per', e.target.value)} />
                                <FormField label="SGST Amt" id="SGST_Amt" type="number" value={form.SGST_Amt} onChange={(e) => set('SGST_Amt', e.target.value)} />
                            </div>
                            <div className="space-y-4 border-r pr-4 pl-4">
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Integrated (IGST)</h4>
                                <FormField label="IGST %" id="IGST_Per" type="number" value={form.IGST_Per} onChange={(e) => set('IGST_Per', e.target.value)} />
                                <FormField label="IGST Amt" id="IGST_Amt" type="number" value={form.IGST_Amt} onChange={(e) => set('IGST_Amt', e.target.value)} />
                                <FormField label="IGST Per (Alias)" id="igstper" type="number" value={form.igstper} onChange={(e) => set('igstper', e.target.value)} />
                            </div>
                            <div className="space-y-4 pl-4">
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Proforma Taxes</h4>
                                <FormField label="Proforma Tax %" id="Proforma_tax_per" type="number" value={form.Proforma_tax_per} onChange={(e) => set('Proforma_tax_per', e.target.value)} />
                                <FormField label="Proforma GST Amt" id="Proforma_GST_Amount" type="number" value={form.Proforma_GST_Amount} onChange={(e) => set('Proforma_GST_Amount', e.target.value)} />
                                <FormField label="Proforma IGST Amt" id="Proforma_IGST_Amount" type="number" value={form.Proforma_IGST_Amount} onChange={(e) => set('Proforma_IGST_Amount', e.target.value)} />
                            </div>
                        </div>
                    </FormContainer>

                    {/* General / Terms & Instructions */}
                    <FormContainer title="Terms, Instructions & Other Details" icon={Info}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Payment Terms" id="Payment_Terms" value={form.Payment_Terms} onChange={(e) => set('Payment_Terms', e.target.value)} />
                            <FormField label="Delivery Terms" id="Delivery_Terms" value={form.Delivery_Terms} onChange={(e) => set('Delivery_Terms', e.target.value)} />
                            <FormField label="Freight Terms" id="Freight_Terms" value={form.Freight_Terms} onChange={(e) => set('Freight_Terms', e.target.value)} />
                            <FormField label="Special Instruction" id="Special_Instruction" value={form.Special_Instruction} onChange={(e) => set('Special_Instruction', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            <FormField label="Mode of Despatch" id="Mode_Of_Despatch" value={form.Mode_Of_Despatch} onChange={(e) => set('Mode_Of_Despatch', e.target.value)} />
                            <FormField label="Project" id="Project" value={form.Project} onChange={(e) => set('Project', e.target.value)} />
                            <FormField label="Grade" id="Grade" value={form.Grade} onChange={(e) => set('Grade', e.target.value)} />
                            <FormField label="Vehicle Model" id="vehicle_Model" value={form.vehicle_Model} onChange={(e) => set('vehicle_Model', e.target.value)} />
                            <FormField label="Packing & Forwarding" id="Packing_Forward" type="number" value={form.Packing_Forward} onChange={(e) => set('Packing_Forward', e.target.value)} />
                            <FormField label="Insurence" id="Insurence" type="number" value={form.Insurence} onChange={(e) => set('Insurence', e.target.value)} />
                            <FormField label="Round Off" id="Round_Off" type="number" value={form.Round_Off} onChange={(e) => set('Round_Off', e.target.value)} />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuotationEntry;
