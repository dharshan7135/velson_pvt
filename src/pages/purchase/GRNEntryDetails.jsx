import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListChecks, Database, DollarSign, Package, Calendar, Shield, Barcode } from 'lucide-react';

const columns = [
    { key: 'GRN_No', label: 'GRN No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Net_Amt', label: 'Net Amt' },
    { key: 'QC_Status', label: 'QC' },
];

const emptyForm = {
    ID: '', Item_ID: '', Created_by: '', Tax_Id: '', CGST_TAX_ID: '', SGST_TAX_ID: '', IGST_TAX_ID: '', LEDGER_ID: '', Account_Id: '', GRN_Ref_Id: '', Po_Ref_Id: '',
    GRN_No: '', PO_NO: '', Item_Code: '', HSN_Code: '', Lot_No: '', Invoice_No: '', PR_NO: '', Item_Code_Old: '', Supplier_Part_No: '',
    GRN_Date: '', PO_Date: '', ETA_Date: '', Invoice_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Item_Name: '', Description: '', QC_Remarks: '', GRND_Doument_Name: '',
    Unit_Price: 0, Desc_Amt: 0, Final_Price: 0, Sub_total: 0,
    IGST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Amt: 0, SGST_Amt: 0, CGST_Amt: 0, GST_Per: 0, GST_Amt: 0, Net_Amt: 0,
    Before_D_Amt: 0, Tax_Per: 0, TAXABLE_AMT: 0, CurrencyD_Exchange_Rate: 0, Currency_Rate: 0, Currency_Unit_Price: 0, Disc_Per: 0,
    UOM: '', Order_Qty: 0, Qty: 0, QC_OK_Qty: 0, QC_Reject_Qty: 0, Grn_Qty: 0, Stock_Qty: 0,
    QC_Type: '', GRN_Inward_D_Type: '', Item_Category: '', BarcodeType_SM: '',
    Status: 'A', QC_Status: 'Pending', Posting_status: '',
    QC_Document: '', QC_Dept: '', QC_Inspected: 0, Barcode: '', Bill_Mode: '', Ref_Row_Id: '', CurrencyD: '', POD_Ref_Row_Id: '', QC_Location: '',
};

const GRNEntryDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('grnEntryDetails', editId, form); else addRecord('grnEntryDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="GRN Entry Details" description="GRN line items with QC inspection, barcode, and currency tracking" icon={ListChecks} />
            <DataTable columns={columns} data={state.grnEntryDetails || []} onAdd={openAdd} addLabel="Add GRN Line" onEdit={openEdit} onDelete={(r) => deleteRecord('grnEntryDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit GRN Line' : 'New GRN Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Item Reference" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} required />
                                <FormField label="PO No" id="PO_NO" value={form.PO_NO} onChange={(e) => set('PO_NO', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="HSN Code" id="HSN_Code" value={form.HSN_Code} onChange={(e) => set('HSN_Code', e.target.value)} />
                                <FormField label="Lot No" id="Lot_No" value={form.Lot_No} onChange={(e) => set('Lot_No', e.target.value)} />
                                <FormField label="Invoice No" id="Invoice_No" value={form.Invoice_No} onChange={(e) => set('Invoice_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantity & QC" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Order Qty" id="Order_Qty" type="number" value={form.Order_Qty} onChange={(e) => set('Order_Qty', e.target.value)} />
                                <FormField label="Received Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="QC OK Qty" id="QC_OK_Qty" type="number" value={form.QC_OK_Qty} onChange={(e) => set('QC_OK_Qty', e.target.value)} />
                                <FormField label="QC Reject Qty" id="QC_Reject_Qty" type="number" value={form.QC_Reject_Qty} onChange={(e) => set('QC_Reject_Qty', e.target.value)} />
                                <FormField label="Stock Qty" id="Stock_Qty" type="number" value={form.Stock_Qty} onChange={(e) => set('Stock_Qty', e.target.value)} />
                                <FormField label="QC Status" id="QC_Status" value={form.QC_Status} onChange={(e) => set('QC_Status', e.target.value)} />
                                <FormField label="QC Type" id="QC_Type" value={form.QC_Type} onChange={(e) => set('QC_Type', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Pricing & Tax" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Unit Price" id="Unit_Price" type="number" value={form.Unit_Price} onChange={(e) => set('Unit_Price', e.target.value)} />
                            <FormField label="Disc %" id="Disc_Per" type="number" value={form.Disc_Per} onChange={(e) => set('Disc_Per', e.target.value)} />
                            <FormField label="Final Price" id="Final_Price" type="number" value={form.Final_Price} onChange={(e) => set('Final_Price', e.target.value)} />
                            <FormField label="Sub Total" id="Sub_total" type="number" value={form.Sub_total} onChange={(e) => set('Sub_total', e.target.value)} />
                            <FormField label="GST %" id="GST_Per" type="number" value={form.GST_Per} onChange={(e) => set('GST_Per', e.target.value)} />
                            <FormField label="Taxable" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} />
                            <FormField label="Currency Rate" id="Currency_Rate" type="number" value={form.Currency_Rate} onChange={(e) => set('Currency_Rate', e.target.value)} />
                            <FormField label="Net Amt" id="Net_Amt" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Net_Amt} onChange={(e) => set('Net_Amt', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Tracking & Barcode" icon={Barcode}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                            <FormField label="Barcode Type" id="BarcodeType_SM" value={form.BarcodeType_SM} onChange={(e) => set('BarcodeType_SM', e.target.value)} />
                            <FormField label="Item Category" id="Item_Category" value={form.Item_Category} onChange={(e) => set('Item_Category', e.target.value)} />
                            <FormField label="QC Location" id="QC_Location" value={form.QC_Location} onChange={(e) => set('QC_Location', e.target.value)} />
                            <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                            <FormField label="QC Remarks" id="QC_Remarks" className="md:col-span-2" value={form.QC_Remarks} onChange={(e) => set('QC_Remarks', e.target.value)} />
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
export default GRNEntryDetails;
