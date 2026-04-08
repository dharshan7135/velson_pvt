import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { PackageCheck, Database, Ruler, Shield } from 'lucide-react';

const columns = [
    { key: 'GQ_Doc_No', label: 'Doc No' },
    { key: 'GQ_Part_Name', label: 'Part Name' },
    { key: 'GQ_Type', label: 'Type' },
    { key: 'GQ_Result', label: 'Result' },
    { key: 'GQ_Status', label: 'Status' },
];

const emptyForm = {
    GQ_iid: '', GQ_Item_ID: '', Job_ID: '',
    GQ_Doc_No: '', GQ_Rec_No: '', GQ_Part_No: '', Job_no: '',
    GQ_Rev_Date: '', GQ_CreatedDate: new Date().toISOString().slice(0, 10), GRND_Exp_Date1: '',
    GQ_Description: '', GQ_Remark: '', GQ_Part_Name: '', QC_REMARK: '',
    GQ_Type: '', Entry_Type: '',
    GQ_Status: 'A',
    GQ_GRND_ID: '', GQ_Specification: '',
    GQ_Min: 0, GQ_Max: 0, GQ_Equal: 0,
    GQ_Text: '', GQ_CheckMethod: '',
    GQ_Actual: '', GQ_Result: '', GQ_CreatedBy: '', GQ_QC_ID: '',
};

const GRNQCDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('grnQCDetails', editId, form); else addRecord('grnQCDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="GRN QC Details" description="Quality check details linked to GRN entries" icon={PackageCheck} />
            <DataTable columns={columns} data={state.grnQCDetails || []} onAdd={openAdd} addLabel="Add GRN QC" onEdit={openEdit} onDelete={(r) => deleteRecord('grnQCDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit GRN QC' : 'New GRN QC Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document & Part" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="GQ ID (PK)" id="GQ_iid" type="number" value={form.GQ_iid} onChange={(e) => set('GQ_iid', e.target.value)} required />
                                <FormField label="Doc No" id="GQ_Doc_No" value={form.GQ_Doc_No} onChange={(e) => set('GQ_Doc_No', e.target.value)} required />
                                <FormField label="Rec No" id="GQ_Rec_No" value={form.GQ_Rec_No} onChange={(e) => set('GQ_Rec_No', e.target.value)} />
                                <FormField label="Part Name" id="GQ_Part_Name" className="md:col-span-2" value={form.GQ_Part_Name} onChange={(e) => set('GQ_Part_Name', e.target.value)} required />
                                <FormField label="Part No" id="GQ_Part_No" value={form.GQ_Part_No} onChange={(e) => set('GQ_Part_No', e.target.value)} />
                                <FormField label="Job No" id="Job_no" value={form.Job_no} onChange={(e) => set('Job_no', e.target.value)} />
                                <FormField label="Rev Date" id="GQ_Rev_Date" value={form.GQ_Rev_Date} onChange={(e) => set('GQ_Rev_Date', e.target.value)} />
                                <FormField label="Exp Date" id="GRND_Exp_Date1" type="date" value={form.GRND_Exp_Date1} onChange={(e) => set('GRND_Exp_Date1', e.target.value)} />
                                <FormField label="Type" id="GQ_Type" value={form.GQ_Type} onChange={(e) => set('GQ_Type', e.target.value)} />
                                <FormField label="Entry Type" id="Entry_Type" value={form.Entry_Type} onChange={(e) => set('Entry_Type', e.target.value)} />
                                <FormField label="Description" id="GQ_Description" className="md:col-span-2" value={form.GQ_Description} onChange={(e) => set('GQ_Description', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Inspection & Tolerance" icon={Ruler}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Specification" id="GQ_Specification" className="md:col-span-2" value={form.GQ_Specification} onChange={(e) => set('GQ_Specification', e.target.value)} />
                                <FormField label="Check Method" id="GQ_CheckMethod" className="md:col-span-2" value={form.GQ_CheckMethod} onChange={(e) => set('GQ_CheckMethod', e.target.value)} />
                                <FormField label="Min" id="GQ_Min" type="number" value={form.GQ_Min} onChange={(e) => set('GQ_Min', e.target.value)} />
                                <FormField label="Max" id="GQ_Max" type="number" value={form.GQ_Max} onChange={(e) => set('GQ_Max', e.target.value)} />
                                <FormField label="Equal" id="GQ_Equal" type="number" value={form.GQ_Equal} onChange={(e) => set('GQ_Equal', e.target.value)} />
                                <FormField label="Text" id="GQ_Text" value={form.GQ_Text} onChange={(e) => set('GQ_Text', e.target.value)} />
                                <FormField label="Actual" id="GQ_Actual" className="font-bold text-[#0097A7] bg-cyan-50" value={form.GQ_Actual} onChange={(e) => set('GQ_Actual', e.target.value)} />
                                <FormField label="Result" id="GQ_Result" value={form.GQ_Result} onChange={(e) => set('GQ_Result', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Status & Remarks" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="GQ_Status" value={form.GQ_Status} onChange={(e) => set('GQ_Status', e.target.value)} />
                            <FormField label="Remark" id="GQ_Remark" value={form.GQ_Remark} onChange={(e) => set('GQ_Remark', e.target.value)} />
                            <FormField label="QC Remark" id="QC_REMARK" value={form.QC_REMARK} onChange={(e) => set('QC_REMARK', e.target.value)} />
                            <FormField label="Created By" id="GQ_CreatedBy" value={form.GQ_CreatedBy} onChange={(e) => set('GQ_CreatedBy', e.target.value)} />
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
export default GRNQCDetails;
