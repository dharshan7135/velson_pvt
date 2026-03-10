import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Layers } from 'lucide-react';

const columns = [
    { key: 'group', label: 'Group' },
    { key: 'storeName', label: 'Store Name' },
    { key: 'underGroupOf', label: 'Under Group Of' },
];

const emptyForm = { group: '', storeName: '', underGroupOf: '' };

const ItemGroupMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const storeOptions = state.references.filter(r => r.referenceType === 'Store Name').map(r => ({ label: r.description, value: r.description }));
    const groupOptions = state.itemGroups.map(g => ({ label: g.group, value: g.group }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'group') {
                if (!(v || '').trim()) e.group = 'Required';
                else delete e.group;
            }
            if (f === 'storeName') {
                if (!v) e.storeName = 'Required';
                else delete e.storeName;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.group.trim()) e.group = 'Required';
        if (!form.storeName) e.storeName = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('itemGroups', editId, form);
        else addRecord('itemGroups', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Item Group Master" description="Organize items into groups and sub-groups" icon={Layers} />
            <DataTable columns={columns} data={state.itemGroups} onAdd={openAdd} addLabel="Add Item Group" onEdit={openEdit} onDelete={(r) => deleteRecord('itemGroups', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Item Group' : 'Add Item Group'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Group" id="group" required value={form.group} onChange={(e) => set('group', e.target.value)} error={errors.group} />
                    <DropdownWithCreate label="Store Name" id="storeName" required options={storeOptions} value={form.storeName} onChange={(v) => set('storeName', v)} error={errors.storeName} />
                    <DropdownWithCreate label="Under Group Of" id="underGroupOf" options={groupOptions} value={form.underGroupOf} onChange={(v) => set('underGroupOf', v)} placeholder="Search or Select Group" />
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default ItemGroupMaster;
