import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { AlertTriangle, Database, Shield, Wrench } from 'lucide-react';
const columns = [{ key: 'BE_MachineName', label: 'Machine' },{ key: 'BE_ProbemDescription', label: 'Problem' },{ key: 'BE_Priority', label: 'Priority' },{ key: 'BEC_Status', label: 'Resolution' },{ key: 'BE_Status', label: 'Status' }];
const emptyForm = {
    BE_ID: '', BE_MachineID: '', BE_Job_ID: '', BE_Process_Stage: '',
    BE_Date: '', BE_CreatedDate: new Date().toISOString().slice(0, 10), BEC_Sloved_Date: '', BEC_Verify_Datetime: '',
    BE_MachineName: '', BE_Item_Name: '', BE_ProbemDescription: '', BEC_REmarks: '', BEC_Approve_Reject_Remark: '',
    BE_Priority: '', BE_Location: '', BE_Mode_Of_Report: '', BE_ReportedBy: '', BE_User: '',
    BE_Status: 'A', BEC_Status: 'Open',
    BEC_Probleam_Des: '', BEC_Action_Taken: '', BEC_ProbleamSloved_by: '', BEC_VerifyBy: '',
};
const BreakdownEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('breakdownEntries', editId, form); else addRecord('breakdownEntries', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Breakdown Entry" description="Machine breakdown log with resolution and verification" icon={AlertTriangle} />
            <DataTable columns={columns} data={state.breakdownEntries || []} onAdd={openAdd} addLabel="Log Breakdown" onEdit={openEdit} onDelete={(r) => deleteRecord('breakdownEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Breakdown' : 'New Breakdown Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Breakdown Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Machine Name" id="BE_MachineName" value={form.BE_MachineName} onChange={(e) => set('BE_MachineName', e.target.value)} required />
                                <FormField label="Problem Description" id="BE_ProbemDescription" value={form.BE_ProbemDescription} onChange={(e) => set('BE_ProbemDescription', e.target.value)} required />
                                <FormField label="Priority" id="BE_Priority" value={form.BE_Priority} onChange={(e) => set('BE_Priority', e.target.value)} />
                                <FormField label="Location" id="BE_Location" value={form.BE_Location} onChange={(e) => set('BE_Location', e.target.value)} />
                                <FormField label="Date" id="BE_Date" type="date" value={form.BE_Date} onChange={(e) => set('BE_Date', e.target.value)} required />
                                <FormField label="Mode of Report" id="BE_Mode_Of_Report" value={form.BE_Mode_Of_Report} onChange={(e) => set('BE_Mode_Of_Report', e.target.value)} />
                                <FormField label="Reported By" id="BE_ReportedBy" value={form.BE_ReportedBy} onChange={(e) => set('BE_ReportedBy', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Resolution" icon={Wrench}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Problem Analysis" id="BEC_Probleam_Des" value={form.BEC_Probleam_Des} onChange={(e) => set('BEC_Probleam_Des', e.target.value)} />
                                <FormField label="Action Taken" id="BEC_Action_Taken" value={form.BEC_Action_Taken} onChange={(e) => set('BEC_Action_Taken', e.target.value)} />
                                <FormField label="Solved By" id="BEC_ProbleamSloved_by" value={form.BEC_ProbleamSloved_by} onChange={(e) => set('BEC_ProbleamSloved_by', e.target.value)} />
                                <FormField label="Solved Date" id="BEC_Sloved_Date" type="date" value={form.BEC_Sloved_Date} onChange={(e) => set('BEC_Sloved_Date', e.target.value)} />
                                <FormField label="Verified By" id="BEC_VerifyBy" value={form.BEC_VerifyBy} onChange={(e) => set('BEC_VerifyBy', e.target.value)} />
                                <FormField label="Remarks" id="BEC_REmarks" value={form.BEC_REmarks} onChange={(e) => set('BEC_REmarks', e.target.value)} />
                                <FormField label="Resolution Status" id="BEC_Status" value={form.BEC_Status} onChange={(e) => set('BEC_Status', e.target.value)} />
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
export default BreakdownEntry;
