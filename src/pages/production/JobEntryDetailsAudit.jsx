import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileSearch, Database, Package } from 'lucide-react';
const columns = [{ key: 'JED_Part_No', label: 'Part No' },{ key: 'JED_Qty', label: 'Qty' },{ key: 'JED_Process_Status', label: 'Process' },{ key: 'JED_Statsu', label: 'Status' }];
const emptyForm = {
    JED_ID: '', JED_Job_ID: '', JED_Part_ID: '',
    JED_Part_No: '', JED_Notes: '', GC_No: '',
    JED_Deleted_Date: '', JED_UPDATE_DATE: '', Raw_Material_Entry_Date: '',
    JED_Created_Date: new Date().toISOString().slice(0, 10), JED_Created_by: '', JED_Modified_Date: '',
    JED_Qty: 0, JED_Weight: 0, JED_Unit: '', Cutting_Size: '', Request_Qty: 0, Raw_Material_Qty: 0, Approval_Qty: 0,
    JED_Approval_Rejection_Person: '', JED_Approval_Rejection_Date: '', JED_Process_Status: '',
    JED_Material: '', JED_Dimension: '', JED_Statsu: 'A', JED_Barcode: '',
    Raw_Material_Wt: 0, Heat_TB_Wt: 0, Material_Specification: '', No_Of_Drawing_Sheet: '', Raw_Material_Entry_By: '',
};
const JobEntryDetailsAudit = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobEntryDetailsAudit', editId, form); else addRecord('jobEntryDetailsAudit', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job Details Audit" description="Audit trail for job entry detail changes and deletions" icon={FileSearch} />
            <DataTable columns={columns} data={state.jobEntryDetailsAudit || []} onAdd={openAdd} addLabel="Add Record" onEdit={openEdit} onDelete={(r) => deleteRecord('jobEntryDetailsAudit', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Audit Record'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Part & Job" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Part No" id="JED_Part_No" value={form.JED_Part_No} onChange={(e) => set('JED_Part_No', e.target.value)} />
                                <FormField label="Material" id="JED_Material" value={form.JED_Material} onChange={(e) => set('JED_Material', e.target.value)} />
                                <FormField label="GC No" id="GC_No" value={form.GC_No} onChange={(e) => set('GC_No', e.target.value)} />
                                <FormField label="Notes" id="JED_Notes" value={form.JED_Notes} onChange={(e) => set('JED_Notes', e.target.value)} />
                                <FormField label="Deleted Date" id="JED_Deleted_Date" type="date" value={form.JED_Deleted_Date} onChange={(e) => set('JED_Deleted_Date', e.target.value)} />
                                <FormField label="Update Date" id="JED_UPDATE_DATE" type="date" value={form.JED_UPDATE_DATE} onChange={(e) => set('JED_UPDATE_DATE', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantity & Approval" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Qty" id="JED_Qty" type="number" value={form.JED_Qty} onChange={(e) => set('JED_Qty', e.target.value)} />
                                <FormField label="Weight" id="JED_Weight" type="number" value={form.JED_Weight} onChange={(e) => set('JED_Weight', e.target.value)} />
                                <FormField label="Unit" id="JED_Unit" value={form.JED_Unit} onChange={(e) => set('JED_Unit', e.target.value)} />
                                <FormField label="Request Qty" id="Request_Qty" type="number" value={form.Request_Qty} onChange={(e) => set('Request_Qty', e.target.value)} />
                                <FormField label="Process Status" id="JED_Process_Status" value={form.JED_Process_Status} onChange={(e) => set('JED_Process_Status', e.target.value)} />
                                <FormField label="Status" id="JED_Statsu" value={form.JED_Statsu} onChange={(e) => set('JED_Statsu', e.target.value)} />
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
export default JobEntryDetailsAudit;
