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
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'supplierName') {
                const val = (v || '').trim();
                if (!val) e.supplierName = 'Supplier Name is required';
                else if (val.length < 3) e.supplierName = 'Minimum 3 characters required';
                else if (!/^[A-Za-z0-9\s]+$/.test(val)) e.supplierName = 'Only alphabets, numbers, and spaces allowed';
                else delete e.supplierName;
            }
            if (f === 'address') {
                const val = (v || '').trim();
                if (!val) e.address = 'Address is required';
                else if (val.length > 255) e.address = 'Address is too long (max 255 characters)';
                else delete e.address;
            }
            if (f === 'phone1') {
                const val = (v || '').trim();
                if (!val) e.phone1 = 'Phone1 is required';
                else if (!/^[6-9]\d{9}$/.test(val)) e.phone1 = 'Invalid 10-digit phone number';
                else delete e.phone1;
            }
            if (f === 'supplierCode') {
                const val = (v || '').trim();
                if (val) {
                    if (!/^[A-Za-z0-9]+$/.test(val)) e.supplierCode = 'Must contain only alphanumeric characters';
                    else {
                        const isDup = state.suppliers.some(s => s.supplierCode.toLowerCase() === val.toLowerCase() && s.id !== editId);
                        if (isDup) e.supplierCode = 'Supplier Code must be unique';
                        else delete e.supplierCode;
                    }
                } else delete e.supplierCode;
            }
            if (f === 'city') {
                const val = (v || '').trim();
                if (val && !/^[A-Za-z\s]+$/.test(val)) e.city = 'Only alphabets and spaces allowed';
                else delete e.city;
            }
            if (['state', 'country'].includes(f)) {
                if (!v) e[f] = `${f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                else delete e[f];
            }
            if (f === 'stateCode') {
                if (v && !/^\d+$/.test(v)) e.stateCode = 'Must be a numeric value';
                else delete e.stateCode;
            }
            if (f === 'pincode') {
                if (v && !/^\d{6}$/.test(v)) e.pincode = 'Must contain exactly 6 numeric digits';
                else delete e.pincode;
            }
            if (f === 'phone2') {
                if (v && !/^[6-9]\d{9}$/.test(v)) e.phone2 = 'Invalid 10-digit phone number';
                else delete e.phone2;
            }
            if (f === 'grade') {
                if (v && !/^[A-Za-z\s]+$/.test(v)) e.grade = 'Only alphabetic characters allowed';
                else delete e.grade;
            }
            if (f === 'emailId') {
                if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e.emailId = 'Invalid email format';
                else delete e.emailId;
            }
            if (f === 'website') {
                if (v && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(v)) e.website = 'Invalid URL format';
                else delete e.website;
            }
            if (f === 'gstNo') {
                if (v && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v.toUpperCase())) e.gstNo = 'Invalid 15-character GSTIN format';
                else delete e.gstNo;
            }
            if (f === 'bankName') {
                if (v && !/^[A-Za-z\s]+$/.test(v)) e.bankName = 'Only alphabetic characters allowed';
                else delete e.bankName;
            }
            if (['partDetails', 'partNo1'].includes(f)) {
                if (v && !/^[A-Za-z0-9\s]+$/.test(v)) e[f] = 'Only alphanumeric characters allowed';
                else delete e[f];
            }

            return e;
        });
    };

    const validate = () => {
        const e = {};

        // 1. Required Fields
        if (!form.supplierName?.trim()) e.supplierName = 'Supplier Name is required';
        else if (form.supplierName.trim().length < 3) e.supplierName = 'Minimum 3 characters required';
        else if (!/^[A-Za-z0-9\s]+$/.test(form.supplierName.trim())) e.supplierName = 'Only alphabets, numbers, and spaces allowed';

        if (!form.address?.trim()) e.address = 'Address is required';
        else if (form.address.trim().length > 255) e.address = 'Address is too long (max 255 characters)';

        if (!form.phone1?.trim()) e.phone1 = 'Phone1 is required';
        else if (!/^[6-9]\d{9}$/.test(form.phone1.trim())) e.phone1 = 'Invalid 10-digit phone number';

        // 2. Supplier Code (Unique & Alphanumeric)
        if (form.supplierCode?.trim()) {
            if (!/^[A-Za-z0-9]+$/.test(form.supplierCode.trim())) e.supplierCode = 'Must contain only alphanumeric characters';
            else {
                const isDuplicate = state.suppliers.some(s => s.supplierCode.toLowerCase() === form.supplierCode.trim().toLowerCase() && s.id !== editId);
                if (isDuplicate) e.supplierCode = 'Supplier Code must be unique';
            }
        }

        // City (Alphabetic and spaces)
        if (form.city?.trim() && !/^[A-Za-z\s]+$/.test(form.city.trim())) {
            e.city = 'Only alphabets and spaces allowed';
        }

        // State & Country Selects
        if (!form.state) e.state = 'State is required';
        if (!form.country) e.country = 'Country is required';

        // State Code (Numeric)
        if (form.stateCode?.trim() && !/^\d+$/.test(form.stateCode.trim())) {
            e.stateCode = 'Must be a numeric value';
        }

        // Pincode (6 digits)
        if (form.pincode?.trim() && !/^\d{6}$/.test(form.pincode.trim())) {
            e.pincode = 'Must contain exactly 6 numeric digits';
        }

        // Phone2 (Optional, 10 digits)
        if (form.phone2?.trim() && !/^[6-9]\d{9}$/.test(form.phone2.trim())) {
            e.phone2 = 'Invalid 10-digit phone number';
        }

        // Grade (Alphabetic)
        if (form.grade?.trim() && !/^[A-Za-z\s]+$/.test(form.grade.trim())) {
            e.grade = 'Only alphabetic characters allowed';
        }

        // Email ID
        if (form.emailId?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
            e.emailId = 'Invalid email format';
        }

        // Website (Valid URL format)
        if (form.website?.trim() && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(form.website)) {
            e.website = 'Invalid URL format';
        }

        // GST No (15 characters)
        if (form.gstNo?.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.gstNo.toUpperCase().trim())) {
            e.gstNo = 'Invalid 15-character GSTIN format';
        }

        // Part Details / Part No1 / Bank Name
        if (form.bankName?.trim() && !/^[A-Za-z\s]+$/.test(form.bankName.trim())) {
            e.bankName = 'Only alphabetic characters allowed';
        }
        if (form.partDetails?.trim() && !/^[A-Za-z0-9\s]+$/.test(form.partDetails.trim())) {
            e.partDetails = 'Only alphanumeric characters allowed';
        }
        if (form.partNo1?.trim() && !/^[A-Za-z0-9\s]+$/.test(form.partNo1.trim())) {
            e.partNo1 = 'Only alphanumeric characters allowed';
        }

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
                        <FormField label="Supplier Code" id="supplierCode" value={form.supplierCode} onChange={(e) => set('supplierCode', e.target.value)} error={errors.supplierCode} />
                        <FormField label="Supplier Name" id="supplierName" required value={form.supplierName} onChange={(e) => set('supplierName', e.target.value)} error={errors.supplierName} />
                        <FormField label="Address" id="address" required value={form.address} onChange={(e) => set('address', e.target.value)} error={errors.address} />
                        <FormField label="City" id="city" value={form.city} onChange={(e) => set('city', e.target.value)} error={errors.city} />
                        <div className="form-field-group">
                            <label className="form-label">State <span className="text-red-500 ml-0.5">*</span></label>
                            <select className={`form-input ${errors.state ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} value={form.state} onChange={(e) => set('state', e.target.value)}>
                                <option value="">Select State</option>
                                {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.state && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle w-3 h-3"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>{errors.state}</p>}
                        </div>
                        <FormField label="State Code" id="stateCode" value={form.stateCode} onChange={(e) => set('stateCode', e.target.value)} error={errors.stateCode} />
                        <div className="form-field-group">
                            <label className="form-label">Country <span className="text-red-500 ml-0.5">*</span></label>
                            <select className={`form-input ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} value={form.country} onChange={(e) => set('country', e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.country && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle w-3 h-3"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>{errors.country}</p>}
                        </div>
                        <FormField label="Pincode" id="pincode" value={form.pincode} onChange={(e) => set('pincode', e.target.value)} error={errors.pincode} />
                        <FormField label="Phone1" id="phone1" required value={form.phone1} onChange={(e) => set('phone1', e.target.value)} error={errors.phone1} />
                        <FormField label="Phone2" id="phone2" value={form.phone2} onChange={(e) => set('phone2', e.target.value)} error={errors.phone2} />
                        <FormField label="Grade" id="grade" value={form.grade} onChange={(e) => set('grade', e.target.value)} error={errors.grade} />
                        <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} error={errors.emailId} />
                        <FormField label="Website" id="website" value={form.website} onChange={(e) => set('website', e.target.value)} error={errors.website} />
                        <FormField label="GST No" id="gstNo" value={form.gstNo} onChange={(e) => set('gstNo', e.target.value.toUpperCase())} error={errors.gstNo} />
                        <FormField label="Part Details" id="partDetails" value={form.partDetails} onChange={(e) => set('partDetails', e.target.value)} error={errors.partDetails} />
                        <FormField label="Bank Name" id="bankName" value={form.bankName} onChange={(e) => set('bankName', e.target.value)} error={errors.bankName} />
                        <FormField label="Part No1" id="partNo1" value={form.partNo1} onChange={(e) => set('partNo1', e.target.value)} error={errors.partNo1} />
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
