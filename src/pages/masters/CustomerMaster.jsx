import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Briefcase } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const CustomerMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = {
    CustomerTypeId: '', LM_Ledger_Name: '', LM_Code: '',
    LM_Address1: '', LM_Address2: '', LM_Address3: '', LM_Address4: '', LM_Address5: '',
    LM_Area: '', LM_State: '', LM_StateCode: '', LM_Country: '', LM_PinCode: '',
    LM_Contact_Person: '', LM_Phone_Number: '', LM_Cell_No: '', LM_EmailID: '', LM_WebSite: '',
    LM_GSTIN: '', LM_PAN_No: '', LM_Aadhar_No: '',
    LM_Bank_Name: '', LM_Branch: '', LM_Account_Name: '', LM_Account_Number: '', LM_IFSC_Code: '', LM_MICRCODEBANK: '',
    LM_Cus_Remarks: '',
  };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const customerTypes = getRefValuesByGroup(state.referenceGroupValues, 4);

  // Mock state autocomplete — auto-fill StateCode
  const states = [
    { name: 'Tamil Nadu', code: '33' }, { name: 'Maharashtra', code: '27' }, { name: 'Karnataka', code: '29' },
    { name: 'Delhi', code: '07' }, { name: 'Gujarat', code: '24' }, { name: 'Rajasthan', code: '08' },
  ];

  const handleStateChange = (val) => {
    const st = states.find((s) => s.name.toLowerCase() === val.toLowerCase());
    setForm({ ...form, LM_State: val, LM_StateCode: st?.code || form.LM_StateCode });
  };

  const columns = [
    { key: 'LM_Code', label: 'Code' },
    { key: 'LM_Ledger_Name', label: 'Customer Name' },
    { key: 'LM_Area', label: 'City' },
    { key: 'LM_State', label: 'State' },
    { key: 'LM_Contact_Person', label: 'Contact' },
    { key: 'LM_GSTIN', label: 'GSTIN' },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setModalOpen(true); };

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'customers', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'customers', payload: form });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Briefcase} title="Customer Master" description="28 fields with AJAX autocomplete for city, state, bank" />
      <ActionBar onAdd={openCreate} addLabel="Add Customer" onExport={() => exportToExcel(state.customers, columns, 'customers')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.customers} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Customer' : 'Create Customer'} width="max-w-4xl">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Basic Information</h3>
        <FormContainer columns={3}>
          <FormField label="Customer Type"><select className="form-input" value={form.CustomerTypeId} onChange={(e) => set('CustomerTypeId', e.target.value)}><option value="">Select Type</option>{customerTypes.map((c) => <option key={c.id} value={c.id}>{c.RGV_vDescription}</option>)}</select></FormField>
          <FormField label="Customer Name" required className="sm:col-span-2"><input className="form-input" value={form.LM_Ledger_Name} onChange={(e) => set('LM_Ledger_Name', e.target.value)} /></FormField>
          <FormField label="Customer Code"><input className="form-input" value={form.LM_Code} onChange={(e) => set('LM_Code', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Address</h3>
        <FormContainer columns={3}>
          {[1, 2, 3, 4, 5].map((i) => (
            <FormField key={i} label={`Address Line ${i}`}><input className="form-input" value={form[`LM_Address${i}`]} onChange={(e) => set(`LM_Address${i}`, e.target.value)} /></FormField>
          ))}
          <FormField label="City"><input className="form-input" value={form.LM_Area} onChange={(e) => set('LM_Area', e.target.value)} placeholder="Type to search..." /></FormField>
          <FormField label="State"><input className="form-input" value={form.LM_State} onChange={(e) => handleStateChange(e.target.value)} placeholder="Auto-fills State Code" list="states-list" /><datalist id="states-list">{states.map((s) => <option key={s.code} value={s.name} />)}</datalist></FormField>
          <FormField label="State Code"><input className="form-input" value={form.LM_StateCode} readOnly /></FormField>
          <FormField label="Country"><input className="form-input" value={form.LM_Country} onChange={(e) => set('LM_Country', e.target.value)} /></FormField>
          <FormField label="Pin Code"><input className="form-input" value={form.LM_PinCode} onChange={(e) => set('LM_PinCode', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Contact</h3>
        <FormContainer columns={3}>
          <FormField label="Contact Person"><input className="form-input" value={form.LM_Contact_Person} onChange={(e) => set('LM_Contact_Person', e.target.value)} /></FormField>
          <FormField label="Phone"><input className="form-input" value={form.LM_Phone_Number} onChange={(e) => set('LM_Phone_Number', e.target.value)} /></FormField>
          <FormField label="Mobile"><input className="form-input" value={form.LM_Cell_No} onChange={(e) => set('LM_Cell_No', e.target.value)} /></FormField>
          <FormField label="Email"><input type="email" className="form-input" value={form.LM_EmailID} onChange={(e) => set('LM_EmailID', e.target.value)} /></FormField>
          <FormField label="Website"><input className="form-input" value={form.LM_WebSite} onChange={(e) => set('LM_WebSite', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Tax & ID</h3>
        <FormContainer columns={3}>
          <FormField label="GSTIN"><input className="form-input" value={form.LM_GSTIN} onChange={(e) => set('LM_GSTIN', e.target.value)} maxLength={15} /></FormField>
          <FormField label="PAN No"><input className="form-input" value={form.LM_PAN_No} onChange={(e) => set('LM_PAN_No', e.target.value)} maxLength={10} /></FormField>
          <FormField label="Aadhaar No"><input className="form-input" value={form.LM_Aadhar_No} onChange={(e) => set('LM_Aadhar_No', e.target.value)} maxLength={12} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Bank Details</h3>
        <FormContainer columns={3}>
          <FormField label="Bank Name"><input className="form-input" value={form.LM_Bank_Name} onChange={(e) => set('LM_Bank_Name', e.target.value)} /></FormField>
          <FormField label="Branch"><input className="form-input" value={form.LM_Branch} onChange={(e) => set('LM_Branch', e.target.value)} /></FormField>
          <FormField label="Account Name"><input className="form-input" value={form.LM_Account_Name} onChange={(e) => set('LM_Account_Name', e.target.value)} /></FormField>
          <FormField label="Account Number"><input className="form-input" value={form.LM_Account_Number} onChange={(e) => set('LM_Account_Number', e.target.value)} /></FormField>
          <FormField label="IFSC Code"><input className="form-input" value={form.LM_IFSC_Code} onChange={(e) => set('LM_IFSC_Code', e.target.value)} /></FormField>
          <FormField label="MICR Code"><input className="form-input" value={form.LM_MICRCODEBANK} onChange={(e) => set('LM_MICRCODEBANK', e.target.value)} /></FormField>
        </FormContainer>

        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Remarks</h3>
        <FormContainer columns={1}>
          <FormField label="Customer Remarks"><textarea className="form-input" value={form.LM_Cus_Remarks} onChange={(e) => set('LM_Cus_Remarks', e.target.value)} /></FormField>
        </FormContainer>

        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'customers', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default CustomerMaster;
