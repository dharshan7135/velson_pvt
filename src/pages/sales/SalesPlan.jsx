import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { CalendarRange, Database, User, Info, Truck } from 'lucide-react';

const columns = [
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Product_Name', label: 'Product' },
    { key: 'Plan_Date', label: 'Plan Date' },
    { key: 'Delivery_Status', label: 'Delivery' },
    { key: 'Critical', label: 'Critical' },
];

const emptyForm = {
    ID: '', Cusomer_ID: '', Created_by: '',
    PO_No: '', Job_No: '', Mold_No: '',
    Plan_Date: '', Delivery: '',
    Customer_Name: '', Product_Name: '', Customer_Nature: '', Notes: '', Drawing_Details: '',
    Size: '', Unit: '', Qty: 0,
    Product_Type: '', Pay_Type: '',
    Delivery_Status: 'Pending', Status: 'A', Critical: 'No',
    Created_Date: new Date().toISOString().slice(0, 10),
};

const SalesPlan = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('salesPlans', editId, form); else addRecord('salesPlans', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Sales Plan" description="Plan deliveries, track PO milestones, and manage critical orders" icon={CalendarRange} />
            <DataTable columns={columns} data={state.salesPlans || []} onAdd={openAdd} addLabel="New Sales Plan" onEdit={openEdit} onDelete={(r) => deleteRecord('salesPlans', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Sales Plan' : 'New Sales Plan'} size="lg">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Customer & Order" icon={User}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Customer Nature" id="Customer_Nature" value={form.Customer_Nature} onChange={(e) => set('Customer_Nature', e.target.value)} />
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Product & Mold" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Product Name" id="Product_Name" value={form.Product_Name} onChange={(e) => set('Product_Name', e.target.value)} required />
                                <FormField label="Product Type" id="Product_Type" value={form.Product_Type} onChange={(e) => set('Product_Type', e.target.value)} />
                                <FormField label="Mold No" id="Mold_No" value={form.Mold_No} onChange={(e) => set('Mold_No', e.target.value)} />
                                <FormField label="Drawing Details" id="Drawing_Details" value={form.Drawing_Details} onChange={(e) => set('Drawing_Details', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Schedule & Logistics" icon={Truck}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Plan Date" id="Plan_Date" type="date" value={form.Plan_Date} onChange={(e) => set('Plan_Date', e.target.value)} />
                                <FormField label="Delivery Date" id="Delivery" type="date" value={form.Delivery} onChange={(e) => set('Delivery', e.target.value)} />
                                <FormField label="Delivery Status" id="Delivery_Status" value={form.Delivery_Status} onChange={(e) => set('Delivery_Status', e.target.value)} />
                                <FormField label="Pay Type" id="Pay_Type" value={form.Pay_Type} onChange={(e) => set('Pay_Type', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Specs & Tracking" icon={Info}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Size" id="Size" value={form.Size} onChange={(e) => set('Size', e.target.value)} />
                                <FormField label="Unit" id="Unit" value={form.Unit} onChange={(e) => set('Unit', e.target.value)} />
                                <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Critical?" id="Critical" value={form.Critical} onChange={(e) => set('Critical', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormField label="Notes" id="Notes" value={form.Notes} onChange={(e) => set('Notes', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Plan'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default SalesPlan;
