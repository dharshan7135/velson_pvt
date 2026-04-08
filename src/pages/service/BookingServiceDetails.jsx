import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Wrench, Database, Calendar, Shield, Info, Package } from 'lucide-react';

const columns = [
    { key: 'Booking_No', label: 'Booking No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Service_Date', label: 'Service Date' },
    { key: 'Service_Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Booking_Id: '', Customer_Id: '', Vehicle_Model_No_Id: '', Vehicle_Name_Id: '', Item_Id: '',
    Booking_No: '', Customer_Code: '', Serial_No: '', Vehicle_No: '', Vehicle_Model_No: '',
    Display_No: '', Service_Billed_No: '',
    Booking_Date: '', Service_Date: '', Deleted_Date: '', Service_Billed_date: '', financial_Year: '',
    Customer_Name: '', Model_Sub_Type_Name: '', Vehicle_Name: '', Item_Name: '',
    Problem_Description: '', Remarks: '', System_Name: '',
    Model_Sub_Type_Id: '',
    Status: 'A', Service_Status: 'Pending',
    Created_By: '', Created_Date: new Date().toISOString().slice(0, 10), service_updated_date: '',
    Services_By: '', Deleted_By: '', Deleted_System: '', Service_JobNo: '',
};

const BookingServiceDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('bookingServiceDetails', editId, form); else addRecord('bookingServiceDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Booking Service Details" description="Service details linked to vehicle bookings" icon={Wrench} />
            <DataTable columns={columns} data={state.bookingServiceDetails || []} onAdd={openAdd} addLabel="New Service Detail" onEdit={openEdit} onDelete={(r) => deleteRecord('bookingServiceDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Service Detail' : 'New Service Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Booking & Customer" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="ID (PK)" id="ID" type="number" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="Booking No" id="Booking_No" value={form.Booking_No} onChange={(e) => set('Booking_No', e.target.value)} required />
                                <FormField label="Booking Date" id="Booking_Date" type="date" value={form.Booking_Date} onChange={(e) => set('Booking_Date', e.target.value)} />
                                <FormField label="Customer Name" id="Customer_Name" className="md:col-span-2" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                                <FormField label="Serial No" id="Serial_No" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} />
                                <FormField label="Display No" id="Display_No" type="number" value={form.Display_No} onChange={(e) => set('Display_No', e.target.value)} />
                                <FormField label="Financial Year" id="financial_Year" value={form.financial_Year} onChange={(e) => set('financial_Year', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Vehicle & Item" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Vehicle Name" id="Vehicle_Name" value={form.Vehicle_Name} onChange={(e) => set('Vehicle_Name', e.target.value)} required />
                                <FormField label="Vehicle No" id="Vehicle_No" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} />
                                <FormField label="Vehicle Model No" id="Vehicle_Model_No" value={form.Vehicle_Model_No} onChange={(e) => set('Vehicle_Model_No', e.target.value)} />
                                <FormField label="Model Sub Type" id="Model_Sub_Type_Name" value={form.Model_Sub_Type_Name} onChange={(e) => set('Model_Sub_Type_Name', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                                <FormField label="Service Job No" id="Service_JobNo" value={form.Service_JobNo} onChange={(e) => set('Service_JobNo', e.target.value)} />
                                <FormField label="Service Billed No" id="Service_Billed_No" value={form.Service_Billed_No} onChange={(e) => set('Service_Billed_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Service Info" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Service Date" id="Service_Date" type="date" value={form.Service_Date} onChange={(e) => set('Service_Date', e.target.value)} />
                                <FormField label="Service Billed Date" id="Service_Billed_date" type="date" value={form.Service_Billed_date} onChange={(e) => set('Service_Billed_date', e.target.value)} />
                                <FormField label="Problem Description" id="Problem_Description" value={form.Problem_Description} onChange={(e) => set('Problem_Description', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                                <FormField label="Services By" id="Services_By" value={form.Services_By} onChange={(e) => set('Services_By', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Audit" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Service Status" id="Service_Status" value={form.Service_Status} onChange={(e) => set('Service_Status', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                                <FormField label="System Name" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                                <FormField label="Deleted By" id="Deleted_By" value={form.Deleted_By} onChange={(e) => set('Deleted_By', e.target.value)} />
                                <FormField label="Deleted Date" id="Deleted_Date" type="date" value={form.Deleted_Date} onChange={(e) => set('Deleted_Date', e.target.value)} />
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
export default BookingServiceDetails;
