import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Building2 } from 'lucide-react';
import { stateList } from '../../store/mockData';

const columns = [
    { key: 'companyCode', label: 'Code' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'state', label: 'State' },
    { key: 'phoneOff', label: 'Phone' },
    { key: 'emailId', label: 'Email' },
    { key: 'gstin', label: 'GSTIN' },
];

const emptyForm = {
    companyCode: '', fullName: '', address: '', state: '', code: '',
    phoneOff: '', phoneRes: '', subHead: '', subjectTo: '',
    bankName: '', accountName: '', accountNo: '', ifscCode: '', branch: '',
    emailId: '', gstin: '', panNo: '',
    salesPhoneNo: '', salesEmailId: '', salesWebsite: '',
    purchasePhoneNo: '', quotationPhoneNo: '', quotationEmailId: '',
    quotationWebsite: '', purchaseEmailId: '',
};

const CompanyMaster = () => {
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

        setErrors(prev => {
            const e = { ...prev };
            if (field === 'companyCode') {
                const v = (val || '').trim();
                if (!v) e.companyCode = 'Company Code is required';
                else if (!/^[A-Za-z0-9]+$/.test(v)) e.companyCode = 'Must be alphanumeric';
                else {
                    const isDup = state.companies?.some(c => c.companyCode.toLowerCase() === v.toLowerCase() && c.id !== editId);
                    if (isDup) e.companyCode = 'Must be unique';
                    else delete e.companyCode;
                }
            }
            if (field === 'fullName') {
                const v = (val || '').trim();
                if (!v) e.fullName = 'Full Name is required';
                else if (v.length < 3) e.fullName = 'Minimum 3 characters required';
                else delete e.fullName;
            }
            if (['address', 'state', 'code', 'branch', 'bankName', 'accountName'].includes(field)) {
                if (!(val || '').trim()) e[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                else delete e[field];
            }
            const indPhoneRegex = /^[6-9]\d{9}$/;
            if (['phoneOff', 'phoneRes', 'salesPhoneNo', 'purchasePhoneNo', 'quotationPhoneNo'].includes(field)) {
                if (val && !indPhoneRegex.test(val)) e[field] = 'Invalid 10-digit mobile number';
                else delete e[field];
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (['emailId', 'salesEmailId', 'purchaseEmailId', 'quotationEmailId'].includes(field)) {
                if (val && !emailRegex.test(val)) e[field] = 'Invalid email format';
                else delete e[field];
            }
            if (field === 'gstin') {
                if (val && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val.toUpperCase())) e.gstin = 'Invalid GSTIN format';
                else delete e.gstin;
            }
            if (field === 'panNo') {
                if (val && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase())) e.panNo = 'Invalid PAN format';
                else delete e.panNo;
            }
            if (field === 'accountNo') {
                if (val && !/^\d{9,18}$/.test(val)) e.accountNo = 'Must be 9-18 digits';
                else delete e.accountNo;
            }
            if (field === 'ifscCode') {
                if (val && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(val.toUpperCase())) e.ifscCode = 'Invalid IFSC format';
                else delete e.ifscCode;
            }
            if (['salesWebsite', 'quotationWebsite'].includes(field)) {
                if (val && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(val)) e[field] = 'Invalid URL format';
                else delete e[field];
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};

        // Required Fields
        if (!form.companyCode?.trim()) e.companyCode = 'Company Code is required';
        else if (!/^[A-Za-z0-9]+$/.test(form.companyCode.trim())) e.companyCode = 'Must be alphanumeric';

        if (!form.fullName?.trim()) e.fullName = 'Full Name is required';
        else if (form.fullName.trim().length < 3) e.fullName = 'Minimum 3 characters required';

        if (!form.address?.trim()) e.address = 'Address is required';
        if (!form.state?.trim()) e.state = 'State is required';
        if (!form.code?.trim()) e.code = 'Code is required';
        if (!form.branch?.trim()) e.branch = 'Branch is required';
        if (!form.bankName?.trim()) e.bankName = 'Bank Name is required';
        if (!form.accountName?.trim()) e.accountName = 'Account Name is required';

        // Validations - Format checks
        const indPhoneRegex = /^[6-9]\d{9}$/;
        if (form.phoneOff && !indPhoneRegex.test(form.phoneOff)) e.phoneOff = 'Invalid 10-digit mobile number';
        if (form.phoneRes && !indPhoneRegex.test(form.phoneRes)) e.phoneRes = 'Invalid 10-digit mobile number';
        if (form.salesPhoneNo && !indPhoneRegex.test(form.salesPhoneNo)) e.salesPhoneNo = 'Invalid 10-digit mobile number';
        if (form.purchasePhoneNo && !indPhoneRegex.test(form.purchasePhoneNo)) e.purchasePhoneNo = 'Invalid 10-digit mobile number';
        if (form.quotationPhoneNo && !indPhoneRegex.test(form.quotationPhoneNo)) e.quotationPhoneNo = 'Invalid 10-digit mobile number';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (form.emailId && !emailRegex.test(form.emailId)) e.emailId = 'Invalid email format';
        if (form.salesEmailId && !emailRegex.test(form.salesEmailId)) e.salesEmailId = 'Invalid email format';
        if (form.purchaseEmailId && !emailRegex.test(form.purchaseEmailId)) e.purchaseEmailId = 'Invalid email format';
        if (form.quotationEmailId && !emailRegex.test(form.quotationEmailId)) e.quotationEmailId = 'Invalid email format';

        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (form.gstin && !gstinRegex.test(form.gstin)) e.gstin = 'Invalid GSTIN format';

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (form.panNo && !panRegex.test(form.panNo)) e.panNo = 'Invalid PAN format';

        const accountNoRegex = /^\d{9,18}$/;
        if (form.accountNo && !accountNoRegex.test(form.accountNo)) e.accountNo = 'Must be 9-18 digits';

        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (form.ifscCode && !ifscRegex.test(form.ifscCode)) e.ifscCode = 'Invalid IFSC format';

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        if (form.salesWebsite && !urlRegex.test(form.salesWebsite)) e.salesWebsite = 'Invalid URL format';
        if (form.quotationWebsite && !urlRegex.test(form.quotationWebsite)) e.quotationWebsite = 'Invalid URL format';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('companies', editId, form);
        else addRecord('companies', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Company Master" description="Manage company information and registration details" icon={Building2} />
            <DataTable columns={columns} data={state.companies} onAdd={openAdd} addLabel="Add Company" onEdit={openEdit} onDelete={(r) => deleteRecord('companies', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Company' : 'Add Company'} size="xl">
                <div className="p-6 space-y-6">
                    <FormContainer title="General Information" icon={Building2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Company Code" id="companyCode" required value={form.companyCode} onChange={(e) => set('companyCode', e.target.value)} error={errors.companyCode} />
                            <FormField label="Full Name" id="fullName" required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} error={errors.fullName} />
                            <FormField label="Address" id="address" required value={form.address} onChange={(e) => set('address', e.target.value)} error={errors.address} />
                            <div className="form-field-group">
                                <label className="form-label">
                                    State <span className="text-red-500 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <select className={`form-input ${errors.state ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} value={form.state} onChange={(e) => set('state', e.target.value)}>
                                        <option value="">Select State</option>
                                        {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                {errors.state && (
                                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle w-3 h-3"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                        {errors.state}
                                    </p>
                                )}
                            </div>
                            <FormField label="Code" id="code" required value={form.code} onChange={(e) => set('code', e.target.value)} error={errors.code} />
                            <FormField label="Phone (Off)" id="phoneOff" value={form.phoneOff} onChange={(e) => set('phoneOff', e.target.value)} error={errors.phoneOff} />
                            <FormField label="Phone (Res)" id="phoneRes" value={form.phoneRes} onChange={(e) => set('phoneRes', e.target.value)} error={errors.phoneRes} />
                            <FormField label="Sub Head" id="subHead" value={form.subHead} onChange={(e) => set('subHead', e.target.value)} error={errors.subHead} />
                            <FormField label="Subject To" id="subjectTo" value={form.subjectTo} onChange={(e) => set('subjectTo', e.target.value)} error={errors.subjectTo} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Bank Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Bank Name" id="bankName" required value={form.bankName} onChange={(e) => set('bankName', e.target.value)} error={errors.bankName} />
                            <FormField label="Account Name" id="accountName" required value={form.accountName} onChange={(e) => set('accountName', e.target.value)} error={errors.accountName} />
                            <FormField label="Account No" id="accountNo" value={form.accountNo} onChange={(e) => set('accountNo', e.target.value)} error={errors.accountNo} />
                            <FormField label="IFSC Code" id="ifscCode" value={form.ifscCode} onChange={(e) => set('ifscCode', e.target.value.toUpperCase())} error={errors.ifscCode} />
                            <FormField label="Branch" id="branch" required value={form.branch} onChange={(e) => set('branch', e.target.value)} error={errors.branch} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Tax & Registration">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} error={errors.emailId} />
                            <FormField label="GSTIN" id="gstin" value={form.gstin} onChange={(e) => set('gstin', e.target.value.toUpperCase())} error={errors.gstin} />
                            <FormField label="PAN No" id="panNo" value={form.panNo} onChange={(e) => set('panNo', e.target.value.toUpperCase())} error={errors.panNo} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Sales Contact">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Sales Phone No" id="salesPhoneNo" value={form.salesPhoneNo} onChange={(e) => set('salesPhoneNo', e.target.value)} error={errors.salesPhoneNo} />
                            <FormField label="Sales Email ID" id="salesEmailId" type="email" value={form.salesEmailId} onChange={(e) => set('salesEmailId', e.target.value)} error={errors.salesEmailId} />
                            <FormField label="Sales Website" id="salesWebsite" value={form.salesWebsite} onChange={(e) => set('salesWebsite', e.target.value)} error={errors.salesWebsite} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Purchase & Quotation Contact">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Purchase Phone No" id="purchasePhoneNo" value={form.purchasePhoneNo} onChange={(e) => set('purchasePhoneNo', e.target.value)} error={errors.purchasePhoneNo} />
                            <FormField label="Purchase Email ID" id="purchaseEmailId" type="email" value={form.purchaseEmailId} onChange={(e) => set('purchaseEmailId', e.target.value)} error={errors.purchaseEmailId} />
                            <FormField label="Quotation Phone No" id="quotationPhoneNo" value={form.quotationPhoneNo} onChange={(e) => set('quotationPhoneNo', e.target.value)} error={errors.quotationPhoneNo} />
                            <FormField label="Quotation Email ID" id="quotationEmailId" type="email" value={form.quotationEmailId} onChange={(e) => set('quotationEmailId', e.target.value)} error={errors.quotationEmailId} />
                            <FormField label="Quotation Website" id="quotationWebsite" value={form.quotationWebsite} onChange={(e) => set('quotationWebsite', e.target.value)} error={errors.quotationWebsite} />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-2">
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

export default CompanyMaster;
