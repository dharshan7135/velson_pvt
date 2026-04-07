import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { FileInput } from 'lucide-react';
const columns = [{ key: 'PO_PO_NO', label: 'PO No' },{ key: 'PO_Invoice_No', label: 'Invoice No' },{ key: 'PO_Date', label: 'Date' },{ key: 'PO_Status', label: 'Status' }];
const emptyForm = { PO_TransID: '', PO_Supllier_Id: '', PO_PO_NO: '', PO_Invoice_No: '', PO_Date: '', PO_Invoice_Date: '', PO_Status: 'A', PO_Created_Date: new Date().toISOString().slice(0, 10), PO_CreatedBy: '' };
const POOrder = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('poOrders', editId, form); else addRecord('poOrders', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="PO Order" description="Purchase order transaction records with supplier and invoice linkage" icon={FileInput} />
            <DataTable columns={columns} data={state.poOrders || []} onAdd={openAdd} addLabel="New PO Order" onEdit={openEdit} onDelete={(r) => deleteRecord('poOrders', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit PO Order' : 'New PO Order'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="PO No" id="PO_PO_NO" value={form.PO_PO_NO} onChange={(e) => set('PO_PO_NO', e.target.value)} required />
                    <FormField label="Supplier ID" id="PO_Supllier_Id" value={form.PO_Supllier_Id} onChange={(e) => set('PO_Supllier_Id', e.target.value)} required />
                    <FormField label="Invoice No" id="PO_Invoice_No" value={form.PO_Invoice_No} onChange={(e) => set('PO_Invoice_No', e.target.value)} />
                    <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                    <FormField label="Invoice Date" id="PO_Invoice_Date" type="date" value={form.PO_Invoice_Date} onChange={(e) => set('PO_Invoice_Date', e.target.value)} />
                    <FormField label="Created By" id="PO_CreatedBy" value={form.PO_CreatedBy} onChange={(e) => set('PO_CreatedBy', e.target.value)} />
                    <FormField label="Status" id="PO_Status" value={form.PO_Status} onChange={(e) => set('PO_Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default POOrder;
