import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Settings, Database, Package, Shield, Clock } from 'lucide-react';
const columns = [{ key: 'PCD_Jobcard_No', label: 'Job Card' },{ key: 'PCD_Process_Name', label: 'Process' },{ key: 'Production_Qty', label: 'Prod Qty' },{ key: 'QC_Accepted_Qty', label: 'QC OK' },{ key: 'Job_Status', label: 'Status' }];
const emptyForm = {
    PCD_ID: '', PCD_Order_No: '', PCD_Item_ID: '', PCD_Machine_Id: '', PCD_Part_Id: '', PCD_Operator_Id: '', PCD_Out_Operator_ID: '', QC_Operator_Id: '', PM_ID: '', applicale_operator_Id: '',
    PCD_Jobcard_No: '', PCD_Work_Center_No: '', S_No: '', PCD_MR_No: '',
    PCD_date: '', PCD_Out_Date: '', Setting_Time: '', Cycle_Time: '', Handling_Time: '', QC_Date: '',
    Actual_Setting_Time: 0, Actual_Cycle_Time: 0, Actual_Handling_Time: 0, applicale_Entry_Date: '', Expaect_Complete_Date: '',
    PCD_Created_Date: new Date().toISOString().slice(0, 10),
    PCD_Process_Name: '', PCD_Process_Name1: '', PCD_Operator_Name: '', PCD_Remark: '', PCD_Out_Remarks: '',
    PCD_Machine_Name: '', QC_Operator_Name: '', Rework_Remark: '', applicale_operator_Name: '',
    Production_Qty: 0, Rejected_Qty: 0, QC_Accepted_Qty: 0, QC_Rejected_Qty: 0, QC_Rework_Qty: 0, PCD_Qty: 0,
    PCD_Process_Type: '', Process_Order: 0, PCD_Status: 'A', Job_Status: '',
    PCD_created_By: '', QC_Created_By: '', PCD_Team: '', PCD_Barcode: '', PCD_Stage: 0,
    PCD_Operator: '', PCD_Out_Department: '', PCD_Process_Stage: '', QC_Rejection_Reason: '', Rejected_Reason: '',
    Process_visble: 0, Days: 0, Process_Complete_stage: '',
};
const ProcessCardDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('processCardDetails', editId, form); else addRecord('processCardDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Process Card Details" description="Process steps with operator, timing, QC, and production tracking" icon={Settings} />
            <DataTable columns={columns} data={state.processCardDetails || []} onAdd={openAdd} addLabel="Add Step" onEdit={openEdit} onDelete={(r) => deleteRecord('processCardDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Step' : 'New Process Step'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Process" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Job Card" id="PCD_Jobcard_No" value={form.PCD_Jobcard_No} onChange={(e) => set('PCD_Jobcard_No', e.target.value)} required />
                                <FormField label="Process Name" id="PCD_Process_Name" value={form.PCD_Process_Name} onChange={(e) => set('PCD_Process_Name', e.target.value)} required />
                                <FormField label="Process Type" id="PCD_Process_Type" value={form.PCD_Process_Type} onChange={(e) => set('PCD_Process_Type', e.target.value)} />
                                <FormField label="Machine" id="PCD_Machine_Name" value={form.PCD_Machine_Name} onChange={(e) => set('PCD_Machine_Name', e.target.value)} />
                                <FormField label="Operator" id="PCD_Operator_Name" value={form.PCD_Operator_Name} onChange={(e) => set('PCD_Operator_Name', e.target.value)} />
                                <FormField label="Work Center" id="PCD_Work_Center_No" value={form.PCD_Work_Center_No} onChange={(e) => set('PCD_Work_Center_No', e.target.value)} />
                                <FormField label="Process Date" id="PCD_date" type="date" value={form.PCD_date} onChange={(e) => set('PCD_date', e.target.value)} />
                                <FormField label="Out Date" id="PCD_Out_Date" type="date" value={form.PCD_Out_Date} onChange={(e) => set('PCD_Out_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Production Qty" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Process Qty" id="PCD_Qty" type="number" value={form.PCD_Qty} onChange={(e) => set('PCD_Qty', e.target.value)} />
                                <FormField label="Production Qty" id="Production_Qty" type="number" value={form.Production_Qty} onChange={(e) => set('Production_Qty', e.target.value)} />
                                <FormField label="Rejected Qty" id="Rejected_Qty" type="number" value={form.Rejected_Qty} onChange={(e) => set('Rejected_Qty', e.target.value)} />
                                <FormField label="QC Accepted" id="QC_Accepted_Qty" type="number" value={form.QC_Accepted_Qty} onChange={(e) => set('QC_Accepted_Qty', e.target.value)} />
                                <FormField label="QC Rejected" id="QC_Rejected_Qty" type="number" value={form.QC_Rejected_Qty} onChange={(e) => set('QC_Rejected_Qty', e.target.value)} />
                                <FormField label="QC Rework" id="QC_Rework_Qty" type="number" value={form.QC_Rework_Qty} onChange={(e) => set('QC_Rework_Qty', e.target.value)} />
                                <FormField label="Remark" id="PCD_Remark" value={form.PCD_Remark} onChange={(e) => set('PCD_Remark', e.target.value)} />
                                <FormField label="Job Status" id="Job_Status" value={form.Job_Status} onChange={(e) => set('Job_Status', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Timing" icon={Clock}>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <FormField label="Setting Time" id="Setting_Time" value={form.Setting_Time} onChange={(e) => set('Setting_Time', e.target.value)} />
                            <FormField label="Cycle Time" id="Cycle_Time" value={form.Cycle_Time} onChange={(e) => set('Cycle_Time', e.target.value)} />
                            <FormField label="Handling Time" id="Handling_Time" value={form.Handling_Time} onChange={(e) => set('Handling_Time', e.target.value)} />
                            <FormField label="Act Setting" id="Actual_Setting_Time" type="number" value={form.Actual_Setting_Time} onChange={(e) => set('Actual_Setting_Time', e.target.value)} />
                            <FormField label="Act Cycle" id="Actual_Cycle_Time" type="number" value={form.Actual_Cycle_Time} onChange={(e) => set('Actual_Cycle_Time', e.target.value)} />
                            <FormField label="Days" id="Days" type="number" value={form.Days} onChange={(e) => set('Days', e.target.value)} />
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
export default ProcessCardDetails;
