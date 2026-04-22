import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Package } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const ItemMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = {
    GroupId: '', IM_Part_No: '', Outsource_Part_No: '', IM_PartName: '', ModelId: '', Brand: '', IM_Description: '', IM_Size: '', IM_WEIGHT: '',
    UnitId: '', SubGroupId: '', ItemTypeId: '', QcTypeId: '',
    IM_HSN_Code: '', IM_Purchase_Rate: '', IM_Margin_per: '', IM_Rate: '', CurrencyId: '', TaxId: '',
    StoreId: '', MaterialGradeId: '', MaterialTypeId: '', RawMaterialId: '', Rack_No: '', Location: '', IM_ReorderLevel: '', IM_Min_Stock: '',
    RM_length: '', Raw_material_wt: '', FG_material_wt: '', RouteCardNumber: '', Status: 'Active',
  };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const uoms = getRefValuesByGroup(state.referenceGroupValues, 10);
  const itemTypes = getRefValuesByGroup(state.referenceGroupValues, 12);
  const currencies = getRefValuesByGroup(state.referenceGroupValues, 16);
  const materialGrades = getRefValuesByGroup(state.referenceGroupValues, 17);

  const columns = [
    { key: 'IM_Part_No', label: 'Part No' },
    { key: 'IM_PartName', label: 'Part Name' },
    { key: 'GroupName', label: 'Group' },
    { key: 'UnitName', label: 'UOM' },
    { key: 'IM_HSN_Code', label: 'HSN' },
    { key: 'IM_Rate', label: 'Rate', render: (v) => v ? `₹${Number(v).toFixed(2)}` : '—' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{v}</span> },
  ];

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setModalOpen(true);
  };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setModalOpen(true); };

  const handleSave = () => {
    const group = state.itemGroups.find((g) => g.id === parseInt(form.GroupId));
    const unit = uoms.find((u) => u.id === parseInt(form.UnitId));
    const type = itemTypes.find((t) => t.id === parseInt(form.ItemTypeId));
    const partNo = editing ? form.IM_Part_No : `${group?.PrefixName || 'IT'}${String(state.items.length + 1).padStart(5, '0')}`;
    const payload = { ...form, IM_Part_No: partNo, GroupName: group?.IM_PartName || '', UnitName: unit?.RGV_vDescription || '', ItemTypeName: type?.RGV_vDescription || '' };
    if (editing) dispatch({ type: 'UPDATE', entity: 'items', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'items', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Package} title="Item Master" description="30+ fields, 12 dropdowns — most complex page in the system" />
      <ActionBar onAdd={openCreate} addLabel="Add Item" onExport={() => exportToExcel(state.items, columns, 'items')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.items} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Item' : 'Create Item'} width="max-w-4xl">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Basic Item Info</h3>
        <FormContainer columns={3}>
          <FormField label="Item Group" required>
            <select className="form-input" value={form.GroupId} onChange={(e) => set('GroupId', e.target.value)}>
              <option value="">Select Group</option>
              {state.itemGroups.filter((g) => g.status === 'A').map((g) => <option key={g.id} value={g.id}>{g.IM_PartName}</option>)}
            </select>
          </FormField>
          <FormField label="Part Number" required><input className="form-input" value={form.IM_Part_No} readOnly placeholder="Auto-generated on save" /></FormField>
          <FormField label="Outsource Part No"><input className="form-input" value={form.Outsource_Part_No} onChange={(e) => set('Outsource_Part_No', e.target.value)} /></FormField>
          <FormField label="Part Name" required className="sm:col-span-2"><input className="form-input" value={form.IM_PartName} onChange={(e) => set('IM_PartName', e.target.value)} /></FormField>
          <FormField label="Brand"><input className="form-input" value={form.Brand} onChange={(e) => set('Brand', e.target.value)} /></FormField>
          <FormField label="Description" className="sm:col-span-3"><textarea className="form-input" value={form.IM_Description} onChange={(e) => set('IM_Description', e.target.value)} /></FormField>
          <FormField label="Size"><input className="form-input" value={form.IM_Size} onChange={(e) => set('IM_Size', e.target.value)} /></FormField>
          <FormField label="Weight" required><input type="number" step="0.01" className="form-input" value={form.IM_WEIGHT} onChange={(e) => set('IM_WEIGHT', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Classification</h3>
        <FormContainer columns={4}>
          <FormField label="UOM"><select className="form-input" value={form.UnitId} onChange={(e) => set('UnitId', e.target.value)}><option value="">Select</option>{uoms.map((u) => <option key={u.id} value={u.id}>{u.RGV_vDescription}</option>)}</select></FormField>
          <FormField label="Item Type"><select className="form-input" value={form.ItemTypeId} onChange={(e) => set('ItemTypeId', e.target.value)}><option value="">Select</option>{itemTypes.map((t) => <option key={t.id} value={t.id}>{t.RGV_vDescription}</option>)}</select></FormField>
          <FormField label="QC Type"><select className="form-input" value={form.QcTypeId} onChange={(e) => set('QcTypeId', e.target.value)}><option value="">Select</option></select></FormField>
          <FormField label="Sub Group"><select className="form-input" value={form.SubGroupId} onChange={(e) => set('SubGroupId', e.target.value)}><option value="">Select</option></select></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Pricing & Tax</h3>
        <FormContainer columns={3}>
          <FormField label="HSN/SAC Code"><input className="form-input" value={form.IM_HSN_Code} onChange={(e) => set('IM_HSN_Code', e.target.value)} /></FormField>
          <FormField label="Purchase Rate"><input type="number" step="0.01" className="form-input" value={form.IM_Purchase_Rate} onChange={(e) => set('IM_Purchase_Rate', e.target.value)} /></FormField>
          <FormField label="Margin %"><input type="number" step="0.01" className="form-input" value={form.IM_Margin_per} onChange={(e) => set('IM_Margin_per', e.target.value)} /></FormField>
          <FormField label="Selling Rate"><input type="number" step="0.01" className="form-input" value={form.IM_Rate} onChange={(e) => set('IM_Rate', e.target.value)} /></FormField>
          <FormField label="Currency"><select className="form-input" value={form.CurrencyId} onChange={(e) => set('CurrencyId', e.target.value)}><option value="">Select</option>{currencies.map((c) => <option key={c.id} value={c.id}>{c.RGV_vDescription}</option>)}</select></FormField>
          <FormField label="Tax Group"><select className="form-input" value={form.TaxId} onChange={(e) => set('TaxId', e.target.value)}><option value="">Select</option>{state.taxMasters.map((t) => <option key={t.id} value={t.id}>{t.TM_Tax_Percent}%</option>)}</select></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Storage & Material</h3>
        <FormContainer columns={4}>
          <FormField label="Rack No"><input className="form-input" value={form.Rack_No} onChange={(e) => set('Rack_No', e.target.value)} /></FormField>
          <FormField label="Location"><input className="form-input" value={form.Location} onChange={(e) => set('Location', e.target.value)} /></FormField>
          <FormField label="Reorder Level"><input type="number" className="form-input" value={form.IM_ReorderLevel} onChange={(e) => set('IM_ReorderLevel', e.target.value)} /></FormField>
          <FormField label="Min Stock"><input type="number" className="form-input" value={form.IM_Min_Stock} onChange={(e) => set('IM_Min_Stock', e.target.value)} /></FormField>
          <FormField label="Material Grade"><select className="form-input" value={form.MaterialGradeId} onChange={(e) => set('MaterialGradeId', e.target.value)}><option value="">Select</option>{materialGrades.map((m) => <option key={m.id} value={m.id}>{m.RGV_vDescription}</option>)}</select></FormField>
          <FormField label="RM Length"><input className="form-input" value={form.RM_length} onChange={(e) => set('RM_length', e.target.value)} /></FormField>
          <FormField label="Raw Material Wt"><input type="number" step="0.01" className="form-input" value={form.Raw_material_wt} onChange={(e) => set('Raw_material_wt', e.target.value)} /></FormField>
          <FormField label="FG Material Wt"><input type="number" step="0.01" className="form-input" value={form.FG_material_wt} onChange={(e) => set('FG_material_wt', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Files</h3>
        <FormContainer columns={3}>
          <FormField label="Product Image"><input type="file" className="form-input" accept="image/*" /></FormField>
          <FormField label="Drawing PDF"><input type="file" className="form-input" accept=".pdf" /></FormField>
          <FormField label="Route Card Number"><input className="form-input" value={form.RouteCardNumber} onChange={(e) => set('RouteCardNumber', e.target.value)} /></FormField>
        </FormContainer>

        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'items', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default ItemMaster;
