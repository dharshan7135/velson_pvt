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

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const validate = () => {
        const e = {};
        if (!form.companyCode.trim()) e.companyCode = 'Company Code is required';
        if (!form.fullName.trim()) e.fullName = 'Full Name is required';
        if (form.gstin && form.gstin.length !== 15) e.gstin = 'GSTIN must be 15 characters';
        if (form.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNo)) e.panNo = 'Invalid PAN format';
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
                            <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} />
                            <div className="form-field-group">
                                <label className="form-label">State</label>
                                <select className="form-input" value={form.state} onChange={(e) => set('state', e.target.value)}>
                                    <option value="">Select State</option>
                                    {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <FormField label="Code" id="code" value={form.code} onChange={(e) => set('code', e.target.value)} />
                            <FormField label="Phone (Off)" id="phoneOff" value={form.phoneOff} onChange={(e) => set('phoneOff', e.target.value)} />
                            <FormField label="Phone (Res)" id="phoneRes" value={form.phoneRes} onChange={(e) => set('phoneRes', e.target.value)} />
                            <FormField label="Sub Head" id="subHead" value={form.subHead} onChange={(e) => set('subHead', e.target.value)} />
                            <FormField label="Subject To" id="subjectTo" value={form.subjectTo} onChange={(e) => set('subjectTo', e.target.value)} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Bank Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Bank Name" id="bankName" value={form.bankName} onChange={(e) => set('bankName', e.target.value)} />
                            <FormField label="Account Name" id="accountName" value={form.accountName} onChange={(e) => set('accountName', e.target.value)} />
                            <FormField label="Account No" id="accountNo" value={form.accountNo} onChange={(e) => set('accountNo', e.target.value)} />
                            <FormField label="IFSC Code" id="ifscCode" value={form.ifscCode} onChange={(e) => set('ifscCode', e.target.value)} />
                            <FormField label="Branch" id="branch" value={form.branch} onChange={(e) => set('branch', e.target.value)} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Tax & Registration">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} />
                            <FormField label="GSTIN" id="gstin" value={form.gstin} onChange={(e) => set('gstin', e.target.value)} error={errors.gstin} />
                            <FormField label="PAN No" id="panNo" value={form.panNo} onChange={(e) => set('panNo', e.target.value.toUpperCase())} error={errors.panNo} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Sales Contact">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Sales Phone No" id="salesPhoneNo" value={form.salesPhoneNo} onChange={(e) => set('salesPhoneNo', e.target.value)} />
                            <FormField label="Sales Email ID" id="salesEmailId" type="email" value={form.salesEmailId} onChange={(e) => set('salesEmailId', e.target.value)} />
                            <FormField label="Sales Website" id="salesWebsite" value={form.salesWebsite} onChange={(e) => set('salesWebsite', e.target.value)} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Purchase & Quotation Contact">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Purchase Phone No" id="purchasePhoneNo" value={form.purchasePhoneNo} onChange={(e) => set('purchasePhoneNo', e.target.value)} />
                            <FormField label="Purchase Email ID" id="purchaseEmailId" type="email" value={form.purchaseEmailId} onChange={(e) => set('purchaseEmailId', e.target.value)} />
                            <FormField label="Quotation Phone No" id="quotationPhoneNo" value={form.quotationPhoneNo} onChange={(e) => set('quotationPhoneNo', e.target.value)} />
                            <FormField label="Quotation Email ID" id="quotationEmailId" type="email" value={form.quotationEmailId} onChange={(e) => set('quotationEmailId', e.target.value)} />
                            <FormField label="Quotation Website" id="quotationWebsite" value={form.quotationWebsite} onChange={(e) => set('quotationWebsite', e.target.value)} />
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
