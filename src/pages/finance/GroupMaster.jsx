import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { BookOpen } from 'lucide-react';

const columns = [
    { key: 'group', label: 'Group' },
    { key: 'underGroupOf', label: 'Under Group Of' },
    { key: 'printingOrder', label: 'Printing Order' },
    { key: 'groupTotal', label: 'Group Total' },
];

const emptyForm = { group: '', underGroupOf: '', printingOrder: '', groupTotal: '' };

const GroupMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const groupOptions = state.groupMaster.map(g => ({ label: g.group, value: g.group }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

    const validate = () => {
        const e = {};
        if (!form.group.trim()) e.group = 'Required';
        if (!form.underGroupOf) e.underGroupOf = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('groupMaster', editId, form);
        else addRecord('groupMaster', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Group Master" description="Manage account groups and hierarchy" icon={BookOpen} />
            <DataTable columns={columns} data={state.groupMaster} onAdd={openAdd} addLabel="Add Group" onEdit={openEdit} onDelete={(r) => deleteRecord('groupMaster', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Group' : 'Add Group'} size="md">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Group" id="group" required value={form.group} onChange={(e) => set('group', e.target.value)} error={errors.group} />
                        <DropdownWithCreate label="Under Group Of" id="underGroupOf" required options={[{ label: 'Assets', value: 'Assets' }, { label: 'Liabilities', value: 'Liabilities' }, { label: 'Revenue', value: 'Revenue' }, { label: 'Expenses', value: 'Expenses' }, ...groupOptions]} value={form.underGroupOf} onChange={(v) => set('underGroupOf', v)} error={errors.underGroupOf} />
                        <FormField label="Printing Order" id="printingOrder" type="number" value={form.printingOrder} onChange={(e) => set('printingOrder', e.target.value)} />
                        <FormField label="Group Total" id="groupTotal" type="number" value={form.groupTotal} onChange={(e) => set('groupTotal', e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default GroupMaster;
