import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import Tabs from '../../components/Tabs';
import { Building2 } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const tabs = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'address', label: 'Address' },
  { key: 'tax', label: 'Tax & Legal' },
  { key: 'contact', label: 'Contacts' },
  { key: 'bank', label: 'Bank Details' },
  { key: 'branding', label: 'Branding' },
];

const emptyForm = {
  CompanyCode: '', CompanyName: '', CompanyTypeId: '', Status: 'Active',
  DoorNumber: '', Street: '', Place: '', Post: '', City: '', Taluk: '', District: '', DistrictCode: '', State: '', StateCode: '', Country: '', PinCode: '', FullAddress: '',
  GSTIN: '', PanNo: '',
  CPhoneNumber: '', CEMailId: '', CWebsiteURL: '', MPhoneNumber: '', MEMailId: '', MWebsiteURL: '',
  PPhoneNumber: '', PEMailId: '', PWebsiteURL: '', SPhoneNumber: '', SEMailId: '', SWebsiteURL: '',
  SERPhoneNumber: '', SEREMailId: '', SERWebsiteURL: '',
  BankAccountType: '', BankAccountName: '', BankAccountNumber: '', BankName: '', BankIFSCCode: '', BankMICRCode: '', BankBranch: '', BankDistrict: '', BankState: '', BankPinCode: '', BankCountry: '', BankFullAddress: '',
};

const CompanyMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [form, setForm] = useState(emptyForm);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const companyTypes = getRefValuesByGroup(state.referenceGroupValues, 3);

  const columns = [
    { key: 'CompanyCode', label: 'Code' },
    { key: 'CompanyName', label: 'Company Name' },
    { key: 'City', label: 'City' },
    { key: 'State', label: 'State' },
    { key: 'GSTIN', label: 'GSTIN' },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{v}</span> },
  ];

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, CompanyCode: `C${String(state.companies.length + 1).padStart(4, '0')}` });
    setActiveTab('basic');
    setModalOpen(true);
  };
  const openEdit = (row) => { setEditing(row); setForm({ ...emptyForm, ...row }); setActiveTab('basic'); setModalOpen(true); };

  const handleSave = () => {
    if (editing) dispatch({ type: 'UPDATE', entity: 'companies', payload: { ...form, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'companies', payload: form });
    setModalOpen(false);
  };

  const ContactSection = ({ prefix, label }) => (
    <>
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider sm:col-span-3 mt-2">{label}</h4>
      <FormField label="Phone"><input className="form-input" value={form[`${prefix}PhoneNumber`]} onChange={(e) => set(`${prefix}PhoneNumber`, e.target.value)} /></FormField>
      <FormField label="Email"><input type="email" className="form-input" value={form[`${prefix}EMailId`]} onChange={(e) => set(`${prefix}EMailId`, e.target.value)} /></FormField>
      <FormField label="Website"><input className="form-input" value={form[`${prefix}WebsiteURL`]} onChange={(e) => set(`${prefix}WebsiteURL`, e.target.value)} /></FormField>
    </>
  );

  return (
    <div>
      <PageHeader icon={Building2} title="Company Master" description="50+ fields across 6 sections — tabbed interface" />
      <ActionBar onAdd={openCreate} addLabel="Add Company" onExport={() => exportToExcel(state.companies, columns, 'companies')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.companies} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Company' : 'Create Company'} width="max-w-4xl">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'basic' && (
          <FormContainer columns={3}>
            <FormField label="Company Code" required><input className="form-input" value={form.CompanyCode} readOnly /></FormField>
            <FormField label="Company Name" required className="sm:col-span-2"><input className="form-input" value={form.CompanyName} onChange={(e) => set('CompanyName', e.target.value)} /></FormField>
            <FormField label="Company Type" required>
              <select className="form-input" value={form.CompanyTypeId} onChange={(e) => set('CompanyTypeId', e.target.value)}>
                <option value="">Select Type</option>
                {companyTypes.map((c) => <option key={c.id} value={c.id}>{c.RGV_vDescription}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select className="form-input" value={form.Status} onChange={(e) => set('Status', e.target.value)}>
                <option value="Active">Active</option><option value="Inactive">Inactive</option>
              </select>
            </FormField>
          </FormContainer>
        )}

        {activeTab === 'address' && (
          <FormContainer columns={3}>
            <FormField label="Door Number" required><input className="form-input" value={form.DoorNumber} onChange={(e) => set('DoorNumber', e.target.value)} /></FormField>
            <FormField label="Street" required><input className="form-input" value={form.Street} onChange={(e) => set('Street', e.target.value)} /></FormField>
            <FormField label="Place" required><input className="form-input" value={form.Place} onChange={(e) => set('Place', e.target.value)} /></FormField>
            <FormField label="Post" required><input className="form-input" value={form.Post} onChange={(e) => set('Post', e.target.value)} /></FormField>
            <FormField label="City" required><input className="form-input" value={form.City} onChange={(e) => set('City', e.target.value)} /></FormField>
            <FormField label="Taluk" required><input className="form-input" value={form.Taluk} onChange={(e) => set('Taluk', e.target.value)} /></FormField>
            <FormField label="District" required><input className="form-input" value={form.District} onChange={(e) => set('District', e.target.value)} /></FormField>
            <FormField label="District Code" required><input type="number" className="form-input" value={form.DistrictCode} onChange={(e) => set('DistrictCode', e.target.value)} /></FormField>
            <FormField label="State" required><input className="form-input" value={form.State} onChange={(e) => set('State', e.target.value)} /></FormField>
            <FormField label="State Code" required><input type="number" className="form-input" value={form.StateCode} onChange={(e) => set('StateCode', e.target.value)} /></FormField>
            <FormField label="Country" required><input className="form-input" value={form.Country} onChange={(e) => set('Country', e.target.value)} /></FormField>
            <FormField label="Pin Code" required><input className="form-input" value={form.PinCode} onChange={(e) => set('PinCode', e.target.value)} /></FormField>
            <FormField label="Full Address" required className="sm:col-span-3"><textarea className="form-input" value={form.FullAddress} onChange={(e) => set('FullAddress', e.target.value)} /></FormField>
          </FormContainer>
        )}

        {activeTab === 'tax' && (
          <FormContainer columns={2}>
            <FormField label="GSTIN" required><input className="form-input" value={form.GSTIN} onChange={(e) => set('GSTIN', e.target.value)} placeholder="15-char GST ID" maxLength={15} /></FormField>
            <FormField label="PAN No" required><input className="form-input" value={form.PanNo} onChange={(e) => set('PanNo', e.target.value)} placeholder="10-char PAN" maxLength={10} /></FormField>
          </FormContainer>
        )}

        {activeTab === 'contact' && (
          <FormContainer columns={3}>
            <ContactSection prefix="C" label="Company Department" />
            <ContactSection prefix="M" label="Marketing Department" />
            <ContactSection prefix="P" label="Purchase Department" />
            <ContactSection prefix="S" label="Sales Department" />
            <ContactSection prefix="SER" label="Service Department" />
          </FormContainer>
        )}

        {activeTab === 'bank' && (
          <FormContainer columns={3}>
            <FormField label="Account Type"><input className="form-input" value={form.BankAccountType} onChange={(e) => set('BankAccountType', e.target.value)} placeholder="Savings/Current" /></FormField>
            <FormField label="Account Name"><input className="form-input" value={form.BankAccountName} onChange={(e) => set('BankAccountName', e.target.value)} /></FormField>
            <FormField label="Account Number"><input className="form-input" value={form.BankAccountNumber} onChange={(e) => set('BankAccountNumber', e.target.value)} /></FormField>
            <FormField label="Bank Name"><input className="form-input" value={form.BankName} onChange={(e) => set('BankName', e.target.value)} /></FormField>
            <FormField label="IFSC Code"><input className="form-input" value={form.BankIFSCCode} onChange={(e) => set('BankIFSCCode', e.target.value)} /></FormField>
            <FormField label="MICR Code"><input className="form-input" value={form.BankMICRCode} onChange={(e) => set('BankMICRCode', e.target.value)} /></FormField>
            <FormField label="Branch"><input className="form-input" value={form.BankBranch} onChange={(e) => set('BankBranch', e.target.value)} /></FormField>
            <FormField label="District"><input className="form-input" value={form.BankDistrict} onChange={(e) => set('BankDistrict', e.target.value)} /></FormField>
            <FormField label="State"><input className="form-input" value={form.BankState} onChange={(e) => set('BankState', e.target.value)} /></FormField>
            <FormField label="Pin Code"><input className="form-input" value={form.BankPinCode} onChange={(e) => set('BankPinCode', e.target.value)} /></FormField>
            <FormField label="Country"><input className="form-input" value={form.BankCountry} onChange={(e) => set('BankCountry', e.target.value)} /></FormField>
            <FormField label="Full Address" className="sm:col-span-3"><textarea className="form-input" value={form.BankFullAddress} onChange={(e) => set('BankFullAddress', e.target.value)} /></FormField>
          </FormContainer>
        )}

        {activeTab === 'branding' && (
          <FormContainer columns={1}>
            <FormField label="Company Logo">
              <input type="file" className="form-input" accept="image/*" />
            </FormField>
          </FormContainer>
        )}

        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>

      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'companies', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default CompanyMaster;
