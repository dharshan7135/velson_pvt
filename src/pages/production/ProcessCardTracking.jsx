import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { History, Database, Package } from 'lucide-react';
const columns = [{ key: 'PCD_Jobcard_No', label: 'Job Card' },{ key: 'PCD_Process_Name', label: 'Process' },{ key: 'Production_Qty', label: 'Prod' },{ key: 'Job_Status', label: 'Status' }];
const emptyForm = {
    PCD_ID: '', PCD_Order_No: '', PCD_Item_ID: '', PCD_Part_Id: '', PCD_Operator_Id: '', PCD_Out_Operator_ID: '', PM_ID: '', applicale_operator_Id: '',
    PCD_Jobcard_No: '', PCD_date: '', PCD_Out_Date: '', applicale_Entry_Date: '', Expaect_Complete_Date: '', deleted_Date: '',
    Setting_Time: '', Cycle_Time: '', Handling_Time: '', PCD_Created_Date: new Date().toISOString().slice(0, 10),
    PCD_Process_Name: '', PCD_Process_Name1: '', PCD_Operator_Name: '', PCD_Remark: '', PCD_Out_Remarks: '',
    Rework_Remark: '', applicale_operator_Name: '', System_Name: '',
    Production_Qty: '', Rejected_Qty: '', PCD_Process_Type: '', Process_Order: 0,
    PCD_Status: 'A', Job_Status: '', PCD_created_By: '', PCD_Team: '', PCD_Barcode: '', PCD_Stage: 0,
    PCD_Operator: '', PCD_Out_Department: '', PCD_Process_Stage: '', Process_visble: 0, Days: 0, Deleted_By: '',
};
const ProcessCardTracking = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('processCardTracking', editId, form); else addRecord('processCardTracking', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Process Card Tracking" description="Tracked process card details with deletion audit" icon={History} />
            <DataTable columns={columns} data={state.processCardTracking || []} onAdd={openAdd} addLabel="Add Track" onEdit={openEdit} onDelete={(r) => deleteRecord('processCardTracking', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Track'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Process Info" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Job Card" id="PCD_Jobcard_No" value={form.PCD_Jobcard_No} onChange={(e) => set('PCD_Jobcard_No', e.target.value)} required />
                                <FormField label="Process Name" id="PCD_Process_Name" value={form.PCD_Process_Name} onChange={(e) => set('PCD_Process_Name', e.target.value)} />
                                <FormField label="Operator" id="PCD_Operator_Name" value={form.PCD_Operator_Name} onChange={(e) => set('PCD_Operator_Name', e.target.value)} />
                                <FormField label="Process Type" id="PCD_Process_Type" value={form.PCD_Process_Type} onChange={(e) => set('PCD_Process_Type', e.target.value)} />
                                <FormField label="Process Date" id="PCD_date" type="date" value={form.PCD_date} onChange={(e) => set('PCD_date', e.target.value)} />
                                <FormField label="System" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Quantity & Status" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Production Qty" id="Production_Qty" value={form.Production_Qty} onChange={(e) => set('Production_Qty', e.target.value)} />
                                <FormField label="Rejected Qty" id="Rejected_Qty" value={form.Rejected_Qty} onChange={(e) => set('Rejected_Qty', e.target.value)} />
                                <FormField label="Job Status" id="Job_Status" value={form.Job_Status} onChange={(e) => set('Job_Status', e.target.value)} />
                                <FormField label="Remark" id="PCD_Remark" value={form.PCD_Remark} onChange={(e) => set('PCD_Remark', e.target.value)} />
                                <FormField label="Deleted By" id="Deleted_By" value={form.Deleted_By} onChange={(e) => set('Deleted_By', e.target.value)} />
                                <FormField label="Status" id="PCD_Status" value={form.PCD_Status} onChange={(e) => set('PCD_Status', e.target.value)} />
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
export default ProcessCardTracking;
