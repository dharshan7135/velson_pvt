import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Receipt } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';

const TaxMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const emptyForm = { LedgerID: '', TM_Tax_Percent: '', TM_CGST_Tax: '', TM_SGST_Tax: '', TM_IGST_Tax: '', TM_PCGST: '', TM_PSGST: '', TM_PIGST: '', TM_SCGST: '', TM_SSGST: '', TM_SIGST: '' };
  const [form, setForm] = useState(emptyForm);

  const columns = [
    { key: 'LedgerName', label: 'Ledger' },
    { key: 'TM_Tax_Percent', label: 'Tax %', render: (v) => `${v}%` },
    { key: 'TM_CGST_Tax', label: 'CGST %' },
    { key: 'TM_SGST_Tax', label: 'SGST %' },
    { key: 'TM_IGST_Tax', label: 'IGST %' },
  ];

  const set = (k, v) => setForm({ ...form, [k]: v });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true); };

  const handleSave = () => {
    const ledger = state.ledgerMasters.find((l) => l.id === parseInt(form.LedgerID));
    const payload = { ...form, LedgerName: ledger?.LM_Ledger_Name || '' };
    if (editing) dispatch({ type: 'UPDATE', entity: 'taxMasters', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'taxMasters', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Receipt} title="Tax Master" description="Configure GST tax slabs — feeds Item Master and Quotation" />
      <ActionBar onAdd={openCreate} addLabel="Add Tax Slab" onExport={() => exportToExcel(state.taxMasters, columns, 'tax_master')} onRefresh={() => {}} />
      <div className="mt-4">
        <DataTable columns={columns} data={state.taxMasters} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} />
      </div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Tax Slab' : 'Create Tax Slab'}>
        <FormContainer columns={2}>
          <FormField label="Ledger Account" required className="sm:col-span-2">
            <select className="form-input" value={form.LedgerID} onChange={(e) => set('LedgerID', e.target.value)}>
              <option value="">Select Ledger</option>
              {state.ledgerMasters.map((l) => <option key={l.id} value={l.id}>{l.LM_Ledger_Name}</option>)}
            </select>
          </FormField>
          <FormField label="Total Tax %" required>
            <input type="number" className="form-input" value={form.TM_Tax_Percent} onChange={(e) => set('TM_Tax_Percent', e.target.value)} />
          </FormField>
          <div />
          <FormField label="CGST %"><input type="number" className="form-input" value={form.TM_CGST_Tax} onChange={(e) => set('TM_CGST_Tax', e.target.value)} /></FormField>
          <FormField label="SGST %"><input type="number" className="form-input" value={form.TM_SGST_Tax} onChange={(e) => set('TM_SGST_Tax', e.target.value)} /></FormField>
          <FormField label="IGST %" className="sm:col-span-2"><input type="number" className="form-input" value={form.TM_IGST_Tax} onChange={(e) => set('TM_IGST_Tax', e.target.value)} /></FormField>
          <FormField label="Purchase CGST"><input type="number" className="form-input" value={form.TM_PCGST} onChange={(e) => set('TM_PCGST', e.target.value)} /></FormField>
          <FormField label="Purchase SGST"><input type="number" className="form-input" value={form.TM_PSGST} onChange={(e) => set('TM_PSGST', e.target.value)} /></FormField>
          <FormField label="Purchase IGST"><input type="number" className="form-input" value={form.TM_PIGST} onChange={(e) => set('TM_PIGST', e.target.value)} /></FormField>
          <div />
          <FormField label="Sales CGST"><input type="number" className="form-input" value={form.TM_SCGST} onChange={(e) => set('TM_SCGST', e.target.value)} /></FormField>
          <FormField label="Sales SGST"><input type="number" className="form-input" value={form.TM_SSGST} onChange={(e) => set('TM_SSGST', e.target.value)} /></FormField>
          <FormField label="Sales IGST"><input type="number" className="form-input" value={form.TM_SIGST} onChange={(e) => set('TM_SIGST', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'taxMasters', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default TaxMaster;
