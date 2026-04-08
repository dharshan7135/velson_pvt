import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileInput, Database, DollarSign, Package, Shield } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'Item_name', label: 'Item' },
    { key: 'Qty', label: 'Qty' },
    { key: 'NET_AMT', label: 'Net Amt' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    TRNSID: '', LEDGER_ID: '', LIABILITY_ID: '', Item_ID: '', SLEDGER_ID: '',
    TAX_ID: '', CGST_TAX_ID: '', SGST_TAX_ID: '', IGST_TAX_ID: '',
    COMPANY: '', CREATED_BY: '', Service_MItem_id: '', Service_jobno_id: '',
    BILLNO: '', Batch: '', DC_Invoice_No: '', Job_No: '', MI_RefNo: '',
    Booking_Code: '', Issue_No: '', D_service_Bill_NO: '',
    BILLDATE: '',
    Item_name: '', Service_MItem_Name: '',
    LIABILITY_VALUE: 0, NET_RATE: 0, PURCHASE_RATE: 0, RESALE_RATE: 0, SALE_RATE: 0,
    NETRATE: 0, TOT_AMT: 0, DISC_AMT: 0, TAXABLE_AMT: 0,
    TAX_YESNO: 'Yes', TAX_REVYES: 'No', TAX_TYPE: '',
    TAX_PER: 0, CGST_TAX: 0, SGST_TAX: 0, IGST_TAX: 0,
    CGST_TAX_AMT: 0, SGST_TAX_AMT: 0, IGST_TAX_AMT: 0,
    TOTAL_TAX: 0, NET_AMT: 0, Disc_Amt2: 0, Rateby: 0,
    Cost_Rate: 0, DISC_AMT3: 0, DISC_AMT4: 0, Labour_Charge: 0,
    ACCOUNT_ID: '', UNIT: '', Qty: 0, Unit_Qty: 0, Unit_Qty1: 0, UOM: '',
    DISC_TYPE: '', Vehicle_Type: '', Service_MItem_id_Order_Sno: '',
    STATUS: 'A', DC_Status: '',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    SALES_ID: '', BILL_MODE: '', COMMODITY: '', HSNCode: '', BAG: '',
    MRP: 0, CUS_FREE: 0, SOC_FREE: 0, DISC_PER: 0,
    USERID: '', BRANCHID: '', MfrDate: '', ExpiryDate: '',
    Shift_ID: '', Entry_Model: '', Barcode: '', Receiver: '', Service_jobno: '',
};

