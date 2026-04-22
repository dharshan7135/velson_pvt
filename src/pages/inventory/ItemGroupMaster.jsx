import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Layers } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const ItemGroupMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const empty = { IM_PartName: '', StoreId: '', StoreName: '', PrefixId: '', PrefixName: '' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const activeData = state.itemGroups.filter((g) => g.status === 'A');
  const deletedData = state.itemGroups.filter((g) => g.status === 'D');
  const displayData = showDeleted ? deletedData : activeData;

  const columns = [
    { key: 'IM_PartName', label: 'Group Name' },
    { key: 'StoreName', label: 'Store' },
    { key: 'PrefixName', label: 'Part Prefix' },
    { key: 'status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'A' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{v === 'A' ? 'Active' : 'Deleted'}</span> },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true); };

  const handleSave = () => {
    const payload = { ...form, status: 'A' };
    if (editing) dispatch({ type: 'UPDATE', entity: 'itemGroups', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'itemGroups', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Layers} title="Item Group Master" description="Item classification with store & part prefix — soft delete + undelete" />
      <ActionBar onAdd={!showDeleted ? openCreate : undefined} addLabel="Add Group" onExport={() => exportToExcel(displayData, columns, 'item_groups')} onRefresh={() => {}} onUndelete={() => setShowDeleted(!showDeleted)} />
      {showDeleted && <div className="mt-2 text-sm font-bold text-amber-600 flex items-center gap-2">Showing Deleted Records <button onClick={() => setShowDeleted(false)} className="text-xs text-[#0097A7] underline">Back to Active</button></div>}
      <div className="mt-4"><DataTable columns={columns} data={displayData} onEdit={!showDeleted ? openEdit : undefined} onDelete={!showDeleted ? (r) => { setDeleteTarget(r); setDeleteOpen(true); } : undefined} /></div>
      {showDeleted && deletedData.map((d) => (
        <button key={d.id} onClick={() => dispatch({ type: 'UNDELETE', entity: 'itemGroups', payload: d.id })} className="text-xs text-[#0097A7] underline mr-4">Restore "{d.IM_PartName}"</button>
      ))}
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Item Group' : 'Create Item Group'} width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Group / Part Name" required><input className="form-input" value={form.IM_PartName} onChange={(e) => set('IM_PartName', e.target.value)} /></FormField>
          <FormField label="Default Store" required><input className="form-input" value={form.StoreName} onChange={(e) => set('StoreName', e.target.value)} placeholder="e.g. Main Store" /></FormField>
          <FormField label="Part Number Prefix" required><input className="form-input" value={form.PrefixName} onChange={(e) => set('PrefixName', e.target.value)} placeholder="e.g. RM, FG, BO" /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'SOFT_DELETE', entity: 'itemGroups', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default ItemGroupMaster;
