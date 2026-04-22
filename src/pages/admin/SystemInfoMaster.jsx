import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import { Database } from 'lucide-react';

const SystemInfoMaster = () => {
  const { state } = useApp();

  const columns = [
    { key: 'IPAddress', label: 'IP Address' },
    { key: 'MACAddress', label: 'MAC Address' },
    { key: 'DeviceName', label: 'Device Name' },
    { key: 'USERNAME', label: 'Username' },
    { key: 'DEPT', label: 'Department' },
  ];

  return (
    <div>
      <PageHeader icon={Database} title="System Info Master" description="Device registry for audit trail — every workstation must be registered" />
      <ActionBar onRefresh={() => {}} />
      <div className="mt-4"><DataTable columns={columns} data={state.systemInfo} /></div>
    </div>
  );
};

export default SystemInfoMaster;
