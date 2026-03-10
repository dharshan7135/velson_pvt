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
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'group') {
                const val = (v || '').trim();
                if (!val) e.group = 'Group name is required';
                else if (val.length < 2) e.group = 'Minimum 2 characters required';
                else if (!/^[A-Za-z0-9\s]+$/.test(val)) e.group = 'Only alphabets, numbers, and spaces allowed';
                else delete e.group;
            }
            if (f === 'underGroupOf') {
                if (!v) e.underGroupOf = 'Please select a parent group';
                else if (editId && v === form.group) e.underGroupOf = 'A group cannot be assigned under itself';
                else delete e.underGroupOf;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};

        // 1. Group Name Validation
        if (!form.group?.trim()) {
            e.group = 'Group name is required';
        } else if (form.group.trim().length < 2) {
            e.group = 'Minimum 2 characters required';
        } else if (!/^[A-Za-z0-9\s]+$/.test(form.group.trim())) {
            e.group = 'Only alphabets, numbers, and spaces allowed';
        }

        // 2. Under Group Of Validation
        if (!form.underGroupOf) {
            e.underGroupOf = 'Please select a parent group';
        } else if (editId && form.underGroupOf === form.group) {
            // Logical check: A group cannot be assigned under itself
            e.underGroupOf = 'A group cannot be assigned under itself';
        }

        // 3. Printing Order Validation
        if (form.printingOrder !== '' && form.printingOrder !== null) {
            const val = Number(form.printingOrder);
            if (isNaN(val) || val < 0) {
                e.printingOrder = 'Negative numbers are not allowed';
            } else if (!Number.isInteger(val)) {
                e.printingOrder = 'Must be a whole number';
            }
        }

        // 4. Group Total Validation
        if (form.groupTotal !== '' && form.groupTotal !== null) {
            const val = Number(form.groupTotal);
            if (isNaN(val) || val < 0) {
                e.groupTotal = 'Value must be greater than or equal to zero';
            }
        }

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
                        <FormField label="Printing Order" id="printingOrder" type="number" value={form.printingOrder} onChange={(e) => set('printingOrder', e.target.value)} error={errors.printingOrder} />
                        <FormField label="Group Total" id="groupTotal" type="number" value={form.groupTotal} onChange={(e) => set('groupTotal', e.target.value)} error={errors.groupTotal} />
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
