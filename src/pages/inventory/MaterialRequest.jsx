import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardList, Database, Package, Shield } from 'lucide-react';
const columns = [{ key: 'MR_Material_No', label: 'Material No' },{ key: 'MR_Material_Name', label: 'Material' },{ key: 'MR_Qty', label: 'Qty' },{ key: 'MR_Request_Status', label: 'Status' }];
const emptyForm = {
    MR_ID: '', MR_Req_No: '', MR_Material_No: '', MR_Material_Name: '', MR_Size: '', MR_Qty: 0,
    MR_Req_Date: '', MR_Remarks: '', MR_Status: 'A', MR_Request_Status: 'Pending',
    MR_Approval_Person: '', MR_Approval_Date: '', MR_Created_by: '', MR_Created_date: new Date().toISOString().slice(0, 10),
    MR_Department: '', MR_JOB_Card: '', MR_Material_ID: '', MR_Team_Id: '',
};
const MaterialRequest = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('materialRequests', editId, form); else addRecord('materialRequests', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Material Request" description="Departmental material requisitions with approval workflow" icon={ClipboardList} />
            <DataTable columns={columns} data={state.materialRequests || []} onAdd={openAdd} addLabel="New Request" onEdit={openEdit} onDelete={(r) => deleteRecord('materialRequests', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Request' : 'New Material Request'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="Material Details" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Material No" id="MR_Material_No" value={form.MR_Material_No} onChange={(e) => set('MR_Material_No', e.target.value)} required />
                            <FormField label="Material Name" id="MR_Material_Name" value={form.MR_Material_Name} onChange={(e) => set('MR_Material_Name', e.target.value)} required />
                            <FormField label="Size" id="MR_Size" value={form.MR_Size} onChange={(e) => set('MR_Size', e.target.value)} />
                            <FormField label="Qty" id="MR_Qty" type="number" value={form.MR_Qty} onChange={(e) => set('MR_Qty', e.target.value)} required />
                            <FormField label="Job Card" id="MR_JOB_Card" value={form.MR_JOB_Card} onChange={(e) => set('MR_JOB_Card', e.target.value)} />
                            <FormField label="Request Date" id="MR_Req_Date" type="date" value={form.MR_Req_Date} onChange={(e) => set('MR_Req_Date', e.target.value)} />
                            <FormField label="Remarks" id="MR_Remarks" className="md:col-span-2" value={form.MR_Remarks} onChange={(e) => set('MR_Remarks', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Approval" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Request Status" id="MR_Request_Status" value={form.MR_Request_Status} onChange={(e) => set('MR_Request_Status', e.target.value)} />
                            <FormField label="Approval Person" id="MR_Approval_Person" value={form.MR_Approval_Person} onChange={(e) => set('MR_Approval_Person', e.target.value)} />
                            <FormField label="Approval Date" id="MR_Approval_Date" type="date" value={form.MR_Approval_Date} onChange={(e) => set('MR_Approval_Date', e.target.value)} />
                            <FormField label="Status" id="MR_Status" value={form.MR_Status} onChange={(e) => set('MR_Status', e.target.value)} />
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
export default MaterialRequest;
