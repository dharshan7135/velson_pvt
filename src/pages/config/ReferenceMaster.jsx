import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { FileText } from 'lucide-react';

const columns = [
    { key: 'referenceType', label: 'Reference Type' },
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description' },
];

const emptyForm = { referenceType: '', code: '', description: '' };

const ReferenceMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [addGroupModal, setAddGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const typeOptions = state.referenceGroups.map(g => ({ label: g.groupName, value: g.groupName }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'referenceType') {
                if (!v) e.referenceType = 'Required';
                else delete e.referenceType;
            }
            if (['code', 'description'].includes(f)) {
                if (!(v || '').trim()) e[f] = 'Required';
                else delete e[f];
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.referenceType) e.referenceType = 'Required';
        if (!form.code.trim()) e.code = 'Required';
        if (!form.description.trim()) e.description = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('references', editId, form);
        else addRecord('references', form);
        close();
    };

    const saveGroup = () => {
        if (!newGroupName.trim()) return;
        addRecord('referenceGroups', { groupName: newGroupName });
        set('referenceType', newGroupName);
        setNewGroupName('');
        setAddGroupModal(false);
    };

    return (
        <div className="p-6">
            <PageHeader title="Reference Master" description="Manage reference codes and descriptions" icon={FileText} />
            <DataTable columns={columns} data={state.references} onAdd={openAdd} addLabel="Add Reference" onEdit={openEdit} onDelete={(r) => deleteRecord('references', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Reference' : 'Add Reference'} size="md">
                <div className="p-6 space-y-4">
                    <DropdownWithCreate label="Reference Type" id="referenceType" required options={typeOptions} value={form.referenceType} onChange={(v) => set('referenceType', v)} onAdd={() => setAddGroupModal(true)} error={errors.referenceType} />
                    <FormField label="Code" id="code" required value={form.code} onChange={(e) => set('code', e.target.value)} error={errors.code} />
                    <FormField label="Description" id="description" required value={form.description} onChange={(e) => set('description', e.target.value)} error={errors.description} />
                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            <FormModal isOpen={addGroupModal} onClose={() => setAddGroupModal(false)} title="Add Reference Group" size="sm">
                <div className="p-6 space-y-4">
                    <FormField label="Group Name" id="newRefGroup" required value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setAddGroupModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={saveGroup} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">Save</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default ReferenceMaster;
