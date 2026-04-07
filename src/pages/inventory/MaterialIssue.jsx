import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowUpFromLine, Database, Package, Calendar } from 'lucide-react';
const columns = [{ key: 'MI_Material_No', label: 'Material No' },{ key: 'MI_Material_Name', label: 'Material' },{ key: 'MI_Qty', label: 'Qty' },{ key: 'MI_Return_Qty', label: 'Return' },{ key: 'MI_Status', label: 'Status' }];
const emptyForm = {
    MI_ID: '', MI_Req_No: '', MI_Req_ID: '', MI_Department: '', MI_Team_Id: '', MI_Material_ID: '', MI_Old_Material_Id: '',
    MI_Material_No: '', MI_Old_Material_No: '', MI_Old_Job_Card_No: '', MI_JOB_Card: '',
    MI_Req_Date: '', MI_Created_date: new Date().toISOString().slice(0, 10), MI_Updated_Date: '',
    MI_Material_Name: '', MI_Remarks: '', MI_Old_Material_Name: '', MI_UPdate_Remark: '',
    MI_Size: '', MI_Qty: 0, MI_Return_Qty: 0, MI_Old_Size: '', MI_Old_Qty: 0,
    MI_Status: 'A', MI_Created_by: '', MI_Updated_By: '',
};
const MaterialIssue = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('materialIssue', editId, form); else addRecord('materialIssue', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Material Issue" description="Issue materials against requests with return tracking" icon={ArrowUpFromLine} />
            <DataTable columns={columns} data={state.materialIssue || []} onAdd={openAdd} addLabel="New Issue" onEdit={openEdit} onDelete={(r) => deleteRecord('materialIssue', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Issue' : 'New Material Issue'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Issue Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Material No" id="MI_Material_No" value={form.MI_Material_No} onChange={(e) => set('MI_Material_No', e.target.value)} required />
                                <FormField label="Material Name" id="MI_Material_Name" value={form.MI_Material_Name} onChange={(e) => set('MI_Material_Name', e.target.value)} required />
                                <FormField label="Size" id="MI_Size" value={form.MI_Size} onChange={(e) => set('MI_Size', e.target.value)} />
                                <FormField label="Qty" id="MI_Qty" type="number" value={form.MI_Qty} onChange={(e) => set('MI_Qty', e.target.value)} required />
                                <FormField label="Return Qty" id="MI_Return_Qty" type="number" value={form.MI_Return_Qty} onChange={(e) => set('MI_Return_Qty', e.target.value)} />
                                <FormField label="Job Card" id="MI_JOB_Card" value={form.MI_JOB_Card} onChange={(e) => set('MI_JOB_Card', e.target.value)} />
                                <FormField label="Issue Date" id="MI_Req_Date" type="date" value={form.MI_Req_Date} onChange={(e) => set('MI_Req_Date', e.target.value)} />
                                <FormField label="Remarks" id="MI_Remarks" value={form.MI_Remarks} onChange={(e) => set('MI_Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Old Material Ref" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Old Material No" id="MI_Old_Material_No" value={form.MI_Old_Material_No} onChange={(e) => set('MI_Old_Material_No', e.target.value)} />
                                <FormField label="Old Material Name" id="MI_Old_Material_Name" value={form.MI_Old_Material_Name} onChange={(e) => set('MI_Old_Material_Name', e.target.value)} />
                                <FormField label="Old Size" id="MI_Old_Size" value={form.MI_Old_Size} onChange={(e) => set('MI_Old_Size', e.target.value)} />
                                <FormField label="Old Qty" id="MI_Old_Qty" type="number" value={form.MI_Old_Qty} onChange={(e) => set('MI_Old_Qty', e.target.value)} />
                                <FormField label="Old Job Card No" id="MI_Old_Job_Card_No" value={form.MI_Old_Job_Card_No} onChange={(e) => set('MI_Old_Job_Card_No', e.target.value)} />
                                <FormField label="Update Remark" id="MI_UPdate_Remark" value={form.MI_UPdate_Remark} onChange={(e) => set('MI_UPdate_Remark', e.target.value)} />
                                <FormField label="Created By" id="MI_Created_by" value={form.MI_Created_by} onChange={(e) => set('MI_Created_by', e.target.value)} />
                                <FormField label="Status" id="MI_Status" value={form.MI_Status} onChange={(e) => set('MI_Status', e.target.value)} />
                            </div>
                        </FormContainer>
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
export default MaterialIssue;
