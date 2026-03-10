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
    const contractPersonOptions = state.contractors.map(c => ({ label: c.contractorName, value: c.contractorName }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => {
        setForm((f) => ({ ...f, [field]: val }));

        setErrors(prev => {
            const e = { ...prev };

            if (field === 'employeeCode') {
                const v = (val || '').trim();
                if (!v) e.employeeCode = 'Employee Code is required';
                else if (!/^[A-Za-z0-9]+$/.test(v)) e.employeeCode = 'Must contain only alphanumeric characters';
                else {
                    const isDuplicate = state.employees.some(emp => emp.employeeCode.toLowerCase() === v.toLowerCase() && emp.id !== editId);
                    if (isDuplicate) e.employeeCode = 'Employee Code must be unique for each employee';
                    else delete e.employeeCode;
                }
            }
            if (field === 'employeeName') {
                const v = (val || '').trim();
                if (!v) e.employeeName = 'Employee Name is required';
                else if (v.length < 3) e.employeeName = 'Minimum 3 characters required';
                else if (!/^[A-Za-z\s]+$/.test(v)) e.employeeName = 'Only alphabetic characters and spaces allowed';
                else delete e.employeeName;
            }
            if (field === 'address') {
                if (val && val.trim().length > 255) e.address = 'Address is too long (max 255 characters)';
                else if (val && !/^[A-Za-z0-9\s,.-]*$/.test(val)) e.address = 'Only alphanumeric characters and common punctuation allowed';
                else delete e.address;
            }
            if (field === 'contactNo') {
                if (val && !/^[6-9]\d{9}$/.test(val)) e.contactNo = 'Must be a valid 10-digit Indian mobile number';
                else delete e.contactNo;
            }
            if (field === 'aadhaarNo') {
                if (val && !/^\d{12}$/.test(val)) e.aadhaarNo = 'Must contain exactly 12 numeric digits';
                else delete e.aadhaarNo;
            }
            if (['department', 'designation', 'companyName', 'joinDate'].includes(field)) {
                if (!val) e[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                else delete e[field];
            }
            if (field === 'contractPerson') {
                delete e.contractPerson;
            }
            if (field === 'emailId') {
                if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) e.emailId = 'Invalid email format';
                else delete e.emailId;
            }
            if (field === 'relievingDate') {
                if (val && form.joinDate && new Date(val) < new Date(form.joinDate)) e.relievingDate = 'Relieving date must not be earlier than Join date';
                else delete e.relievingDate;
            }

            return e;
        });
    };

    const validate = () => {
        const e = {};

        // Employee Code
        if (!form.employeeCode?.trim()) e.employeeCode = 'Employee Code is required';
        else if (!/^[A-Za-z0-9]+$/.test(form.employeeCode.trim())) e.employeeCode = 'Must contain only alphanumeric characters';
        else {
            const isDuplicate = state.employees.some(emp =>
                emp.employeeCode.toLowerCase() === form.employeeCode.trim().toLowerCase() &&
                emp.id !== editId
            );
            if (isDuplicate) e.employeeCode = 'Employee Code must be unique for each employee';
        }

        // Employee Name
        if (!form.employeeName?.trim()) e.employeeName = 'Employee Name is required';
        else if (form.employeeName.trim().length < 3) e.employeeName = 'Minimum 3 characters required';
        else if (!/^[A-Za-z\s]+$/.test(form.employeeName.trim())) e.employeeName = 'Only alphabetic characters and spaces allowed';

        // Address
        if (form.address && form.address.trim().length > 255) {
            e.address = 'Address is too long (max 255 characters)';
        } else if (form.address && !/^[A-Za-z0-9\s,.-]*$/.test(form.address)) {
            e.address = 'Only alphanumeric characters and common punctuation allowed';
        }

        // Contact Number
        if (form.contactNo && !/^[6-9]\d{9}$/.test(form.contactNo)) {
            e.contactNo = 'Must be a valid 10-digit Indian mobile number';
        }

        // Aadhaar Number
        if (form.aadhaarNo && !/^\d{12}$/.test(form.aadhaarNo)) {
            e.aadhaarNo = 'Must contain exactly 12 numeric digits';
        }

        // Join Date & Relieving Date
        if (!form.joinDate) e.joinDate = 'Join Date is required';
        else if (form.joinDate && form.relievingDate) {
            if (new Date(form.relievingDate) < new Date(form.joinDate)) {
                e.relievingDate = 'Relieving date must not be earlier than Join date';
            }
        }

        // Department & Designation
        if (!form.department) e.department = 'Department is required';
        if (!form.designation) e.designation = 'Designation is required';

        // Company Name
        if (!form.companyName) e.companyName = 'Company Name is required';

        // Contract Person validation removed to allow standard punctuation

        // Email ID
        if (form.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
            e.emailId = 'Invalid email format';
        }

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
                        <FormField label="Address" id="address" value={form.address} onChange={(e) => set('address', e.target.value)} className="md:col-span-2" error={errors.address} />
                        <FormField label="Contact No" id="contactNo" value={form.contactNo} onChange={(e) => set('contactNo', e.target.value)} error={errors.contactNo} />
                        <FormField label="Aadhaar No" id="aadhaarNo" value={form.aadhaarNo} onChange={(e) => set('aadhaarNo', e.target.value)} error={errors.aadhaarNo} />
                        <FormField label="Join Date" id="joinDate" type="date" required value={form.joinDate} onChange={(e) => set('joinDate', e.target.value)} error={errors.joinDate} />
                        <FormField label="Relieving Date" id="relievingDate" type="date" value={form.relievingDate} onChange={(e) => set('relievingDate', e.target.value)} error={errors.relievingDate} />
                        <DropdownWithCreate label="Department" id="department" required options={deptOptions} value={form.department} onChange={(v) => set('department', v)} onAdd={() => setAddModal({ open: true, field: 'department', value: '' })} error={errors.department} />
                        <DropdownWithCreate label="Designation" id="designation" required options={designOptions} value={form.designation} onChange={(v) => set('designation', v)} onAdd={() => setAddModal({ open: true, field: 'designation', value: '' })} error={errors.designation} />
                        <DropdownWithCreate label="Contract Person" id="contractPerson" options={contractPersonOptions} value={form.contractPerson} onChange={(v) => set('contractPerson', v)} error={errors.contractPerson} />
                        <FormField label="Email-ID" id="emailId" type="email" value={form.emailId} onChange={(e) => set('emailId', e.target.value)} error={errors.emailId} />
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
