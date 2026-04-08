import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { AlertTriangle, Database, Shield, Package, RefreshCw } from 'lucide-react';

const columns = [
    { key: 'Part_Name', label: 'Part Name' },
    { key: 'Part_No', label: 'Part No' },
    { key: 'QC_Qty', label: 'QC Qty' },
    { key: 'NC_Status', label: 'NC Status' },
    { key: 'QC_Status', label: 'QC Status' },
];

const emptyForm = {
    Row_Id: '', Item_Id: '', Ledger_id: '', Created_by: '',
    Part_No: '', GRN_NO: '', Job_NO: '', DC_No: '',
    NC_Date: '', DC_Date: '',
    Part_Name: '', Ledger_Name: '', QC_Remarks: '',
    QC_Qty: 0, QC_Rejection_Qty: 0, QC_OK_Qty: 0, Re_work_Qty: 0,
    Re_work_Type: '', Entry_Type: '',
    NC_Status: '', Re_work_status: '', Re_work_status_date: '',
    Approval_Reject_user: '', Approval_Reject_date: '', Approval_Reject_Remark: '',
    QC_Status: '',
    Created_date: new Date().toISOString().slice(0, 10),
    NC_ID: '', GRN_Rowid: '', Re_work_user: '', Barcode: '', DC_Refrowid: '',
};

const NCDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('ncDetails', editId, form); else addRecord('ncDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Non-Conformance Details" description="Track NC reports, rework status and approval workflow" icon={AlertTriangle} />
            <DataTable columns={columns} data={state.ncDetails || []} onAdd={openAdd} addLabel="New NC Report" onEdit={openEdit} onDelete={(r) => deleteRecord('ncDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit NC Report' : 'New NC Report'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="NC Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Row ID (PK)" id="Row_Id" type="number" value={form.Row_Id} onChange={(e) => set('Row_Id', e.target.value)} required />
                                <FormField label="Part Name" id="Part_Name" className="md:col-span-2" value={form.Part_Name} onChange={(e) => set('Part_Name', e.target.value)} required />
                                <FormField label="Part No" id="Part_No" value={form.Part_No} onChange={(e) => set('Part_No', e.target.value)} />
                                <FormField label="GRN No" id="GRN_NO" value={form.GRN_NO} onChange={(e) => set('GRN_NO', e.target.value)} />
                                <FormField label="Job No" id="Job_NO" value={form.Job_NO} onChange={(e) => set('Job_NO', e.target.value)} />
                                <FormField label="DC No" id="DC_No" value={form.DC_No} onChange={(e) => set('DC_No', e.target.value)} />
                                <FormField label="NC Date" id="NC_Date" type="date" value={form.NC_Date} onChange={(e) => set('NC_Date', e.target.value)} />
                                <FormField label="DC Date" id="DC_Date" type="date" value={form.DC_Date} onChange={(e) => set('DC_Date', e.target.value)} />
                                <FormField label="Ledger Name" id="Ledger_Name" className="md:col-span-2" value={form.Ledger_Name} onChange={(e) => set('Ledger_Name', e.target.value)} />
                                <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                                <FormField label="Entry Type" id="Entry_Type" value={form.Entry_Type} onChange={(e) => set('Entry_Type', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantities" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="QC Qty" id="QC_Qty" type="number" value={form.QC_Qty} onChange={(e) => set('QC_Qty', e.target.value)} />
                                <FormField label="OK Qty" id="QC_OK_Qty" type="number" className="font-bold text-green-600 bg-green-50" value={form.QC_OK_Qty} onChange={(e) => set('QC_OK_Qty', e.target.value)} />
                                <FormField label="Rejection Qty" id="QC_Rejection_Qty" type="number" className="font-bold text-red-600 bg-red-50" value={form.QC_Rejection_Qty} onChange={(e) => set('QC_Rejection_Qty', e.target.value)} />
                                <FormField label="Rework Qty" id="Re_work_Qty" type="number" className="font-bold text-amber-600 bg-amber-50" value={form.Re_work_Qty} onChange={(e) => set('Re_work_Qty', e.target.value)} />
                                <FormField label="QC Remarks" id="QC_Remarks" className="md:col-span-2" value={form.QC_Remarks} onChange={(e) => set('QC_Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Rework Info" icon={RefreshCw}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Rework Type" id="Re_work_Type" value={form.Re_work_Type} onChange={(e) => set('Re_work_Type', e.target.value)} />
                                <FormField label="Rework Status" id="Re_work_status" value={form.Re_work_status} onChange={(e) => set('Re_work_status', e.target.value)} />
                                <FormField label="Rework Status Date" id="Re_work_status_date" type="date" value={form.Re_work_status_date} onChange={(e) => set('Re_work_status_date', e.target.value)} />
                                <FormField label="Rework User" id="Re_work_user" value={form.Re_work_user} onChange={(e) => set('Re_work_user', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Approval & Status" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="NC Status" id="NC_Status" value={form.NC_Status} onChange={(e) => set('NC_Status', e.target.value)} />
                                <FormField label="QC Status" id="QC_Status" value={form.QC_Status} onChange={(e) => set('QC_Status', e.target.value)} />
                                <FormField label="Approval/Reject User" id="Approval_Reject_user" value={form.Approval_Reject_user} onChange={(e) => set('Approval_Reject_user', e.target.value)} />
                                <FormField label="Approval/Reject Date" id="Approval_Reject_date" type="date" value={form.Approval_Reject_date} onChange={(e) => set('Approval_Reject_date', e.target.value)} />
                                <FormField label="Approval/Reject Remark" id="Approval_Reject_Remark" value={form.Approval_Reject_Remark} onChange={(e) => set('Approval_Reject_Remark', e.target.value)} />
                                <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save NC Report'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default NCDetails;
