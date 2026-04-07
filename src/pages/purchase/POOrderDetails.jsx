import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { ListOrdered } from 'lucide-react';
const columns = [{ key: 'POD_Item_Name', label: 'Item' },{ key: 'POD_Qty', label: 'Qty' },{ key: 'POD_Rate', label: 'Rate' },{ key: 'POD_Status', label: 'Status' }];
const emptyForm = { POD_IID: '', POD_PO_ID: '', POD_Item_ID: '', POD_Item_Name: '', POD_Rate: 0, POD_UOM: '', POD_Qty: 0, POD_Status: 'A', POD_Created_By: '', POD_Created_Date: new Date().toISOString().slice(0, 10) };
const POOrderDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('poOrderDetails', editId, form); else addRecord('poOrderDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="PO Order Details" description="PO line-level item details with rate and quantity" icon={ListOrdered} />
            <DataTable columns={columns} data={state.poOrderDetails || []} onAdd={openAdd} addLabel="Add Line" onEdit={openEdit} onDelete={(r) => deleteRecord('poOrderDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Line' : 'New PO Detail Line'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="PO ID" id="POD_PO_ID" value={form.POD_PO_ID} onChange={(e) => set('POD_PO_ID', e.target.value)} required />
                    <FormField label="Item ID" id="POD_Item_ID" value={form.POD_Item_ID} onChange={(e) => set('POD_Item_ID', e.target.value)} required />
                    <FormField label="Item Name" id="POD_Item_Name" value={form.POD_Item_Name} onChange={(e) => set('POD_Item_Name', e.target.value)} required />
                    <FormField label="UOM" id="POD_UOM" value={form.POD_UOM} onChange={(e) => set('POD_UOM', e.target.value)} />
                    <FormField label="Qty" id="POD_Qty" type="number" value={form.POD_Qty} onChange={(e) => set('POD_Qty', e.target.value)} required />
                    <FormField label="Rate" id="POD_Rate" type="number" value={form.POD_Rate} onChange={(e) => set('POD_Rate', e.target.value)} required />
                    <FormField label="Created By" id="POD_Created_By" value={form.POD_Created_By} onChange={(e) => set('POD_Created_By', e.target.value)} />
                    <FormField label="Status" id="POD_Status" value={form.POD_Status} onChange={(e) => set('POD_Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default POOrderDetails;
