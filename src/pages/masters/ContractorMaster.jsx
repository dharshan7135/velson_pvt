import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Handshake } from 'lucide-react';

const columns = [
    { key: 'contractorCode', label: 'Code' },
    { key: 'contractorName', label: 'Contractor Name' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
];

const emptyForm = { contractorCode: '', contractorName: '', address: '', city: '' };

const ContractorMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            const val = (v || '').trim();
            if (f === 'contractorCode') {
                if (!val) e.contractorCode = 'Required';
                else {
                    const isDup = state.contractors?.some(c => c.contractorCode.toLowerCase() === val.toLowerCase() && c.id !== editId);
                    if (isDup) e.contractorCode = 'Must be unique';
                    else delete e.contractorCode;
                }
            }
            if (f === 'contractorName') {
                if (!val) e.contractorName = 'Required';
                else delete e.contractorName;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.contractorCode.trim()) e.contractorCode = 'Required';
        if (!form.contractorName.trim()) e.contractorName = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('contractors', editId, form);
        else addRecord('contractors', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Contractor Master" description="Manage contractors and their details" icon={Handshake} />
            <DataTable columns={columns} data={state.contractors} onAdd={openAdd} addLabel="Add Contractor" onEdit={openEdit} onDelete={(r) => deleteRecord('contractors', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Contractor' : 'Add Contractor'} size="md">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Contractor Code" id="contractorCode" required value={form.contractorCode} onChange={(e) => set('contractorCode', e.target.value)} error={errors.contractorCode} />
                        <FormField label="Contractor Name" id="contractorName" required value={form.contractorName} onChange={(e) => set('contractorName', e.target.value)} error={errors.contractorName} />
                        <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} className="md:col-span-2" />
                        <FormField label="City" id="city" value={form.city} onChange={(e) => set('city', e.target.value)} />
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

export default ContractorMaster;
