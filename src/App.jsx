import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

// Lazy-load all pages so they show the logo blink while loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CompanyMaster = lazy(() => import('./pages/masters/CompanyMaster'));
const EmployeeMaster = lazy(() => import('./pages/masters/EmployeeMaster'));
const ContractorMaster = lazy(() => import('./pages/masters/ContractorMaster'));
const ItemMaster = lazy(() => import('./pages/inventory/ItemMaster'));
const ItemGroupMaster = lazy(() => import('./pages/inventory/ItemGroupMaster'));
const Characteristics = lazy(() => import('./pages/inventory/Characteristics'));
const MachineMaster = lazy(() => import('./pages/production/MachineMaster'));
const ProcessMaster = lazy(() => import('./pages/production/ProcessMaster'));
const ServiceJobMaster = lazy(() => import('./pages/production/ServiceJobMaster'));
const AccountCreation = lazy(() => import('./pages/finance/AccountCreation'));
const GroupMaster = lazy(() => import('./pages/finance/GroupMaster'));
const TaxMaster = lazy(() => import('./pages/finance/TaxMaster'));
const ReferenceGroupMaster = lazy(() => import('./pages/config/ReferenceGroupMaster'));
const ReferenceMaster = lazy(() => import('./pages/config/ReferenceMaster'));
const SupplierDetails = lazy(() => import('./pages/config/SupplierDetails'));

function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="app-main">
          <TopNavbar />
          <div className="app-content">
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;