import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Truck } from 'lucide-react';
import { stateList, countryList } from '../../store/mockData';

const columns = [
    { key: 'supplierCode', label: 'Code' },
    { key: 'supplierName', label: 'Supplier Name' },
    { key: 'city', label: 'City' },
    { key: 'phone1', label: 'Phone' },
    { key: 'grade', label: 'Grade' },
    { key: 'emailId', label: 'Email' },
];

const emptyForm = {
    supplierCode: '', supplierName: '', address: '', city: '', state: '', stateCode: '',
    country: '', pincode: '', phone1: '', phone2: '', grade: '', emailId: '',
    website: '', gstNo: '', partDetails: '', bankName: '', partNo1: '',
};

const SupplierDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

    const validate = () => {
        const e = {};
        if (!form.supplierName.trim()) e.supplierName = 'Required';
        if (!form.address.trim()) e.address = 'Required';
        if (!form.phone1.trim()) e.phone1 = 'Required';
        if (form.phone1 && form.phone1.length !== 10) e.phone1 = 'Must be 10 digits';
        if (form.gstNo && form.gstNo.length !== 15) e.gstNo = 'Must be 15 characters';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('suppliers', editId, form);
        else addRecord('suppliers', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Supplier Details" description="Manage supplier information and contact details" icon={Truck} />
            <DataTable columns={columns} data={state.suppliers} onAdd={openAdd} addLabel="Add Supplier" onEdit={openEdit} onDelete={(r) => deleteRecord('suppliers', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Supplier' : 'Add Supplier'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <FormField label="Supplier Code" id="supplierCode" value={form.supplierCode} onChange={(e) => set('supplierCode', e.target.value)} />
                        <FormField label="Supplier Name" id="supplierName" required value={form.supplierName} onChange={(e) => set('supplierName', e.target.value)} error={errors.supplierName} />
                        <FormField label="Address" id="address" required value={form.address} onChange={(e) => set('address', e.target.value)} error={errors.address} />
                        <FormField label="City" id="city" value={form.city} onChange={(e) => set('city', e.target.value)} />
                        <div className="form-field-group">
                            <label className="form-label">State</label>
                            <select className="form-input" value={form.state} onChange={(e) => set('state', e.target.value)}>
                                <option value="">Select State</option>
                                {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <FormField label="State Code" id="stateCode" value={form.stateCode} onChange={(e) => set('stateCode', e.target.value)} />
                        <div className="form-field-group">
                            <label className="form-label">Country</label>
                            <select className="form-input" value={form.country} onChange={(e) => set('country', e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <FormField label="Pincode" id="pincode" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} />
                        <FormField label="Phone1" id="phone1" required value={form.phone1} onChange={(e) => set('phone1', e.target.value)} error={errors.phone1} />
                        <FormField label="Phone2" id="phone2" value={form.phone2} onChange={(e) => set('phone2', e.target.value)} />
                        <FormField label="Grade" id="grade" value={form.grade} onChange={(e) => set('grade', e.target.value)} />
                        <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} />
                        <FormField label="Website" id="website" value={form.website} onChange={(e) => set('website', e.target.value)} />
                        <FormField label="GST No" id="gstNo" value={form.gstNo} onChange={(e) => set('gstNo', e.target.value)} error={errors.gstNo} />
                        <FormField label="Part Details" id="partDetails" value={form.partDetails} onChange={(e) => set('partDetails', e.target.value)} />
                        <FormField label="Bank Name" id="bankName" value={form.bankName} onChange={(e) => set('bankName', e.target.value)} />
                        <FormField label="Part No1" id="partNo1" value={form.partNo1} onChange={(e) => set('partNo1', e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default SupplierDetails;
