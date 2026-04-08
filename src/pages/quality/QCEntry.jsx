import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ClipboardCheck, Database, Calendar, Package, Shield } from 'lucide-react';

const columns = [
    { key: 'QC_NO', label: 'QC No' },
    { key: 'Supplier_Name', label: 'Supplier' },
    { key: 'Item_Name', label: 'Item' },
    { key: 'QC_Date', label: 'QC Date' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Supplier_ID: '', Item_ID: '', Created_by: '',
    QC_NO: '', GRN_No: '', PO_No: '', INV_No: '', Item_Code: '', Lot_No: '',
    QC_Date: '', GRN_Date: '', PO_Date: '', INV_Date: '',
    Supplier_Name: '', Item_Name: '', Description: '', QC_Remarks: '',
    QC_Inspected_Qty: 0, QC_OK_Qty: 0, QC_Rejected_Qty: 0,
    Status: 'A',
    Created_Date: new Date().toISOString().slice(0, 10),
    QC_By: '', Grade: '',
};

const QCEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('qcEntries', editId, form); else addRecord('qcEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="QC Entry" description="Quality control inspection entries against GRN and purchase orders" icon={ClipboardCheck} />
            <DataTable columns={columns} data={state.qcEntries || []} onAdd={openAdd} addLabel="New QC Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('qcEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit QC Entry' : 'New QC Entry'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="QC Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="ID (PK)" id="ID" type="number" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="QC No" id="QC_NO" value={form.QC_NO} onChange={(e) => set('QC_NO', e.target.value)} required />
                                <FormField label="QC Date" id="QC_Date" type="date" value={form.QC_Date} onChange={(e) => set('QC_Date', e.target.value)} required />
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} />
                                <FormField label="GRN Date" id="GRN_Date" type="date" value={form.GRN_Date} onChange={(e) => set('GRN_Date', e.target.value)} />
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} />
                                <FormField label="PO Date" id="PO_Date" type="date" value={form.PO_Date} onChange={(e) => set('PO_Date', e.target.value)} />
                                <FormField label="INV No" id="INV_No" value={form.INV_No} onChange={(e) => set('INV_No', e.target.value)} />
                                <FormField label="INV Date" id="INV_Date" value={form.INV_Date} onChange={(e) => set('INV_Date', e.target.value)} />
                                <FormField label="Lot No" id="Lot_No" value={form.Lot_No} onChange={(e) => set('Lot_No', e.target.value)} />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Supplier & Item" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Supplier Name" id="Supplier_Name" className="md:col-span-2" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                                <FormField label="QC Remarks" id="QC_Remarks" className="md:col-span-2" value={form.QC_Remarks} onChange={(e) => set('QC_Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Inspection Quantities" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Inspected Qty" id="QC_Inspected_Qty" type="number" value={form.QC_Inspected_Qty} onChange={(e) => set('QC_Inspected_Qty', e.target.value)} />
                                <FormField label="OK Qty" id="QC_OK_Qty" type="number" className="font-bold text-green-600 bg-green-50" value={form.QC_OK_Qty} onChange={(e) => set('QC_OK_Qty', e.target.value)} />
                                <FormField label="Rejected Qty" id="QC_Rejected_Qty" type="number" className="font-bold text-red-600 bg-red-50" value={form.QC_Rejected_Qty} onChange={(e) => set('QC_Rejected_Qty', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Audit" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Grade" id="Grade" value={form.Grade} onChange={(e) => set('Grade', e.target.value)} />
                                <FormField label="QC By" id="QC_By" value={form.QC_By} onChange={(e) => set('QC_By', e.target.value)} />
                                <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save QC Entry'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default QCEntry;
