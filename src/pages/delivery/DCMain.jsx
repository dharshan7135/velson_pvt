import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Truck, Database, DollarSign } from 'lucide-react';
const columns = [{ key: 'DC_Date', label: 'Date' },{ key: 'Customer_Name', label: 'Customer' },{ key: 'DC_Type', label: 'Type' },{ key: 'Total_Amount', label: 'Amount' },{ key: 'DC_Status', label: 'Status' }];
const emptyForm = {
    DC_Id: '', Customer_Id: '', Created_by: '',
    Contact_No: '', Vehicle_No: '', DC_Type: '', Despatch_Through: '', Entry_System: '',
    DC_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Customer_Name: '', Customer_Address: '', Contact_Person: '', Driver_Name: '', Terms_of_Delivery: '',
    GST_No: '', Total_qty: 0, Total_Amount: 0, DC_Status: '', Status: 'A',
};
const DCMain = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('dcMains', editId, form); else addRecord('dcMains', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="DC Main" description="Dispatch/work order challan with customer and delivery" icon={Truck} />
            <DataTable columns={columns} data={state.dcMains || []} onAdd={openAdd} addLabel="New DC" onEdit={openEdit} onDelete={(r) => deleteRecord('dcMains', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit DC' : 'New DC'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Customer & Delivery" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                            <FormField label="Customer Address" id="Customer_Address" value={form.Customer_Address} onChange={(e) => set('Customer_Address', e.target.value)} />
                            <FormField label="Contact Person" id="Contact_Person" value={form.Contact_Person} onChange={(e) => set('Contact_Person', e.target.value)} />
                            <FormField label="Contact No" id="Contact_No" value={form.Contact_No} onChange={(e) => set('Contact_No', e.target.value)} />
                            <FormField label="GST No" id="GST_No" value={form.GST_No} onChange={(e) => set('GST_No', e.target.value)} />
                            <FormField label="DC Date" id="DC_Date" type="date" value={form.DC_Date} onChange={(e) => set('DC_Date', e.target.value)} />
                            <FormField label="DC Type" id="DC_Type" value={form.DC_Type} onChange={(e) => set('DC_Type', e.target.value)} />
                            <FormField label="Driver" id="Driver_Name" value={form.Driver_Name} onChange={(e) => set('Driver_Name', e.target.value)} />
                            <FormField label="Vehicle No" id="Vehicle_No" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} />
                            <FormField label="Despatch Through" id="Despatch_Through" value={form.Despatch_Through} onChange={(e) => set('Despatch_Through', e.target.value)} />
                            <FormField label="Total Qty" id="Total_qty" type="number" value={form.Total_qty} onChange={(e) => set('Total_qty', e.target.value)} />
                            <FormField label="Total Amount" id="Total_Amount" type="number" value={form.Total_Amount} onChange={(e) => set('Total_Amount', e.target.value)} />
                            <FormField label="DC Status" id="DC_Status" value={form.DC_Status} onChange={(e) => set('DC_Status', e.target.value)} />
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default DCMain;
