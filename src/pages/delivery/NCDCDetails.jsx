import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { ListOrdered } from 'lucide-react';
const columns = [{ key: 'DC_No', label: 'DC No' },{ key: 'NC_No', label: 'NC No' },{ key: 'Part_Name', label: 'Part' },{ key: 'Qty', label: 'Qty' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    Row_id: '', Item_Id: '', NC_row_Id: '',
    DC_No: '', Part_No: '', NC_No: '', Part_Name: '', EntryType: '',
    DC_Date: '', Update_By: '', Update_Date: '', Created_Date: new Date().toISOString().slice(0, 10), Created_By: '',
    Rate: 0, Amount: 0, Qty: 0, UOM: '', Weight: '',
    Status: 'A', DC_Part_Image: '', Barcode: '', Material_Source: '', HRC: '', Rework_Details: '', Entry_System: '',
};
const NCDCDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('ncDCDetails', editId, form); else addRecord('ncDCDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="NC DC Details" description="Non-conformance DC line items with rework details" icon={ListOrdered} />
            <DataTable columns={columns} data={state.ncDCDetails || []} onAdd={openAdd} addLabel="Add Line" onEdit={openEdit} onDelete={(r) => deleteRecord('ncDCDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New NC DC Line'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="DC No" id="DC_No" value={form.DC_No} onChange={(e) => set('DC_No', e.target.value)} required />
                        <FormField label="NC No" id="NC_No" value={form.NC_No} onChange={(e) => set('NC_No', e.target.value)} />
                        <FormField label="Part No" id="Part_No" value={form.Part_No} onChange={(e) => set('Part_No', e.target.value)} />
                        <FormField label="Part Name" id="Part_Name" value={form.Part_Name} onChange={(e) => set('Part_Name', e.target.value)} required />
                        <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                        <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                        <FormField label="Rate" id="Rate" type="number" value={form.Rate} onChange={(e) => set('Rate', e.target.value)} />
                        <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} />
                        <FormField label="Weight" id="Weight" value={form.Weight} onChange={(e) => set('Weight', e.target.value)} />
                        <FormField label="Entry Type" id="EntryType" value={form.EntryType} onChange={(e) => set('EntryType', e.target.value)} />
                        <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                        <FormField label="Material Source" id="Material_Source" value={form.Material_Source} onChange={(e) => set('Material_Source', e.target.value)} />
                        <FormField label="Rework Details" id="Rework_Details" className="md:col-span-2" value={form.Rework_Details} onChange={(e) => set('Rework_Details', e.target.value)} />
                        <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default NCDCDetails;
