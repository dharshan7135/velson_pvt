import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { RefreshCw } from 'lucide-react';
const columns = [{ key: 'GC_No', label: 'GC No' },{ key: 'Raw_Material_Part_Name', label: 'Part' },{ key: 'Raw_Material_Qty', label: 'Qty' },{ key: 'Created_By', label: 'By' }];
const emptyForm = {
    Row_Id: '', JED_Row_Id: '', Raw_Matrial_Part_Id: '',
    GC_No: '', JED_Barcode_: '', Raw_Material_Part_Name: '',
    Raw_Material_Entry_Date: '', Created_Date: new Date().toISOString().slice(0, 10), Created_By: '',
    Cutting_Size: '', Raw_Material_Qty: 0, Raw_Material_Wt: 0, Heat_TB_Wt: 0,
    Material_Specification: '', No_Of_Drawing_Sheet: '', Raw_Material_Entry_By: '',
};
const JobEntryDetailsUpdate = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('jobEntryDetailsUpdate', editId, form); else addRecord('jobEntryDetailsUpdate', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Job Details Update" description="Raw material updates to job detail records" icon={RefreshCw} />
            <DataTable columns={columns} data={state.jobEntryDetailsUpdate || []} onAdd={openAdd} addLabel="New Update" onEdit={openEdit} onDelete={(r) => deleteRecord('jobEntryDetailsUpdate', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Update'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="GC No" id="GC_No" value={form.GC_No} onChange={(e) => set('GC_No', e.target.value)} required />
                        <FormField label="Part Name" id="Raw_Material_Part_Name" value={form.Raw_Material_Part_Name} onChange={(e) => set('Raw_Material_Part_Name', e.target.value)} />
                        <FormField label="Cutting Size" id="Cutting_Size" value={form.Cutting_Size} onChange={(e) => set('Cutting_Size', e.target.value)} />
                        <FormField label="RM Qty" id="Raw_Material_Qty" type="number" value={form.Raw_Material_Qty} onChange={(e) => set('Raw_Material_Qty', e.target.value)} />
                        <FormField label="RM Weight" id="Raw_Material_Wt" type="number" value={form.Raw_Material_Wt} onChange={(e) => set('Raw_Material_Wt', e.target.value)} />
                        <FormField label="Heat TB Wt" id="Heat_TB_Wt" type="number" value={form.Heat_TB_Wt} onChange={(e) => set('Heat_TB_Wt', e.target.value)} />
                        <FormField label="Material Spec" id="Material_Specification" value={form.Material_Specification} onChange={(e) => set('Material_Specification', e.target.value)} />
                        <FormField label="Drawing Sheets" id="No_Of_Drawing_Sheet" value={form.No_Of_Drawing_Sheet} onChange={(e) => set('No_Of_Drawing_Sheet', e.target.value)} />
                        <FormField label="Entry Date" id="Raw_Material_Entry_Date" type="date" value={form.Raw_Material_Entry_Date} onChange={(e) => set('Raw_Material_Entry_Date', e.target.value)} />
                        <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
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
export default JobEntryDetailsUpdate;
