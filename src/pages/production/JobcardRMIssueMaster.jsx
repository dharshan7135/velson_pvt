import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Package } from 'lucide-react';
const columns = [{ key: 'Job_No', label: 'Job No' },{ key: 'Barcode', label: 'Barcode' },{ key: 'Status', label: 'Status' }];
const emptyForm = { ID: '', Job_ID: '', Job_No: '', System_Name: '', Status: 'A', created_By: '', created_Date: new Date().toISOString().slice(0, 10), Barcode: '' };
const JobcardRMIssueMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobcardRMIssueMaster', editId, form); else addRecord('jobcardRMIssueMaster', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="RM Issue Master" description="Raw material issue master linked to job cards" icon={Package} />
            <DataTable columns={columns} data={state.jobcardRMIssueMaster || []} onAdd={openAdd} addLabel="New Issue" onEdit={openEdit} onDelete={(r) => deleteRecord('jobcardRMIssueMaster', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New RM Issue'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} required />
                    <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                    <FormField label="System" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                    <FormField label="Created By" id="created_By" value={form.created_By} onChange={(e) => set('created_By', e.target.value)} />
                    <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default JobcardRMIssueMaster;
