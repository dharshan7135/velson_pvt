import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Layers, Database, FileText, DollarSign, Calculator, Info } from 'lucide-react';

const columns = [
    { key: 'PO_NO', label: 'PO No' },
    { key: 'Item_Code', label: 'Item Code' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Net_Amt', label: 'Net Amount' },
];

const emptyForm = {
    // Reference / Foreign Key
    Item_ID: '', Created_by: '',
    // Document / Code
    PR_NO: '', PO_NO: '', Revision_No: 0, Item_Code: '', HSN_Code: '', Proforma_Invoice_No: '',
    // Date / Time
    PO_Date: '', Proforma_Invoice_Date: '',
    // Name / Description
    Item_Name: '', Description: '', UOM: '', Qty: 0, Grn_Qty: 0,
    // Amount / Financial
    Unit_Price: 0, Disc_Per: 0, Desc_Amt: 0, Final_Price: 0, Sub_total: 0,
    IGST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0,
    GST_Per: 0, GST_Amt: 0, Net_Amt: 0,
    Exchange_Rate_Price_Total: 0, Exchange_Rate_Price: 1,
    // Audit / General
    Created_Date: new Date().toISOString().split('T')[0],
    Statsu: 'Active', Entry_Model: '', Proforma_Bank_Details: '', Currency: 'INR',
};

const QuotationDetails = () => {
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
        if (editId) updateRecord('quotationDetails', editId, form);
        else addRecord('quotationDetails', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Quotation Entry Details" description="Line level details for Quotations and POs" icon={Layers} />
            
            <DataTable 
                columns={columns} 
                data={state.quotationDetails || []} 
                onAdd={openAdd} 
                addLabel="Add Item Detail" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quotationDetails', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Line Item' : 'Add Line Item'} size="xl">
                <div className="p-6 space-y-6">
                    {/* Item & Document Reference */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Item & Reference" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Item ID" id="Item_ID" value={form.Item_ID} onChange={(e) => set('Item_ID', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} className="md:col-span-2" onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="HSN Code" id="HSN_Code" value={form.HSN_Code} onChange={(e) => set('HSN_Code', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Document Information" icon={FileText}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="PO No" id="PO_NO" value={form.PO_NO} onChange={(e) => set('PO_NO', e.target.value)} />
                                <FormField label="PR No" id="PR_NO" value={form.PR_NO} onChange={(e) => set('PR_NO', e.target.value)} />
                                <FormField label="Revision No" id="Revision_No" type="number" value={form.Revision_No} onChange={(e) => set('Revision_No', e.target.value)} />
                                <FormField label="Proforma Invoice No" id="Proforma_Invoice_No" value={form.Proforma_Invoice_No} onChange={(e) => set('Proforma_Invoice_No', e.target.value)} />
                                <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="Proforma Invoice Date" id="Proforma_Invoice_Date" type="date" value={form.Proforma_Invoice_Date} onChange={(e) => set('Proforma_Invoice_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Quantity & Pricing */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Quantity & Unit Pricing" icon={Calculator}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Quantity (Qty)" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="GRN Qty" id="Grn_Qty" type="number" value={form.Grn_Qty} onChange={(e) => set('Grn_Qty', e.target.value)} />
                                <FormField label="Unit Price" id="Unit_Price" type="number" value={form.Unit_Price} onChange={(e) => set('Unit_Price', e.target.value)} />
                                <FormField label="Discount %" id="Disc_Per" type="number" value={form.Disc_Per} onChange={(e) => set('Disc_Per', e.target.value)} />
                                <FormField label="Discount Amt" id="Desc_Amt" type="number" value={form.Desc_Amt} onChange={(e) => set('Desc_Amt', e.target.value)} />
                                <FormField label="Final Price" id="Final_Price" type="number" value={form.Final_Price} onChange={(e) => set('Final_Price', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Total & Taxes" icon={DollarSign}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Sub Total" id="Sub_total" type="number" value={form.Sub_total} onChange={(e) => set('Sub_total', e.target.value)} />
                                <FormField label="GST %" id="GST_Per" type="number" value={form.GST_Per} onChange={(e) => set('GST_Per', e.target.value)} />
                                <FormField label="GST Amount" id="GST_Amt" type="number" value={form.GST_Amt} onChange={(e) => set('GST_Amt', e.target.value)} />
                                <FormField label="Net Amount" id="Net_Amt" type="number" className="font-bold text-[#0097A7]" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
                                <FormField label="Integrated (IGST) %" id="IGST_Per" type="number" value={form.IGST_Per} onChange={(e) => set('IGST_Per', e.target.value)} />
                                <FormField label="IGST Amount" id="IGST_Amt" type="number" value={form.IGST_Amt} onChange={(e) => set('IGST_Amt', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Tax Breakdown (Extra Detailed Columns) */}
                    <FormContainer title="Extra Tax Info & Exchange Rate">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-xs font-medium">
                            <FormField label="CGST %" id="CGST_Per" type="number" value={form.CGST_Per} onChange={(e) => set('CGST_Per', e.target.value)} />
                            <FormField label="CGST Amt" id="CGST_Amt" type="number" value={form.CGST_Amt} onChange={(e) => set('CGST_Amt', e.target.value)} />
                            <FormField label="SGST %" id="SGST_Per" type="number" value={form.SGST_Per} onChange={(e) => set('SGST_Per', e.target.value)} />
                            <FormField label="SGST Amt" id="SGST_Amt" type="number" value={form.SGST_Amt} onChange={(e) => set('SGST_Amt', e.target.value)} />
                            <FormField label="Exchange Price" id="Exchange_Rate_Price" type="number" value={form.Exchange_Rate_Price} onChange={(e) => set('Exchange_Rate_Price', e.target.value)} />
                            <FormField label="Exchange Price Total" id="Exchange_Rate_Price_Total" type="number" className="md:col-span-2" value={form.Exchange_Rate_Price_Total} onChange={(e) => set('Exchange_Rate_Price_Total', e.target.value)} />
                        </div>
                    </FormContainer>

                    {/* General / Remarks */}
                    <FormContainer title="Additional Details" icon={Info}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                            <FormField label="Currency" id="Currency" value={form.Currency} onChange={(e) => set('Currency', e.target.value)} />
                            <FormField label="Status" id="Statsu" value={form.Statsu} onChange={(e) => set('Statsu', e.target.value)} />
                            <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                            <FormField label="Entry Model" id="Entry_Model" value={form.Entry_Model} onChange={(e) => set('Entry_Model', e.target.value)} />
                            <FormField label="Bank Details" id="Proforma_Bank_Details" className="md:col-span-2" value={form.Proforma_Bank_Details} onChange={(e) => set('Proforma_Bank_Details', e.target.value)} />
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

export default QuotationDetails;
