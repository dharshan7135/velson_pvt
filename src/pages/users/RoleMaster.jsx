import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Shield } from 'lucide-react';

const RoleMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ RoleName: '', Status: 'Active' });

  const columns = [
    { key: 'RoleName', label: 'Role Name' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700`}>{v}</span> },
  ];

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'roles', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'roles', payload: form });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Shield} title="Role Master" description="CRUD roles for access control" />
      <ActionBar onAdd={() => { setEditing(null); setForm({ RoleName: '', Status: 'Active' }); setModalOpen(true); }} addLabel="Add Role" onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.roles} onEdit={(r) => { setEditing(r); setForm(r); setModalOpen(true); }} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Role' : 'Create Role'} width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Role Name" required><input className="form-input" value={form.RoleName} onChange={(e) => setForm({ ...form, RoleName: e.target.value })} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'roles', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default RoleMaster;
