import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Link2 } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const ReferenceGroupMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [form, setForm] = useState({ RG_vCode: '', RG_vDescription: '' });

  const activeData = state.referenceGroups.filter((r) => r.status === 'A');
  const deletedData = state.referenceGroups.filter((r) => r.status === 'D');
  const displayData = showDeleted ? deletedData : activeData;

  const columns = [
    { key: 'RG_vCode', label: 'Group Code' },
    { key: 'RG_vDescription', label: 'Description' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {v === 'A' ? 'Active' : 'Deleted'}
      </span>
    )},
  ];

  const openCreate = () => {
    setEditing(null);
    setForm({ RG_vCode: '', RG_vDescription: '' });
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ RG_vCode: row.RG_vCode, RG_vDescription: row.RG_vDescription });
    setModalOpen(true);
  };

  const handleSave = () => {
    const payload = { ...form, RG_vDescription: form.RG_vDescription || form.RG_vCode, status: 'A' };
    if (editing) {
      dispatch({ type: 'UPDATE', entity: 'referenceGroups', payload: { ...payload, id: editing.id } });
    } else {
      dispatch({ type: 'ADD', entity: 'referenceGroups', payload });
    }
    setModalOpen(false);
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    dispatch({ type: 'SOFT_DELETE', entity: 'referenceGroups', payload: deleteTarget.id });
    setDeleteOpen(false);
  };

  const handleUndelete = (row) => {
    dispatch({ type: 'UNDELETE', entity: 'referenceGroups', payload: row.id });
  };

  return (
    <div>
      <PageHeader icon={Link2} title="Reference Group Master" description="Manage dropdown categories for the entire system" />

      <ActionBar
        onAdd={!showDeleted ? openCreate : undefined}
        addLabel="Add Group"
        onExport={() => exportToExcel(displayData, columns, 'reference_groups')}
        onRefresh={() => {}}
        onUndelete={() => setShowDeleted(!showDeleted)}
      />

      {showDeleted && (
        <div className="mt-4 mb-2 flex items-center gap-2">
          <span className="text-sm font-bold text-amber-600">Showing Deleted Records</span>
          <button onClick={() => setShowDeleted(false)} className="text-xs text-[#0097A7] underline">Back to Active</button>
        </div>
      )}

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={displayData}
          onEdit={!showDeleted ? openEdit : undefined}
          onDelete={!showDeleted ? handleDelete : undefined}
        />
        {showDeleted && deletedData.length > 0 && (
          <div className="mt-2 p-3 bg-amber-50 rounded-xl">
            <p className="text-xs text-amber-700 mb-2">Click "Restore" to undelete a record:</p>
            {deletedData.map((d) => (
              <button key={d.id} onClick={() => handleUndelete(d)} className="text-xs text-[#0097A7] underline mr-4">
                Restore "{d.RG_vCode}"
              </button>
            ))}
          </div>
        )}
      </div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Reference Group' : 'Create Reference Group'} width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Group Code / Name" required>
            <input className="form-input" value={form.RG_vCode} onChange={(e) => setForm({ ...form, RG_vCode: e.target.value })} placeholder="e.g. Department" />
          </FormField>
          <FormField label="Description">
            <input className="form-input" value={form.RG_vDescription} onChange={(e) => setForm({ ...form, RG_vDescription: e.target.value })} placeholder="Auto-set from Code" />
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} saveLabel={editing ? 'Update' : 'Create'} />
      </FormModal>

      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={confirmDelete} />
    </div>
  );
};

export default ReferenceGroupMaster;
