import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Users } from 'lucide-react';

const CreateUser = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { UserName: '', FirstName: '', LastName: '', EmailId: '', Gender: '', MobileNo: '', Password: '', RoleId: '', RoleName: '', Status: 'Active' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const columns = [
    { key: 'UserName', label: 'Username' },
    { key: 'FirstName', label: 'First Name' },
    { key: 'LastName', label: 'Last Name' },
    { key: 'EmailId', label: 'Email' },
    { key: 'RoleName', label: 'Role' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{v}</span> },
  ];

  const handleSave = () => {
    const role = state.roles.find((r) => r.id === parseInt(form.RoleId));
    dispatch({ type: 'ADD', entity: 'users', payload: { ...form, RoleName: role?.RoleName || '' } });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Users} title="User Management" description="Create users and assign roles" />
      <ActionBar onAdd={() => { setForm(empty); setModalOpen(true); }} addLabel="Create User" onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.users} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title="Create User">
        <FormContainer columns={2}>
          <FormField label="Username" required><input className="form-input" value={form.UserName} onChange={(e) => set('UserName', e.target.value)} /></FormField>
          <FormField label="Role" required>
            <select className="form-input" value={form.RoleId} onChange={(e) => set('RoleId', e.target.value)}>
              <option value="">Select Role</option>
              {state.roles.map((r) => <option key={r.id} value={r.id}>{r.RoleName}</option>)}
            </select>
          </FormField>
          <FormField label="First Name" required><input className="form-input" value={form.FirstName} onChange={(e) => set('FirstName', e.target.value)} /></FormField>
          <FormField label="Last Name" required><input className="form-input" value={form.LastName} onChange={(e) => set('LastName', e.target.value)} /></FormField>
          <FormField label="Email" required><input type="email" className="form-input" value={form.EmailId} onChange={(e) => set('EmailId', e.target.value)} /></FormField>
          <FormField label="Mobile" required><input className="form-input" value={form.MobileNo} onChange={(e) => set('MobileNo', e.target.value)} /></FormField>
          <FormField label="Gender">
            <select className="form-input" value={form.Gender} onChange={(e) => set('Gender', e.target.value)}>
              <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>
          </FormField>
          <FormField label="Password" required><input type="password" className="form-input" value={form.Password} onChange={(e) => set('Password', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'users', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default CreateUser;
