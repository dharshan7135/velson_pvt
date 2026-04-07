import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Upload, File, Database, Calendar, Tag, Shield } from 'lucide-react';

const columns = [
    { key: 'Quotation_No', label: 'Quotation No' },
    { key: 'Customer_Name', label: 'Customer' },
    { key: 'Item_Name', label: 'Item Name' },
    { key: 'File_Name', label: 'File Name' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    // Reference / Foreign Key
    Item_Id: '', Customer_ID: '', Created_By: '', Deleted_By: '',
    // Document / Code
    Quotation_No: '', Drawing_No: '', Revision_No: '', Quotation_Id: '', Quotation_Revisionno: '',
    // Date / Time
    Quotation_Date: '', Created_Date: new Date().toISOString().split('T')[0], Deleted_Date: '',
    // Name / Description
    File_Name: '', Item_Name: '', Customer_Name: '',
    // Type & Status
    Industry_Type: '', Status: 'A',
    // File / Image
    File_Location: '', barcode: '',
};

const QuotationFileUpload = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => {
        setForm((f) => ({ ...f, [field]: val }));
    };

    const save = () => {
        if (editId) updateRecord('quotationFileUploads', editId, form);
        else addRecord('quotationFileUploads', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Quotation File Uploads" description="Manage drawings and document attachments for quotations" icon={Upload} />
            
            <DataTable 
                columns={columns} 
                data={state.quotationFileUploads || []} 
                onAdd={openAdd} 
                addLabel="Upload New File" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quotationFileUploads', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit File Record' : 'Upload New Drawing/File'} size="lg">
                <div className="p-6 space-y-6">
                    {/* Quotation & Customer Reference */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="References" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Quotation No" id="Quotation_No" value={form.Quotation_No} onChange={(e) => set('Quotation_No', e.target.value)} required />
                                <FormField label="Customer ID" id="Customer_ID" value={form.Customer_ID} onChange={(e) => set('Customer_ID', e.target.value)} />
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} />
                                <FormField label="Industry Type" id="Industry_Type" value={form.Industry_Type} onChange={(e) => set('Industry_Type', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Item Information" icon={Tag}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Item ID" id="Item_Id" value={form.Item_Id} onChange={(e) => set('Item_Id', e.target.value)} />
                                <FormField label="Item Name" id="Item_Name" value={form.Item_Name} onChange={(e) => set('Item_Name', e.target.value)} />
                                <FormField label="Drawing No" id="Drawing_No" value={form.Drawing_No} onChange={(e) => set('Drawing_No', e.target.value)} />
                                <FormField label="Revision No (Drawing)" id="Revision_No" value={form.Revision_No} onChange={(e) => set('Revision_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* File Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="File Metadata" icon={File}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="File Name" id="File_Name" value={form.File_Name} onChange={(e) => set('File_Name', e.target.value)} required />
                                <FormField label="File Location" id="File_Location" value={form.File_Location} onChange={(e) => set('File_Location', e.target.value)} />
                                <FormField label="Barcode" id="barcode" value={form.barcode} onChange={(e) => set('barcode', e.target.value)} />
                                <FormField label="Status" id="Status" value={form.Status} maxLength={10} onChange={(e) => set('Status', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Audit & dates" icon={Calendar}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Quotation Date" id="Quotation_Date" type="date" value={form.Quotation_Date} onChange={(e) => set('Quotation_Date', e.target.value)} />
                                <FormField label="Quotation Revision No" id="Quotation_Revisionno" value={form.Quotation_Revisionno} onChange={(e) => set('Quotation_Revisionno', e.target.value)} />
                                <FormField label="Created By" id="Created_By" value={form.Created_By} onChange={(e) => set('Created_By', e.target.value)} />
                                <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} onChange={(e) => set('Created_Date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuotationFileUpload;
