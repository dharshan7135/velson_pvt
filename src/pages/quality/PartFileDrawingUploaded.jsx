import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Upload, Database, Shield } from 'lucide-react';

const columns = [
    { key: 'Part_Name', label: 'Part Name' },
    { key: 'Group_Name', label: 'Group' },
    { key: 'File_Name', label: 'File Name' },
    { key: 'Created_By', label: 'Created By' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    Row_Id: '',
    Upload_Date: '', Deleted_Date: '',
    Group_Name: '', Part_Name: '', File_Name: '',
    Group_Id: '',
    Status: 'A',
    File_Location: '', Image: '',
    Created_By: '', Created_Date: new Date().toISOString().slice(0, 10),
    Part_Id: '', Deleted_By: '',
};

const PartFileDrawingUploaded = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('partFileDrawings', editId, form); else addRecord('partFileDrawings', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Part File Drawing Upload" description="Upload and manage part drawings and files" icon={Upload} />
            <DataTable columns={columns} data={state.partFileDrawings || []} onAdd={openAdd} addLabel="Upload Drawing" onEdit={openEdit} onDelete={(r) => deleteRecord('partFileDrawings', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Drawing' : 'Upload Drawing'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Part & Group" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Row ID (PK)" id="Row_Id" type="number" value={form.Row_Id} onChange={(e) => set('Row_Id', e.target.value)} required />
                                <FormField label="Part Name" id="Part_Name" value={form.Part_Name} onChange={(e) => set('Part_Name', e.target.value)} required />
                                <FormField label="Group Name" id="Group_Name" value={form.Group_Name} onChange={(e) => set('Group_Name', e.target.value)} />
                                <FormField label="File Name" id="File_Name" value={form.File_Name} onChange={(e) => set('File_Name', e.target.value)} required />
                                <FormField label="File Location" id="File_Location" value={form.File_Location} onChange={(e) => set('File_Location', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Audit" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Upload Date" id="Upload_Date" type="date" value={form.Upload_Date} onChange={(e) => set('Upload_Date', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                                <FormField label="Deleted By" id="Deleted_By" value={form.Deleted_By} onChange={(e) => set('Deleted_By', e.target.value)} />
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
export default PartFileDrawingUploaded;
