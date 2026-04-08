import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ShoppingCart, Database, Package, DollarSign, Shield, Calendar } from 'lucide-react';

const columns = [
    { key: 'Item_Code', label: 'Item Code' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'Po_No', label: 'PO No' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Po_Status', label: 'PO Status' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    Row_Id: '', Item_Id: '', Ledger_Id: '', Auto_job_Id: '',
    Item_Code: '', Po_No: '',
    Item_Name: '', Ledger_Name: '', REMARKS: '', machine_name: '',
    Rate: 0, Total_Amount: 0, Net_Total: 0,
    Qty: 0, Closing_Qty: 0, Re_Order_Qty: 0, Job_Qty: 0,
    poqty: 0, Autoqty: 0, stockqty: 0, GRN_Qty: 0, Po_Qty: 0,
    Order_Type: '',
    Po_Status: '', Status: 'A', APPROVAL_DATE: '',
    Created_Date: new Date().toISOString().slice(0, 10),
    Po_Created_Date: '',
    Last_Order_Qty: 0, Last_Order_date: '',
    Source: '',
};

const AutoPoDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('autoPoDetails', editId, form); else addRecord('autoPoDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Auto PO Details" description="Automated purchase order details linked to job entries and items" icon={ShoppingCart} />
            <DataTable columns={columns} data={state.autoPoDetails || []} onAdd={openAdd} addLabel="New Auto PO" onEdit={openEdit} onDelete={(r) => deleteRecord('autoPoDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Auto PO' : 'New Auto PO'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document Info" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Row ID" id="Row_Id" value={form.Row_Id} onChange={(e) => set('Row_Id', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} required />
                                <FormField label="PO No" id="Po_No" value={form.Po_No} onChange={(e) => set('Po_No', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                                <FormField label="Ledger Name" id="Ledger_Name" className="md:col-span-2" value={form.Ledger_Name} onChange={(e) => set('Ledger_Name', e.target.value)} />
                                <FormField label="Remarks" id="REMARKS" className="md:col-span-2" value={form.REMARKS} onChange={(e) => set('REMARKS', e.target.value)} />
                                <FormField label="Machine Name" id="machine_name" className="md:col-span-2" value={form.machine_name} onChange={(e) => set('machine_name', e.target.value)} />
                                <FormField label="Order Type" id="Order_Type" value={form.Order_Type} onChange={(e) => set('Order_Type', e.target.value)} />
                                <FormField label="Source" id="Source" value={form.Source} onChange={(e) => set('Source', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Financial" icon={DollarSign}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Rate" id="Rate" type="number" value={form.Rate} onChange={(e) => set('Rate', e.target.value)} />
                                <FormField label="Total Amount" id="Total_Amount" type="number" value={form.Total_Amount} onChange={(e) => set('Total_Amount', e.target.value)} />
                                <FormField label="Net Total" id="Net_Total" type="number" value={form.Net_Total} onChange={(e) => set('Net_Total', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Quantities" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} />
                                <FormField label="Closing Qty" id="Closing_Qty" type="number" value={form.Closing_Qty} onChange={(e) => set('Closing_Qty', e.target.value)} />
                                <FormField label="Re-Order Qty" id="Re_Order_Qty" type="number" value={form.Re_Order_Qty} onChange={(e) => set('Re_Order_Qty', e.target.value)} />
                                <FormField label="Job Qty" id="Job_Qty" type="number" value={form.Job_Qty} onChange={(e) => set('Job_Qty', e.target.value)} />
                                <FormField label="PO Qty" id="poqty" type="number" value={form.poqty} onChange={(e) => set('poqty', e.target.value)} />
                                <FormField label="Auto Qty" id="Autoqty" type="number" value={form.Autoqty} onChange={(e) => set('Autoqty', e.target.value)} />
                                <FormField label="Stock Qty" id="stockqty" type="number" value={form.stockqty} onChange={(e) => set('stockqty', e.target.value)} />
                                <FormField label="GRN Qty" id="GRN_Qty" type="number" value={form.GRN_Qty} onChange={(e) => set('GRN_Qty', e.target.value)} />
                                <FormField label="PO Order Qty" id="Po_Qty" type="number" value={form.Po_Qty} onChange={(e) => set('Po_Qty', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Dates" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="PO Status" id="Po_Status" value={form.Po_Status} onChange={(e) => set('Po_Status', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Approval Date" id="APPROVAL_DATE" type="date" value={form.APPROVAL_DATE} onChange={(e) => set('APPROVAL_DATE', e.target.value)} />
                                <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} onChange={(e) => set('Created_Date', e.target.value)} />
                                <FormField label="PO Created Date" id="Po_Created_Date" type="date" value={form.Po_Created_Date} onChange={(e) => set('Po_Created_Date', e.target.value)} />
                                <FormField label="Last Order Qty" id="Last_Order_Qty" type="number" value={form.Last_Order_Qty} onChange={(e) => set('Last_Order_Qty', e.target.value)} />
                                <FormField label="Last Order Date" id="Last_Order_date" type="date" value={form.Last_Order_date} onChange={(e) => set('Last_Order_date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Auto PO'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default AutoPoDetails;
