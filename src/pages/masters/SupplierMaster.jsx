import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Truck } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

// Supplier is structurally identical to Customer, with SupplierType instead of CustomerType
const SupplierMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { SupplierTypeId: '', LM_Ledger_Name: '', LM_Code: '', LM_Address1: '', LM_Area: '', LM_State: '', LM_StateCode: '', LM_Country: '', LM_Contact_Person: '', LM_Phone_Number: '', LM_GSTIN: '' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const supplierTypes = getRefValuesByGroup(state.referenceGroupValues, 5);

  const columns = [
    { key: 'LM_Code', label: 'Code' },
    { key: 'LM_Ledger_Name', label: 'Supplier Name' },
    { key: 'LM_Area', label: 'City' },
    { key: 'LM_State', label: 'State' },
    { key: 'LM_Contact_Person', label: 'Contact' },
    { key: 'LM_GSTIN', label: 'GSTIN' },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setModalOpen(true); };

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'suppliers', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'suppliers', payload: form });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Truck} title="Supplier Master" description="Same structure as Customer — uses SupplierType dropdown" />
      <ActionBar onAdd={openCreate} addLabel="Add Supplier" onExport={() => exportToExcel(state.suppliers, columns, 'suppliers')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.suppliers} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Supplier' : 'Create Supplier'} width="max-w-3xl">
        <FormContainer columns={3}>
          <FormField label="Supplier Type">
            <select className="form-input" value={form.SupplierTypeId} onChange={(e) => set('SupplierTypeId', e.target.value)}>
              <option value="">Select Type</option>
              {supplierTypes.map((s) => <option key={s.id} value={s.id}>{s.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Supplier Name" required className="sm:col-span-2"><input className="form-input" value={form.LM_Ledger_Name} onChange={(e) => set('LM_Ledger_Name', e.target.value)} /></FormField>
          <FormField label="Code"><input className="form-input" value={form.LM_Code} onChange={(e) => set('LM_Code', e.target.value)} /></FormField>
          <FormField label="Address"><input className="form-input" value={form.LM_Address1} onChange={(e) => set('LM_Address1', e.target.value)} /></FormField>
          <FormField label="City"><input className="form-input" value={form.LM_Area} onChange={(e) => set('LM_Area', e.target.value)} /></FormField>
          <FormField label="State"><input className="form-input" value={form.LM_State} onChange={(e) => set('LM_State', e.target.value)} /></FormField>
          <FormField label="State Code"><input className="form-input" value={form.LM_StateCode} onChange={(e) => set('LM_StateCode', e.target.value)} /></FormField>
          <FormField label="Country"><input className="form-input" value={form.LM_Country} onChange={(e) => set('LM_Country', e.target.value)} /></FormField>
          <FormField label="Contact Person"><input className="form-input" value={form.LM_Contact_Person} onChange={(e) => set('LM_Contact_Person', e.target.value)} /></FormField>
          <FormField label="Phone"><input className="form-input" value={form.LM_Phone_Number} onChange={(e) => set('LM_Phone_Number', e.target.value)} /></FormField>
          <FormField label="GSTIN"><input className="form-input" value={form.LM_GSTIN} onChange={(e) => set('LM_GSTIN', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'suppliers', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default SupplierMaster;
