import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { CheckCheck } from 'lucide-react';
const columns = [{ key: 'Form', label: 'Form' },{ key: 'Order_Numer', label: 'Order No' },{ key: 'Approval_Satus', label: 'Approval' },{ key: 'Department', label: 'Dept' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    ID: '', Created_by: '', App_Level: '', App_User: '',
    Order_Date: '', Order_Numer: '', Remarks: '',
    Approval_Satus: 'Pending', Approval_Date: '', Approved_By: '', Status: 'A',
    Created_Date: new Date().toISOString().slice(0, 10), Form: '', Department: '',
};
const ApprovedDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('approvedDetails', editId, form); else addRecord('approvedDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Approved Details" description="Multi-level approval records across forms" icon={CheckCheck} />
            <DataTable columns={columns} data={state.approvedDetails || []} onAdd={openAdd} addLabel="New Approval" onEdit={openEdit} onDelete={(r) => deleteRecord('approvedDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Approval'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Form" id="Form" value={form.Form} onChange={(e) => set('Form', e.target.value)} required />
                    <FormField label="Department" id="Department" value={form.Department} onChange={(e) => set('Department', e.target.value)} />
                    <FormField label="Order No" id="Order_Numer" value={form.Order_Numer} onChange={(e) => set('Order_Numer', e.target.value)} />
                    <FormField label="Order Date" id="Order_Date" type="date" value={form.Order_Date} onChange={(e) => set('Order_Date', e.target.value)} />
                    <FormField label="Approval Level" id="App_Level" value={form.App_Level} onChange={(e) => set('App_Level', e.target.value)} />
                    <FormField label="Approval Status" id="Approval_Satus" value={form.Approval_Satus} onChange={(e) => set('Approval_Satus', e.target.value)} />
                    <FormField label="Approved By" id="Approved_By" value={form.Approved_By} onChange={(e) => set('Approved_By', e.target.value)} />
                    <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                    <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ApprovedDetails;
