import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import { Activity } from 'lucide-react';

const QCCheckMethod = () => {
  const { state, dispatch, reload } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ CM_vCode: '', CM_vName: '', CM_vDescription: '', CM_cStatus: 'A' });
  const set = (k, v) => setForm({ ...form, [k]: v });

  const columns = [
    { key: 'CM_vCode', label: 'Code' },
    { key: 'CM_vName', label: 'Check Method' },
    { key: 'CM_vDescription', label: 'Description' },
    { key: 'CM_cStatus', label: 'Status', render: (v) => <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">{v === 'A' ? 'Active' : v}</span> },
  ];

  const handleSave = () => {
    dispatch({ type: 'ADD', entity: 'qcCheckMethods', payload: form });
    setModalOpen(false);
    setForm({ CM_vCode: '', CM_vName: '', CM_vDescription: '', CM_cStatus: 'A' });
  };

  return (
    <div>
      <PageHeader icon={Activity} title="QC Check Method Master" description="Define quality check methods" />
      <ActionBar onAdd={() => setModalOpen(true)} addLabel="Add Check Method" onRefresh={reload} />
      <div className="mt-4"><DataTable columns={columns} data={state.qcCheckMethods} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Check Method" width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Code" required><input className="form-input" value={form.CM_vCode} onChange={(e) => set('CM_vCode', e.target.value)} /></FormField>
          <FormField label="Name" required><input className="form-input" value={form.CM_vName} onChange={(e) => set('CM_vName', e.target.value)} /></FormField>
          <FormField label="Description"><textarea className="form-input" value={form.CM_vDescription} onChange={(e) => set('CM_vDescription', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
    </div>
  );
};

export default QCCheckMethod;
