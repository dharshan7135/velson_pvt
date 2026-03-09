import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Users } from 'lucide-react';

const columns = [
    { key: 'employeeCode', label: 'Code' },
    { key: 'employeeName', label: 'Name' },
    { key: 'department', label: 'Department' },
    { key: 'designation', label: 'Designation' },
    { key: 'contactNo', label: 'Contact' },
    { key: 'emailId', label: 'Email' },
];

const emptyForm = {
    employeeCode: '', employeeName: '', address: '', contactNo: '',
    aadhaarNo: '', joinDate: '', relievingDate: '', department: '',
    designation: '', contractPerson: '', emailId: '', companyName: '',
};

const EmployeeMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    // Inline-create modals
    const [addModal, setAddModal] = useState({ open: false, field: '', value: '' });

    const deptOptions = state.references.filter(r => r.referenceType === 'Department').map(r => ({ label: r.description, value: r.description }));
    const designOptions = state.references.filter(r => r.referenceType === 'Designation').map(r => ({ label: r.description, value: r.description }));
    const companyOptions = state.companies.map(c => ({ label: c.fullName, value: c.companyCode }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const validate = () => {
        const e = {};
        if (!form.employeeCode.trim()) e.employeeCode = 'Required';
        if (!form.employeeName.trim()) e.employeeName = 'Required';
        if (!form.department) e.department = 'Required';
        if (!form.designation) e.designation = 'Required';
        if (!form.companyName) e.companyName = 'Required';
        if (form.aadhaarNo && form.aadhaarNo.length !== 12) e.aadhaarNo = 'Must be 12 digits';
        if (form.contactNo && form.contactNo.length !== 10) e.contactNo = 'Must be 10 digits';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('employees', editId, form);
        else addRecord('employees', form);
        close();
    };

    const saveInlineAdd = () => {
        if (!addModal.value.trim()) return;
        const refType = addModal.field === 'department' ? 'Department' : 'Designation';
        const code = refType.substring(0, 4).toUpperCase() + String(state.references.length + 1).padStart(3, '0');
        addRecord('references', { referenceType: refType, code, description: addModal.value });
        set(addModal.field, addModal.value);
        setAddModal({ open: false, field: '', value: '' });
    };

    return (
        <div className="p-6">
            <PageHeader title="Employee Master" description="Manage employee records and department assignments" icon={Users} />
            <DataTable columns={columns} data={state.employees} onAdd={openAdd} addLabel="Add Employee" onEdit={openEdit} onDelete={(r) => deleteRecord('employees', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Employee' : 'Add Employee'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <FormField label="Employee Code" id="employeeCode" required value={form.employeeCode} onChange={(e) => set('employeeCode', e.target.value)} error={errors.employeeCode} />
                        <FormField label="Employee Name" id="employeeName" required value={form.employeeName} onChange={(e) => set('employeeName', e.target.value)} error={errors.employeeName} />
                        <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} className="md:col-span-2" />
                        <FormField label="Contact No" id="contactNo" value={form.contactNo} onChange={(e) => set('contactNo', e.target.value)} error={errors.contactNo} />
                        <FormField label="Aadhaar No" id="aadhaarNo" value={form.aadhaarNo} onChange={(e) => set('aadhaarNo', e.target.value)} error={errors.aadhaarNo} />
                        <FormField label="Join Date" id="joinDate" type="date" value={form.joinDate} onChange={(e) => set('joinDate', e.target.value)} />
                        <FormField label="Relieving Date" id="relievingDate" type="date" value={form.relievingDate} onChange={(e) => set('relievingDate', e.target.value)} />
                        <DropdownWithCreate label="Department" id="department" required options={deptOptions} value={form.department} onChange={(v) => set('department', v)} onAdd={() => setAddModal({ open: true, field: 'department', value: '' })} error={errors.department} />
                        <DropdownWithCreate label="Designation" id="designation" required options={designOptions} value={form.designation} onChange={(v) => set('designation', v)} onAdd={() => setAddModal({ open: true, field: 'designation', value: '' })} error={errors.designation} />
                        <FormField label="Contract Person" id="contractPerson" value={form.contractPerson} onChange={(e) => set('contractPerson', e.target.value)} />
                        <FormField label="Email-ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} />
                        <DropdownWithCreate label="Company Name" id="companyName" required options={companyOptions} value={form.companyName} onChange={(v) => set('companyName', v)} error={errors.companyName} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            {/* Inline add modal for department/designation */}
            <FormModal isOpen={addModal.open} onClose={() => setAddModal({ open: false, field: '', value: '' })} title={`Add ${addModal.field === 'department' ? 'Department' : 'Designation'}`} size="sm">
                <div className="p-6 space-y-4">
                    <FormField label={addModal.field === 'department' ? 'Department Name' : 'Designation Name'} id="inlineAdd" value={addModal.value} onChange={(e) => setAddModal((m) => ({ ...m, value: e.target.value }))} required />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setAddModal({ open: false, field: '', value: '' })} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={saveInlineAdd} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">Save</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default EmployeeMaster;
