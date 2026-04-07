import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Upload } from 'lucide-react';
const columns = [{ key: 'Job_No', label: 'Job No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Drawing_No', label: 'Drawing' },{ key: 'File_Name', label: 'File' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    ID: '', Job_Id: '', Item_Id: '',
    Job_No: '', Drawing_No: '', Revision_No: '', barcode: '',
    Job_Date: '', Deleted_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    File_Name: '', Item_Name: '', Industry_Type: '',
    Status: 'A', File_Location: '', Image: '', Created_By: '', Deleted_By: '',
};
const JobFileUploaded = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobFileUploads', editId, form); else addRecord('jobFileUploads', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job File Upload" description="Drawing and document attachments for job cards" icon={Upload} />
            <DataTable columns={columns} data={state.jobFileUploads || []} onAdd={openAdd} addLabel="Upload File" onEdit={openEdit} onDelete={(r) => deleteRecord('jobFileUploads', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'Upload Job File'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} required />
                    <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                    <FormField label="Drawing No" id="Drawing_No" value={form.Drawing_No} onChange={(e) => set('Drawing_No', e.target.value)} />
                    <FormField label="Revision No" id="Revision_No" value={form.Revision_No} onChange={(e) => set('Revision_No', e.target.value)} />
                    <FormField label="File Name" id="File_Name" value={form.File_Name} onChange={(e) => set('File_Name', e.target.value)} />
                    <FormField label="File Location" id="File_Location" value={form.File_Location} onChange={(e) => set('File_Location', e.target.value)} />
                    <FormField label="Industry Type" id="Industry_Type" value={form.Industry_Type} onChange={(e) => set('Industry_Type', e.target.value)} />
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
export default JobFileUploaded;
