import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Package, Database, Calendar, Shield, DollarSign, Wrench } from 'lucide-react';

const columns = [
    { key: 'Booking_No', label: 'Booking No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Spare_Item_Name', label: 'Spare Item' },
    { key: 'Spare_Item_Qty', label: 'Qty' },
    { key: 'Service_Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Booking_Id: '', Customer_Id: '', Item_Id: '', Spare_Item_Id: '',
    Booking_No: '', Customer_Code: '', Display_No: '', Spare_Item_Code: '', Material_Issue_No: '',
    Booking_Date: '', Service_Date: '', financial_Year: '',
    Customer_Name: '', Item_Name: '', Problem_Description: '', Remarks: '', System_Name: '', Spare_Item_Name: '',
    Checked_Value: 0,
    Spare_Item_Qty: 0, Spare_Uom: '', Spare_BOM_Qty: 0,
    Status: 'A', Service_Status: 'Pending',
    Created_By: '', Created_Date: new Date().toISOString().slice(0, 10), service_updated_date: '',
    Services_By: '', Barcode: '', Issued_By: '', Meterial_Collected_By: '', Service_JobNo: '',
};

const BookingServiceSpareList = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('bookingServiceSpareLists', editId, form); else addRecord('bookingServiceSpareLists', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Booking Spare List" description="Spare parts linked to service bookings" icon={Package} />
            <DataTable columns={columns} data={state.bookingServiceSpareLists || []} onAdd={openAdd} addLabel="Add Spare" onEdit={openEdit} onDelete={(r) => deleteRecord('bookingServiceSpareLists', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Spare' : 'Add Spare Part'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Booking & Customer" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="ID (PK)" id="ID" type="number" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="Booking No" id="Booking_No" value={form.Booking_No} onChange={(e) => set('Booking_No', e.target.value)} required />
                                <FormField label="Booking Date" id="Booking_Date" type="date" value={form.Booking_Date} onChange={(e) => set('Booking_Date', e.target.value)} />
                                <FormField label="Customer Name" id="Customer_Name" className="md:col-span-2" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                                <FormField label="Display No" id="Display_No" type="number" value={form.Display_No} onChange={(e) => set('Display_No', e.target.value)} />
                                <FormField label="Financial Year" id="financial_Year" value={form.financial_Year} onChange={(e) => set('financial_Year', e.target.value)} />
                                <FormField label="Service Job No" id="Service_JobNo" value={form.Service_JobNo} onChange={(e) => set('Service_JobNo', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Spare Item Details" icon={Wrench}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                                <FormField label="Spare Item Name" id="Spare_Item_Name" className="md:col-span-2" value={form.Spare_Item_Name} onChange={(e) => set('Spare_Item_Name', e.target.value)} required />
                                <FormField label="Spare Item Code" id="Spare_Item_Code" value={form.Spare_Item_Code} onChange={(e) => set('Spare_Item_Code', e.target.value)} />
                                <FormField label="Spare Qty" id="Spare_Item_Qty" type="number" value={form.Spare_Item_Qty} onChange={(e) => set('Spare_Item_Qty', e.target.value)} />
                                <FormField label="Spare UOM" id="Spare_Uom" value={form.Spare_Uom} onChange={(e) => set('Spare_Uom', e.target.value)} />
                                <FormField label="BOM Qty" id="Spare_BOM_Qty" type="number" value={form.Spare_BOM_Qty} onChange={(e) => set('Spare_BOM_Qty', e.target.value)} />
                                <FormField label="Barcode" id="Barcode" value={form.Barcode} onChange={(e) => set('Barcode', e.target.value)} />
                                <FormField label="Material Issue No" id="Material_Issue_No" value={form.Material_Issue_No} onChange={(e) => set('Material_Issue_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Service Info" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Service Date" id="Service_Date" type="date" value={form.Service_Date} onChange={(e) => set('Service_Date', e.target.value)} />
                                <FormField label="Problem Description" id="Problem_Description" value={form.Problem_Description} onChange={(e) => set('Problem_Description', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                                <FormField label="Checked Value" id="Checked_Value" type="number" value={form.Checked_Value} onChange={(e) => set('Checked_Value', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Tracking" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Service Status" id="Service_Status" value={form.Service_Status} onChange={(e) => set('Service_Status', e.target.value)} />
                                <FormField label="Services By" id="Services_By" value={form.Services_By} onChange={(e) => set('Services_By', e.target.value)} />
                                <FormField label="Issued By" id="Issued_By" value={form.Issued_By} onChange={(e) => set('Issued_By', e.target.value)} />
                                <FormField label="Material Collected By" id="Meterial_Collected_By" value={form.Meterial_Collected_By} onChange={(e) => set('Meterial_Collected_By', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default BookingServiceSpareList;
