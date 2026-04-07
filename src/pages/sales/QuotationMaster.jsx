import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Landmark, User, Truck, DollarSign, Settings, Calendar, MapPin, Building2 } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'CUST_NAME', label: 'Customer' },
    { key: 'BILLDATE', label: 'Bill Date' },
    { key: 'BILL_AMT', label: 'Bill Amount' },
    { key: 'Quotation_Status', label: 'Status' },
];

const emptyForm = {
    // Primary & Reference
    SA_ID: '', LEDGER_ID: '', LIABILITY_ID: '', COMPANY: '', CREATED_BY: '', USERID: '', ACCOUNT_ID: '', RATEGROUP_ID: '', SHIFT_ID: '',
    // Document
    BILLNO: '', Order_No: '', Dc_NO: '', LR_NO: '', Contact_No: '', BILL_MODE: 'Credit', STATUS: 'A', Quotation_Status: 'Active',
    // Dates
    BILLDATE: '', COLL_DATE: '', VOUCHER_DATE: '', Order_Date: '', Dc_Date: '', LR_Date: '', CREATED_DATE: new Date().toISOString().slice(0, 10),
    // Billing Customer Info
    CUST_NAME: '', PHONE: '', GSTNO: '', STATE: '', STATECODE: '', ADDR1: '', ADDR2: '', ADDR3: '', ADDR4: '', ADDR5: '',
    // Delivery Destination Info
    DCUST_NAME: '', DPHONE: '', DGSTNO: '', DSTATE: '', DSTATECODE: '', DADDR1: '', DADDR2: '', DADDR3: '', DADDR4: '', DADDR5: '',
    Delivery_Place: '', Contact_Person: '', Remarks: '', TRANSPORT: '',
    // Financials
    LIABILITY_VALUE: 0, TAX_GROSSAMT: 0, TOTAL_DISC: 0, TAXABLE_AMT: 0, CGST_AMT: 0, SGST_AMT: 0, IGST_AMT: 0, TOTAL_TAX: 0,
    TAX_AMT: 0, BILL_AMT: 0, CARTAGE_AMT: 0, SERVICE_AMT: 0, UNLOAD_AMT: 0, ADD_AMT: 0, Round_Off: 0, DIS_AMT: 0,
    // Settings
    TAX_YESNO: 'Yes', TAX_REVYES: 'No', TAX_TYPE: '', COMMODITY: '', COLL_BANK: '', BRANCHID: '', SHOP_ID: '',
};

const QuotationMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const save = () => {
        if (editId) updateRecord('quotationMasters', editId, form);
        else addRecord('quotationMasters', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Quotation Master" description="Standardized header management for all quotations and bills" icon={Landmark} />
            
            <DataTable 
                columns={columns} 
                data={state.quotationMasters || []} 
                onAdd={openAdd} 
                addLabel="Add Master Record" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quotationMasters', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Quotation Master' : 'New Quotation Master'} size="full">
                <div className="p-6 space-y-6">
                    {/* Header & References */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Billing & Document Header" icon={Building2}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Order No" id="Order_No" value={form.Order_No} onChange={(e) => set('Order_No', e.target.value)} required />
                                <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                                <FormField label="Order Date" id="Order_Date" type="date" value={form.Order_Date} onChange={(e) => set('Order_Date', e.target.value)} />
                                <FormField label="Voucher Date" id="VOUCHER_DATE" type="date" value={form.VOUCHER_DATE} onChange={(e) => set('VOUCHER_DATE', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="External References" icon={Settings}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Ledger ID" id="LEDGER_ID" value={form.LEDGER_ID} onChange={(e) => set('LEDGER_ID', e.target.value)} />
                                <FormField label="Liability ID" id="LIABILITY_ID" value={form.LIABILITY_ID} onChange={(e) => set('LIABILITY_ID', e.target.value)} />
                                <FormField label="Account ID" id="ACCOUNT_ID" value={form.ACCOUNT_ID} onChange={(e) => set('ACCOUNT_ID', e.target.value)} />
                                <FormField label="Company ID" id="COMPANY" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                                <FormField label="UserID" id="USERID" value={form.USERID} onChange={(e) => set('USERID', e.target.value)} />
                                <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Customer Info Sections */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Billing Customer (Bill-to)" icon={User}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Customer Name" id="CUST_NAME" value={form.CUST_NAME} onChange={(e) => set('CUST_NAME', e.target.value)} required />
                                <FormField label="Phone" id="PHONE" value={form.PHONE} onChange={(e) => set('PHONE', e.target.value)} required />
                                <FormField label="GST No" id="GSTNO" value={form.GSTNO} onChange={(e) => set('GSTNO', e.target.value)} />
                                <FormField label="State" id="STATE" value={form.STATE} onChange={(e) => set('STATE', e.target.value)} required />
                                <FormField label="State Code" id="STATECODE" value={form.STATECODE} onChange={(e) => set('STATECODE', e.target.value)} />
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Address Lines</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <input className="form-input" placeholder="Line 1" value={form.ADDR1} onChange={(e) => set('ADDR1', e.target.value)} />
                                        <input className="form-input" placeholder="Line 2" value={form.ADDR2} onChange={(e) => set('ADDR2', e.target.value)} />
                                        <input className="form-input" placeholder="Line 3" value={form.ADDR3} onChange={(e) => set('ADDR3', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </FormContainer>

                        <FormContainer title="Delivery Details (Ship-to)" icon={MapPin}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Delivery Name" id="DCUST_NAME" value={form.DCUST_NAME} onChange={(e) => set('DCUST_NAME', e.target.value)} required />
                                <FormField label="Delivery Phone" id="DPHONE" value={form.DPHONE} onChange={(e) => set('DPHONE', e.target.value)} required />
                                <FormField label="Delivery GST" id="DGSTNO" value={form.DGSTNO} onChange={(e) => set('DGSTNO', e.target.value)} />
                                <FormField label="Delivery State" id="DSTATE" value={form.DSTATE} onChange={(e) => set('DSTATE', e.target.value)} />
                                <FormField label="Place of Delivery" id="Delivery_Place" value={form.Delivery_Place} onChange={(e) => set('Delivery_Place', e.target.value)} />
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">D-Address Lines</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <input className="form-input" placeholder="Line 1" value={form.DADDR1} onChange={(e) => set('DADDR1', e.target.value)} />
                                        <input className="form-input" placeholder="Line 2" value={form.DADDR2} onChange={(e) => set('DADDR2', e.target.value)} />
                                        <input className="form-input" placeholder="Line 3" value={form.DADDR3} onChange={(e) => set('DADDR3', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </FormContainer>
                    </div>

                    {/* Logistics & Dates */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Shipping & Logistics" icon={Truck}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Transport" id="TRANSPORT" value={form.TRANSPORT} onChange={(e) => set('TRANSPORT', e.target.value)} required />
                                <FormField label="LR NO" id="LR_NO" value={form.LR_NO} onChange={(e) => set('LR_NO', e.target.value)} />
                                <FormField label="LR Date" id="LR_Date" value={form.LR_Date} onChange={(e) => set('LR_Date', e.target.value)} />
                                <FormField label="DC NO" id="Dc_NO" value={form.Dc_NO} onChange={(e) => set('Dc_NO', e.target.value)} />
                                <FormField label="DC Date" id="Dc_Date" value={form.Dc_Date} onChange={(e) => set('Dc_Date', e.target.value)} />
                                <FormField label="Contact Person" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Status & Audit" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Coll Date" id="COLL_DATE" type="date" value={form.COLL_DATE} onChange={(e) => set('COLL_DATE', e.target.value)} />
                                <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                                <FormField label="Quotation Status" id="Quotation_Status" value={form.Quotation_Status} onChange={(e) => set('Quotation_Status', e.target.value)} />
                                <FormField label="Form Status" id="STATUS" value={form.STATUS} maxLength={10} onChange={(e) => set('STATUS', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" className="md:col-span-2" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Financial Summary */}
                    <FormContainer title="Bill Financial Summary" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Gross Amount" id="TAX_GROSSAMT" type="number" value={form.TAX_GROSSAMT} onChange={(e) => set('TAX_GROSSAMT', e.target.value)} required />
                            <FormField label="Discount Amt" id="DIS_AMT" type="number" value={form.DIS_AMT} onChange={(e) => set('DIS_AMT', e.target.value)} />
                            <FormField label="Total Disc" id="TOTAL_DISC" type="number" value={form.TOTAL_DISC} onChange={(e) => set('TOTAL_DISC', e.target.value)} />
                            <FormField label="Taxable Amt" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} required />
                            
                            <FormField label="CGST Amt" id="CGST_AMT" type="number" value={form.CGST_AMT} onChange={(e) => set('CGST_AMT', e.target.value)} required />
                            <FormField label="SGST Amt" id="SGST_AMT" type="number" value={form.SGST_AMT} onChange={(e) => set('SGST_AMT', e.target.value)} required />
                            <FormField label="IGST Amt" id="IGST_AMT" type="number" value={form.IGST_AMT} onChange={(e) => set('IGST_AMT', e.target.value)} required />
                            <FormField label="Total Tax" id="TOTAL_TAX" type="number" value={form.TOTAL_TAX} onChange={(e) => set('TOTAL_TAX', e.target.value)} required />

                            <FormField label="Cartage" id="CARTAGE_AMT" type="number" value={form.CARTAGE_AMT} onChange={(e) => set('CARTAGE_AMT', e.target.value)} />
                            <FormField label="Unload Amt" id="UNLOAD_AMT" type="number" value={form.UNLOAD_AMT} onChange={(e) => set('UNLOAD_AMT', e.target.value)} />
                            <FormField label="Round Off" id="Round_Off" type="number" value={form.Round_Off} onChange={(e) => set('Round_Off', e.target.value)} required />
                            <FormField label="Net Bill Amt" id="BILL_AMT" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.BILL_AMT} onChange={(e) => set('BILL_AMT', e.target.value)} required />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update' : 'Save Header'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuotationMaster;
