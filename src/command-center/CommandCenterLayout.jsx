import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './CommandCenter.css';
import CommandSidebar from './CommandSidebar';
import CommandNavbar from './CommandNavbar';
import CommandDashboard from './pages/CommandDashboard';
import ProductionMonitoring from './pages/ProductionMonitoring';
import Factory3DView from './pages/Factory3DView';
import MachineHealth from './pages/MachineHealth';
import InventoryIntelligence from './pages/InventoryIntelligence';
import SupplyChain from './pages/SupplyChain';
import SalesAnalytics from './pages/SalesAnalytics';
import ActivityTimeline from './pages/ActivityTimeline';
import IncidentAlerts from './pages/IncidentAlerts';
import ParticleBackground from './components/ParticleBackground';

export default function CommandCenterLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="cc-layout">
      <ParticleBackground />
      <CommandSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`cc-main ${sidebarCollapsed ? 'cc-main--collapsed' : ''}`}>
        <CommandNavbar />
        <div className="cc-content">
          <Routes>
            <Route path="/" element={<CommandDashboard />} />
            <Route path="/production" element={<ProductionMonitoring />} />
            <Route path="/factory-3d" element={<Factory3DView />} />
            <Route path="/machine-health" element={<MachineHealth />} />
            <Route path="/inventory" element={<InventoryIntelligence />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/sales" element={<SalesAnalytics />} />
            <Route path="/timeline" element={<ActivityTimeline />} />
            <Route path="/alerts" element={<IncidentAlerts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
