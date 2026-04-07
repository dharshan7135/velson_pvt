import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Wrench } from 'lucide-react';
const columns = [{ key: 'JS_Material_Name', label: 'Material' },{ key: 'JS_Size', label: 'Size' },{ key: 'JS_Qty', label: 'Qty' },{ key: 'JS_Type', label: 'Type' },{ key: 'JS_Status', label: 'Status' }];
const emptyForm = {
    JS_ID: '', JS_Job_ID: '', JS_Material_ID: '',
    JS_Notes: '', JS_Material_Name: '', JS_Size: '', JS_Qty: 0, JS_Unit: '', JS_Type: '',
    JS_Status: 'A', JS_Approval_Rejection_Person: '', JS_Approval_Rejection_Date: '',
    JS_Created_by: '', JS_Created_Date: new Date().toISOString().slice(0, 10),
};
const JobSpareEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobSpareEntries', editId, form); else addRecord('jobSpareEntries', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job Spare Entry" description="Spare parts required for job execution" icon={Wrench} />
            <DataTable columns={columns} data={state.jobSpareEntries || []} onAdd={openAdd} addLabel="Add Spare" onEdit={openEdit} onDelete={(r) => deleteRecord('jobSpareEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Spare' : 'New Spare Entry'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Material Name" id="JS_Material_Name" value={form.JS_Material_Name} onChange={(e) => set('JS_Material_Name', e.target.value)} required />
                    <FormField label="Size" id="JS_Size" value={form.JS_Size} onChange={(e) => set('JS_Size', e.target.value)} />
                    <FormField label="Qty" id="JS_Qty" type="number" value={form.JS_Qty} onChange={(e) => set('JS_Qty', e.target.value)} required />
                    <FormField label="Unit" id="JS_Unit" value={form.JS_Unit} onChange={(e) => set('JS_Unit', e.target.value)} />
                    <FormField label="Type" id="JS_Type" value={form.JS_Type} onChange={(e) => set('JS_Type', e.target.value)} />
                    <FormField label="Notes" id="JS_Notes" value={form.JS_Notes} onChange={(e) => set('JS_Notes', e.target.value)} />
                    <FormField label="Status" id="JS_Status" value={form.JS_Status} onChange={(e) => set('JS_Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default JobSpareEntry;
