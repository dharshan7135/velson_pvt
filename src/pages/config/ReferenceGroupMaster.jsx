import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Link2 } from 'lucide-react';

const columns = [
    { key: 'groupName', label: 'Group Name' },
];

const ReferenceGroupMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ groupName: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm({ groupName: '' }); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ groupName: row.groupName }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);

    const set = (f, v) => {
        setForm(p => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'groupName') {
                if (!(v || '').trim()) e.groupName = 'Required';
                else delete e.groupName;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.groupName.trim()) e.groupName = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('referenceGroups', editId, form);
        else addRecord('referenceGroups', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Reference Group Master" description="Manage reference group categories" icon={Link2} />
            <DataTable columns={columns} data={state.referenceGroups} onAdd={openAdd} addLabel="Add Group" onEdit={openEdit} onDelete={(r) => deleteRecord('referenceGroups', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Reference Group' : 'Add Reference Group'} size="sm">
                <div className="p-6 space-y-4">
                    <FormField label="Group Name" id="groupName" required value={form.groupName} onChange={(e) => set('groupName', e.target.value)} error={errors.groupName} />
                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default ReferenceGroupMaster;
