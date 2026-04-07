import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { ListOrdered } from 'lucide-react';
const columns = [{ key: 'Job_No', label: 'Job No' },{ key: 'Part_No', label: 'Part' },{ key: 'RM_Barcode_Item_Name', label: 'RM Item' },{ key: 'Qty', label: 'Qty' }];
const emptyForm = {
    ID: '', Job_ID: '', RM_Barcode_Item_Id: '', Part_ID: '', Ref_Rowid: '',
    Job_No: '', Part_No: '', RM_Barcode_Item_Name: '', Qty: 0, RM_Barcode_Qty: 0,
    created_By: '', created_Date: new Date().toISOString().slice(0, 10), Barcode: '', RM_Barcode: '',
};
const JobcardRMIssueDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobcardRMIssueDetails', editId, form); else addRecord('jobcardRMIssueDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="RM Issue Details" description="Raw material issue line items with barcode tracking" icon={ListOrdered} />
            <DataTable columns={columns} data={state.jobcardRMIssueDetails || []} onAdd={openAdd} addLabel="Add Line" onEdit={openEdit} onDelete={(r) => deleteRecord('jobcardRMIssueDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New RM Issue Line'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} required />
                    <FormField label="Part No" id="Part_No" value={form.Part_No} onChange={(e) => set('Part_No', e.target.value)} />
                    <FormField label="RM Item Name" id="RM_Barcode_Item_Name" value={form.RM_Barcode_Item_Name} onChange={(e) => set('RM_Barcode_Item_Name', e.target.value)} />
                    <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                    <FormField label="RM Barcode Qty" id="RM_Barcode_Qty" type="number" value={form.RM_Barcode_Qty} onChange={(e) => set('RM_Barcode_Qty', e.target.value)} />
                    <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                    <FormField label="RM Barcode" id="RM_Barcode" value={form.RM_Barcode} onChange={(e) => set('RM_Barcode', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default JobcardRMIssueDetails;
