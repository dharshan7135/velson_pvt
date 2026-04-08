import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Layers, Database, Calendar, Package, Shield, FileText, Upload } from 'lucide-react';

const columns = [
    { key: 'DD_Job_Number', label: 'Job Number' },
    { key: 'DD_Drwaing_Number', label: 'Drawing No' },
    { key: 'DD_Drawing_Name', label: 'Drawing Name' },
    { key: 'Dd_Item_Name', label: 'Item Name' },
    { key: 'DD_Status', label: 'Status' },
];

const emptyForm = {
    DD_ID: '',
    Dd_Item_Id: '',
    DD_Job_Number: '',
    DD_Drwaing_Number: '',
    DD_Note: '',
    DD_Tecnical_Issue_Date: '',
    DD_Production_Received_Date: '',
    DD_Drawing_Name: '',
    Dd_Item_Name: '',
    DD_Status: 'A',
    DD_Approval_Rejection_Person: '',
    DD_Approval_Rejection_Date: '',
    Drawing_Image: '',
    DD_Created_by: '',
    DD_Created_date: new Date().toISOString().slice(0, 10),
    DD_Remaks: '',
    DD_Received_BY: '',
    DD_Revsion: 0,
    Drawing_Location: '',
};

const DrawingDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('drawingDetails', editId, form); else addRecord('drawingDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Drawing Details" description="Manage detailed drawing records linked to job numbers and items" icon={Layers} />
            <DataTable columns={columns} data={state.drawingDetails || []} onAdd={openAdd} addLabel="New Drawing Detail" onEdit={openEdit} onDelete={(r) => deleteRecord('drawingDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Drawing Detail' : 'New Drawing Detail'} size="full">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Document Info" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Drawing Detail ID" id="DD_ID" value={form.DD_ID} onChange={(e) => set('DD_ID', e.target.value)} required />
                                <FormField label="Job Number" id="DD_Job_Number" value={form.DD_Job_Number} onChange={(e) => set('DD_Job_Number', e.target.value)} required />
                                <FormField label="Drawing Number" id="DD_Drwaing_Number" value={form.DD_Drwaing_Number} onChange={(e) => set('DD_Drwaing_Number', e.target.value)} required />
                                <FormField label="Drawing Name" id="DD_Drawing_Name" className="md:col-span-2" value={form.DD_Drawing_Name} onChange={(e) => set('DD_Drawing_Name', e.target.value)} required />
                                <FormField label="Item Name" id="Dd_Item_Name" className="md:col-span-2" value={form.Dd_Item_Name} onChange={(e) => set('Dd_Item_Name', e.target.value)} />
                                <FormField label="Note" id="DD_Note" className="md:col-span-2" value={form.DD_Note} onChange={(e) => set('DD_Note', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Dates" icon={Calendar}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Technical Issue Date" id="DD_Tecnical_Issue_Date" type="date" value={form.DD_Tecnical_Issue_Date} onChange={(e) => set('DD_Tecnical_Issue_Date', e.target.value)} />
                                <FormField label="Production Received Date" id="DD_Production_Received_Date" type="date" value={form.DD_Production_Received_Date} onChange={(e) => set('DD_Production_Received_Date', e.target.value)} />
                                <FormField label="Approval/Rejection Date" id="DD_Approval_Rejection_Date" type="date" value={form.DD_Approval_Rejection_Date} onChange={(e) => set('DD_Approval_Rejection_Date', e.target.value)} />
                                <FormField label="Created Date" id="DD_Created_date" type="date" value={form.DD_Created_date} onChange={(e) => set('DD_Created_date', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Status & Approval" icon={Shield}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Status" id="DD_Status" value={form.DD_Status} onChange={(e) => set('DD_Status', e.target.value)} />
                                <FormField label="Approval/Rejection Person" id="DD_Approval_Rejection_Person" value={form.DD_Approval_Rejection_Person} onChange={(e) => set('DD_Approval_Rejection_Person', e.target.value)} />
                                <FormField label="Revision" id="DD_Revsion" type="number" value={form.DD_Revsion} onChange={(e) => set('DD_Revsion', e.target.value)} />
                                <FormField label="Received By" id="DD_Received_BY" value={form.DD_Received_BY} onChange={(e) => set('DD_Received_BY', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="File & Audit" icon={Upload}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Drawing Image" id="Drawing_Image" value={form.Drawing_Image} onChange={(e) => set('Drawing_Image', e.target.value)} />
                                <FormField label="Drawing Location" id="Drawing_Location" value={form.Drawing_Location} onChange={(e) => set('Drawing_Location', e.target.value)} />
                                <FormField label="Remarks" id="DD_Remaks" value={form.DD_Remaks} onChange={(e) => set('DD_Remaks', e.target.value)} />
                                <FormField label="Created By" id="DD_Created_by" value={form.DD_Created_by} onChange={(e) => set('DD_Created_by', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Detail'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default DrawingDetails;
