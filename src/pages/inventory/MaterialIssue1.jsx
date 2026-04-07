import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowUpFromLine, Database, Package } from 'lucide-react';
const columns = [{ key: 'MI_No', label: 'Issue No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Qty', label: 'Qty' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    ID: '', Item_ID: '', Created_by: '', Dept_ID: '', UOM_ID: '',
    MI_No: '', Req_No: '', Job_No: '', Item_Code: '',
    MI_Date: '', Req_Date: '', Required_Date: '', ETA: '', Created_Date: new Date().toISOString().slice(0, 10),
    Dept_Name: '', Item_Name: '', Description: '', Specification: '', Purpose: '', Request_User: '',
    UOM: '', Qty: 0, Status: 'A',
};
const MaterialIssue1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('materialIssue1', editId, form); else addRecord('materialIssue1', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Material Issue (Extended)" description="Extended material issue with request linkage" icon={ArrowUpFromLine} />
            <DataTable columns={columns} data={state.materialIssue1 || []} onAdd={openAdd} addLabel="New Issue" onEdit={openEdit} onDelete={(r) => deleteRecord('materialIssue1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Issue' : 'New Material Issue'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Issue & Item" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Issue No" id="MI_No" value={form.MI_No} onChange={(e) => set('MI_No', e.target.value)} required />
                            <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} />
                            <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                            <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                            <FormField label="Department" id="Dept_Name" value={form.Dept_Name} onChange={(e) => set('Dept_Name', e.target.value)} />
                            <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                            <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                            <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                            <FormField label="Issue Date" id="MI_Date" type="date" value={form.MI_Date} onChange={(e) => set('MI_Date', e.target.value)} />
                            <FormField label="Description" id="Description" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                            <FormField label="Request User" id="Request_User" value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} />
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default MaterialIssue1;
