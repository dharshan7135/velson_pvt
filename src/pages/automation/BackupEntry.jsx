import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Database as DatabaseIcon, Database } from 'lucide-react';

const columns = [
    { key: 'Bk_Datetime', label: 'Backup Date/Time' },
];

const emptyForm = {
    Bk_ID: '',
    Bk_Datetime: new Date().toISOString().slice(0, 16),
};

const BackupEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('backupEntries', editId, form); else addRecord('backupEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Backup" description="System backup records and timestamps" icon={DatabaseIcon} />
            <DataTable columns={columns} data={state.backupEntries || []} onAdd={openAdd} addLabel="New Backup" onEdit={openEdit} onDelete={(r) => deleteRecord('backupEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Backup' : 'New Backup'} size="sm">
                <div className="p-6 space-y-6">
                    <FormContainer title="Backup Details" icon={Database}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Backup ID" id="Bk_ID" value={form.Bk_ID} onChange={(e) => set('Bk_ID', e.target.value)} required />
                            <FormField label="Backup Date/Time" id="Bk_Datetime" type="datetime-local" value={form.Bk_Datetime} onChange={(e) => set('Bk_Datetime', e.target.value)} required />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Backup'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default BackupEntry;
