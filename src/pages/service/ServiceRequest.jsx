import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardList, Database, Calendar, Package, Shield } from 'lucide-react';

const columns = [
    { key: 'Req_No', label: 'Request No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Dept_Name', label: 'Department' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Approval_Status', label: 'Approval' },
];

const emptyForm = {
    ID: '', Item_ID: '', Created_by: '',
    Req_No: '', Job_No: '', Item_Code: '', PO_Number: '',
    Req_Date: '', Required_Date: '', ETA: '', PO_Date: '',
    Dept_Name: '', Item_Name: '', Description: '',
    UOM: '', UOM_ID: '', Qty: 0,
    Status: 'A', Approval_Status: 'Pending',
    Created_Date: new Date().toISOString().slice(0, 10),
    Dept_ID: '', Request_User: '', Specification: '', Purpose: '', QC: '',
};

const ServiceRequest = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('serviceRequests', editId, form); else addRecord('serviceRequests', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Service Request" description="Service material requisitions and approval workflow" icon={ClipboardList} />
            <DataTable columns={columns} data={state.serviceRequests || []} onAdd={openAdd} addLabel="New Request" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceRequests', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Request' : 'New Service Request'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Request & Department" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} required />
                                <FormField label="Department" id="Dept_Name" value={form.Dept_Name} onChange={(e) => set('Dept_Name', e.target.value)} required />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                                <FormField label="Request User" id="Request_User" value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} />
                                <FormField label="Purpose" id="Purpose" value={form.Purpose} onChange={(e) => set('Purpose', e.target.value)} />
                                <FormField label="PO Number" id="PO_Number" value={form.PO_Number} onChange={(e) => set('PO_Number', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Item Details" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Description" id="Description" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                                <FormField label="Specification" id="Specification" value={form.Specification} onChange={(e) => set('Specification', e.target.value)} />
                                <FormField label="QC" id="QC" value={form.QC} onChange={(e) => set('QC', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Quantity & Timeline" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Request Date" id="Req_Date" type="date" value={form.Req_Date} onChange={(e) => set('Req_Date', e.target.value)} />
                                <FormField label="Required Date" id="Required_Date" type="date" value={form.Required_Date} onChange={(e) => set('Required_Date', e.target.value)} />
                                <FormField label="ETA" id="ETA" type="date" value={form.ETA} onChange={(e) => set('ETA', e.target.value)} />
                                <FormField label="PO Date" id="PO_Date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Approval & Status" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
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
export default ServiceRequest;
