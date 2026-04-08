import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileText, Database } from 'lucide-react';

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'Department', label: 'Department' },
    { key: 'CONTRACTOR', label: 'Contractor' },
];

const emptyForm = {
    id: '',
    name: '',
    Department: '',
    CONTRACTOR: '',
    department_Id: '',
};

const TempEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('tempEntries', editId, form); else addRecord('tempEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Temp Table" description="Temporary records — review for removal" icon={FileText} />
            <DataTable columns={columns} data={state.tempEntries || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('tempEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Entry'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="Temp Details" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="ID" id="id" value={form.id} onChange={(e) => set('id', e.target.value)} required />
                            <FormField label="Name" id="name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                            <FormField label="Department" id="Department" value={form.Department} onChange={(e) => set('Department', e.target.value)} />
                            <FormField label="Contractor" id="CONTRACTOR" value={form.CONTRACTOR} onChange={(e) => set('CONTRACTOR', e.target.value)} />
                            <FormField label="Department ID" id="department_Id" value={form.department_Id} onChange={(e) => set('department_Id', e.target.value)} />
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
export default TempEntry;
