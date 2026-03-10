import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashboard';
import CompanyMaster from './pages/masters/CompanyMaster';
import EmployeeMaster from './pages/masters/EmployeeMaster';
import ContractorMaster from './pages/masters/ContractorMaster';
import ItemMaster from './pages/inventory/ItemMaster';
import ItemGroupMaster from './pages/inventory/ItemGroupMaster';
import Characteristics from './pages/inventory/Characteristics';
import MachineMaster from './pages/production/MachineMaster';
import ProcessMaster from './pages/production/ProcessMaster';
import ServiceJobMaster from './pages/production/ServiceJobMaster';
import AccountCreation from './pages/finance/AccountCreation';
import GroupMaster from './pages/finance/GroupMaster';
import TaxMaster from './pages/finance/TaxMaster';
import ReferenceGroupMaster from './pages/config/ReferenceGroupMaster';
import ReferenceMaster from './pages/config/ReferenceMaster';
import SupplierDetails from './pages/config/SupplierDetails';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="app-main">
          <TopNavbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/masters/company" element={<CompanyMaster />} />
              <Route path="/masters/employees" element={<EmployeeMaster />} />
              <Route path="/masters/contractors" element={<ContractorMaster />} />
              <Route path="/inventory/items" element={<ItemMaster />} />
              <Route path="/inventory/item-groups" element={<ItemGroupMaster />} />
              <Route path="/inventory/characteristics" element={<Characteristics />} />
              <Route path="/production/machines" element={<MachineMaster />} />
              <Route path="/production/processes" element={<ProcessMaster />} />
              <Route path="/production/service-jobs" element={<ServiceJobMaster />} />
              <Route path="/finance/accounts" element={<AccountCreation />} />
              <Route path="/finance/groups" element={<GroupMaster />} />
              <Route path="/finance/taxes" element={<TaxMaster />} />
              <Route path="/config/reference-groups" element={<ReferenceGroupMaster />} />
              <Route path="/config/references" element={<ReferenceMaster />} />
              <Route path="/config/suppliers" element={<SupplierDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;