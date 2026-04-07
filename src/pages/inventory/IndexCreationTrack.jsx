import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { History } from 'lucide-react';
const columns = [{ key: 'Model_No', label: 'Model No' },{ key: 'Vehicle_Model_Name', label: 'Vehicle' },{ key: 'Assembly_Part_Name', label: 'Assembly' },{ key: 'Qty', label: 'Qty' }];
const emptyForm = {
    Row_Id: '', Vehicle_Model_Id: '', Model_SNo: '', Assembly_Part_Id: '',
    Assembly_Part_No: '', Model_No: '', Vehicle_Model_Name: '', Assembly_Part_Name: '',
    Remarks: '', System_Name: '', File_Name: '', Qty: 0, Status: 'A',
    Created_By: '', Created_Date: new Date().toISOString().slice(0, 10), Deleted_By: '', Deleted_Date: '',
};
const IndexCreationTrack = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('indexCreationTrack', editId, form); else addRecord('indexCreationTrack', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Index Creation Track" description="Tracked index creation with deletion audit" icon={History} />
            <DataTable columns={columns} data={state.indexCreationTrack || []} onAdd={openAdd} addLabel="New Track" onEdit={openEdit} onDelete={(r) => deleteRecord('indexCreationTrack', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Track Entry'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Model No" id="Model_No" value={form.Model_No} onChange={(e) => set('Model_No', e.target.value)} required />
                        <FormField label="Vehicle Model" id="Vehicle_Model_Name" value={form.Vehicle_Model_Name} onChange={(e) => set('Vehicle_Model_Name', e.target.value)} required />
                        <FormField label="Assembly Part No" id="Assembly_Part_No" value={form.Assembly_Part_No} onChange={(e) => set('Assembly_Part_No', e.target.value)} />
                        <FormField label="Assembly Part Name" id="Assembly_Part_Name" value={form.Assembly_Part_Name} onChange={(e) => set('Assembly_Part_Name', e.target.value)} />
                        <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} />
                        <FormField label="File Name" id="File_Name" value={form.File_Name} onChange={(e) => set('File_Name', e.target.value)} />
                        <FormField label="Remarks" id="Remarks" className="md:col-span-2" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                        <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                        <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default IndexCreationTrack;
