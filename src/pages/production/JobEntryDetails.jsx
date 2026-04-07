import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListOrdered, Database, Package, Shield, Cog, Calendar } from 'lucide-react';
const columns = [{ key: 'JED_Job_No', label: 'Job No' },{ key: 'JED_Part_No', label: 'Part No' },{ key: 'JED_Qty', label: 'Qty' },{ key: 'JED_Process_Status', label: 'Process' },{ key: 'QC_Status', label: 'QC' }];
const emptyForm = {
    JED_ID: '', JED_Job_ID: '', JED_Part_ID: '', RM_Barcode_Item_Id: '', Auto_po_job_Id: '', Raw_Material_Part_Id: '', PCD_Operator_Id: '',
    JED_Part_No: '', JED_Notes: '', Raw_Material_Issue_No: '', GC_No: '', Raw_Material_Part_No: '', JED_Job_No: '',
    Raw_Material_Entry_Date: '', Closed_Date: '', StartDate: '', cancel_date: '', QC_date: '',
    JED_Created_Date: new Date().toISOString().slice(0, 10),
    Complete_Process_Name: '', RM_Barcode_Item_Name: '', Doument_Name: '',
    JED_Qty: 0, JED_Weight: 0, JED_Unit: '', Request_Qty: 0, Cutting_Size: '', Raw_Material_Qty: 0, RM_Barcode_Qty: 0,
    QC_OK_Qty: 0, QC_Reject_Qty: 0, QC_Qty: 0, JED_Mold_Type: '', Approval_Qty: 0, PCD_Qty: 0,
    JED_Approval_Rejection_Person: '', JED_Approval_Rejection_Date: '', JED_Process_Status: '',
    Raw_Material_Issue_Status: '', Route_Card_Status: '', Process_Card_Status: '', QC_Status: '',
    JED_Created_by: '', JED_Modified_Date: '',
    JED_Material: '', JED_Dimension: '', JED_Statsu: 'A', JED_Barcode: '',
    Raw_Material_Wt: 0, Heat_TB_Wt: 0, Material_Specification: '', No_Of_Drawing_Sheet: '',
    Raw_Material_Entry_By: '', Closed_By: '', Process_Complete_stage: '', cancel_by: '', cancel_Reason: '',
    RM_Barcode: '', Rework_id: '', QC_Entry_BY: '',
};
const JobEntryDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobEntryDetails', editId, form); else addRecord('jobEntryDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job Entry Details" description="Job parts with raw material, QC, and process tracking" icon={ListOrdered} />
            <DataTable columns={columns} data={state.jobEntryDetails || []} onAdd={openAdd} addLabel="Add Part" onEdit={openEdit} onDelete={(r) => deleteRecord('jobEntryDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Part' : 'New Job Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Part & Job" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Job No" id="JED_Job_No" value={form.JED_Job_No} onChange={(e) => set('JED_Job_No', e.target.value)} required />
                                <FormField label="Part No" id="JED_Part_No" value={form.JED_Part_No} onChange={(e) => set('JED_Part_No', e.target.value)} required />
                                <FormField label="Material" id="JED_Material" value={form.JED_Material} onChange={(e) => set('JED_Material', e.target.value)} />
                                <FormField label="Dimension" id="JED_Dimension" value={form.JED_Dimension} onChange={(e) => set('JED_Dimension', e.target.value)} />
                                <FormField label="Mold Type" id="JED_Mold_Type" value={form.JED_Mold_Type} onChange={(e) => set('JED_Mold_Type', e.target.value)} />
                                <FormField label="GC No" id="GC_No" value={form.GC_No} onChange={(e) => set('GC_No', e.target.value)} />
                                <FormField label="Notes" id="JED_Notes" className="md:col-span-2" value={form.JED_Notes} onChange={(e) => set('JED_Notes', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantity & Material" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Qty" id="JED_Qty" type="number" value={form.JED_Qty} onChange={(e) => set('JED_Qty', e.target.value)} required />
                                <FormField label="Weight" id="JED_Weight" type="number" value={form.JED_Weight} onChange={(e) => set('JED_Weight', e.target.value)} />
                                <FormField label="Unit" id="JED_Unit" value={form.JED_Unit} onChange={(e) => set('JED_Unit', e.target.value)} />
                                <FormField label="Request Qty" id="Request_Qty" type="number" value={form.Request_Qty} onChange={(e) => set('Request_Qty', e.target.value)} />
                                <FormField label="Cutting Size" id="Cutting_Size" value={form.Cutting_Size} onChange={(e) => set('Cutting_Size', e.target.value)} />
                                <FormField label="Raw Material Qty" id="Raw_Material_Qty" type="number" value={form.Raw_Material_Qty} onChange={(e) => set('Raw_Material_Qty', e.target.value)} />
                                <FormField label="Raw Material Wt" id="Raw_Material_Wt" type="number" value={form.Raw_Material_Wt} onChange={(e) => set('Raw_Material_Wt', e.target.value)} />
                                <FormField label="Barcode" id="JED_Barcode" value={form.JED_Barcode} onChange={(e) => set('JED_Barcode', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="QC & Process Status" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Process Status" id="JED_Process_Status" value={form.JED_Process_Status} onChange={(e) => set('JED_Process_Status', e.target.value)} />
                            <FormField label="QC Status" id="QC_Status" value={form.QC_Status} onChange={(e) => set('QC_Status', e.target.value)} />
                            <FormField label="QC OK Qty" id="QC_OK_Qty" type="number" value={form.QC_OK_Qty} onChange={(e) => set('QC_OK_Qty', e.target.value)} />
                            <FormField label="QC Reject Qty" id="QC_Reject_Qty" type="number" value={form.QC_Reject_Qty} onChange={(e) => set('QC_Reject_Qty', e.target.value)} />
                            <FormField label="Route Card" id="Route_Card_Status" value={form.Route_Card_Status} onChange={(e) => set('Route_Card_Status', e.target.value)} />
                            <FormField label="Process Card" id="Process_Card_Status" value={form.Process_Card_Status} onChange={(e) => set('Process_Card_Status', e.target.value)} />
                            <FormField label="Approval Qty" id="Approval_Qty" type="number" value={form.Approval_Qty} onChange={(e) => set('Approval_Qty', e.target.value)} />
                            <FormField label="Status" id="JED_Statsu" value={form.JED_Statsu} onChange={(e) => set('JED_Statsu', e.target.value)} />
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
export default JobEntryDetails;
