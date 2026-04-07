import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardList, Database, Package, Shield, Calendar } from 'lucide-react';
const columns = [{ key: 'Req_No', label: 'Req No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Qty', label: 'Qty' },{ key: 'Approval_Status', label: 'Approval' },{ key: 'Issue_Status', label: 'Issue' }];
const emptyForm = {
    ID: '', Machine_ID: '', Item_ID: '', Created_by: '', Dept_ID: '', UOM_ID: '', Store_Id: '', Model_Id: '', Request_For_Id: '',
    Req_No: '', Job_No: '', Machine_No: '', Item_Code: '', JE_Job_No: '', PR_Number: '',
    Req_Date: '', Required_Date: '', ETA: '', Deleted_Date: '', PR_date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Dept_Name: '', Item_Name: '', Description: '', Store_Name: '', System_Name: '', Model_Name: '', Remark: '', Specification: '', Purpose: '',
    UOM: '', Qty: 0, Rej_Qty: 0, Approval_Qty: 0,
    Status: 'A', Approval_Status: 'Pending', Approval_By: '', Approval_Date: '', Approval_Department: '', Issue_Status: '',
    Request_User: '', Team: '', QC_Dept: 'No', Request_For: '', Deleted_By: '', Days: 0,
};
const MaterialRequest1 = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('materialRequests1', editId, form); else addRecord('materialRequests1', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Material Request (Extended)" description="Extended material requisition with store, model, and approval" icon={ClipboardList} />
            <DataTable columns={columns} data={state.materialRequests1 || []} onAdd={openAdd} addLabel="New Request" onEdit={openEdit} onDelete={(r) => deleteRecord('materialRequests1', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Request' : 'New Material Request'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Request & Department" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} required />
                                <FormField label="Department" id="Dept_Name" value={form.Dept_Name} onChange={(e) => set('Dept_Name', e.target.value)} />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                                <FormField label="Machine No" id="Machine_No" value={form.Machine_No} onChange={(e) => set('Machine_No', e.target.value)} />
                                <FormField label="Request User" id="Request_User" value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} />
                                <FormField label="Team" id="Team" value={form.Team} onChange={(e) => set('Team', e.target.value)} />
                                <FormField label="Store Name" id="Store_Name" value={form.Store_Name} onChange={(e) => set('Store_Name', e.target.value)} />
                                <FormField label="Model Name" id="Model_Name" value={form.Model_Name} onChange={(e) => set('Model_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Item & Quantity" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Description" id="Description" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Request For" id="Request_For" value={form.Request_For} onChange={(e) => set('Request_For', e.target.value)} />
                                <FormField label="Purpose" id="Purpose" value={form.Purpose} onChange={(e) => set('Purpose', e.target.value)} />
                                <FormField label="Remark" id="Remark" value={form.Remark} onChange={(e) => set('Remark', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Dates" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request Date" id="Req_Date" type="date" value={form.Req_Date} onChange={(e) => set('Req_Date', e.target.value)} />
                                <FormField label="Required Date" id="Required_Date" type="date" value={form.Required_Date} onChange={(e) => set('Required_Date', e.target.value)} />
                                <FormField label="ETA" id="ETA" type="date" value={form.ETA} onChange={(e) => set('ETA', e.target.value)} />
                                <FormField label="PR Number" id="PR_Number" value={form.PR_Number} onChange={(e) => set('PR_Number', e.target.value)} />
                                <FormField label="Days" id="Days" type="number" value={form.Days} onChange={(e) => set('Days', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Approval" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                                <FormField label="Approval Qty" id="Approval_Qty" type="number" value={form.Approval_Qty} onChange={(e) => set('Approval_Qty', e.target.value)} />
                                <FormField label="Approved By" id="Approval_By" value={form.Approval_By} onChange={(e) => set('Approval_By', e.target.value)} />
                                <FormField label="Approval Dept" id="Approval_Department" value={form.Approval_Department} onChange={(e) => set('Approval_Department', e.target.value)} />
                                <FormField label="Issue Status" id="Issue_Status" value={form.Issue_Status} onChange={(e) => set('Issue_Status', e.target.value)} />
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
export default MaterialRequest1;
