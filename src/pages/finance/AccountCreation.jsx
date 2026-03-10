import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { BookOpen } from 'lucide-react';
import { stateList } from '../../store/mockData';

const columns = [
    { key: 'acCode', label: 'A/C Code' },
    { key: 'acName', label: 'A/C Name' },
    { key: 'ledgerType', label: 'Ledger Type' },
    { key: 'group', label: 'Group' },
    {
        key: 'status', label: 'Status', render: (v) => (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${v === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{v}</span>
        )
    },
    { key: 'openingBalance', label: 'Opening Bal' },
];

const emptyForm = {
    acCode: '', lId: '', acName: '', address: '', dueDays: '', tdsPercent: '',
    shortName: '', creditLimit: '', tcsPercent: '', ledgerType: '', hireCharges: '',
    km: '', group: '', accountName: '', openingBalance: '', acType: '', area: '',
    bankAcNo: '', ifscCode: '', branch: '', taxType: '', stateName: '',
    stateCode: '', gstNo: '', panNo: '', aadhaarNo: '', emailId: '', phoneNo: '',
    cellNo: '', contactPerson: '', bank: '', status: '', ledgerId: '',
};

const AccountCreation = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [addGroupModal, setAddGroupModal] = useState(false);
    const [newGroup, setNewGroup] = useState({ group: '', underGroupOf: '' });

    const groupOptions = state.groupMaster.map(g => ({ label: g.group, value: g.group }));
    const ledgerTypes = ['Cash', 'Bank', 'Party', 'Tax', 'Duty', 'Other'].map(v => ({ label: v, value: v }));
    const taxTypes = ['None', 'GST', 'TDS', 'TCS'].map(v => ({ label: v, value: v }));
    const statusOptions = ['Active', 'Inactive'].map(v => ({ label: v, value: v }));
    const acTypeOptions = ['Debit', 'Credit'].map(v => ({ label: v, value: v }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));

        setErrors(prev => {
            const e = { ...prev };
            if (f === 'acCode') {
                const val = (v || '').trim();
                if (!val) delete e.acCode;
                else if (!/^[A-Za-z0-9]+$/.test(val)) e.acCode = 'Must contain only alphanumeric characters';
                else {
                    const isDuplicate = state.accounts.some(a => a.acCode.toLowerCase() === val.toLowerCase() && a.id !== editId);
                    if (isDuplicate) e.acCode = 'A/C Code must be unique';
                    else delete e.acCode;
                }
            }
            if (f === 'acName') {
                const val = (v || '').trim();
                if (!val) e.acName = 'A/C Name is required';
                else if (val.length < 3) e.acName = 'Minimum 3 characters required';
                else if (!/^[A-Za-z0-9\s]+$/.test(val)) e.acName = 'Only alphabets, numbers, and spaces allowed';
                else delete e.acName;
            }
            if (f === 'dueDays') {
                if (v === '' || v === null) e.dueDays = 'Due Days is required';
                else if (isNaN(Number(v)) || Number(v) < 0) e.dueDays = 'Must be greater than or equal to zero';
                else delete e.dueDays;
            }
            if (f === 'creditLimit') {
                if (v === '' || v === null) e.creditLimit = 'Credit Limit is required';
                else if (isNaN(Number(v)) || Number(v) < 0) e.creditLimit = 'Cannot be negative';
                else delete e.creditLimit;
            }
            if (f === 'hireCharges') {
                if (v === '' || v === null) e.hireCharges = 'Hire Charges is required';
                else if (isNaN(Number(v))) e.hireCharges = 'Must be numeric';
                else delete e.hireCharges;
            }
            if (['ledgerType', 'group', 'taxType', 'status'].includes(f)) {
                if (!v) e[f] = `${f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                else delete e[f];
            }
            if (['phoneNo', 'cellNo'].includes(f)) {
                if (v && !/^[6-9]\d{9}$/.test(v)) e[f] = 'Invalid 10-digit phone number';
                else delete e[f];
            }
            if (f === 'aadhaarNo') {
                if (v && !/^\d{12}$/.test(v)) e.aadhaarNo = 'Must contain exactly 12 numeric digits';
                else delete e.aadhaarNo;
            }
            if (f === 'bankAcNo') {
                if (v && !/^\d{9,18}$/.test(v)) e.bankAcNo = 'Invalid bank account format (9-18 digits)';
                else delete e.bankAcNo;
            }
            if (f === 'ifscCode') {
                if (v && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.toUpperCase().trim())) {
                    e.ifscCode = 'Invalid IFSC format (e.g. SBIN0012345)';
                } else delete e.ifscCode;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};

        // 1. Required Fields
        if (!form.acName?.trim()) e.acName = 'A/C Name is required';
        else if (form.acName.trim().length < 3) e.acName = 'Minimum 3 characters required';
        else if (!/^[A-Za-z0-9\s]+$/.test(form.acName.trim())) e.acName = 'Only alphabets, numbers, and spaces allowed';

        if (form.dueDays === '' || form.dueDays === null) e.dueDays = 'Due Days is required';
        else if (isNaN(Number(form.dueDays)) || Number(form.dueDays) < 0) e.dueDays = 'Must be greater than or equal to zero';

        if (form.creditLimit === '' || form.creditLimit === null) e.creditLimit = 'Credit Limit is required';
        else if (isNaN(Number(form.creditLimit)) || Number(form.creditLimit) < 0) e.creditLimit = 'Cannot be negative';

        if (!form.ledgerType) e.ledgerType = 'Ledger Type is required';

        if (form.hireCharges === '' || form.hireCharges === null) e.hireCharges = 'Hire Charges is required';
        else if (isNaN(Number(form.hireCharges))) e.hireCharges = 'Must be numeric';

        if (!form.group) e.group = 'Group is required';
        if (!form.taxType) e.taxType = 'Tax Type is required';
        if (!form.status) e.status = 'Status is required';

        // 2. A/C Code (Unique & Alphanumeric)
        if (form.acCode?.trim()) {
            if (!/^[A-Za-z0-9]+$/.test(form.acCode.trim())) e.acCode = 'Must contain only alphanumeric characters';
            else {
                const isDuplicate = state.accounts.some(a => a.acCode.toLowerCase() === form.acCode.trim().toLowerCase() && a.id !== editId);
                if (isDuplicate) e.acCode = 'A/C Code must be unique';
            }
        }

        // Percentage checks (TDS/TCS)
        if (form.tdsPercent !== '' && (Number(form.tdsPercent) < 0 || Number(form.tdsPercent) > 100)) e.tdsPercent = 'Must be between 0 and 100';
        if (form.tcsPercent !== '' && (Number(form.tcsPercent) < 0 || Number(form.tcsPercent) > 100)) e.tcsPercent = 'Must be between 0 and 100';

        // Hire Charges & KM & Opening Balance (Numeric)
        if (form.km !== '' && isNaN(Number(form.km))) e.km = 'Must be numeric';
        if (form.openingBalance !== '' && isNaN(Number(form.openingBalance))) e.openingBalance = 'Must be numeric';

        // IFSC Format (4 letters + 0 + 6 alphanumeric)
        if (form.ifscCode?.trim() && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase().trim())) {
            e.ifscCode = 'Invalid IFSC format (e.g. SBIN0012345)';
        }

        // GST Format (15 characters)
        if (form.gstNo?.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.gstNo.toUpperCase().trim())) {
            e.gstNo = 'Invalid 15-character GSTIN format';
        }

        // PAN Format (ABCDE1234F)
        if (form.panNo?.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNo.toUpperCase().trim())) {
            e.panNo = 'Invalid Indian PAN format (e.g. ABCDE1234F)';
        }

        // Aadhaar (Exactly 12 digits)
        if (form.aadhaarNo?.trim() && !/^\d{12}$/.test(form.aadhaarNo.trim())) {
            e.aadhaarNo = 'Must contain exactly 12 numeric digits';
        }

        // Email format
        if (form.emailId?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
            e.emailId = 'Invalid email format';
        }

        // Phone & Cell (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (form.phoneNo?.trim() && !phoneRegex.test(form.phoneNo.trim())) e.phoneNo = 'Invalid 10-digit phone number';
        if (form.cellNo?.trim() && !phoneRegex.test(form.cellNo.trim())) e.cellNo = 'Invalid 10-digit phone number';

        // Bank Account Format
        if (form.bankAcNo?.trim() && !/^\d{9,18}$/.test(form.bankAcNo.trim())) {
            e.bankAcNo = 'Invalid bank account format (9-18 digits)';
        }

        // Contact Person (Alphabets and spaces)
        if (form.contactPerson?.trim() && !/^[A-Za-z\s]+$/.test(form.contactPerson.trim())) {
            e.contactPerson = 'Only alphabets and spaces allowed';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('accounts', editId, form);
        else addRecord('accounts', form);
        close();
    };

    const saveGroup = () => {
        if (!newGroup.group.trim()) return;
        addRecord('groupMaster', { ...newGroup, printingOrder: 0, groupTotal: 0 });
        set('group', newGroup.group);
        setNewGroup({ group: '', underGroupOf: '' });
        setAddGroupModal(false);
    };

    return (
        <div className="p-6">
            <PageHeader title="Account Creation" description="Manage ledger accounts, banking, and tax details" icon={BookOpen} />
            <DataTable columns={columns} data={state.accounts} onAdd={openAdd} addLabel="Add Account" onEdit={openEdit} onDelete={(r) => deleteRecord('accounts', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Account' : 'Add Account'} size="xl">
                <div className="p-6 space-y-6">
                    <FormContainer title="Basic Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="A/C Code" id="acCode" value={form.acCode} onChange={(e) => set('acCode', e.target.value)} error={errors.acCode} />
                            <FormField label="L ID" id="lId" value={form.lId} onChange={(e) => set('lId', e.target.value)} />
                            <FormField label="A/C Name" id="acName" required value={form.acName} onChange={(e) => set('acName', e.target.value)} error={errors.acName} />
                            <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} error={errors.address} />
                            <FormField label="Due Days" id="dueDays" required type="number" value={form.dueDays} onChange={(e) => set('dueDays', e.target.value)} error={errors.dueDays} />
                            <FormField label="TDS %" id="tdsPercent" type="number" value={form.tdsPercent} onChange={(e) => set('tdsPercent', e.target.value)} error={errors.tdsPercent} />
                            <FormField label="Short Name" id="shortName" value={form.shortName} onChange={(e) => set('shortName', e.target.value)} />
                            <FormField label="Credit Limit" id="creditLimit" required type="number" value={form.creditLimit} onChange={(e) => set('creditLimit', e.target.value)} error={errors.creditLimit} />
                            <FormField label="TCS %" id="tcsPercent" type="number" value={form.tcsPercent} onChange={(e) => set('tcsPercent', e.target.value)} error={errors.tcsPercent} />
                            <DropdownWithCreate label="Ledger Type" id="ledgerType" required options={ledgerTypes} value={form.ledgerType} onChange={(v) => set('ledgerType', v)} error={errors.ledgerType} />
                            <FormField label="Hire Charges" id="hireCharges" required type="number" value={form.hireCharges} onChange={(e) => set('hireCharges', e.target.value)} error={errors.hireCharges} />
                            <FormField label="KM" id="km" type="number" value={form.km} onChange={(e) => set('km', e.target.value)} error={errors.km} />
                            <DropdownWithCreate label="Group" id="group" required options={groupOptions} value={form.group} onChange={(v) => set('group', v)} onAdd={() => setAddGroupModal(true)} error={errors.group} />
                            <FormField label="Account Name" id="accountName" value={form.accountName} onChange={(e) => set('accountName', e.target.value)} />
                            <FormField label="Opening Balance" id="openingBalance" type="number" value={form.openingBalance} onChange={(e) => set('openingBalance', e.target.value)} error={errors.openingBalance} />
                            <DropdownWithCreate label="A/C Type" id="acType" options={acTypeOptions} value={form.acType} onChange={(v) => set('acType', v)} />
                            <FormField label="Area" id="area" value={form.area} onChange={(e) => set('area', e.target.value)} error={errors.area} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Banking Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Bank A/C No" id="bankAcNo" value={form.bankAcNo} onChange={(e) => set('bankAcNo', e.target.value)} error={errors.bankAcNo} />
                            <FormField label="IFSC Code" id="ifscCode" value={form.ifscCode} onChange={(e) => set('ifscCode', e.target.value.toUpperCase())} error={errors.ifscCode} />
                            <FormField label="Branch" id="branch" value={form.branch} onChange={(e) => set('branch', e.target.value)} />
                            <FormField label="Bank" id="bank" value={form.bank} onChange={(e) => set('bank', e.target.value)} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Tax & Identity">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <DropdownWithCreate label="Tax Type" id="taxType" required options={taxTypes} value={form.taxType} onChange={(v) => set('taxType', v)} error={errors.taxType} />
                            <div className="form-field-group">
                                <label className="form-label">State Name</label>
                                <select className="form-input" value={form.stateName} onChange={(e) => set('stateName', e.target.value)}>
                                    <option value="">Select State</option>
                                    {stateList.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <FormField label="State Code" id="stateCode" value={form.stateCode} onChange={(e) => set('stateCode', e.target.value)} />
                            <FormField label="GST No" id="gstNo" value={form.gstNo} onChange={(e) => set('gstNo', e.target.value.toUpperCase())} error={errors.gstNo} />
                            <FormField label="PAN No" id="panNo" value={form.panNo} onChange={(e) => set('panNo', e.target.value.toUpperCase())} error={errors.panNo} />
                            <FormField label="Aadhaar No" id="aadhaarNo" value={form.aadhaarNo} onChange={(e) => set('aadhaarNo', e.target.value)} error={errors.aadhaarNo} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Contact & Status">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} error={errors.emailId} />
                            <FormField label="Phone No" id="phoneNo" value={form.phoneNo} onChange={(e) => set('phoneNo', e.target.value)} error={errors.phoneNo} />
                            <FormField label="Cell No" id="cellNo" value={form.cellNo} onChange={(e) => set('cellNo', e.target.value)} error={errors.cellNo} />
                            <FormField label="Contact Person" id="contactPerson" value={form.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} error={errors.contactPerson} />
                            <DropdownWithCreate label="Status" id="status" required options={statusOptions} value={form.status} onChange={(v) => set('status', v)} error={errors.status} />
                            <FormField label="Ledger ID" id="ledgerId" value={form.ledgerId} onChange={(e) => set('ledgerId', e.target.value)} />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            <FormModal isOpen={addGroupModal} onClose={() => setAddGroupModal(false)} title="Add Account Group" size="sm">
                <div className="p-6 space-y-4">
                    <FormField label="Group Name" id="newGroupName" required value={newGroup.group} onChange={(e) => setNewGroup(g => ({ ...g, group: e.target.value }))} />
                    <FormField label="Under Group Of" id="newGroupUnder" value={newGroup.underGroupOf} onChange={(e) => setNewGroup(g => ({ ...g, underGroupOf: e.target.value }))} />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setAddGroupModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={saveGroup} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">Save</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default AccountCreation;
