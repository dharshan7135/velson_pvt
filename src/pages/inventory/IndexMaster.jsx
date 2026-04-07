import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { FileText } from 'lucide-react';
const columns = [{ key: 'Model_No', label: 'Model No' },{ key: 'Model_Name', label: 'Model' },{ key: 'Status', label: 'Status' }];
const emptyForm = { Row_Id: '', Model_Id: '', Model_No: '', Model_Name: '', Status: 'A', Created_By: '', Created_Date: new Date().toISOString().slice(0, 10), Created_Systems: '' };
const IndexMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('indexMasters', editId, form); else addRecord('indexMasters', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Index Master" description="Model index master definitions" icon={FileText} />
            <DataTable columns={columns} data={state.indexMasters || []} onAdd={openAdd} addLabel="New Index" onEdit={openEdit} onDelete={(r) => deleteRecord('indexMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Index Master'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Model No" id="Model_No" value={form.Model_No} onChange={(e) => set('Model_No', e.target.value)} required />
                    <FormField label="Model Name" id="Model_Name" value={form.Model_Name} onChange={(e) => set('Model_Name', e.target.value)} required />
                    <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                    <FormField label="System" id="Created_Systems" value={form.Created_Systems} onChange={(e) => set('Created_Systems', e.target.value)} />
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
export default IndexMaster;
