import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Layers, Database, Shield, Package } from 'lucide-react';

const columns = [
    { key: 'Part_Name', label: 'Part Name' },
    { key: 'Part_No', label: 'Part No' },
    { key: 'Part_Spare_Name', label: 'Spare Name' },
    { key: 'Part_Qty', label: 'Part Qty' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    Row_Id: '',
    Part_No: '', Part_Spare_No: '', Part_Order_No: '', Part_Spare_Order_No: '', Assembly_Part_Order_No: '',
    Deleted_Date: '',
    Part_Name: '', Part_Group_Name: '', Part_Spare_Name: '', Part_Spare_Group_Name: '',
    PartUom: '', Part_Qty: 0, Part_Spare_Qty: 0, Part_Spare_Uom: '',
    Part_Group_Id: '', Part_Spare_Group_Id: '', Assembly_Part_Order_ID: '',
    Status: 'A',
    Created_Date: new Date().toISOString().slice(0, 10), Created_By: '',
    Updated_Date: '', Updated_By: '',
    Part_Id: '', Part_Spare_Id: '', Deleted_By: '',
};

const PartSpareList = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('partSpareLists', editId, form); else addRecord('partSpareLists', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Part Spare List" description="Manage parts and their associated spare components" icon={Layers} />
            <DataTable columns={columns} data={state.partSpareLists || []} onAdd={openAdd} addLabel="Add Part" onEdit={openEdit} onDelete={(r) => deleteRecord('partSpareLists', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Part' : 'Add Part Spare'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Part Details" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Row ID (PK)" id="Row_Id" type="number" value={form.Row_Id} onChange={(e) => set('Row_Id', e.target.value)} required />
                                <FormField label="Part Name" id="Part_Name" className="md:col-span-2" value={form.Part_Name} onChange={(e) => set('Part_Name', e.target.value)} required />
                                <FormField label="Part No" id="Part_No" value={form.Part_No} onChange={(e) => set('Part_No', e.target.value)} />
                                <FormField label="Part Group" id="Part_Group_Name" value={form.Part_Group_Name} onChange={(e) => set('Part_Group_Name', e.target.value)} />
                                <FormField label="Part Order No" id="Part_Order_No" value={form.Part_Order_No} onChange={(e) => set('Part_Order_No', e.target.value)} />
                                <FormField label="Part UOM" id="PartUom" value={form.PartUom} onChange={(e) => set('PartUom', e.target.value)} />
                                <FormField label="Part Qty" id="Part_Qty" type="number" value={form.Part_Qty} onChange={(e) => set('Part_Qty', e.target.value)} />
                                <FormField label="Assembly Part Order No" id="Assembly_Part_Order_No" value={form.Assembly_Part_Order_No} onChange={(e) => set('Assembly_Part_Order_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Spare Details" icon={Package}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Spare Name" id="Part_Spare_Name" className="md:col-span-2" value={form.Part_Spare_Name} onChange={(e) => set('Part_Spare_Name', e.target.value)} />
                                <FormField label="Spare No" id="Part_Spare_No" value={form.Part_Spare_No} onChange={(e) => set('Part_Spare_No', e.target.value)} />
                                <FormField label="Spare Group" id="Part_Spare_Group_Name" value={form.Part_Spare_Group_Name} onChange={(e) => set('Part_Spare_Group_Name', e.target.value)} />
                                <FormField label="Spare Order No" id="Part_Spare_Order_No" value={form.Part_Spare_Order_No} onChange={(e) => set('Part_Spare_Order_No', e.target.value)} />
                                <FormField label="Spare UOM" id="Part_Spare_Uom" value={form.Part_Spare_Uom} onChange={(e) => set('Part_Spare_Uom', e.target.value)} />
                                <FormField label="Spare Qty" id="Part_Spare_Qty" type="number" value={form.Part_Spare_Qty} onChange={(e) => set('Part_Spare_Qty', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Status & Audit" icon={Shield}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                            <FormField label="Updated By" id="Updated_By" value={form.Updated_By} onChange={(e) => set('Updated_By', e.target.value)} />
                            <FormField label="Deleted By" id="Deleted_By" value={form.Deleted_By} onChange={(e) => set('Deleted_By', e.target.value)} />
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
export default PartSpareList;
