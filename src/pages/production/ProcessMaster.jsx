import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Settings, Upload } from 'lucide-react';

const columns = [
    { key: 'partName', label: 'Part Name' },
    { key: 'processName', label: 'Process' },
    { key: 'team', label: 'Team' },
    { key: 'machineName', label: 'Machine' },
    { key: 'processOrder', label: 'Order' },
    { key: 'cycleTime', label: 'Cycle Time' },
];

const emptyForm = {
    partName: '', processName: '', processName1: '', team: '',
    machineCode: '', processOrder: '', machineName: '', days: '',
    hours: '', minutes: '', settingTime: '', cycleTime: '',
    handlingTime: '', idleTime: '', imageUpload: '',
};

const ProcessMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const teamOptions = state.references.filter(r => r.referenceType === 'Team').map(r => ({ label: r.description, value: r.description }));
    const machineOptions = state.machines.map(m => ({ label: `${m.machineName} (${m.machineCode})`, value: m.machineCode }));
    const processOptions = Array.from(new Set(state.processes.map(p => p.processName).filter(Boolean))).map(p => ({ label: p, value: p }));
    const machineNameOptions = state.machines.map(m => ({ label: m.machineName, value: m.machineName }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (['partName', 'processName'].includes(f)) {
                if (!(v || '').trim()) e[f] = 'Required';
                else delete e[f];
            }
            if (['team', 'machineName', 'machineCode'].includes(f)) {
                if (!v) e[f] = 'Required';
                else {
                    delete e.machineName;
                    delete e.machineCode;
                    delete e[f];
                }
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.partName.trim()) e.partName = 'Required';
        if (!form.processName.trim()) e.processName = 'Required';
        if (!form.team) e.team = 'Required';
        if (!form.machineName && !form.machineCode) e.machineName = 'Required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleMachineSelect = (code) => {
        set('machineCode', code);
        const m = state.machines.find(m => m.machineCode === code);
        if (m) set('machineName', m.machineName);
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('processes', editId, form);
        else addRecord('processes', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Process Master" description="Define manufacturing processes and time parameters" icon={Settings} />
            <DataTable columns={columns} data={state.processes} onAdd={openAdd} addLabel="Add Process" onEdit={openEdit} onDelete={(r) => deleteRecord('processes', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Process' : 'Add Process'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <FormField label="Part Name" id="partName" required value={form.partName} onChange={(e) => set('partName', e.target.value)} error={errors.partName} />
                        <DropdownWithCreate label="Process Name" id="processName" required options={processOptions} value={form.processName} onChange={(v) => set('processName', v)} error={errors.processName} />
                        <FormField label="Process Name1" id="processName1" value={form.processName1} onChange={(e) => set('processName1', e.target.value)} />
                        <DropdownWithCreate label="Team" id="team" required options={teamOptions} value={form.team} onChange={(v) => set('team', v)} error={errors.team} />
                        <DropdownWithCreate label="Machine Code" id="machineCode" options={machineOptions} value={form.machineCode} onChange={handleMachineSelect} />
                        <FormField label="Process Order" id="processOrder" type="number" value={form.processOrder} onChange={(e) => set('processOrder', e.target.value)} />
                        <DropdownWithCreate label="Machine Name" id="machineName" required options={machineNameOptions} value={form.machineName} onChange={(v) => {
                            set('machineName', v);
                            const m = state.machines.find(mac => mac.machineName === v);
                            if (m) set('machineCode', m.machineCode);
                        }} error={errors.machineName} />
                        <FormField label="Days" id="days" type="number" value={form.days} onChange={(e) => set('days', e.target.value)} />
                        <FormField label="Hours" id="hours" type="number" value={form.hours} onChange={(e) => set('hours', e.target.value)} />
                        <FormField label="Minutes" id="minutes" type="number" value={form.minutes} onChange={(e) => set('minutes', e.target.value)} />
                        <FormField label="Setting Time" id="settingTime" type="number" value={form.settingTime} onChange={(e) => set('settingTime', e.target.value)} />
                        <FormField label="Cycle Time" id="cycleTime" type="number" value={form.cycleTime} onChange={(e) => set('cycleTime', e.target.value)} />
                        <FormField label="Handling Time" id="handlingTime" type="number" value={form.handlingTime} onChange={(e) => set('handlingTime', e.target.value)} />
                        <FormField label="Idle Time(minutes)" id="idleTime" type="number" value={form.idleTime} onChange={(e) => set('idleTime', e.target.value)} />
                    </div>
                    {/* Image Upload */}
                    <div className="form-field-group">
                        <label className="form-label">Image Upload</label>
                        <div className="w-full max-w-[200px] aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-[#0097A7] transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 text-slate-400" />
                            <span className="text-xs text-slate-500">Click to upload</span>
                        </div>
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

export default ProcessMaster;
