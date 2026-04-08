import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Link2, Database, Shield, Layers } from 'lucide-react';

const columns = [
    { key: 'Order_No', label: 'Order No' },
    { key: 'Assembly_Name', label: 'Assembly' },
    { key: 'Assembly_Part_Name', label: 'Assembly Part' },
    { key: 'Sub_Group_Name', label: 'Sub Group' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    Row_Id: '', Order_No: '', Update_Date: '',
    Assembly_Name: '', Assembly_Part_Name: '', Sub_Group_Name: '', Sub_Group_Part_Name: '',
    Sub_Group_Id: '', Sub_Group_Part_Id: '',
    Status: 'A',
    Created_Date: new Date().toISOString().slice(0, 10), Created_By: '', Updated_By: '',
    Assembly_Id: '', Assembly_Part_Id: '',
};

const FastenerListLink = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('fastenerListLinks', editId, form); else addRecord('fastenerListLinks', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Fastener List Link" description="Link fastener assemblies and sub-groups to orders" icon={Link2} />
            <DataTable columns={columns} data={state.fastenerListLinks || []} onAdd={openAdd} addLabel="Add Link" onEdit={openEdit} onDelete={(r) => deleteRecord('fastenerListLinks', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Link' : 'New Fastener Link'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Assembly" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Row ID (PK)" id="Row_Id" type="number" value={form.Row_Id} onChange={(e) => set('Row_Id', e.target.value)} required />
                                <FormField label="Order No" id="Order_No" value={form.Order_No} onChange={(e) => set('Order_No', e.target.value)} required />
                                <FormField label="Assembly Name" id="Assembly_Name" value={form.Assembly_Name} onChange={(e) => set('Assembly_Name', e.target.value)} required />
                                <FormField label="Assembly Part" id="Assembly_Part_Name" value={form.Assembly_Part_Name} onChange={(e) => set('Assembly_Part_Name', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Sub Group" icon={Layers}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Sub Group Name" id="Sub_Group_Name" value={form.Sub_Group_Name} onChange={(e) => set('Sub_Group_Name', e.target.value)} />
                                <FormField label="Sub Group Part" id="Sub_Group_Part_Name" value={form.Sub_Group_Part_Name} onChange={(e) => set('Sub_Group_Part_Name', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
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
export default FastenerListLink;
