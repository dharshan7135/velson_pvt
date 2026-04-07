import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Truck, DollarSign } from 'lucide-react';
const columns = [{ key: 'PO_NO', label: 'PO No' },{ key: 'Freight_Name', label: 'Freight' },{ key: 'Amount', label: 'Amount' },{ key: 'Status', label: 'Status' }];
const emptyForm = { ID: '', Created_by: '', PO_NO: '', Freight_Name: '', Amount: 0, Percentage: 0, Status: 'A', Created_Date: new Date().toISOString().slice(0, 10) };
const PurchaseFreight = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('purchaseFreight', editId, form); else addRecord('purchaseFreight', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Purchase Freight" description="Freight charges linked to purchase orders" icon={Truck} />
            <DataTable columns={columns} data={state.purchaseFreight || []} onAdd={openAdd} addLabel="Add Freight" onEdit={openEdit} onDelete={(r) => deleteRecord('purchaseFreight', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Freight' : 'New Freight Detail'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="PO No" id="PO_NO" value={form.PO_NO} onChange={(e) => set('PO_NO', e.target.value)} required />
                    <FormField label="Freight Name" id="Freight_Name" value={form.Freight_Name} onChange={(e) => set('Freight_Name', e.target.value)} required />
                    <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} required />
                    <FormField label="Percentage" id="Percentage" type="number" value={form.Percentage} onChange={(e) => set('Percentage', e.target.value)} />
                    <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                    <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default PurchaseFreight;
