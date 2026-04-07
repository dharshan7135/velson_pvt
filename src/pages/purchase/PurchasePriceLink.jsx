import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Link2 } from 'lucide-react';
const columns = [{ key: 'PL_Supplier_id', label: 'Supplier' },{ key: 'PL_Item_id', label: 'Item' },{ key: 'PL_Rate', label: 'Rate' },{ key: 'PL_Status', label: 'Status' }];
const emptyForm = { PL_id: '', PL_Supplier_id: '', PL_Item_id: '', PL_From_Dt: '', PL_To_Dt: '', PL_Rate: 0, PL_Status: 'A', PL_CreatedDate: new Date().toISOString().slice(0, 10), PL_User: '' };
const PurchasePriceLink = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('purchasePriceLink', editId, form); else addRecord('purchasePriceLink', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Purchase Price Link" description="Supplier-Item price contracts with validity periods" icon={Link2} />
            <DataTable columns={columns} data={state.purchasePriceLink || []} onAdd={openAdd} addLabel="New Price Link" onEdit={openEdit} onDelete={(r) => deleteRecord('purchasePriceLink', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Price Link' : 'New Price Link'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Supplier ID" id="PL_Supplier_id" value={form.PL_Supplier_id} onChange={(e) => set('PL_Supplier_id', e.target.value)} required />
                    <FormField label="Item ID" id="PL_Item_id" value={form.PL_Item_id} onChange={(e) => set('PL_Item_id', e.target.value)} required />
                    <FormField label="Rate" id="PL_Rate" type="number" value={form.PL_Rate} onChange={(e) => set('PL_Rate', e.target.value)} required />
                    <FormField label="From Date" id="PL_From_Dt" type="date" value={form.PL_From_Dt} onChange={(e) => set('PL_From_Dt', e.target.value)} />
                    <FormField label="To Date" id="PL_To_Dt" type="date" value={form.PL_To_Dt} onChange={(e) => set('PL_To_Dt', e.target.value)} />
                    <FormField label="User" id="PL_User" value={form.PL_User} onChange={(e) => set('PL_User', e.target.value)} />
                    <FormField label="Status" id="PL_Status" value={form.PL_Status} onChange={(e) => set('PL_Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default PurchasePriceLink;
