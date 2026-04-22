import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Cog } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const MachineMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { MachineCategoryId: '', VendorId: '', Machine_Code: '', Machine_Name: '', Machine_Description: '', Location: '', Status: 'Active' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const categories = getRefValuesByGroup(state.referenceGroupValues, 6);
  const vendors = getRefValuesByGroup(state.referenceGroupValues, 7);

  const columns = [
    { key: 'Machine_Code', label: 'Code' },
    { key: 'Machine_Name', label: 'Machine Name' },
    { key: 'MachineCategoryName', label: 'Category' },
    { key: 'VendorName', label: 'Vendor' },
    { key: 'Location', label: 'Location' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{v}</span> },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true); };

  const handleSave = () => {
    const cat = categories.find((c) => c.id === parseInt(form.MachineCategoryId));
    const ven = vendors.find((v) => v.id === parseInt(form.VendorId));
    const payload = { ...form, MachineCategoryName: cat?.RGV_vDescription || '', VendorName: ven?.RGV_vDescription || '' };
    if (editing) dispatch({ type: 'UPDATE', entity: 'machines', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'machines', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Cog} title="Machine Master" description="Manage machines — linked to Process Master" />
      <ActionBar onAdd={openCreate} addLabel="Add Machine" onExport={() => exportToExcel(state.machines, columns, 'machines')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.machines} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Machine' : 'Create Machine'}>
        <FormContainer columns={2}>
          <FormField label="Machine Category" required>
            <select className="form-input" value={form.MachineCategoryId} onChange={(e) => set('MachineCategoryId', e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Vendor" required>
            <select className="form-input" value={form.VendorId} onChange={(e) => set('VendorId', e.target.value)}>
              <option value="">Select Vendor</option>
              {vendors.map((v) => <option key={v.id} value={v.id}>{v.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Machine Code" required><input className="form-input" value={form.Machine_Code} onChange={(e) => set('Machine_Code', e.target.value)} /></FormField>
          <FormField label="Machine Name" required><input className="form-input" value={form.Machine_Name} onChange={(e) => set('Machine_Name', e.target.value)} /></FormField>
          <FormField label="Description" className="sm:col-span-2"><input className="form-input" value={form.Machine_Description} onChange={(e) => set('Machine_Description', e.target.value)} /></FormField>
          <FormField label="Location"><input className="form-input" value={form.Location} onChange={(e) => set('Location', e.target.value)} /></FormField>
          <FormField label="Status">
            <select className="form-input" value={form.Status} onChange={(e) => set('Status', e.target.value)}>
              <option value="Active">Active</option><option value="Inactive">Inactive</option>
            </select>
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'machines', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default MachineMaster;
