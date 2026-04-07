import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { DoorOpen, Database, Truck, Calendar, Info } from 'lucide-react';

const columns = [
    { key: 'Vou_No', label: 'Voucher No' },
    { key: 'Supplier_Name', label: 'Supplier' },
    { key: 'PO_No', label: 'PO No' },
    { key: 'GRN_Status', label: 'GRN Status' },
    { key: 'Statsu', label: 'Status' },
];

const emptyForm = {
    ID: '', Supplier_ID: '', Created_by: '',
    Vou_No: '', Invoice_No: '', Gate_No: '', GRN_No: '', PO_Purchase_Req_No: '', PO_No: '', PR_No: '',
    Vou_Date: '', Invoice_Date: '', GRN_Date: '', Deleted_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Supplier_Name: '', Supplier_Address: '', Remarks: '', Carrier_Name: '', Vehicle_Name: '', System_Name: '',
    GRN_Status: 'Pending', Statsu: 'A', GRN_Entered_By: '', Deleted_By: '',
};

const GateEntry = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('gateEntries', editId, form); else addRecord('gateEntries', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Gate Entry" description="Inward material gate pass with supplier and vehicle tracking" icon={DoorOpen} />
            <DataTable columns={columns} data={state.gateEntries || []} onAdd={openAdd} addLabel="New Gate Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('gateEntries', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Gate Entry' : 'New Gate Entry'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Entry & Document Nos" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Voucher No" id="Vou_No" value={form.Vou_No} onChange={(e) => set('Vou_No', e.target.value)} required />
                                <FormField label="Gate No" id="Gate_No" value={form.Gate_No} onChange={(e) => set('Gate_No', e.target.value)} />
                                <FormField label="PO No" id="PO_No" value={form.PO_No} onChange={(e) => set('PO_No', e.target.value)} />
                                <FormField label="PR No" id="PR_No" value={form.PR_No} onChange={(e) => set('PR_No', e.target.value)} />
                                <FormField label="Invoice No" id="Invoice_No" value={form.Invoice_No} onChange={(e) => set('Invoice_No', e.target.value)} />
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Supplier & Transport" icon={Truck}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Supplier Name" id="Supplier_Name" value={form.Supplier_Name} onChange={(e) => set('Supplier_Name', e.target.value)} required />
                                <FormField label="Supplier Address" id="Supplier_Address" value={form.Supplier_Address} onChange={(e) => set('Supplier_Address', e.target.value)} />
                                <FormField label="Carrier Name" id="Carrier_Name" value={form.Carrier_Name} onChange={(e) => set('Carrier_Name', e.target.value)} />
                                <FormField label="Vehicle Name" id="Vehicle_Name" value={form.Vehicle_Name} onChange={(e) => set('Vehicle_Name', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Dates & Status" icon={Calendar}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Voucher Date" id="Vou_Date" type="date" value={form.Vou_Date} onChange={(e) => set('Vou_Date', e.target.value)} />
                            <FormField label="Invoice Date" id="Invoice_Date" type="date" value={form.Invoice_Date} onChange={(e) => set('Invoice_Date', e.target.value)} />
                            <FormField label="GRN Date" id="GRN_Date" type="date" value={form.GRN_Date} onChange={(e) => set('GRN_Date', e.target.value)} />
                            <FormField label="GRN Status" id="GRN_Status" value={form.GRN_Status} onChange={(e) => set('GRN_Status', e.target.value)} />
                            <FormField label="GRN Entered By" id="GRN_Entered_By" value={form.GRN_Entered_By} onChange={(e) => set('GRN_Entered_By', e.target.value)} />
                            <FormField label="Created By" id="Created_by" value={form.Created_by} onChange={(e) => set('Created_by', e.target.value)} />
                            <FormField label="System Name" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                            <FormField label="Status" id="Statsu" value={form.Statsu} onChange={(e) => set('Statsu', e.target.value)} />
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
export default GateEntry;
