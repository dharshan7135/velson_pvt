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
    const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

    const validate = () => {
        const e = {};
        if (!form.acName.trim()) e.acName = 'Required';
        if (form.dueDays === '') e.dueDays = 'Required';
        if (form.creditLimit === '') e.creditLimit = 'Required';
        if (!form.ledgerType) e.ledgerType = 'Required';
        if (form.hireCharges === '') e.hireCharges = 'Required';
        if (!form.group) e.group = 'Required';
        if (!form.taxType) e.taxType = 'Required';
        if (!form.status) e.status = 'Required';
        if (form.tdsPercent && (Number(form.tdsPercent) < 0 || Number(form.tdsPercent) > 100)) e.tdsPercent = '0-100';
        if (form.tcsPercent && (Number(form.tcsPercent) < 0 || Number(form.tcsPercent) > 100)) e.tcsPercent = '0-100';
        if (form.gstNo && form.gstNo.length !== 15) e.gstNo = 'Must be 15 chars';
        if (form.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNo)) e.panNo = 'Invalid PAN';
        if (form.aadhaarNo && form.aadhaarNo.length !== 12) e.aadhaarNo = '12 digits';
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
                            <FormField label="A/C Code" id="acCode" value={form.acCode} onChange={(e) => set('acCode', e.target.value)} />
                            <FormField label="L ID" id="lId" value={form.lId} onChange={(e) => set('lId', e.target.value)} />
                            <FormField label="A/C Name" id="acName" required value={form.acName} onChange={(e) => set('acName', e.target.value)} error={errors.acName} />
                            <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} />
                            <FormField label="Due Days" id="dueDays" required type="number" value={form.dueDays} onChange={(e) => set('dueDays', e.target.value)} error={errors.dueDays} />
                            <FormField label="TDS %" id="tdsPercent" type="number" value={form.tdsPercent} onChange={(e) => set('tdsPercent', e.target.value)} error={errors.tdsPercent} />
                            <FormField label="Short Name" id="shortName" value={form.shortName} onChange={(e) => set('shortName', e.target.value)} />
                            <FormField label="Credit Limit" id="creditLimit" required type="number" value={form.creditLimit} onChange={(e) => set('creditLimit', e.target.value)} error={errors.creditLimit} />
                            <FormField label="TCS %" id="tcsPercent" type="number" value={form.tcsPercent} onChange={(e) => set('tcsPercent', e.target.value)} error={errors.tcsPercent} />
                            <DropdownWithCreate label="Ledger Type" id="ledgerType" required options={ledgerTypes} value={form.ledgerType} onChange={(v) => set('ledgerType', v)} error={errors.ledgerType} />
                            <FormField label="Hire Charges" id="hireCharges" required type="number" value={form.hireCharges} onChange={(e) => set('hireCharges', e.target.value)} error={errors.hireCharges} />
                            <FormField label="KM" id="km" type="number" value={form.km} onChange={(e) => set('km', e.target.value)} />
                            <DropdownWithCreate label="Group" id="group" required options={groupOptions} value={form.group} onChange={(v) => set('group', v)} onAdd={() => setAddGroupModal(true)} error={errors.group} />
                            <FormField label="Account Name" id="accountName" value={form.accountName} onChange={(e) => set('accountName', e.target.value)} />
                            <FormField label="Opening Balance" id="openingBalance" type="number" value={form.openingBalance} onChange={(e) => set('openingBalance', e.target.value)} />
                            <DropdownWithCreate label="A/C Type" id="acType" options={acTypeOptions} value={form.acType} onChange={(v) => set('acType', v)} />
                            <FormField label="Area" id="area" value={form.area} onChange={(e) => set('area', e.target.value)} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Banking Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Bank A/C No" id="bankAcNo" value={form.bankAcNo} onChange={(e) => set('bankAcNo', e.target.value)} />
                            <FormField label="IFSC Code" id="ifscCode" value={form.ifscCode} onChange={(e) => set('ifscCode', e.target.value)} />
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
                            <FormField label="GST No" id="gstNo" value={form.gstNo} onChange={(e) => set('gstNo', e.target.value)} error={errors.gstNo} />
                            <FormField label="PAN No" id="panNo" value={form.panNo} onChange={(e) => set('panNo', e.target.value.toUpperCase())} error={errors.panNo} />
                            <FormField label="Aadhaar No" id="aadhaarNo" value={form.aadhaarNo} onChange={(e) => set('aadhaarNo', e.target.value)} error={errors.aadhaarNo} />
                        </div>
                    </FormContainer>

                    <FormContainer title="Contact & Status">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <FormField label="Email ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} />
                            <FormField label="Phone No" id="phoneNo" value={form.phoneNo} onChange={(e) => set('phoneNo', e.target.value)} />
                            <FormField label="Cell No" id="cellNo" value={form.cellNo} onChange={(e) => set('cellNo', e.target.value)} />
                            <FormField label="Contact Person" id="contactPerson" value={form.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} />
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
