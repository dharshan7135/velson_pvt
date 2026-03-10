import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { BarChart3 } from 'lucide-react';

const columns = [
    { key: 'characteristics', label: 'Characteristics' },
];

const Characteristics = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ characteristics: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm({ characteristics: '' }); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ characteristics: row.characteristics }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);

    const set = (f, v) => {
        setForm(p => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'characteristics') {
                if (!(v || '').trim()) e.characteristics = 'Required';
                else delete e.characteristics;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.characteristics.trim()) e.characteristics = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('characteristics', editId, form);
        else addRecord('characteristics', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Characteristics" description="Define item quality characteristics and parameters" icon={BarChart3} />
            <DataTable columns={columns} data={state.characteristics} onAdd={openAdd} addLabel="Add Characteristic" onEdit={openEdit} onDelete={(r) => deleteRecord('characteristics', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Characteristic' : 'Add Characteristic'} size="sm">
                <div className="p-6 space-y-4">
                    <FormField label="Characteristics" id="characteristics" required value={form.characteristics} onChange={(e) => set('characteristics', e.target.value)} error={errors.characteristics} />
                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default Characteristics;
