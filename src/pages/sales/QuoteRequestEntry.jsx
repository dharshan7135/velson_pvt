import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardList, Database, FileText, Calendar, User, Info, CheckCircle2 } from 'lucide-react';

const columns = [
    { key: 'Req_No', label: 'Request No' },
    { key: 'Dept_Name', label: 'Department' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'Qty', label: 'Quantity' },
    { key: 'Approval_Status', label: 'Approval' },
];

const emptyForm = {
    // Basic Reference
    Item_ID: '', Dept_ID: '', UOM_ID: '', Created_by: '',
    // Document Details
    Req_No: '', Job_No: '', Item_Code: '', PO_Number: '', Qutoe_Ref: '',
    // Dates
    Req_Date: '', Required_Date: '', ETA: '', PO_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    // Names & Context
    Dept_Name: '', Item_Name: '', Request_User: '', Description: '', Specification: '', Purpose: '',
    // Quantity
    UOM: '', Qty: 0,
    // Status & Logic
    Status: 'A', Approval_Status: 'Pending', QC: 'No',
};

const QuoteRequestEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const save = () => {
        if (editId) updateRecord('quoteRequests', editId, form);
        else addRecord('quoteRequests', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Internal Quote/Request" description="Manage departmental item requests and internal quotes" icon={ClipboardList} />
            
            <DataTable 
                columns={columns} 
                data={state.quoteRequests || []} 
                onAdd={openAdd} 
                addLabel="New Request" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quoteRequests', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Request' : 'New Internal Request'} size="lg">
                <div className="p-6 space-y-6">
                    {/* Identification */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Request Identifiers" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} required />
                                <FormField label="Department Name" id="Dept_Name" value={form.Dept_Name} onChange={(e) => set('Dept_Name', e.target.value)} required />
                                <FormField label="Department ID" id="Dept_ID" value={form.Dept_ID} onChange={(e) => set('Dept_ID', e.target.value)} />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Item Reference" icon={FileText}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Quantity (Qty)" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Timeline & User */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Timeline & Users" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request Date" id="Req_Date" type="date" value={form.Req_Date} onChange={(e) => set('Req_Date', e.target.value)} />
                                <FormField label="Required By" id="Required_Date" type="date" value={form.Required_Date} onChange={(e) => set('Required_Date', e.target.value)} />
                                <FormField label="Estimated (ETA)" id="ETA" type="date" value={form.ETA} onChange={(e) => set('ETA', e.target.value)} />
                                <FormField label="Requested By User" id="Request_User" icon={User} value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} required />
                            </div>
                        </FormContainer>

                        <FormContainer title="External Links" icon={Info}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="PO Number" id="PO_Number" value={form.PO_Number} onChange={(e) => set('PO_Number', e.target.value)} />
                                <FormField label="PO Date" id="PO_Date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="Quote Ref" id="Qutoe_Ref" value={form.Qutoe_Ref} onChange={(e) => set('Qutoe_Ref', e.target.value)} />
                                <FormField label="Purpose" id="Purpose" value={form.Purpose} onChange={(e) => set('Purpose', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Additional Details */}
                    <FormContainer title="Specifications & Quality" icon={CheckCircle2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Specifications" id="Specification" value={form.Specification} onChange={(e) => set('Specification', e.target.value)} />
                            <FormField label="Quality Control (QC)" id="QC" value={form.QC} onChange={(e) => set('QC', e.target.value)} />
                            <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} className="md:col-span-2" onChange={(e) => set('Approval_Status', e.target.value)} />
                            <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update Request' : 'Submit Request'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuoteRequestEntry;
