import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Receipt, Database, DollarSign, Users, Shield, Truck, MapPin } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'CUST_NAME', label: 'Customer' },
    { key: 'BILLDATE', label: 'Bill Date' },
    { key: 'BILL_AMT', label: 'Bill Amt' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    SA_ID: '', LEDGER_ID: '', LIABILITY_ID: '', COMPANY: '', CREATED_BY: '',
    Booking_Id: '', Tax_ID: '', Service_jobno_id: '',
    BILLNO: '', Order_No: '', Dc_NO: '', LR_NO: '',
    Service_Material_issue_No: '', Service_Material_issue_Code: '',
    Booking_Cus_Code: '', service_Bill_NO: '',
    BILLDATE: '', COLL_DATE: '', VOUCHER_DATE: '', Order_Date: '', Dc_Date: '', LR_Date: '',
    CUST_NAME: '', PHONE: '', STATE: '', STATECODE: '',
    DCUST_NAME: '', DPHONE: '', DSTATE: '', DSTATECODE: '', Remarks: '',
    LIABILITY_VALUE: 0, GSTNO: '', DGSTNO: '',
    TAX_GROSSAMT: 0, TOTAL_DISC: 0, TAX_YESNO: 'Yes', TAX_REVYES: 'No',
    TAXABLE_AMT: 0, CGST_AMT: 0, SGST_AMT: 0, IGST_AMT: 0,
    TOTAL_TAX: 0, TAX_AMT: 0, BILL_AMT: 0,
    CARTAGE_AMT: 0, SERVICE_AMT: 0, UNLOAD_AMT: 0, ADD_AMT: 0,
    TAX_TYPE: '', RATEGROUP_ID: '',
    service_Labour_Charge_Bill_No: '', service_Labour_Charge_Bill_Amt: 0,
    Material_Total_Amt: 0, Tax_Per: 0,
    ACCOUNT_ID: '', Stock_Reduce: '',
    DIS_AMT: 0, STATUS: 'A', DC_Status: '',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    BILL_MODE: '', COMMODITY: '',
    ADDR1: '', ADDR2: '', ADDR3: '', ADDR4: '', ADDR5: '',
    DADDR1: '', DADDR2: '', DADDR3: '', DADDR4: '', DADDR5: '',
    USERID: '', COLL_BANK: '', BRANCHID: '', TRANSPORT: '',
    Shop_ID: '', Delivery_Place: '', Round_Off: 0, Shift_ID: '',
    Entry_Model: '', Service_jobno: '',
};

const ServiceBillMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('serviceBillMasters', editId, form); else addRecord('serviceBillMasters', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Service Bill Master" description="Service billing with GST, customer and delivery details" icon={Receipt} />
            <DataTable columns={columns} data={state.serviceBillMasters || []} onAdd={openAdd} addLabel="New Bill" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceBillMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Service Bill' : 'New Service Bill'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Bill Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="SA ID (PK)" id="SA_ID" type="number" value={form.SA_ID} onChange={(e) => set('SA_ID', e.target.value)} required />
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} required />
                                <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
                                <FormField label="Order No" id="Order_No" value={form.Order_No} onChange={(e) => set('Order_No', e.target.value)} />
                                <FormField label="Service Bill No" id="service_Bill_NO" value={form.service_Bill_NO} onChange={(e) => set('service_Bill_NO', e.target.value)} />
                                <FormField label="Service Job No" id="Service_jobno" value={form.Service_jobno} onChange={(e) => set('Service_jobno', e.target.value)} />
                                <FormField label="Booking Customer Code" id="Booking_Cus_Code" value={form.Booking_Cus_Code} onChange={(e) => set('Booking_Cus_Code', e.target.value)} />
                                <FormField label="Entry Model" id="Entry_Model" value={form.Entry_Model} onChange={(e) => set('Entry_Model', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Customer Details" icon={Users}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Customer Name" id="CUST_NAME" className="md:col-span-2" value={form.CUST_NAME} onChange={(e) => set('CUST_NAME', e.target.value)} required />
                                <FormField label="Phone" id="PHONE" value={form.PHONE} onChange={(e) => set('PHONE', e.target.value)} />
                                <FormField label="GST No" id="GSTNO" value={form.GSTNO} onChange={(e) => set('GSTNO', e.target.value)} />
                                <FormField label="State" id="STATE" value={form.STATE} onChange={(e) => set('STATE', e.target.value)} />
                                <FormField label="State Code" id="STATECODE" value={form.STATECODE} onChange={(e) => set('STATECODE', e.target.value)} />
                                <FormField label="Address 1" id="ADDR1" className="md:col-span-2" value={form.ADDR1} onChange={(e) => set('ADDR1', e.target.value)} />
                                <FormField label="Address 2" id="ADDR2" className="md:col-span-2" value={form.ADDR2} onChange={(e) => set('ADDR2', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Delivery Customer" icon={MapPin}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Delivery Customer" id="DCUST_NAME" className="md:col-span-2" value={form.DCUST_NAME} onChange={(e) => set('DCUST_NAME', e.target.value)} />
                                <FormField label="Del Phone" id="DPHONE" value={form.DPHONE} onChange={(e) => set('DPHONE', e.target.value)} />
                                <FormField label="Del GST No" id="DGSTNO" value={form.DGSTNO} onChange={(e) => set('DGSTNO', e.target.value)} />
                                <FormField label="Del State" id="DSTATE" value={form.DSTATE} onChange={(e) => set('DSTATE', e.target.value)} />
                                <FormField label="Del State Code" id="DSTATECODE" value={form.DSTATECODE} onChange={(e) => set('DSTATECODE', e.target.value)} />
                                <FormField label="Del Address 1" id="DADDR1" className="md:col-span-2" value={form.DADDR1} onChange={(e) => set('DADDR1', e.target.value)} />
                                <FormField label="Del Address 2" id="DADDR2" className="md:col-span-2" value={form.DADDR2} onChange={(e) => set('DADDR2', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Dispatch" icon={Truck}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="DC No" id="Dc_NO" value={form.Dc_NO} onChange={(e) => set('Dc_NO', e.target.value)} />
                                <FormField label="DC Date" id="Dc_Date" value={form.Dc_Date} onChange={(e) => set('Dc_Date', e.target.value)} />
                                <FormField label="LR No" id="LR_NO" value={form.LR_NO} onChange={(e) => set('LR_NO', e.target.value)} />
                                <FormField label="LR Date" id="LR_Date" value={form.LR_Date} onChange={(e) => set('LR_Date', e.target.value)} />
                                <FormField label="Transport" id="TRANSPORT" value={form.TRANSPORT} onChange={(e) => set('TRANSPORT', e.target.value)} />
                                <FormField label="Delivery Place" id="Delivery_Place" value={form.Delivery_Place} onChange={(e) => set('Delivery_Place', e.target.value)} />
                                <FormField label="Material Issue No" id="Service_Material_issue_No" value={form.Service_Material_issue_No} onChange={(e) => set('Service_Material_issue_No', e.target.value)} />
                                <FormField label="Material Issue Code" id="Service_Material_issue_Code" value={form.Service_Material_issue_Code} onChange={(e) => set('Service_Material_issue_Code', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Financial Summary" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Gross Amt" id="TAX_GROSSAMT" type="number" value={form.TAX_GROSSAMT} onChange={(e) => set('TAX_GROSSAMT', e.target.value)} />
                            <FormField label="Total Disc" id="TOTAL_DISC" type="number" value={form.TOTAL_DISC} onChange={(e) => set('TOTAL_DISC', e.target.value)} />
                            <FormField label="Taxable Amt" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} />
                            <FormField label="Tax %" id="Tax_Per" type="number" value={form.Tax_Per} onChange={(e) => set('Tax_Per', e.target.value)} />
                            <FormField label="CGST" id="CGST_AMT" type="number" value={form.CGST_AMT} onChange={(e) => set('CGST_AMT', e.target.value)} />
                            <FormField label="SGST" id="SGST_AMT" type="number" value={form.SGST_AMT} onChange={(e) => set('SGST_AMT', e.target.value)} />
                            <FormField label="IGST" id="IGST_AMT" type="number" value={form.IGST_AMT} onChange={(e) => set('IGST_AMT', e.target.value)} />
                            <FormField label="Total Tax" id="TOTAL_TAX" type="number" value={form.TOTAL_TAX} onChange={(e) => set('TOTAL_TAX', e.target.value)} />
                            <FormField label="Service Amt" id="SERVICE_AMT" type="number" value={form.SERVICE_AMT} onChange={(e) => set('SERVICE_AMT', e.target.value)} />
                            <FormField label="Labour Bill No" id="service_Labour_Charge_Bill_No" value={form.service_Labour_Charge_Bill_No} onChange={(e) => set('service_Labour_Charge_Bill_No', e.target.value)} />
                            <FormField label="Labour Bill Amt" id="service_Labour_Charge_Bill_Amt" type="number" value={form.service_Labour_Charge_Bill_Amt} onChange={(e) => set('service_Labour_Charge_Bill_Amt', e.target.value)} />
                            <FormField label="Material Total" id="Material_Total_Amt" type="number" value={form.Material_Total_Amt} onChange={(e) => set('Material_Total_Amt', e.target.value)} />
                            <FormField label="Round Off" id="Round_Off" type="number" value={form.Round_Off} onChange={(e) => set('Round_Off', e.target.value)} />
                            <FormField label="Cartage" id="CARTAGE_AMT" type="number" value={form.CARTAGE_AMT} onChange={(e) => set('CARTAGE_AMT', e.target.value)} />
                            <FormField label="Add Amt" id="ADD_AMT" type="number" value={form.ADD_AMT} onChange={(e) => set('ADD_AMT', e.target.value)} />
                            <FormField label="Bill Amt" id="BILL_AMT" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.BILL_AMT} onChange={(e) => set('BILL_AMT', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} />
                            <FormField label="DC Status" id="DC_Status" value={form.DC_Status} onChange={(e) => set('DC_Status', e.target.value)} />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Bill'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ServiceBillMaster;
