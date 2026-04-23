import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Car } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const VehicleMaster = () => {
  const { state, dispatch, reload } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { Customer_Id: '', CustomerName: '', Vehicle_Model_No_Id: '', Model_Sub_Type_Id: '', Vehicle_Name_Id: '', Serial_No: '', Vehicle_No: '', BOM_Type: '', Status: 'Active', Contact_Person: '', LM_Address1: '', LM_GSTIN: '' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  // Customer cascade
  const handleCustomerChange = (custId) => {
    const customer = state.customers.find((c) => String(c.id) === String(custId));
    setForm({
      ...form, Customer_Id: custId, CustomerName: customer?.LM_Ledger_Name || '',
      Contact_Person: customer?.LM_Contact_Person || '', LM_Address1: customer?.LM_Address1 || '',
      LM_GSTIN: customer?.LM_GSTIN || '',
    });
  };

  const columns = [
    { key: 'CustomerName', label: 'Customer' },
    { key: 'Vehicle_Model_No_Id', label: 'Model' },
    { key: 'Vehicle_Name_Id', label: 'Name' },
    { key: 'Vehicle_No', label: 'Vehicle No' },
    { key: 'Serial_No', label: 'Serial' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{v}</span> },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setModalOpen(true); };

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'vehicles', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'vehicles', payload: form });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Car} title="Vehicle Master" description="Customer → AJAX cascade, auto-fill address/GST/contact" />
      <ActionBar onAdd={openCreate} addLabel="Add Vehicle" onExport={() => exportToExcel(state.vehicles, columns, 'vehicles')} onRefresh={reload} />
      <div className="mt-4"><DataTable columns={columns} data={state.vehicles} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Vehicle' : 'Create Vehicle'} width="max-w-3xl">
        <FormContainer columns={2}>
          <FormField label="Customer" required className="sm:col-span-2">
            <select className="form-input" value={form.Customer_Id} onChange={(e) => handleCustomerChange(e.target.value)}>
              <option value="">Select Customer (auto-fills fields below)</option>
              {state.customers.map((c) => <option key={c.id} value={c.id}>{c.LM_Ledger_Name}</option>)}
            </select>
          </FormField>
          <FormField label="Contact Person"><input className="form-input" value={form.Contact_Person} readOnly /></FormField>
          <FormField label="GSTIN"><input className="form-input" value={form.LM_GSTIN} readOnly /></FormField>
          <FormField label="Address" className="sm:col-span-2"><input className="form-input" value={form.LM_Address1} readOnly /></FormField>
          <FormField label="Vehicle Model" required><input className="form-input" value={form.Vehicle_Model_No_Id} onChange={(e) => set('Vehicle_Model_No_Id', e.target.value)} /></FormField>
          <FormField label="Model Sub Type"><input className="form-input" value={form.Model_Sub_Type_Id} onChange={(e) => set('Model_Sub_Type_Id', e.target.value)} /></FormField>
          <FormField label="Vehicle Name" required><input className="form-input" value={form.Vehicle_Name_Id} onChange={(e) => set('Vehicle_Name_Id', e.target.value)} /></FormField>
          <FormField label="Vehicle No"><input className="form-input" value={form.Vehicle_No} onChange={(e) => set('Vehicle_No', e.target.value)} /></FormField>
          <FormField label="Serial No"><input className="form-input" value={form.Serial_No} onChange={(e) => set('Serial_No', e.target.value)} placeholder="Auto-generated" /></FormField>
          <FormField label="BOM Type"><input className="form-input" value={form.BOM_Type} onChange={(e) => set('BOM_Type', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'SOFT_DELETE', entity: 'vehicles', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default VehicleMaster;
