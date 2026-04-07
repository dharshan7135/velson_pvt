import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListTree, Database, Calculator, DollarSign, Calendar, Truck, Info } from 'lucide-react';

const columns = [
    { key: 'Req_No', label: 'Request No' },
    { key: 'Item_Code', label: 'Item Code' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'Qty', label: 'Qty' },
    { key: 'Total_Amount', label: 'Total Amount' },
];

const emptyForm = {
    // References
    ID: '', Item_ID: '', UOM_ID: '', Source_No: '',
    // Document
    Req_No: '', Item_Code: '', Qutoe_Ref: '',
    // Dates
    Req_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    // Item Info
    Customer_Name: '', Item_Name: '', Description: '', Specification: '', Remarks: '', User_Name: '', Request_User: '',
    // Quantity
    UOM: '', Qty: 0,
    // Financials
    Rate: 0, Total_Amount: 0, GST_Extra: '', Frieght: '', Delivery: '', Payment_Terms: '',
    // Status
    Status: 'Active',
};

const QuoteRequestDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const save = () => {
        if (editId) updateRecord('quoteRequestDetails', editId, form);
        else addRecord('quoteRequestDetails', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Internal Request Details" description="Manage line-level details for internal quote requests" icon={ListTree} />
            
            <DataTable 
                columns={columns} 
                data={state.quoteRequestDetails || []} 
                onAdd={openAdd} 
                addLabel="Add Request Detail" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quoteRequestDetails', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Line Item' : 'New Line Item Detail'} size="lg">
                <div className="p-6 space-y-6">
                    {/* Header References */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Request & Item IDs" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request No" id="Req_No" value={form.Req_No} onChange={(e) => set('Req_No', e.target.value)} required />
                                <FormField label="Source No" id="Source_No" value={form.Source_No} onChange={(e) => set('Source_No', e.target.value)} />
                                <FormField label="Item ID" id="Item_ID" value={form.Item_ID} onChange={(e) => set('Item_ID', e.target.value)} />
                                <FormField label="Item Code" id="Item_Code" value={form.Item_Code} onChange={(e) => set('Item_Code', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="General Context" icon={Info}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} required />
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} />
                                <FormField label="Request User" id="Request_User" value={form.Request_User} onChange={(e) => set('Request_User', e.target.value)} />
                                <FormField label="User Name (Alias)" id="User_Name" value={form.User_Name} onChange={(e) => set('User_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Quantity & Value */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Quantity / Specification" icon={Calculator}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Quantity (Qty)" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                                <FormField label="UOM ID" id="UOM_ID" value={form.UOM_ID} onChange={(e) => set('UOM_ID', e.target.value)} />
                                <FormField label="Specifications" id="Specification" value={form.Specification} onChange={(e) => set('Specification', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Financial & Billing" icon={DollarSign}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Rate" id="Rate" type="number" value={form.Rate} onChange={(e) => set('Rate', e.target.value)} required />
                                <FormField label="Net Total Amount" id="Total_Amount" type="number" className="font-bold text-cyan-600 bg-cyan-50" value={form.Total_Amount} onChange={(e) => set('Total_Amount', e.target.value)} required />
                                <FormField label="GST Extra?" id="GST_Extra" value={form.GST_Extra} onChange={(e) => set('GST_Extra', e.target.value)} />
                                <FormField label="Freight Info" id="Frieght" value={form.Frieght} onChange={(e) => set('Frieght', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Dates & Logistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Dates & Status" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Request Date" id="Req_Date" type="date" value={form.Req_Date} onChange={(e) => set('Req_Date', e.target.value)} />
                                <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} disabled />
                                <FormField label="Quote Ref" id="Qutoe_Ref" value={form.Qutoe_Ref} onChange={(e) => set('Qutoe_Ref', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Terms & Shipment" icon={Truck}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Delivery Place" id="Delivery" value={form.Delivery} onChange={(e) => set('Delivery', e.target.value)} />
                                <FormField label="Payment Terms" id="Payment_Terms" value={form.Payment_Terms} className="row-span-2" onChange={(e) => set('Payment_Terms', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Detailed Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Description" id="Description" className="md:col-span-2" value={form.Description} onChange={(e) => set('Description', e.target.value)} />
                        <FormField label="Remarks" id="Remarks" className="md:col-span-2" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update Detail' : 'Save Detail'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuoteRequestDetails;
