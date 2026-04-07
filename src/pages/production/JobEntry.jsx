import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Briefcase, Database, Calendar, Package, Shield } from 'lucide-react';
const columns = [{ key: 'JE_Job_No', label: 'Job No' },{ key: 'JE_Product_name', label: 'Product' },{ key: 'JE_Qty', label: 'Qty' },{ key: 'Job_Status', label: 'Job Status' },{ key: 'JE_Status', label: 'Status' }];
const emptyForm = {
    JE_ID: '', JE_Customer_ID: '', JE_Created_by: '', Vehicle_Type_Id: '', Item_Id: '',
    JE_Job_No: '', JE_Mold_Number: '', JE_Container_No: '', JE_Note: '', Dispatch_No: '', MR_No: '',
    JE_Target_Date: '', JE_Issue_Date: '', Plan_Date: '', JE_Apprival_Rejection_Date: '', Closed_Date: '', Dispatch_Date: '', Je_Cancel_date: '',
    JE_Created_Date: new Date().toISOString().slice(0, 10),
    JE_Product_name: '', Vehicle_Type_Name: '', Remarks: '',
    JE_Size: '', JE_Qty: 0, Priority: '', JE_Mold_Type: '',
    JE_Status: 'A', Complete_Status: '', Job_Status: '',
    JE_Customer: '', JE_Set: 0, JE_Rejection_Reason: '', JE_Apprival_Rejection_Person: '',
    Closed_By: '', Je_Cancel_by: '', Je_Cancel_Reason: '',
};
const JobEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobEntries', editId, form); else addRecord('jobEntries', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job Entry" description="Job card creation with customer, product, and scheduling" icon={Briefcase} />
            <DataTable columns={columns} data={state.jobEntries || []} onAdd={openAdd} addLabel="New Job" onEdit={openEdit} onDelete={(r) => deleteRecord('jobEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Job' : 'New Job Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Job Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Job No" id="JE_Job_No" value={form.JE_Job_No} onChange={(e) => set('JE_Job_No', e.target.value)} required />
                                <FormField label="Product Name" id="JE_Product_name" value={form.JE_Product_name} onChange={(e) => set('JE_Product_name', e.target.value)} required />
                                <FormField label="Customer" id="JE_Customer" value={form.JE_Customer} onChange={(e) => set('JE_Customer', e.target.value)} />
                                <FormField label="Vehicle Type" id="Vehicle_Type_Name" value={form.Vehicle_Type_Name} onChange={(e) => set('Vehicle_Type_Name', e.target.value)} />
                                <FormField label="Mold Number" id="JE_Mold_Number" value={form.JE_Mold_Number} onChange={(e) => set('JE_Mold_Number', e.target.value)} />
                                <FormField label="Mold Type" id="JE_Mold_Type" value={form.JE_Mold_Type} onChange={(e) => set('JE_Mold_Type', e.target.value)} />
                                <FormField label="Size" id="JE_Size" value={form.JE_Size} onChange={(e) => set('JE_Size', e.target.value)} />
                                <FormField label="Qty" id="JE_Qty" type="number" value={form.JE_Qty} onChange={(e) => set('JE_Qty', e.target.value)} required />
                            </div>
                        </FormContainer>
                        <FormContainer title="Dates & Schedule" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Issue Date" id="JE_Issue_Date" type="date" value={form.JE_Issue_Date} onChange={(e) => set('JE_Issue_Date', e.target.value)} />
                                <FormField label="Target Date" id="JE_Target_Date" type="date" value={form.JE_Target_Date} onChange={(e) => set('JE_Target_Date', e.target.value)} />
                                <FormField label="Plan Date" id="Plan_Date" type="date" value={form.Plan_Date} onChange={(e) => set('Plan_Date', e.target.value)} />
                                <FormField label="Dispatch Date" id="Dispatch_Date" type="date" value={form.Dispatch_Date} onChange={(e) => set('Dispatch_Date', e.target.value)} />
                                <FormField label="Dispatch No" id="Dispatch_No" value={form.Dispatch_No} onChange={(e) => set('Dispatch_No', e.target.value)} />
                                <FormField label="Priority" id="Priority" value={form.Priority} onChange={(e) => set('Priority', e.target.value)} />
                                <FormField label="Container No" id="JE_Container_No" value={form.JE_Container_No} onChange={(e) => set('JE_Container_No', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Status & Approval" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="JE_Status" value={form.JE_Status} onChange={(e) => set('JE_Status', e.target.value)} />
                            <FormField label="Job Status" id="Job_Status" value={form.Job_Status} onChange={(e) => set('Job_Status', e.target.value)} />
                            <FormField label="Complete Status" id="Complete_Status" value={form.Complete_Status} onChange={(e) => set('Complete_Status', e.target.value)} />
                            <FormField label="Created By" id="JE_Created_by" value={form.JE_Created_by} onChange={(e) => set('JE_Created_by', e.target.value)} />
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
export default JobEntry;
