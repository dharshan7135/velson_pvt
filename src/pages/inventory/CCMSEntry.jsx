import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { MessageSquareWarning, Database, User, Calendar, Shield, FileText } from 'lucide-react';

const columns = [
    { key: 'CCMC_No', label: 'CCMS No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Complaint_Type_Name', label: 'Complaint' },
    { key: 'Complaint_Status', label: 'Status' },
    { key: 'Approval_Status', label: 'Approval' },
];

const emptyForm = {
    Row_Id: '', Customer_id: '', Booking_id: '', Complaint_Type_id: '', Service_Type_Id: '', Model_id: '',
    CCMC_No: '', Booking_Code: '', Serial_No: '', Mobile_No: '', Alternate_No: '',
    Complainted_Date: '', Site_Atten_Date: '', Final_Date: '', Work_Completed_Date: '', Complaint_Closed_Date: '',
    Created_Date: new Date().toISOString().slice(0, 10), updated_date: '',
    Customer_Name: '', Complainted_Name: '', Model_Name: '', Site_Address: '', Email_id: '',
    Site_Attender_Name: '', System_Name: '', Complaint_Type_Name: '', Service_Type_Name: '', Designation: '',
    Complaint_Status: 'O', Approval_Status: 'Pending', Approval_Rejected_Person: '', Approval_Rejected_date: '', Entry_Status: '',
    Image1: '', Image2: '', Image3: '', Image4: '', Image5: '',
    Created_By: '', updated_By: '', updated_step2: '', updated_step3: '', updated_step4: '', updated_step5: '',
    Nature_Of_Complaint: '', Action_Through: '', Action_Taken: '', Avoid_Same_Complaint: '', Customer_Feed_Back: '',
    whatapp_Location: '', Rejected_Reason: '',
};

const CCMSEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('ccmsEntries', editId, form); else addRecord('ccmsEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="CCMS Entry" description="Customer Complaint Management System with multi-step resolution" icon={MessageSquareWarning} />
            <DataTable columns={columns} data={state.ccmsEntries || []} onAdd={openAdd} addLabel="New Complaint" onEdit={openEdit} onDelete={(r) => deleteRecord('ccmsEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Complaint' : 'New CCMS Entry'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Complaint Details" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="CCMS No" id="CCMC_No" value={form.CCMC_No} onChange={(e) => set('CCMC_No', e.target.value)} required />
                                <FormField label="Booking Code" id="Booking_Code" value={form.Booking_Code} onChange={(e) => set('Booking_Code', e.target.value)} required />
                                <FormField label="Complaint Type" id="Complaint_Type_Name" value={form.Complaint_Type_Name} onChange={(e) => set('Complaint_Type_Name', e.target.value)} />
                                <FormField label="Service Type" id="Service_Type_Name" value={form.Service_Type_Name} onChange={(e) => set('Service_Type_Name', e.target.value)} />
                                <FormField label="Model Name" id="Model_Name" value={form.Model_Name} onChange={(e) => set('Model_Name', e.target.value)} />
                                <FormField label="Serial No" id="Serial_No" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} />
                                <FormField label="Complaint Date" id="Complainted_Date" type="date" value={form.Complainted_Date} onChange={(e) => set('Complainted_Date', e.target.value)} />
                                <FormField label="Complained By" id="Complainted_Name" value={form.Complainted_Name} onChange={(e) => set('Complainted_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Customer Info" icon={User}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Designation" id="Designation" value={form.Designation} onChange={(e) => set('Designation', e.target.value)} />
                                <FormField label="Mobile" id="Mobile_No" value={form.Mobile_No} onChange={(e) => set('Mobile_No', e.target.value)} />
                                <FormField label="Alternate No" id="Alternate_No" value={form.Alternate_No} onChange={(e) => set('Alternate_No', e.target.value)} />
                                <FormField label="Email" id="Email_id" value={form.Email_id} onChange={(e) => set('Email_id', e.target.value)} />
                                <FormField label="WhatsApp Location" id="whatapp_Location" value={form.whatapp_Location} onChange={(e) => set('whatapp_Location', e.target.value)} />
                                <FormField label="Site Address" id="Site_Address" className="md:col-span-2" value={form.Site_Address} onChange={(e) => set('Site_Address', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Resolution" icon={FileText}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Nature of Complaint" id="Nature_Of_Complaint" value={form.Nature_Of_Complaint} onChange={(e) => set('Nature_Of_Complaint', e.target.value)} />
                                <FormField label="Action Through" id="Action_Through" value={form.Action_Through} onChange={(e) => set('Action_Through', e.target.value)} />
                                <FormField label="Action Taken" id="Action_Taken" value={form.Action_Taken} onChange={(e) => set('Action_Taken', e.target.value)} />
                                <FormField label="Avoid Same Complaint" id="Avoid_Same_Complaint" value={form.Avoid_Same_Complaint} onChange={(e) => set('Avoid_Same_Complaint', e.target.value)} />
                                <FormField label="Customer Feedback" id="Customer_Feed_Back" value={form.Customer_Feed_Back} onChange={(e) => set('Customer_Feed_Back', e.target.value)} />
                                <FormField label="Site Attender" id="Site_Attender_Name" value={form.Site_Attender_Name} onChange={(e) => set('Site_Attender_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Dates" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Complaint Status" id="Complaint_Status" value={form.Complaint_Status} onChange={(e) => set('Complaint_Status', e.target.value)} />
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                                <FormField label="Entry Status" id="Entry_Status" value={form.Entry_Status} onChange={(e) => set('Entry_Status', e.target.value)} />
                                <FormField label="Rejected Reason" id="Rejected_Reason" value={form.Rejected_Reason} onChange={(e) => set('Rejected_Reason', e.target.value)} />
                                <FormField label="Site Attend Date" id="Site_Atten_Date" type="date" value={form.Site_Atten_Date} onChange={(e) => set('Site_Atten_Date', e.target.value)} />
                                <FormField label="Work Completed" id="Work_Completed_Date" type="date" value={form.Work_Completed_Date} onChange={(e) => set('Work_Completed_Date', e.target.value)} />
                                <FormField label="Complaint Closed" id="Complaint_Closed_Date" type="date" value={form.Complaint_Closed_Date} onChange={(e) => set('Complaint_Closed_Date', e.target.value)} />
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
export default CCMSEntry;