const TempServiceBillTrans = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('tempServiceBillTrans', editId, form); else addRecord('tempServiceBillTrans', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Temp Service Bill Transaction" description="Staging line items for service bills before finalization" icon={FileInput} />
            <DataTable columns={columns} data={state.tempServiceBillTrans || []} onAdd={openAdd} addLabel="Add Temp Line" onEdit={openEdit} onDelete={(r) => deleteRecord('tempServiceBillTrans', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Temp Transaction' : 'New Temp Transaction'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Bill & Item" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Trans ID (PK)" id="TRNSID" type="number" value={form.TRNSID} onChange={(e) => set('TRNSID', e.target.value)} required />
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                                <FormField label="Item Name" id="Item_name" className="md:col-span-2" value={form.Item_name} onChange={(e) => set('Item_name', e.target.value)} required />
                                <FormField label="HSN Code" id="HSNCode" value={form.HSNCode} onChange={(e) => set('HSNCode', e.target.value)} />
                                <FormField label="Batch" id="Batch" value={form.Batch} onChange={(e) => set('Batch', e.target.value)} />
                                <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                                <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
                                <FormField label="Service Material Item" id="Service_MItem_Name" value={form.Service_MItem_Name} onChange={(e) => set('Service_MItem_Name', e.target.value)} />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantity & Pricing" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Unit" id="UNIT" value={form.UNIT} onChange={(e) => set('UNIT', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="MRP" id="MRP" type="number" value={form.MRP} onChange={(e) => set('MRP', e.target.value)} />
                                <FormField label="Sale Rate" id="SALE_RATE" type="number" value={form.SALE_RATE} onChange={(e) => set('SALE_RATE', e.target.value)} />
                                <FormField label="Net Rate" id="NET_RATE" type="number" value={form.NET_RATE} onChange={(e) => set('NET_RATE', e.target.value)} />
                                <FormField label="Purchase Rate" id="PURCHASE_RATE" type="number" value={form.PURCHASE_RATE} onChange={(e) => set('PURCHASE_RATE', e.target.value)} />
                                <FormField label="Cost Rate" id="Cost_Rate" type="number" value={form.Cost_Rate} onChange={(e) => set('Cost_Rate', e.target.value)} />
                                <FormField label="Total Amt" id="TOT_AMT" type="number" value={form.TOT_AMT} onChange={(e) => set('TOT_AMT', e.target.value)} />
                                <FormField label="Disc Amt" id="DISC_AMT" type="number" value={form.DISC_AMT} onChange={(e) => set('DISC_AMT', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Tax & Net Amount" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Taxable Amt" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} />
                            <FormField label="Tax %" id="TAX_PER" type="number" value={form.TAX_PER} onChange={(e) => set('TAX_PER', e.target.value)} />
                            <FormField label="CGST Tax" id="CGST_TAX" type="number" value={form.CGST_TAX} onChange={(e) => set('CGST_TAX', e.target.value)} />
                            <FormField label="CGST Amt" id="CGST_TAX_AMT" type="number" value={form.CGST_TAX_AMT} onChange={(e) => set('CGST_TAX_AMT', e.target.value)} />
                            <FormField label="SGST Tax" id="SGST_TAX" type="number" value={form.SGST_TAX} onChange={(e) => set('SGST_TAX', e.target.value)} />
                            <FormField label="SGST Amt" id="SGST_TAX_AMT" type="number" value={form.SGST_TAX_AMT} onChange={(e) => set('SGST_TAX_AMT', e.target.value)} />
                            <FormField label="IGST Tax" id="IGST_TAX" type="number" value={form.IGST_TAX} onChange={(e) => set('IGST_TAX', e.target.value)} />
                            <FormField label="IGST Amt" id="IGST_TAX_AMT" type="number" value={form.IGST_TAX_AMT} onChange={(e) => set('IGST_TAX_AMT', e.target.value)} />
                            <FormField label="Total Tax" id="TOTAL_TAX" type="number" value={form.TOTAL_TAX} onChange={(e) => set('TOTAL_TAX', e.target.value)} />
                            <FormField label="Labour Charge" id="Labour_Charge" type="number" value={form.Labour_Charge} onChange={(e) => set('Labour_Charge', e.target.value)} />
                            <FormField label="Vehicle Type" id="Vehicle_Type" value={form.Vehicle_Type} onChange={(e) => set('Vehicle_Type', e.target.value)} />
                            <FormField label="Net Amt" id="NET_AMT" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.NET_AMT} onChange={(e) => set('NET_AMT', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Refs" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} />
                            <FormField label="DC Status" id="DC_Status" value={form.DC_Status} onChange={(e) => set('DC_Status', e.target.value)} />
                            <FormField label="DC Invoice No" id="DC_Invoice_No" value={form.DC_Invoice_No} onChange={(e) => set('DC_Invoice_No', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} />
                            <FormField label="Issue No" id="Issue_No" value={form.Issue_No} onChange={(e) => set('Issue_No', e.target.value)} />
                            <FormField label="MI Ref No" id="MI_RefNo" value={form.MI_RefNo} onChange={(e) => set('MI_RefNo', e.target.value)} />
                            <FormField label="Booking Code" id="Booking_Code" value={form.Booking_Code} onChange={(e) => set('Booking_Code', e.target.value)} />
                            <FormField label="Service Job No" id="Service_jobno" value={form.Service_jobno} onChange={(e) => set('Service_jobno', e.target.value)} />
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
export default TempServiceBillTrans;
