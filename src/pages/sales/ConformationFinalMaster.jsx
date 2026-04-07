import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { CheckCheck, Database, Car, User, Calendar, Shield } from 'lucide-react';

const columns = [
    { key: 'Conformation_No', label: 'Conf. No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Vehicle_Name', label: 'Vehicle' },
    { key: 'Conformation_status', label: 'Status' },
    { key: 'Approval_Status', label: 'Approval' },
];

const emptyForm = {
    Row_Id: '', Booking_Id: '', Customer_Id: '', Vehicle_Model_No_Id: '', Vehicle_Name_Id: '', Model_Sub_Type_Id: '',
    Conformation_No: '', Booking_No: '', Customer_Code: '', Serial_No: '', Vehicle_No: '', Vehicle_Model_No: '', Service_Bill_No: '', Quotation_no: '',
    Booking_Date: '', Service_Bill_date: '', Deleted_Date: '',
    Customer_Name: '', Model_Sub_Type_Name: '', Vehicle_Name: '', Remarks: '', System_Name: '',
    Status: 'A', Booking_Status: '', Viewing_Status: '', Conformation_status: 'Open', Approval_Status: 'Pending',
    Approval_Date: '', Approval_By: '',
    Created_Date: new Date().toISOString().slice(0, 10), Created_By: '', Updated_By: '', Updated_Date: '', Modified_By: '', Modified_Date: '',
    Deleted_By: '', DELETED_SYSTEM: '',
};

const ConformationFinalMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('conformationFinalMasters', editId, form); else addRecord('conformationFinalMasters', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Final Confirmation Master" description="Finalized service confirmation with quotation linkage" icon={CheckCheck} />
            <DataTable columns={columns} data={state.conformationFinalMasters || []} onAdd={openAdd} addLabel="New Final Confirmation" onEdit={openEdit} onDelete={(r) => deleteRecord('conformationFinalMasters', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Final Confirmation' : 'New Final Confirmation'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Booking Reference" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Confirmation No" id="Conformation_No" value={form.Conformation_No} onChange={(e) => set('Conformation_No', e.target.value)} required />
                                <FormField label="Booking No" id="Booking_No" value={form.Booking_No} onChange={(e) => set('Booking_No', e.target.value)} />
                                <FormField label="Booking Date" id="Booking_Date" type="date" value={form.Booking_Date} onChange={(e) => set('Booking_Date', e.target.value)} />
                                <FormField label="Customer Code" id="Customer_Code" value={form.Customer_Code} onChange={(e) => set('Customer_Code', e.target.value)} />
                                <FormField label="Serial No" id="Serial_No" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} />
                                <FormField label="Quotation No" id="Quotation_no" value={form.Quotation_no} onChange={(e) => set('Quotation_no', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Customer & Vehicle" icon={Car}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Vehicle Name" id="Vehicle_Name" value={form.Vehicle_Name} onChange={(e) => set('Vehicle_Name', e.target.value)} />
                                <FormField label="Vehicle No" id="Vehicle_No" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} />
                                <FormField label="Vehicle Model No" id="Vehicle_Model_No" value={form.Vehicle_Model_No} onChange={(e) => set('Vehicle_Model_No', e.target.value)} />
                                <FormField label="Model Sub Type" id="Model_Sub_Type_Name" value={form.Model_Sub_Type_Name} onChange={(e) => set('Model_Sub_Type_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Service Info" icon={User}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Service Bill No" id="Service_Bill_No" value={form.Service_Bill_No} onChange={(e) => set('Service_Bill_No', e.target.value)} />
                                <FormField label="Service Bill Date" id="Service_Bill_date" type="date" value={form.Service_Bill_date} onChange={(e) => set('Service_Bill_date', e.target.value)} />
                                <FormField label="System Name" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Approval" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Confirmation Status" id="Conformation_status" value={form.Conformation_status} onChange={(e) => set('Conformation_status', e.target.value)} />
                                <FormField label="Booking Status" id="Booking_Status" value={form.Booking_Status} onChange={(e) => set('Booking_Status', e.target.value)} />
                                <FormField label="Viewing Status" id="Viewing_Status" value={form.Viewing_Status} onChange={(e) => set('Viewing_Status', e.target.value)} />
                                <FormField label="Approval Status" id="Approval_Status" value={form.Approval_Status} onChange={(e) => set('Approval_Status', e.target.value)} />
                                <FormField label="Approval By" id="Approval_By" value={form.Approval_By} onChange={(e) => set('Approval_By', e.target.value)} />
                                <FormField label="Approval Date" id="Approval_Date" type="date" value={form.Approval_Date} onChange={(e) => set('Approval_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Audit Trail" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                            <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} />
                            <FormField label="Updated By" id="Updated_By" value={form.Updated_By} onChange={(e) => set('Updated_By', e.target.value)} />
                            <FormField label="Modified By" id="Modified_By" value={form.Modified_By} onChange={(e) => set('Modified_By', e.target.value)} />
                            <FormField label="Deleted System" id="DELETED_SYSTEM" value={form.DELETED_SYSTEM} onChange={(e) => set('DELETED_SYSTEM', e.target.value)} />
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
export default ConformationFinalMaster;
