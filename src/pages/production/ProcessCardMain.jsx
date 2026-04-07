import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Cog } from 'lucide-react';
const columns = [{ key: 'PC_Job_Card_No', label: 'Job Card' },{ key: 'PC_Part_No', label: 'Part No' },{ key: 'PC_Customer', label: 'Customer' },{ key: 'PC_Status', label: 'Status' }];
const emptyForm = {
    PC_IID: '', PC_Part_Id: '',
    PC_Job_Card_No: '', PC_Part_No: '', PC_SNo: '', PC_Customer: '',
    PC_Tech_Issue_Date: '', PC_Store_Receive_Date: '', PC_Prodc_Receive_Date: '',
    PC_Size: '', PC_Status: 'A', PC_Created_By: '', PC_Created_Date: new Date().toISOString().slice(0, 10),
};
const ProcessCardMain = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('processCardMain', editId, form); else addRecord('processCardMain', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Process Card Main" description="Process card header with job card and part linkage" icon={Cog} />
            <DataTable columns={columns} data={state.processCardMain || []} onAdd={openAdd} addLabel="New Process Card" onEdit={openEdit} onDelete={(r) => deleteRecord('processCardMain', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit' : 'New Process Card'} size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Job Card No" id="PC_Job_Card_No" value={form.PC_Job_Card_No} onChange={(e) => set('PC_Job_Card_No', e.target.value)} required />
                    <FormField label="Part No" id="PC_Part_No" value={form.PC_Part_No} onChange={(e) => set('PC_Part_No', e.target.value)} />
                    <FormField label="Serial No" id="PC_SNo" value={form.PC_SNo} onChange={(e) => set('PC_SNo', e.target.value)} />
                    <FormField label="Customer" id="PC_Customer" value={form.PC_Customer} onChange={(e) => set('PC_Customer', e.target.value)} />
                    <FormField label="Size" id="PC_Size" value={form.PC_Size} onChange={(e) => set('PC_Size', e.target.value)} />
                    <FormField label="Tech Issue Date" id="PC_Tech_Issue_Date" value={form.PC_Tech_Issue_Date} onChange={(e) => set('PC_Tech_Issue_Date', e.target.value)} />
                    <FormField label="Store Receive" id="PC_Store_Receive_Date" value={form.PC_Store_Receive_Date} onChange={(e) => set('PC_Store_Receive_Date', e.target.value)} />
                    <FormField label="Prod Receive" id="PC_Prodc_Receive_Date" value={form.PC_Prodc_Receive_Date} onChange={(e) => set('PC_Prodc_Receive_Date', e.target.value)} />
                    <FormField label="Status" id="PC_Status" value={form.PC_Status} onChange={(e) => set('PC_Status', e.target.value)} />
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ProcessCardMain;
