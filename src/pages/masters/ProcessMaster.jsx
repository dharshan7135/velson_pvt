import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import FormModal from '../../components/FormModal';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Settings } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { getRefValuesByGroup } from '../../utils/mockData';

const ProcessMaster = () => {
  const { state, dispatch } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const empty = { PM_Process_Name: '', PM_Process_Name1: '', ProcessTypeId: '', TeamId: '', PM_Process_Order: '', PM_Days: 0, PM_Hours: 0, Minutes: 0, Setting_Time: 0, Cycle_Time: 0, Handling_Time: 0, Idle_Time: 0, Machine_id: '', Machine_Name: '' };
  const [form, setForm] = useState(empty);
  const set = (k, v) => setForm({ ...form, [k]: v });

  const processTypes = getRefValuesByGroup(state.referenceGroupValues, 8);
  const teams = getRefValuesByGroup(state.referenceGroupValues, 9);

  const columns = [
    { key: 'PM_Process_Name', label: 'Process' },
    { key: 'ProcessTypeName', label: 'Type' },
    { key: 'TeamName', label: 'Team' },
    { key: 'PM_Process_Order', label: 'Order' },
    { key: 'Cycle_Time', label: 'Cycle Time' },
    { key: 'Machine_Name', label: 'Machine' },
  ];

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setForm(row); setModalOpen(true); };

  const handleSave = () => {
    const pt = processTypes.find((p) => p.id === parseInt(form.ProcessTypeId));
    const tm = teams.find((t) => t.id === parseInt(form.TeamId));
    const mc = state.machines.find((m) => m.id === parseInt(form.Machine_id));
    const payload = { ...form, ProcessTypeName: pt?.RGV_vDescription || '', TeamName: tm?.RGV_vDescription || '', Machine_Name: mc?.Machine_Name || form.Machine_Name };
    if (editing) dispatch({ type: 'UPDATE', entity: 'processes', payload: { ...payload, id: editing.id } });
    else dispatch({ type: 'ADD', entity: 'processes', payload });
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader icon={Settings} title="Process Master" description="Define manufacturing processes with time parameters" />
      <ActionBar onAdd={openCreate} addLabel="Add Process" onExport={() => exportToExcel(state.processes, columns, 'processes')} onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.processes} onEdit={openEdit} onDelete={(r) => { setDeleteTarget(r); setDeleteOpen(true); }} /></div>
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Process' : 'Create Process'} width="max-w-3xl">
        <FormContainer columns={3}>
          <FormField label="Process Name" required><input className="form-input" value={form.PM_Process_Name} onChange={(e) => set('PM_Process_Name', e.target.value)} /></FormField>
          <FormField label="Alt. Process Name"><input className="form-input" value={form.PM_Process_Name1} onChange={(e) => set('PM_Process_Name1', e.target.value)} /></FormField>
          <FormField label="Process Order"><input type="number" className="form-input" value={form.PM_Process_Order} onChange={(e) => set('PM_Process_Order', e.target.value)} /></FormField>
          <FormField label="Process Type">
            <select className="form-input" value={form.ProcessTypeId} onChange={(e) => set('ProcessTypeId', e.target.value)}>
              <option value="">Select Type</option>
              {processTypes.map((p) => <option key={p.id} value={p.id}>{p.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Team">
            <select className="form-input" value={form.TeamId} onChange={(e) => set('TeamId', e.target.value)}>
              <option value="">Select Team</option>
              {teams.map((t) => <option key={t.id} value={t.id}>{t.RGV_vDescription}</option>)}
            </select>
          </FormField>
          <FormField label="Machine">
            <select className="form-input" value={form.Machine_id} onChange={(e) => {
              const m = state.machines.find((mc) => mc.id === parseInt(e.target.value));
              setForm({ ...form, Machine_id: e.target.value, Machine_Name: m?.Machine_Name || '' });
            }}>
              <option value="">Select Machine</option>
              {state.machines.map((m) => <option key={m.id} value={m.id}>{m.Machine_Name}</option>)}
            </select>
          </FormField>
        </FormContainer>
        <h3 className="text-sm font-bold text-slate-700 mt-6 mb-3">Time Parameters</h3>
        <FormContainer columns={4}>
          <FormField label="Days"><input type="number" className="form-input" value={form.PM_Days} onChange={(e) => set('PM_Days', e.target.value)} /></FormField>
          <FormField label="Hours"><input type="number" className="form-input" value={form.PM_Hours} onChange={(e) => set('PM_Hours', e.target.value)} /></FormField>
          <FormField label="Minutes"><input type="number" className="form-input" value={form.Minutes} onChange={(e) => set('Minutes', e.target.value)} /></FormField>
          <div />
          <FormField label="Setting Time"><input type="number" className="form-input" value={form.Setting_Time} onChange={(e) => set('Setting_Time', e.target.value)} /></FormField>
          <FormField label="Cycle Time"><input type="number" className="form-input" value={form.Cycle_Time} onChange={(e) => set('Cycle_Time', e.target.value)} /></FormField>
          <FormField label="Handling Time"><input type="number" className="form-input" value={form.Handling_Time} onChange={(e) => set('Handling_Time', e.target.value)} /></FormField>
          <FormField label="Idle Time"><input type="number" className="form-input" value={form.Idle_Time} onChange={(e) => set('Idle_Time', e.target.value)} /></FormField>
        </FormContainer>
        <FormActions onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </FormModal>
      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { dispatch({ type: 'DELETE', entity: 'processes', payload: deleteTarget.id }); setDeleteOpen(false); }} />
    </div>
  );
};

export default ProcessMaster;
