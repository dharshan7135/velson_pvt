import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { FlaskConical, Database } from 'lucide-react';

const columns = [
    { key: 'item_Id', label: 'Item ID' },
    { key: 'S_Id', label: 'S ID' },
    { key: 'pno', label: 'Part No' },
];

const emptyForm = {
    item_Id: '',
    S_Id: '',
    pno: '',
};

const Test66Entry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('test66Entries', editId, form); else addRecord('test66Entries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Test66 Table" description="Test table with item and supplier mappings — review for removal" icon={FlaskConical} />
            <DataTable columns={columns} data={state.test66Entries || []} onAdd={openAdd} addLabel="New Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('test66Entries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Entry'} size="sm">
                <div className="p-6 space-y-6">
                    <FormContainer title="Test66 Details" icon={Database}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Item ID" id="item_Id" value={form.item_Id} onChange={(e) => set('item_Id', e.target.value)} />
                            <FormField label="S ID" id="S_Id" value={form.S_Id} onChange={(e) => set('S_Id', e.target.value)} />
                            <FormField label="Part No" id="pno" value={form.pno} onChange={(e) => set('pno', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default Test66Entry;
