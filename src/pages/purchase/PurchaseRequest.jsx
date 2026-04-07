import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardList, Database, Calendar, Info, Shield, Package } from 'lucide-react';

const columns = [
    { key: 'Req_No', label: 'Request No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Dept_Name', label: 'Department' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Approval_Status', label: 'Approval' },
];

const emptyForm = {
    ID: '', Machine_ID: '', Item_ID: '', Created_by: '', Dept_ID: '', UOM_ID: '',
    Req_No: '', Job_No: '', Machine_No: '', Item_Code: '', PO_Number: '',
    Req_Date: '', Required_Date: '', ETA: '', PO_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Dept_Name: '', Item_Name: '', Description: '', Specification: '', Purpose: '', Request_User: '', Team: '',
    UOM: '', Qty: 0, ok_Qty: 0, Rej_Qty: 0,
    Status: 'A', Approval_Status: 'Pending', Approved_By: '', Approved_Date: '', QC_Dept: 'No', Rejected_Reason: '',
};

const PurchaseRequest = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('purchaseRequests', editId, form); else addRecord('purchaseRequests', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Purchase Request" description="Departmental purchase requisitions and approval workflow" icon={ClipboardList} />
            <DataTable columns={columns} data={state.purchaseRequests || []} onAdd={openAdd} addLabel="New Request" onEdit={openEdit} onDelete={(r) => deleteRecord('purchaseRequests', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Request' : 'New Purchase Request'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Request & Department" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} required />
                                <FormField label="Department" id="Dept_Name" value={form.Dept_Name} onChange={(e) => set('Dept_Name', e.target.value)} required />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                                <FormField label="Machine No" id="Machine_No" value={form.Machine_No} onChange={(e) => set('Machine_No', e.target.value)} />
                                <FormField label="Request User" id="Request_User" value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} />
                                <FormField label="Team" id="Team" value={form.Team} onChange={(e) => set('Team', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Item Details" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Description" id="Description" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                                <FormField label="Specification" id="Specification" value={form.Specification} onChange={(e) => set('Specification', e.target.value)} />
                                <FormField label="Purpose" id="Purpose" value={form.Purpose} onChange={(e) => set('Purpose', e.target.value)} />
                                <FormField label="PO Number" id="PO_Number" value={form.PO_Number} onChange={(e) => set('PO_Number', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Quantity & Timeline" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="OK Qty" id="ok_Qty" type="number" value={form.ok_Qty} onChange={(e) => set('ok_Qty', e.target.value)} />
                                <FormField label="Rejected Qty" id="Rej_Qty" type="number" value={form.Rej_Qty} onChange={(e) => set('Rej_Qty', e.target.value)} />
                                <FormField label="Request Date" id="Req_Date" type="date" value={form.Req_Date} onChange={(e) => set('Req_Date', e.target.value)} />
                                <FormField label="Required Date" id="Required_Date" type="date" value={form.Required_Date} onChange={(e) => set('Required_Date', e.target.value)} />
                                <FormField label="ETA" id="ETA" type="date" value={form.ETA} onChange={(e) => set('ETA', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Approval & Status" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                                <FormField label="Approved By" id="Approved_By" value={form.Approved_By} onChange={(e) => set('Approved_By', e.target.value)} />
                                <FormField label="Approved Date" id="Approved_Date" type="date" value={form.Approved_Date} onChange={(e) => set('Approved_Date', e.target.value)} />
                                <FormField label="QC Dept" id="QC_Dept" value={form.QC_Dept} onChange={(e) => set('QC_Dept', e.target.value)} />
                                <FormField label="Rejected Reason" id="Rejected_Reason" value={form.Rejected_Reason} onChange={(e) => set('Rejected_Reason', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Submit'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default PurchaseRequest;
