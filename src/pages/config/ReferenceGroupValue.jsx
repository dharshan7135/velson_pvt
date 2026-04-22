import React, { useState, useMemo } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FileText } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { generateNextCode } from '../../utils/mockData';

const ReferenceGroupValue = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterGroupId, setFilterGroupId] = useState('');
  const [form, setForm] = useState({ RG_iID: '', RGV_vCode: '', RGV_vDescription: '' });

  const groups = state.referenceGroups.filter((g) => g.status === 'A');

  const filteredValues = useMemo(() => {
    let vals = state.referenceGroupValues.filter((v) => v.status === 'A');
    if (filterGroupId) vals = vals.filter((v) => v.RG_iID === parseInt(filterGroupId));
    return vals;
  }, [state.referenceGroupValues, filterGroupId]);

  const columns = [
    { key: 'groupName', label: 'Reference Group' },
    { key: 'RGV_vCode', label: 'Value Code' },
    { key: 'RGV_vDescription', label: 'Description' },
  ];

  const openCreate = () => {
    setEditing(null);
    const groupId = filterGroupId ? parseInt(filterGroupId) : '';
    const existing = state.referenceGroupValues.filter((v) => v.RG_iID === groupId);
    const autoCode = groupId ? generateNextCode('', existing, 'RGV_vCode') : '';
    setForm({ RG_iID: groupId, RGV_vCode: autoCode, RGV_vDescription: '' });
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ RG_iID: row.RG_iID, RGV_vCode: row.RGV_vCode, RGV_vDescription: row.RGV_vDescription });
    setModalOpen(true);
  };

  const handleGroupChange = (groupId) => {
    const id = parseInt(groupId);
    const existing = state.referenceGroupValues.filter((v) => v.RG_iID === id);
    const group = groups.find((g) => g.id === id);
    const autoCode = generateNextCode(group ? group.RG_vCode.substring(0, 2).toUpperCase() : '', existing, 'RGV_vCode');
    setForm({ ...form, RG_iID: id, RGV_vCode: autoCode });
  };

  const handleSave = () => {
    const group = groups.find((g) => g.id === form.RG_iID);
    const payload = { ...form, groupName: group?.RG_vCode || '', status: 'A' };
    if (editing) {
      dispatch({ type: 'UPDATE', entity: 'referenceGroupValues', payload: { ...payload, id: editing.id } });
    } else {
      dispatch({ type: 'ADD', entity: 'referenceGroupValues', payload });
    }
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={FileText} title="Reference Group Values" description="Manage dropdown options — this is the central hub for all system dropdowns" />

      <div className="bg-white rounded-t-2xl px-4 py-3 border-b border-slate-100 flex items-center gap-3">
        <label className="text-xs font-bold text-slate-500">Filter by Group:</label>
        <select className="form-input max-w-xs" value={filterGroupId} onChange={(e) => setFilterGroupId(e.target.value)}>
          <option value="">All Groups</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.RG_vCode}</option>)}
        </select>
      </div>

      <ActionBar
        onAdd={openCreate}
        addLabel="Add Value"
        onExport={() => exportToExcel(filteredValues, columns, 'reference_values')}
        onRefresh={() => {}}
      />

      <div className="mt-4">
        <DataTable columns={columns} data={filteredValues} onEdit={openEdit} onDelete={(row) => { setDeleteTarget(row); setDeleteOpen(true); }} />
      </div>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Value' : 'Create Reference Value'} width="max-w-md">
        <FormContainer columns={1}>
          <FormField label="Reference Group" required>
            <select className="form-input" value={form.RG_iID} onChange={(e) => handleGroupChange(e.target.value)}>
              <option value="">Select Group</option>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.RG_vCode}</option>)}
            </select>
          </FormField>
          <FormField label="Value Code" required>
            <input className="form-input" value={form.RGV_vCode} readOnly style={{ background: '#f1f5f9' }} />
          </FormField>
          <FormField label="Description" required>
            <input className="form-input" value={form.RGV_vDescription} onChange={(e) => setForm({ ...form, RGV_vDescription: e.target.value })} placeholder="Enter description" />
          </FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>

      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'referenceGroupValues', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default ReferenceGroupValue;
