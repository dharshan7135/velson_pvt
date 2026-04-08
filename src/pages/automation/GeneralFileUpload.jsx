import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Upload, Database, Calendar, FileText, Shield } from 'lucide-react';

const columns = [
    { key: 'Job_No', label: 'Job No' },
    { key: 'File_Name', label: 'File Name' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Job_Id: '', Item_Id: '', Customer_ID: '',
    Job_No: '', Drawing_No: '', Revision_No: '', Booking_Code: '',
    Job_Date: '', Deleted_Date: '',
    File_Name: '', Item_Name: '', Customer_Name: '', Remarks: '',
    Industry_Type: '',
    Status: 'A',
    File_Location: '', Image: '',
    Created_By: '',
    Created_Date: new Date().toISOString().slice(0, 10),
    Deleted_By: '', barcode: '', Booking_id: '',
};

const GeneralFileUpload = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('generalFileUploads', editId, form); else addRecord('generalFileUploads', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="General File Upload" description="General attachment store for jobs, drawings and booking records" icon={Upload} />
            <DataTable columns={columns} data={state.generalFileUploads || []} onAdd={openAdd} addLabel="Upload File" onEdit={openEdit} onDelete={(r) => deleteRecord('generalFileUploads', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit File Upload' : 'New File Upload'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document Info" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="ID" id="ID" value={form.ID} onChange={(e) => set('ID', e.target.value)} required />
                                <FormField label="Job No" id="Job_No" value={form.Job_No} onChange={(e) => set('Job_No', e.target.value)} required />
                                <FormField label="Drawing No" id="Drawing_No" value={form.Drawing_No} onChange={(e) => set('Drawing_No', e.target.value)} />
                                <FormField label="Revision No" id="Revision_No" value={form.Revision_No} onChange={(e) => set('Revision_No', e.target.value)} />
                                <FormField label="Booking Code" id="Booking_Code" value={form.Booking_Code} onChange={(e) => set('Booking_Code', e.target.value)} />
                                <FormField label="Barcode" id="barcode" className="md:col-span-2" value={form.barcode} onChange={(e) => set('barcode', e.target.value)} />
                                <FormField label="Industry Type" id="Industry_Type" value={form.Industry_Type} onChange={(e) => set('Industry_Type', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Names & Details" icon={FileText}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="File Name" id="File_Name" className="md:col-span-2" value={form.File_Name} onChange={(e) => set('File_Name', e.target.value)} required />
                                <FormField label="Item Name" id="Item_Name" className="md:col-span-2" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                                <FormField label="Customer Name" id="Customer_Name" className="md:col-span-2" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} />
                                <FormField label="Remarks" id="Remarks" className="md:col-span-2" value={form.Remarks} onChange={(e) => set('Remarks', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Dates" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Job Date" id="Job_Date" type="date" value={form.Job_Date} onChange={(e) => set('Job_Date', e.target.value)} />
                                <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} onChange={(e) => set('Created_Date', e.target.value)} />
                                <FormField label="Deleted Date" id="Deleted_Date" type="date" value={form.Deleted_Date} onChange={(e) => set('Deleted_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="File & Status" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="File Location" id="File_Location" className="md:col-span-2" value={form.File_Location} onChange={(e) => set('File_Location', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                                <FormField label="Deleted By" id="Deleted_By" value={form.Deleted_By} onChange={(e) => set('Deleted_By', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Upload'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default GeneralFileUpload;
