import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { BookOpen } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const LedgerMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ LM_Ledger_Name: '', LM_Code: '' });

  const columns = [
    { key: 'LedgerID', label: 'Ledger ID' },
    { key: 'LM_Code', label: 'Ledger Code' },
    { key: 'LM_Ledger_Name', label: 'Ledger Name' },
  ];

  const openCreate = () => { setEditing(null); setForm({ LM_Ledger_Name: '', LM_Code: '' }); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ LM_Ledger_Name: row.LM_Ledger_Name, LM_Code: row.LM_Code }); setModalOpen(true); };

  const handleSave = () => {
    const payload = { ...form, LedgerID: editing ? editing.LedgerID : state.ledgerMasters.length + 1 };
    if (editing) dispatch({ type: 'UPDATE', entity: 'ledgerMasters', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'ledgerMasters', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={BookOpen} title="Ledger Master" description="Tax ledger accounts for GST configuration" />
      <ActionBar onAdd={openCreate} addLabel="Add Ledger" onExport={() => exportToExcel(state.ledgerMasters, columns, 'ledger_master')} onRefresh={() => {}} />
      <div className="mt-4">
        <DataTable columns={columns} data={state.ledgerMasters} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} />
      </div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Ledger' : 'Create Ledger'} width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Ledger Name" required>
            <input className="form-input" value={form.LM_Ledger_Name} onChange={(e) => setForm({ ...form, LM_Ledger_Name: e.target.value })} placeholder="e.g. GST Output Tax" />
          </FormField>
          <FormField label="Ledger Code">
            <input className="form-input" value={form.LM_Code} onChange={(e) => setForm({ ...form, LM_Code: e.target.value })} placeholder="e.g. LM001" />
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'ledgerMasters', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default LedgerMaster;
