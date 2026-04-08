import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FlaskConical, Database } from 'lucide-react';

const columns = [
    { key: 'id', label: 'ID' },
];

const emptyForm = {
    id: '',
};

const TestEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('testEntries', editId, form); else addRecord('testEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Test Table" description="Test records — review for removal" icon={FlaskConical} />
            <DataTable columns={columns} data={state.testEntries || []} onAdd={openAdd} addLabel="New Test" onEdit={openEdit} onDelete={(r) => deleteRecord('testEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Test' : 'New Test'} size="sm">
                <div className="p-6 space-y-6">
                    <FormContainer title="Test Details" icon={Database}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="ID" id="id" value={form.id} onChange={(e) => set('id', e.target.value)} required />
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
export default TestEntry;
