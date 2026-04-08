import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Wrench, Database, DollarSign, Shield } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Labour_Charge', label: 'Labour Charge' },
    { key: 'Total_Amt', label: 'Total Amt' },
    { key: 'STATUS', label: 'Status' },
];

const emptyForm = {
    SA_ID: '', Booking_Id: '', LEDGER_ID: '', Item_Id: '', CREATED_BY: '', Service_jobno_id: '',
    Booking_Cus_Code: '', BILLNO: '', Item_Code: '',
    BILLDATE: '',
    Item_Name: '', Remarks: '',
    Labour_Charge: 0, Total_Amt: 0, BILL_AMT: 0,
    STATUS: 'A',
    CREATED_DATE: new Date().toISOString().slice(0, 10),
    USERID: '', Entry_Model: '', Service_jobno: '',
};

const ServiceBillLabourChargeDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('serviceBillLabourCharges', editId, form); else addRecord('serviceBillLabourCharges', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Service Bill Labour Charges" description="Labour charge details for service bills" icon={Wrench} />
            <DataTable columns={columns} data={state.serviceBillLabourCharges || []} onAdd={openAdd} addLabel="Add Labour Charge" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceBillLabourCharges', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Labour Charge' : 'New Labour Charge'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Bill & Item Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="SA ID (PK)" id="SA_ID" type="number" value={form.SA_ID} onChange={(e) => set('SA_ID', e.target.value)} required />
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Booking Customer Code" id="Booking_Cus_Code" value={form.Booking_Cus_Code} onChange={(e) => set('Booking_Cus_Code', e.target.value)} />
                                <FormField label="Service Job No" id="Service_jobno" value={form.Service_jobno} onChange={(e) => set('Service_jobno', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Charges & Status" icon={DollarSign}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Labour Charge" id="Labour_Charge" type="number" value={form.Labour_Charge} onChange={(e) => set('Labour_Charge', e.target.value)} required />
                                <FormField label="Total Amt" id="Total_Amt" type="number" value={form.Total_Amt} onChange={(e) => set('Total_Amt', e.target.value)} />
                                <FormField label="Bill Amt" id="BILL_AMT" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.BILL_AMT} onChange={(e) => set('BILL_AMT', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                                <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} />
                                <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} />
                                <FormField label="Entry Model" id="Entry_Model" value={form.Entry_Model} onChange={(e) => set('Entry_Model', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ServiceBillLabourChargeDetails;
