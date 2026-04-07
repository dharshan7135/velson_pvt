import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { FileText } from 'lucide-react';
const columns = [{ key: 'PO_vID', label: 'ID' },{ key: 'PO_vRemarks', label: 'Remarks' },{ key: 'PO_vStatus', label: 'Status' }];
const emptyForm = { PO_vID: '', PO_vRemarks: '', PO_vFreight: '', PO_vStatus: 'A', PO_vCreated_By: '', PO_vCreated_Date: new Date().toISOString().slice(0, 10), PO_vM_Despatch: '', PO_vDelivery: '', PO_vPayment_Terms: '', PO_vInspection: '', PO_vProject: '' };
const POMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('poMasters', editId, form); else addRecord('poMasters', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="PO Master Template" description="PO standard terms templates for remarks, freight, and inspection" icon={FileText} />
            <DataTable columns={columns} data={state.poMasters || []} onAdd={openAdd} addLabel="New Template" onEdit={openEdit} onDelete={(r) => deleteRecord('poMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Template' : 'New PO Template'} size="lg">
                <div className="p-6 space-y-4">
                    <FormField label="Remarks" id="PO_vRemarks" value={form.PO_vRemarks} onChange={(e) => set('PO_vRemarks', e.target.value)} />
                    <FormField label="Freight Terms" id="PO_vFreight" value={form.PO_vFreight} onChange={(e) => set('PO_vFreight', e.target.value)} />
                    <FormField label="Mode of Despatch" id="PO_vM_Despatch" value={form.PO_vM_Despatch} onChange={(e) => set('PO_vM_Despatch', e.target.value)} />
                    <FormField label="Delivery Terms" id="PO_vDelivery" value={form.PO_vDelivery} onChange={(e) => set('PO_vDelivery', e.target.value)} />
                    <FormField label="Payment Terms" id="PO_vPayment_Terms" value={form.PO_vPayment_Terms} onChange={(e) => set('PO_vPayment_Terms', e.target.value)} />
                    <FormField label="Inspection" id="PO_vInspection" value={form.PO_vInspection} onChange={(e) => set('PO_vInspection', e.target.value)} />
                    <FormField label="Project" id="PO_vProject" value={form.PO_vProject} onChange={(e) => set('PO_vProject', e.target.value)} />
                    <FormField label="Created By" id="PO_vCreated_By" value={form.PO_vCreated_By} onChange={(e) => set('PO_vCreated_By', e.target.value)} />
                    <FormField label="Status" id="PO_vStatus" value={form.PO_vStatus} onChange={(e) => set('PO_vStatus', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default POMaster;
