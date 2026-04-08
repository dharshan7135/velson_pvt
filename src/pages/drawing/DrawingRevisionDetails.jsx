import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { RefreshCw, Database, Calendar, Package, Shield, Upload } from 'lucide-react';

const columns = [
    { key: 'DRD_Job_Number', label: 'Job Number' },
    { key: 'DRD_Drwaing_Number', label: 'Drawing No' },
    { key: 'DRD_Drawing_Name', label: 'Drawing Name' },
    { key: 'DRD_Revsion', label: 'Revision' },
    { key: 'DRD_Status', label: 'Status' },
];

const emptyForm = {
    DRD_ID: '',
    Dd_Item_Id: '',
    DRD_Job_Number: '',
    DRD_Drwaing_Number: '',
    DRD_Note: '',
    DRD_Tecnical_Issue_Date: '',
    DRD_Production_Received_Date: '',
    DRD_Drawing_Name: '',
    Dd_Item_Name: '',
    DRD_Status: 'A',
    DRD_Approval_Rejection_Person: '',
    DRD_Approval_Rejection_Date: '',
    DRD_Created_by: '',
    DRD_Created_date: new Date().toISOString().slice(0, 10),
    DRD_Remaks: '',
    DRD_Received_BY: '',
    DRD_Revsion: 0,
};

const DrawingRevisionDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('drawingRevisionDetails', editId, form); else addRecord('drawingRevisionDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Drawing Revision Details" description="Track drawing revisions, approvals and production issue history" icon={RefreshCw} />
            <DataTable columns={columns} data={state.drawingRevisionDetails || []} onAdd={openAdd} addLabel="New Revision" onEdit={openEdit} onDelete={(r) => deleteRecord('drawingRevisionDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Revision' : 'New Revision'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document Info" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Revision ID" id="DRD_ID" value={form.DRD_ID} onChange={(e) => set('DRD_ID', e.target.value)} required />
                                <FormField label="Job Number" id="DRD_Job_Number" value={form.DRD_Job_Number} onChange={(e) => set('DRD_Job_Number', e.target.value)} required />
                                <FormField label="Drawing Number" id="DRD_Drwaing_Number" value={form.DRD_Drwaing_Number} onChange={(e) => set('DRD_Drwaing_Number', e.target.value)} required />
                                <FormField label="Drawing Name" id="DRD_Drawing_Name" className="md:col-span-2" value={form.DRD_Drawing_Name} onChange={(e) => set('DRD_Drawing_Name', e.target.value)} required />
                                <FormField label="Item Name" id="Dd_Item_Name" className="md:col-span-2" value={form.Dd_Item_Name} onChange={(e) => set('Dd_Item_Name', e.target.value)} />
                                <FormField label="Note" id="DRD_Note" className="md:col-span-2" value={form.DRD_Note} onChange={(e) => set('DRD_Note', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Dates" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Technical Issue Date" id="DRD_Tecnical_Issue_Date" type="date" value={form.DRD_Tecnical_Issue_Date} onChange={(e) => set('DRD_Tecnical_Issue_Date', e.target.value)} />
                                <FormField label="Production Received Date" id="DRD_Production_Received_Date" type="date" value={form.DRD_Production_Received_Date} onChange={(e) => set('DRD_Production_Received_Date', e.target.value)} />
                                <FormField label="Approval/Rejection Date" id="DRD_Approval_Rejection_Date" type="date" value={form.DRD_Approval_Rejection_Date} onChange={(e) => set('DRD_Approval_Rejection_Date', e.target.value)} />
                                <FormField label="Created Date" id="DRD_Created_date" type="date" value={form.DRD_Created_date} onChange={(e) => set('DRD_Created_date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Status & Approval" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Status" id="DRD_Status" value={form.DRD_Status} onChange={(e) => set('DRD_Status', e.target.value)} />
                                <FormField label="Revision" id="DRD_Revsion" type="number" value={form.DRD_Revsion} onChange={(e) => set('DRD_Revsion', e.target.value)} />
                                <FormField label="Approval/Rejection Person" id="DRD_Approval_Rejection_Person" className="md:col-span-2" value={form.DRD_Approval_Rejection_Person} onChange={(e) => set('DRD_Approval_Rejection_Person', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Audit" icon={Upload}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Received By" id="DRD_Received_BY" value={form.DRD_Received_BY} onChange={(e) => set('DRD_Received_BY', e.target.value)} />
                                <FormField label="Remarks" id="DRD_Remaks" value={form.DRD_Remaks} onChange={(e) => set('DRD_Remaks', e.target.value)} />
                                <FormField label="Created By" id="DRD_Created_by" value={form.DRD_Created_by} onChange={(e) => set('DRD_Created_by', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Revision'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default DrawingRevisionDetails;
