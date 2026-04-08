import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { PenLine, Database, Package, Shield } from 'lucide-react';

const columns = [
    { key: 'Part_No', label: 'Part No' },
    { key: 'Part_Name', label: 'Part Name' },
    { key: 'Old_Qty', label: 'Old Qty' },
    { key: 'New_Qty', label: 'New Qty' },
    { key: 'Created_By', label: 'Created By' },
];

const emptyForm = {
    id: '', Item_Id: '',
    Part_No: '', Part_Name: '', Remark: '',
    Old_Qty: 0, New_Qty: 0,
    Created_By: '',
    Created_Date: new Date().toISOString().slice(0, 10),
    Barcode: '', Inward_Ref_Id: '',
};

const CurrentEditDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('currentEditDetails', editId, form); else addRecord('currentEditDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Current Edit Details" description="Track quantity edits and modifications to inventory items" icon={PenLine} />
            <DataTable columns={columns} data={state.currentEditDetails || []} onAdd={openAdd} addLabel="New Edit Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('currentEditDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Entry' : 'New Edit Entry'} size="md">
                <div className="p-6 space-y-6">
                    <FormContainer title="Part Info" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="ID" id="id" value={form.id} onChange={(e) => set('id', e.target.value)} required />
                            <FormField label="Part No" id="Part_No" value={form.Part_No} onChange={(e) => set('Part_No', e.target.value)} required />
                            <FormField label="Part Name" id="Part_Name" value={form.Part_Name} onChange={(e) => set('Part_Name', e.target.value)} required />
                            <FormField label="Remark" id="Remark" className="md:col-span-2" value={form.Remark} onChange={(e) => set('Remark', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Quantities" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Old Qty" id="Old_Qty" type="number" className="font-bold text-red-600 bg-red-50" value={form.Old_Qty} onChange={(e) => set('Old_Qty', e.target.value)} />
                            <FormField label="New Qty" id="New_Qty" type="number" className="font-bold text-green-600 bg-green-50" value={form.New_Qty} onChange={(e) => set('New_Qty', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                            <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} onChange={(e) => set('Created_Date', e.target.value)} />
                            <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                            <FormField label="Inward Ref ID" id="Inward_Ref_Id" value={form.Inward_Ref_Id} onChange={(e) => set('Inward_Ref_Id', e.target.value)} />
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
export default CurrentEditDetails;
