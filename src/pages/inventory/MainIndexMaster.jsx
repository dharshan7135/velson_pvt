import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { LayoutList, Database, Calendar, Package } from 'lucide-react';
const columns = [{ key: 'Booking_Code', label: 'Booking' },{ key: 'Customer_Name', label: 'Customer' },{ key: 'Vehicle_Model_Name', label: 'Vehicle' },{ key: 'Model_No', label: 'Model' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    Row_Id: '', Customer_Id: '', Customer_Booking_id: '', Vehicle_Model_Id: '', Model_Type_Id: '', Model_No_Id: '', Booking_id: '',
    Booking_Code: '', Serial_No: '', Model_No: '', Service_job_No: '', Vehicle_Serial_No: '',
    Vehicle_Arrival_Date: '', Commprossor_Arrival_Date: '', Work_Completed_Date: '', Work_Commsing_Date: '', Work_Delivery_Date: '', Deleted_Date: '',
    Created_date: new Date().toISOString().slice(0, 10),
    Customer_Name: '', Vehicle_Model_Name: '', Model_Type_Name: '',
    No_of_Vehicle_mft_Qty: 0, Vehicle_Count_No: 0,
    Status: 'A', created_By: '', Deleted_By: '', Deleted_System: '', Created_System: '',
};
const MainIndexMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('mainIndexMasters', editId, form); else addRecord('mainIndexMasters', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Main Index Page Master" description="Vehicle booking index with manufacturing and delivery tracking" icon={LayoutList} />
            <DataTable columns={columns} data={state.mainIndexMasters || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('mainIndexMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Index Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Booking & Customer" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Booking Code" id="Booking_Code" value={form.Booking_Code} onChange={(e) => set('Booking_Code', e.target.value)} required />
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Serial No" id="Serial_No" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} />
                                <FormField label="Vehicle Serial No" id="Vehicle_Serial_No" value={form.Vehicle_Serial_No} onChange={(e) => set('Vehicle_Serial_No', e.target.value)} />
                                <FormField label="Service Job No" id="Service_job_No" value={form.Service_job_No} onChange={(e) => set('Service_job_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Vehicle & Model" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Vehicle Model" id="Vehicle_Model_Name" value={form.Vehicle_Model_Name} onChange={(e) => set('Vehicle_Model_Name', e.target.value)} />
                                <FormField label="Model No" id="Model_No" value={form.Model_No} onChange={(e) => set('Model_No', e.target.value)} required />
                                <FormField label="Model Type" id="Model_Type_Name" value={form.Model_Type_Name} onChange={(e) => set('Model_Type_Name', e.target.value)} />
                                <FormField label="MFT Qty" id="No_of_Vehicle_mft_Qty" type="number" value={form.No_of_Vehicle_mft_Qty} onChange={(e) => set('No_of_Vehicle_mft_Qty', e.target.value)} />
                                <FormField label="Vehicle Count" id="Vehicle_Count_No" type="number" value={form.Vehicle_Count_No} onChange={(e) => set('Vehicle_Count_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Dates" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Vehicle Arrival" id="Vehicle_Arrival_Date" type="date" value={form.Vehicle_Arrival_Date} onChange={(e) => set('Vehicle_Arrival_Date', e.target.value)} />
                            <FormField label="Compressor Arrival" id="Commprossor_Arrival_Date" type="date" value={form.Commprossor_Arrival_Date} onChange={(e) => set('Commprossor_Arrival_Date', e.target.value)} />
                            <FormField label="Work Commenced" id="Work_Commsing_Date" type="date" value={form.Work_Commsing_Date} onChange={(e) => set('Work_Commsing_Date', e.target.value)} />
                            <FormField label="Work Completed" id="Work_Completed_Date" type="date" value={form.Work_Completed_Date} onChange={(e) => set('Work_Completed_Date', e.target.value)} />
                            <FormField label="Delivery Date" id="Work_Delivery_Date" type="date" value={form.Work_Delivery_Date} onChange={(e) => set('Work_Delivery_Date', e.target.value)} />
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
export default MainIndexMaster;
