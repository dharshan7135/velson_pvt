import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileText, Database, Shield } from 'lucide-react';

const columns = [
    { key: 'PF_Fille_Name', label: 'File Name' },
    { key: 'PF_Created_by', label: 'Created By' },
    { key: 'PF_Created_Date', label: 'Created Date' },
    { key: 'PF_Status', label: 'Status' },
];

const emptyForm = {
    PF_ID: '',
    PF_Fille_Name: '',
    PF_Status: 'A',
    PF_File: '',
    PF_Created_Date: new Date().toISOString().slice(0, 10),
    PF_Created_by: '',
};

const PRNFile = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('prnFiles', editId, form); else addRecord('prnFiles', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="PRN File" description="Manage PRN file records linked to items and drawings" icon={FileText} />
            <DataTable columns={columns} data={state.prnFiles || []} onAdd={openAdd} addLabel="Add PRN File" onEdit={openEdit} onDelete={(r) => deleteRecord('prnFiles', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit PRN File' : 'New PRN File'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="File Details" icon={Database}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="PF ID (PK)" id="PF_ID" type="number" value={form.PF_ID} onChange={(e) => set('PF_ID', e.target.value)} required />
                            <FormField label="File Name" id="PF_Fille_Name" value={form.PF_Fille_Name} onChange={(e) => set('PF_Fille_Name', e.target.value)} required />
                            <FormField label="File Path" id="PF_File" value={form.PF_File} onChange={(e) => set('PF_File', e.target.value)} />
                            <FormField label="Status" id="PF_Status" value={form.PF_Status} onChange={(e) => set('PF_Status', e.target.value)} />
                            <FormField label="Created By" id="PF_Created_by" value={form.PF_Created_by} onChange={(e) => set('PF_Created_by', e.target.value)} />
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
export default PRNFile;
