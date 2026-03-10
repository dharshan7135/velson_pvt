import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Briefcase } from 'lucide-react';

const columns = [
    { key: 'vehicleType', label: 'Vehicle Type' },
    { key: 'jobName', label: 'Job Name / Service Name' },
    { key: 'labourCharge', label: 'Labour Charge' },
    { key: 'materialCharge', label: 'Material Charge' },
];

const emptyForm = { vehicleType: '', jobName: '', labourCharge: '', materialCharge: '' };

const ServiceJobMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const vtOptions = state.references.filter(r => r.referenceType === 'Vehicle Type').map(r => ({ label: r.description, value: r.description }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'vehicleType') {
                if (!v) e.vehicleType = 'Required';
                else delete e.vehicleType;
            }
            if (f === 'jobName') {
                if (!(v || '').trim()) e.jobName = 'Required';
                else delete e.jobName;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.vehicleType) e.vehicleType = 'Required';
        if (!form.jobName.trim()) e.jobName = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('serviceJobs', editId, form);
        else addRecord('serviceJobs', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Vehicle Service Master" description="Define service jobs and their charges" icon={Briefcase} />
            <DataTable columns={columns} data={state.serviceJobs} onAdd={openAdd} addLabel="Add Vehicle Service" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceJobs', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Vehicle Service' : 'Add Vehicle Service'} size="md">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <DropdownWithCreate label="Vehicle Type" id="vehicleType" required options={vtOptions} value={form.vehicleType} onChange={(v) => set('vehicleType', v)} error={errors.vehicleType} />
                        <FormField label="Job Name / Service Name" id="jobName" required value={form.jobName} onChange={(e) => set('jobName', e.target.value)} error={errors.jobName} />
                        <FormField label="Labour Charge" id="labourCharge" type="number" value={form.labourCharge} onChange={(e) => set('labourCharge', e.target.value)} />
                        <FormField label="Material Charge" id="materialCharge" type="number" value={form.materialCharge} onChange={(e) => set('materialCharge', e.target.value)} />
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

export default ServiceJobMaster;
