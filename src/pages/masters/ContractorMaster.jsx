import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Handshake } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const ContractorMaster = () => {
  const { state, dispatch, reload } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { Contract_Code: '', Contract_Name: '', Address: '', Phone: '', Email: '', Status: 'Active' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const columns = [
    { key: 'Contract_Code', label: 'Code' },
    { key: 'Contract_Name', label: 'Name' },
    { key: 'Phone', label: 'Phone' },
    { key: 'Email', label: 'Email' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{v}</span> },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true); };

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'contractors', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'contractors', payload: form });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Handshake} title="Contractor Master" description="Manage contractors — feeds Employee Master dropdown" />
      <ActionBar onAdd={openCreate} addLabel="Add Contractor" onExport={() => exportToExcel(state.contractors, columns, 'contractors')} onRefresh={reload} />
      <div className="mt-4">
        <DataTable columns={columns} data={state.contractors} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} />
      </div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Contractor' : 'Create Contractor'}>
        <FormContainer columns={2}>
          <FormField label="Contractor Code" required><input className="form-input" value={form.Contract_Code} onChange={(e) => set('Contract_Code', e.target.value)} /></FormField>
          <FormField label="Contractor Name" required><input className="form-input" value={form.Contract_Name} onChange={(e) => set('Contract_Name', e.target.value)} /></FormField>
          <FormField label="Address" className="sm:col-span-2"><textarea className="form-input" value={form.Address} onChange={(e) => set('Address', e.target.value)} /></FormField>
          <FormField label="Phone"><input className="form-input" value={form.Phone} onChange={(e) => set('Phone', e.target.value)} /></FormField>
          <FormField label="Email"><input type="email" className="form-input" value={form.Email} onChange={(e) => set('Email', e.target.value)} /></FormField>
          <FormField label="Status">
            <select className="form-input" value={form.Status} onChange={(e) => set('Status', e.target.value)}>
              <option value="Active">Active</option><option value="Inactive">Inactive</option>
            </select>
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'contractors', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default ContractorMaster;
