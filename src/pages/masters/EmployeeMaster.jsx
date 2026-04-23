import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Users } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const EmployeeMaster = () => {
  const { state, dispatch, reload } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { EM_Code: '', EM_Employee_Name: '', DepartmentId: '', DesignationId: '', ContractId: '', CompanyId: '', Address: '', Contact_No: '', Adhar_No: '', Join_Date: new Date().toISOString().split('T')[0], EM_DOB: '', Releving_Date: '', EM_Team: '', EM_Email_ID: '', EM_Rep_Person: '', EM_Status: 'Active' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const departments = getRefValuesByGroup(state.referenceGroupValues, 1);
  const designations = getRefValuesByGroup(state.referenceGroupValues, 2);

  const columns = [
    { key: 'EM_Code', label: 'Code' },
    { key: 'EM_Employee_Name', label: 'Name' },
    { key: 'DepartmentName', label: 'Department' },
    { key: 'DesignationName', label: 'Designation' },
    { key: 'Contact_No', label: 'Contact' },
    { key: 'Join_Date', label: 'Join Date' },
    { key: 'EM_Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{v}</span> },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setModalOpen(true); };

  const handleSave = () => {
    const dept = departments.find((d) => String(d.id) === String(form.DepartmentId));
    const desig = designations.find((d) => String(d.id) === String(form.DesignationId));
    const contractor = state.contractors.find((c) => String(c.id) === String(form.ContractId));
    const company = state.companies.find((c) => String(c.id) === String(form.CompanyId));
    const payload = { ...form, DepartmentName: dept?.RGV_vDescription || '', DesignationName: desig?.RGV_vDescription || '', ContractorName: contractor?.Contract_Name || '', CompanyName: company?.CompanyName || '' };
    if (editing) dispatch({ type: 'UPDATE', entity: 'employees', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'employees', payload });
    setModalOpen(false);
  };

  const activeCount = state.employees.filter((e) => e.EM_Status === 'Active').length;
  const relievedCount = state.employees.filter((e) => e.EM_Status === 'Relieved').length;

  return (
    <div>
      <PageHeader icon={Users} title="Employee Master" description="16 fields with 4 dropdowns">
        <div className="flex gap-4">
          <div className="text-center px-4 py-2 bg-[#0097A7]/10 rounded-xl"><span className="text-lg font-bold text-[#0097A7]">{state.employees.length}</span><p className="text-xs text-slate-500">Total</p></div>
          <div className="text-center px-4 py-2 bg-emerald-50 rounded-xl"><span className="text-lg font-bold text-emerald-600">{activeCount}</span><p className="text-xs text-slate-500">Active</p></div>
          <div className="text-center px-4 py-2 bg-amber-50 rounded-xl"><span className="text-lg font-bold text-amber-600">{relievedCount}</span><p className="text-xs text-slate-500">Relieved</p></div>
        </div>
      </PageHeader>
      <ActionBar onAdd={openCreate} addLabel="Add Employee" onExport={() => exportToExcel(state.employees, columns, 'employees')} onRefresh={reload} />
      <div className="mt-4"><DataTable columns={columns} data={state.employees} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Employee' : 'Create Employee'} width="max-w-3xl">
        <FormContainer columns={3}>
          <FormField label="Employee Code" required><input className="form-input" value={form.EM_Code} onChange={(e) => set('EM_Code', e.target.value)} /></FormField>
          <FormField label="Employee Name" required className="sm:col-span-2"><input className="form-input" value={form.EM_Employee_Name} onChange={(e) => set('EM_Employee_Name', e.target.value)} /></FormField>
          <FormField label="Department" required>
            <select className="form-input" value={form.DepartmentId} onChange={(e) => set('DepartmentId', e.target.value)}>
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Designation">
            <select className="form-input" value={form.DesignationId} onChange={(e) => set('DesignationId', e.target.value)}>
              <option value="">Select Designation</option>
              {designations.map((d) => <option key={d.id} value={d.id}>{d.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Contractor">
            <select className="form-input" value={form.ContractId} onChange={(e) => set('ContractId', e.target.value)}>
              <option value="">Select Contractor</option>
              {state.contractors.filter((c) => c.Status === 'Active').map((c) => <option key={c.id} value={c.id}>{c.Contract_Name}</option>)}
            </select>
          </FormField>
          <FormField label="Company">
            <select className="form-input" value={form.CompanyId} onChange={(e) => set('CompanyId', e.target.value)}>
              <option value="">Select Company</option>
              {state.companies.map((c) => <option key={c.id} value={c.id}>{c.CompanyName}</option>)}
            </select>
          </FormField>
          <FormField label="Contact No"><input className="form-input" value={form.Contact_No} onChange={(e) => set('Contact_No', e.target.value)} /></FormField>
          <FormField label="Aadhaar No"><input className="form-input" value={form.Adhar_No} onChange={(e) => set('Adhar_No', e.target.value)} maxLength={12} /></FormField>
          <FormField label="Join Date"><input type="date" className="form-input" value={form.Join_Date} onChange={(e) => set('Join_Date', e.target.value)} /></FormField>
          <FormField label="Date of Birth"><input type="date" className="form-input" value={form.EM_DOB} onChange={(e) => set('EM_DOB', e.target.value)} /></FormField>
          <FormField label="Relieving Date"><input type="date" className="form-input" value={form.Releving_Date} onChange={(e) => set('Releving_Date', e.target.value)} /></FormField>
          <FormField label="Address" className="sm:col-span-3"><textarea className="form-input" value={form.Address} onChange={(e) => set('Address', e.target.value)} /></FormField>
          <FormField label="Team"><input className="form-input" value={form.EM_Team} onChange={(e) => set('EM_Team', e.target.value)} /></FormField>
          <FormField label="Email"><input type="email" className="form-input" value={form.EM_Email_ID} onChange={(e) => set('EM_Email_ID', e.target.value)} /></FormField>
          <FormField label="Reporting Person"><input className="form-input" value={form.EM_Rep_Person} onChange={(e) => set('EM_Rep_Person', e.target.value)} /></FormField>
          <FormField label="Status">
            <select className="form-input" value={form.EM_Status} onChange={(e) => set('EM_Status', e.target.value)}>
              <option value="Active">Active</option><option value="Relieved">Relieved</option>
            </select>
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'employees', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default EmployeeMaster;
