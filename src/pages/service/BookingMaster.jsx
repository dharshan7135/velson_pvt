import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { CalendarRange, Database, DollarSign, Shield, Info, Users } from 'lucide-react';

const columns = [
    { key: 'Booking_No', label: 'Booking No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Vehicle_Name', label: 'Vehicle' },
    { key: 'Booking_Date', label: 'Date' },
    { key: 'Booking_Status', label: 'Status' },
];

const emptyForm = {
    Row_Id: '', Booking_Id: '', Customer_Id: '', Vehicle_Model_No_Id: '', Vehicle_Name_Id: '', Vehicle_Id: '',
    Booking_No: '', Customer_Code: '', Serial_No: '', Vehicle_No: '', Vehicle_Model_No: '',
    Service_Bill_No: '', Vehicle_Serial_No: '', Service_job_No: '', LM_customer_code: '',
    Booking_Date: '', Service_Bill_date: '', financial_Year: '',
    Customer_Name: '', Model_Sub_Type_Name: '', Vehicle_Name: '', Remarks: '', System_Name: '',
    Vehicle_Count_No: 0, Model_Sub_Type_Id: '',
    Status: 'A', Booking_Status: 'Open', Viewing_Status: '', Conformation_status: '',
    Created_Date: new Date().toISOString().slice(0, 10), Created_By: '', Updated_By: '', Updated_Date: '',
    Conformation_ID: '',
};

const BookingMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('bookingMasters', editId, form); else addRecord('bookingMasters', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Booking Master" description="Manage service bookings for vehicles and customers" icon={CalendarRange} />
            <DataTable columns={columns} data={state.bookingMasters || []} onAdd={openAdd} addLabel="New Booking" onEdit={openEdit} onDelete={(r) => deleteRecord('bookingMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Booking' : 'New Booking'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Booking Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Booking No" id="Booking_No" value={form.Booking_No} onChange={(e) => set('Booking_No', e.target.value)} required />
                                <FormField label="Booking Date" id="Booking_Date" type="date" value={form.Booking_Date} onChange={(e) => set('Booking_Date', e.target.value)} required />
                                <FormField label="Financial Year" id="financial_Year" value={form.financial_Year} onChange={(e) => set('financial_Year', e.target.value)} />
                                <FormField label="Serial No" id="Serial_No" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} />
                                <FormField label="Service Bill No" id="Service_Bill_No" value={form.Service_Bill_No} onChange={(e) => set('Service_Bill_No', e.target.value)} />
                                <FormField label="Service Bill Date" id="Service_Bill_date" type="date" value={form.Service_Bill_date} onChange={(e) => set('Service_Bill_date', e.target.value)} />
                                <FormField label="Service Job No" id="Service_job_No" value={form.Service_job_No} onChange={(e) => set('Service_job_No', e.target.value)} />
                                <FormField label="Conformation ID" id="Conformation_ID" value={form.Conformation_ID} onChange={(e) => set('Conformation_ID', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Customer & Vehicle" icon={Users}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Customer Name" id="Customer_Name" className="md:col-span-2" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                                <FormField label="LM Customer Code" id="LM_customer_code" value={form.LM_customer_code} onChange={(e) => set('LM_customer_code', e.target.value)} />
                                <FormField label="Vehicle Name" id="Vehicle_Name" value={form.Vehicle_Name} onChange={(e) => set('Vehicle_Name', e.target.value)} />
                                <FormField label="Vehicle No" id="Vehicle_No" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} />
                                <FormField label="Vehicle Model No" id="Vehicle_Model_No" value={form.Vehicle_Model_No} onChange={(e) => set('Vehicle_Model_No', e.target.value)} />
                                <FormField label="Vehicle Serial No" id="Vehicle_Serial_No" value={form.Vehicle_Serial_No} onChange={(e) => set('Vehicle_Serial_No', e.target.value)} />
                                <FormField label="Model Sub Type" id="Model_Sub_Type_Name" value={form.Model_Sub_Type_Name} onChange={(e) => set('Model_Sub_Type_Name', e.target.value)} />
                                <FormField label="Vehicle Count" id="Vehicle_Count_No" type="number" value={form.Vehicle_Count_No} onChange={(e) => set('Vehicle_Count_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Status & Tracking" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            <FormField label="Booking Status" id="Booking_Status" value={form.Booking_Status} onChange={(e) => set('Booking_Status', e.target.value)} />
                            <FormField label="Viewing Status" id="Viewing_Status" value={form.Viewing_Status} onChange={(e) => set('Viewing_Status', e.target.value)} />
                            <FormField label="Conformation Status" id="Conformation_status" value={form.Conformation_status} onChange={(e) => set('Conformation_status', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" className="md:col-span-2" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            <FormField label="System Name" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                            <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Booking'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default BookingMaster;
