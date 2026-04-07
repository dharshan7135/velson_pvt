import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ArrowUpFromLine, Database, DollarSign, Package, Calendar } from 'lucide-react';
const columns = [{ key: 'Issue_No', label: 'Issue No' },{ key: 'Item_Name', label: 'Item' },{ key: 'Issue_Qty', label: 'Issued' },{ key: 'Return_Qty', label: 'Returned' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    ID: '', Item_ID: '', Created_by: '', Customer_Code_ID: '', Service_jobno_id: '',
    Issue_No: '', Line_No: '', Machine_No: '', Item_Code: '', Job_No: '', Customer_Code: '', Booking_Code: '', Service_Bill_No: '', OrderNo_Id: '',
    Issue_Date: '', Return_Date: '', Created_date: new Date().toISOString().slice(0, 10), Updated_date: '', service_updated_date: '',
    Remarks: '', Item_Name: '', Service_Part_Name: '', Incharge_Name: '',
    Rate: 0, Amount: 0, Qty: 0, UOM: '', Return_Qty: 0, Issue_Qty: 0,
    Vehicle_Type: '', Department: '', Receiver: '', Barcode: '', Item_Spec: '',
    Status: 'A', Bill_Status: '', Updated_By: '', Return_Reason: '', Return_By: '',
    Booking_ID: '', Service_Part_Id: '', Service_jobno: '',
};
const StockOutward = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('stockOutward', editId, form); else addRecord('stockOutward', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Stock Outward" description="Outward stock ledger with service, return, and billing tracking" icon={ArrowUpFromLine} />
            <DataTable columns={columns} data={state.stockOutward || []} onAdd={openAdd} addLabel="New Outward" onEdit={openEdit} onDelete={(r) => deleteRecord('stockOutward', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Outward' : 'New Stock Outward'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Issue Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Issue No" id="Issue_No" value={form.Issue_No} onChange={(e) => set('Issue_No', e.target.value)} required />
                                <FormField label="Issue Date" id="Issue_Date" type="date" value={form.Issue_Date} onChange={(e) => set('Issue_Date', e.target.value)} />
                                <FormField label="Department" id="Department" value={form.Department} onChange={(e) => set('Department', e.target.value)} />
                                <FormField label="Receiver" id="Receiver" value={form.Receiver} onChange={(e) => set('Receiver', e.target.value)} />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                                <FormField label="Machine No" id="Machine_No" value={form.Machine_No} onChange={(e) => set('Machine_No', e.target.value)} />
                                <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Item & Quantity" icon={Package}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="Issue Qty" id="Issue_Qty" type="number" value={form.Issue_Qty} onChange={(e) => set('Issue_Qty', e.target.value)} required />
                                <FormField label="Return Qty" id="Return_Qty" type="number" value={form.Return_Qty} onChange={(e) => set('Return_Qty', e.target.value)} />
                                <FormField label="Rate" id="Rate" type="number" value={form.Rate} onChange={(e) => set('Rate', e.target.value)} />
                                <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Service & Returns" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Service Job No" id="Service_jobno" value={form.Service_jobno} onChange={(e) => set('Service_jobno', e.target.value)} />
                            <FormField label="Service Bill No" id="Service_Bill_No" value={form.Service_Bill_No} onChange={(e) => set('Service_Bill_No', e.target.value)} />
                            <FormField label="Bill Status" id="Bill_Status" value={form.Bill_Status} onChange={(e) => set('Bill_Status', e.target.value)} />
                            <FormField label="Return Date" id="Return_Date" type="date" value={form.Return_Date} onChange={(e) => set('Return_Date', e.target.value)} />
                            <FormField label="Return Reason" id="Return_Reason" value={form.Return_Reason} onChange={(e) => set('Return_Reason', e.target.value)} />
                            <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                            <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default StockOutward;
