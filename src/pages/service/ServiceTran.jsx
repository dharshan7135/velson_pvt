import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Activity, Database, DollarSign, Shield, Users } from 'lucide-react';

const columns = [
    { key: 'Service_No', label: 'Service No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Vehicle_Type', label: 'Vehicle Type' },
    { key: 'Total_Amount', label: 'Total Amt' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Customer_Id: '', Vehicle_Type_Id: '',
    Service_No: '', Vehicle_No: '',
    Customer_Name: '', OPerator_Name: '', Supervisor_Name: '',
    Work_Description_Id: '', Work_Description: '',
    Labour_Cost: 0, Material_Cost: 0, Total_Amount: 0,
    Vehicle_Type: '',
    Status: 'A',
    Created_By: '', Created_Date: new Date().toISOString().slice(0, 10),
    Updated_By: '', Updated_Date: '',
    Service_Ref_Id: '', Operator_Id: '', Supervisor_Id: '',
    Opinion: '', Alteration: '',
};

const ServiceTran = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('serviceTrans', editId, form); else addRecord('serviceTrans', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Service Transaction" description="Service work entries with labour and material costs" icon={Activity} />
            <DataTable columns={columns} data={state.serviceTrans || []} onAdd={openAdd} addLabel="New Service" onEdit={openEdit} onDelete={(r) => deleteRecord('serviceTrans', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Service' : 'New Service Transaction'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Service Details" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="ID (PK)" id="ID" type="number" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="Service No" id="Service_No" value={form.Service_No} onChange={(e) => set('Service_No', e.target.value)} required />
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} required />
                                <FormField label="Vehicle Type" id="Vehicle_Type" value={form.Vehicle_Type} onChange={(e) => set('Vehicle_Type', e.target.value)} />
                                <FormField label="Vehicle No" id="Vehicle_No" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} />
                                <FormField label="Work Description" id="Work_Description" value={form.Work_Description} onChange={(e) => set('Work_Description', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Personnel" icon={Users}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Operator Name" id="OPerator_Name" value={form.OPerator_Name} onChange={(e) => set('OPerator_Name', e.target.value)} />
                                <FormField label="Supervisor Name" id="Supervisor_Name" value={form.Supervisor_Name} onChange={(e) => set('Supervisor_Name', e.target.value)} />
                                <FormField label="Opinion" id="Opinion" value={form.Opinion} onChange={(e) => set('Opinion', e.target.value)} />
                                <FormField label="Alteration" id="Alteration" value={form.Alteration} onChange={(e) => set('Alteration', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Cost Summary" icon={DollarSign}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Labour Cost" id="Labour_Cost" type="number" value={form.Labour_Cost} onChange={(e) => set('Labour_Cost', e.target.value)} />
                                <FormField label="Material Cost" id="Material_Cost" type="number" value={form.Material_Cost} onChange={(e) => set('Material_Cost', e.target.value)} />
                                <FormField label="Total Amount" id="Total_Amount" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Total_Amount} onChange={(e) => set('Total_Amount', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Status & Audit" icon={Shield}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                                <FormField label="Updated By" id="Updated_By" value={form.Updated_By} onChange={(e) => set('Updated_By', e.target.value)} />
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
export default ServiceTran;
