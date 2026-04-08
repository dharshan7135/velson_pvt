import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FileText, Database, Shield } from 'lucide-react';

const columns = [
    { key: 'DM_Drawing_Name', label: 'Drawing Name' },
    { key: 'DM_Status', label: 'Status' },
    { key: 'DM_Created_by', label: 'Created By' },
    { key: 'DM_Created_Date', label: 'Created Date' },
];

const emptyForm = {
    DM_iID: '',
    DM_Drawing_Name: '',
    DM_Status: 'A',
    DM_Created_by: '',
    DM_Created_Date: new Date().toISOString().slice(0, 10),
};

const DrawingMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('drawingMasters', editId, form); else addRecord('drawingMasters', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Drawing Master" description="Manage drawing master records for parts and assemblies" icon={FileText} />
            <DataTable columns={columns} data={state.drawingMasters || []} onAdd={openAdd} addLabel="New Drawing" onEdit={openEdit} onDelete={(r) => deleteRecord('drawingMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Drawing' : 'New Drawing'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="Drawing Information" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Drawing ID" id="DM_iID" value={form.DM_iID} onChange={(e) => set('DM_iID', e.target.value)} required />
                            <FormField label="Drawing Name" id="DM_Drawing_Name" className="md:col-span-2" value={form.DM_Drawing_Name} onChange={(e) => set('DM_Drawing_Name', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Status" id="DM_Status" value={form.DM_Status} onChange={(e) => set('DM_Status', e.target.value)} />
                            <FormField label="Created By" id="DM_Created_by" value={form.DM_Created_by} onChange={(e) => set('DM_Created_by', e.target.value)} />
                            <FormField label="Created Date" id="DM_Created_Date" type="date" value={form.DM_Created_Date} onChange={(e) => set('DM_Created_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Drawing'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default DrawingMaster;
