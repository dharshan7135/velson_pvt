import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListChecks, Database, Package, Shield, Ruler } from 'lucide-react';

const columns = [
    { key: 'QC_NO', label: 'QC No' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'Inspection_Type', label: 'Inspection Type' },
    { key: 'Actual_Value', label: 'Actual Value' },
    { key: 'Result_Status', label: 'Result' },
];

const emptyForm = {
    ID: '', Item_ID: '', Created_by: '',
    QC_NO: '', Item_Code: '', Lot_No: '', Display_Order_No: '',
    QC_Date: '',
    Item_Name: '', Description: '', Instrument_Name: '', Remarks: '',
    Actual_Value: '',
    UOM: '',
    Inspection_Type: '', Tolerance_Type: '',
    Result_Status: '',
    Created_Date: new Date().toISOString().slice(0, 10),
    Inspection_ID: '', Check_Method: '', Spec: '',
    Min_Val: 0, Max_Val: 0, Equal_Val: 0,
    Rejection_Reson: '', Statsu: 'A',
};

const QCEntryDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('qcEntryDetails', editId, form); else addRecord('qcEntryDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="QC Entry Details" description="Inspection parameters, tolerances and results for QC entries" icon={ListChecks} />
            <DataTable columns={columns} data={state.qcEntryDetails || []} onAdd={openAdd} addLabel="Add Detail" onEdit={openEdit} onDelete={(r) => deleteRecord('qcEntryDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Detail' : 'New QC Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="QC & Item" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="ID (PK)" id="ID" type="number" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="QC No" id="QC_NO" value={form.QC_NO} onChange={(e) => set('QC_NO', e.target.value)} required />
                                <FormField label="QC Date" id="QC_Date" type="date" value={form.QC_Date} onChange={(e) => set('QC_Date', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="Lot No" id="Lot_No" value={form.Lot_No} onChange={(e) => set('Lot_No', e.target.value)} />
                                <FormField label="Display Order" id="Display_Order_No" value={form.Display_Order_No} onChange={(e) => set('Display_Order_No', e.target.value)} />
                                <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Inspection Parameters" icon={Ruler}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Inspection Type" id="Inspection_Type" value={form.Inspection_Type} onChange={(e) => set('Inspection_Type', e.target.value)} />
                                <FormField label="Tolerance Type" id="Tolerance_Type" value={form.Tolerance_Type} onChange={(e) => set('Tolerance_Type', e.target.value)} />
                                <FormField label="Check Method" id="Check_Method" value={form.Check_Method} onChange={(e) => set('Check_Method', e.target.value)} />
                                <FormField label="Instrument Name" id="Instrument_Name" value={form.Instrument_Name} onChange={(e) => set('Instrument_Name', e.target.value)} />
                                <FormField label="Spec" id="Spec" value={form.Spec} onChange={(e) => set('Spec', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Min Value" id="Min_Val" type="number" value={form.Min_Val} onChange={(e) => set('Min_Val', e.target.value)} />
                                <FormField label="Max Value" id="Max_Val" type="number" value={form.Max_Val} onChange={(e) => set('Max_Val', e.target.value)} />
                                <FormField label="Equal Value" id="Equal_Val" type="number" value={form.Equal_Val} onChange={(e) => set('Equal_Val', e.target.value)} />
                                <FormField label="Actual Value" id="Actual_Value" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Actual_Value} onChange={(e) => set('Actual_Value', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Result & Status" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Result Status" id="Result_Status" value={form.Result_Status} onChange={(e) => set('Result_Status', e.target.value)} />
                            <FormField label="Rejection Reason" id="Rejection_Reson" value={form.Rejection_Reson} onChange={(e) => set('Rejection_Reson', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            <FormField label="Status" id="Statsu" value={form.Statsu} onChange={(e) => set('Statsu', e.target.value)} />
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
export default QCEntryDetails;
