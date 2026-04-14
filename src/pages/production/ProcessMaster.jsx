import React, { useState, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Settings, Upload, Trash2, AlertTriangle, X } from 'lucide-react';



const emptyForm = {
    partName: '', processName: '', processName1: '', team: '',
    machineCode: '', processOrder: '', machineName: '', days: '',
    hours: '', minutes: '', settingTime: '', cycleTime: '',
    handlingTime: '', idleTime: '', imageUpload: '',
};

const ProcessMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord, deleteAllRecords } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [showDeleteAllWarning, setShowDeleteAllWarning] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageFull, setShowImageFull] = useState(false);
    const fileInputRef = useRef(null);

    const columns = [
        { key: 'partName', label: 'Part Name' },
        { key: 'processName', label: 'Process' },
        { key: 'team', label: 'Team' },
        { key: 'machineName', label: 'Machine' },
        { key: 'processOrder', label: 'Order' },
        { key: 'cycleTime', label: 'Cycle Time' },
        {
            key: 'imageUpload', label: 'Image',
            render: (val) => val ? (
                <img
                    src={val}
                    alt="Process"
                    className="w-8 h-8 object-cover rounded-md border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={(e) => { e.stopPropagation(); setImagePreview(val); setShowImageFull(true); }}
                />
            ) : '—',
        },
    ];

    const teamOptions = state.references.filter(r => r.referenceType === 'Team').map(r => ({ label: r.description, value: r.description }));
    const machineOptions = state.machines.map(m => ({ label: `${m.machineName} (${m.machineCode})`, value: m.machineCode }));
    const processOptions = Array.from(new Set(state.processes.map(p => p.processName).filter(Boolean))).map(p => ({ label: p, value: p }));
    const machineNameOptions = state.machines.map(m => ({ label: m.machineName, value: m.machineName }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setImagePreview(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setImagePreview(row.imageUpload || null); setModal(true); };
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

    const handleDeleteAll = async () => {
        setDeleting(true);
        try {
            await deleteAllRecords('processes');
        } finally {
            setDeleting(false);
            setShowDeleteAllWarning(false);
        }
    };

    return (
        <div className="p-6">
            <PageHeader title="Process Master" description="Define manufacturing processes and time parameters" icon={Settings}>
                <button
                    onClick={() => setShowDeleteAllWarning(true)}
                    disabled={!state.processes || state.processes.length === 0}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-[0_0_12px_rgba(211,47,47,0.4)] hover:shadow-[0_0_22px_rgba(211,47,47,0.65)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete All
                </button>
            </PageHeader>
            <DataTable columns={columns} data={state.processes} onAdd={openAdd} addLabel="Add Process" onEdit={openEdit} onDelete={(r) => deleteRecord('processes', r.id)} exportFileName="Process_Master" />

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
                        <div className="flex items-start gap-4">
                            {/* Thumbnail / Placeholder */}
                            <div
                                onClick={() => imagePreview && setShowImageFull(true)}
                                className={`w-24 h-24 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 transition-colors ${
                                    imagePreview ? 'cursor-pointer hover:border-[#0097A7] hover:shadow-md' : ''
                                }`}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Process" className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5 text-slate-400 mb-0.5" />
                                        <span className="text-[10px] text-slate-400">No image</span>
                                    </>
                                )}
                            </div>
                            {/* Buttons */}
                            <div className="flex flex-col gap-2 pt-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result);
                                                set('imageUpload', reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-[#0097A7] text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 hover:bg-[#00838F] transition-colors cursor-pointer"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    Browse
                                </button>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            set('imageUpload', '');
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold text-xs flex items-center gap-1.5 hover:bg-red-100 transition-colors cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            {/* Delete All Warning Modal */}
            {showDeleteAllWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !deleting && setShowDeleteAllWarning(false)} />
                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeInScale_0.2s_ease-out]">
                        {/* Red top bar */}
                        <div className="h-1.5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C]" />
                        {/* Close button */}
                        <button
                            onClick={() => !deleting && setShowDeleteAllWarning(false)}
                            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                        <div className="p-6 pt-5">
                            {/* Warning icon */}
                            <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(211,47,47,0.2)]">
                                <AlertTriangle className="w-7 h-7 text-[#D32F2F]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 text-center">Delete All Processes?</h3>
                            <p className="text-sm text-slate-500 text-center mt-2 leading-relaxed">
                                This will permanently delete <span className="font-bold text-red-600">{state.processes?.length || 0} record{(state.processes?.length || 0) !== 1 ? 's' : ''}</span> from Process Master. This action <span className="font-bold text-slate-700">cannot be undone</span>.
                            </p>
                            {/* Warning box */}
                            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-red-600 leading-relaxed">
                                    All process definitions, time parameters, and machine assignments will be removed permanently.
                                </p>
                            </div>
                            {/* Actions */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeleteAllWarning(false)}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAll}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/25 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {deleting ? 'Deleting...' : 'Yes, Delete All'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Image Lightbox */}
            {showImageFull && imagePreview && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowImageFull(false)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <button
                        onClick={() => setShowImageFull(false)}
                        className="absolute top-5 right-5 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <img
                        src={imagePreview}
                        alt="Process Full View"
                        className="relative max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-[fadeInScale_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ProcessMaster;
