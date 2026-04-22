import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import PlaceholderPage from './pages/PlaceholderPage';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Config
import ReferenceGroupMaster from './pages/config/ReferenceGroupMaster';
import ReferenceGroupValue from './pages/config/ReferenceGroupValue';
import LedgerMaster from './pages/config/LedgerMaster';
import TaxMaster from './pages/config/TaxMaster';

// Masters
import CompanyMaster from './pages/masters/CompanyMaster';
import EmployeeMaster from './pages/masters/EmployeeMaster';
import CustomerMaster from './pages/masters/CustomerMaster';
import SupplierMaster from './pages/masters/SupplierMaster';
import ContractorMaster from './pages/masters/ContractorMaster';
import MachineMaster from './pages/masters/MachineMaster';
import ProcessMaster from './pages/masters/ProcessMaster';
import VehicleMaster from './pages/masters/VehicleMaster';

// Inventory
import ItemMaster from './pages/inventory/ItemMaster';
import ItemGroupMaster from './pages/inventory/ItemGroupMaster';

// Sales
import QuotationIndex from './pages/sales/QuotationIndex';
import QuotationForm from './pages/sales/QuotationForm';

// Users
import CreateUser from './pages/users/CreateUser';
import RoleMaster from './pages/users/RoleMaster';

// Quality
import QCCheckMethod from './pages/quality/QCCheckMethod';

// Admin
import SystemInfoMaster from './pages/admin/SystemInfoMaster';

// Icons for placeholder pages
import { Wrench, BarChart3, ClipboardList, ShoppingCart, Receipt, BookOpen, Layers, Link2 } from 'lucide-react';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <TopNavbar />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth — no sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes — with sidebar */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Masters */}
      <Route path="/masters/company" element={<ProtectedRoute><CompanyMaster /></ProtectedRoute>} />
      <Route path="/masters/employees" element={<ProtectedRoute><EmployeeMaster /></ProtectedRoute>} />
      <Route path="/masters/customers" element={<ProtectedRoute><CustomerMaster /></ProtectedRoute>} />
      <Route path="/masters/suppliers" element={<ProtectedRoute><SupplierMaster /></ProtectedRoute>} />
      <Route path="/masters/contractors" element={<ProtectedRoute><ContractorMaster /></ProtectedRoute>} />
      <Route path="/masters/machines" element={<ProtectedRoute><MachineMaster /></ProtectedRoute>} />
      <Route path="/masters/processes" element={<ProtectedRoute><ProcessMaster /></ProtectedRoute>} />
      <Route path="/masters/vehicles" element={<ProtectedRoute><VehicleMaster /></ProtectedRoute>} />
      <Route path="/masters/vehicle-service" element={<ProtectedRoute><PlaceholderPage icon={Wrench} title="Vehicle Service Master" description="Track vehicle service records" /></ProtectedRoute>} />

      {/* Inventory */}
      <Route path="/inventory/items" element={<ProtectedRoute><ItemMaster /></ProtectedRoute>} />
      <Route path="/inventory/item-groups" element={<ProtectedRoute><ItemGroupMaster /></ProtectedRoute>} />
      <Route path="/inventory/part-number-base" element={<ProtectedRoute><PlaceholderPage icon={BarChart3} title="Part Number Base Master" description="3 cascading dropdowns: Category → SubCategory → Prefix" /></ProtectedRoute>} />
      <Route path="/inventory/part-usage" element={<ProtectedRoute><PlaceholderPage icon={ClipboardList} title="Part Usage List" description="Read-only display of where each part is used across assemblies" /></ProtectedRoute>} />
      <Route path="/inventory/auto-po" element={<ProtectedRoute><PlaceholderPage icon={ShoppingCart} title="Auto PO" description="Items below reorder level — auto purchase order generation" /></ProtectedRoute>} />

      {/* Sales */}
      <Route path="/sales/quotations" element={<ProtectedRoute><QuotationIndex /></ProtectedRoute>} />
      <Route path="/sales/quotation/new" element={<ProtectedRoute><QuotationForm /></ProtectedRoute>} />

      {/* Accounting */}
      <Route path="/accounting/invoices" element={<ProtectedRoute><PlaceholderPage icon={Receipt} title="Invoices" description="Drill-down: Supplier → Invoice → Details" /></ProtectedRoute>} />
      <Route path="/accounting/journal-entries" element={<ProtectedRoute><PlaceholderPage icon={BookOpen} title="Journal Entries" description="Read-only journal entries view" /></ProtectedRoute>} />
      <Route path="/accounting/ledger-groups" element={<ProtectedRoute><PlaceholderPage icon={Layers} title="Ledger Group Master" description="Ledger group classification" /></ProtectedRoute>} />

      {/* Quality */}
      <Route path="/quality/check-methods" element={<ProtectedRoute><QCCheckMethod /></ProtectedRoute>} />
      <Route path="/quality/inspection-chars" element={<ProtectedRoute><PlaceholderPage icon={BarChart3} title="QC Inspection Characters" description="Define inspection characteristics" /></ProtectedRoute>} />
      <Route path="/quality/material-standards" element={<ProtectedRoute><PlaceholderPage icon={ClipboardList} title="QC Material Inspection Standard" description="Material inspection standards" /></ProtectedRoute>} />

      {/* Config */}
      <Route path="/config/reference-groups" element={<ProtectedRoute><ReferenceGroupMaster /></ProtectedRoute>} />
      <Route path="/config/reference-values" element={<ProtectedRoute><ReferenceGroupValue /></ProtectedRoute>} />
      <Route path="/config/ledger-master" element={<ProtectedRoute><LedgerMaster /></ProtectedRoute>} />
      <Route path="/config/tax-master" element={<ProtectedRoute><TaxMaster /></ProtectedRoute>} />

      {/* Users */}
      <Route path="/users/create" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
      <Route path="/users/all" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
      <Route path="/users/roles" element={<ProtectedRoute><RoleMaster /></ProtectedRoute>} />
      <Route path="/users/menus" element={<ProtectedRoute><PlaceholderPage icon={Layers} title="Menu Master" description="CRUD menus for role-based access" /></ProtectedRoute>} />
      <Route path="/users/sub-menus" element={<ProtectedRoute><PlaceholderPage icon={Layers} title="Sub Menu Master" description="CRUD sub-menus with parent dropdown" /></ProtectedRoute>} />
      <Route path="/users/assign-role-menu" element={<ProtectedRoute><PlaceholderPage icon={Link2} title="Assign Role to Menu" description="Role → Menu assignment matrix" /></ProtectedRoute>} />
      <Route path="/users/assign-role-user" element={<ProtectedRoute><PlaceholderPage icon={Link2} title="Assign Role to User" description="Role → User assignment" /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/system-info" element={<ProtectedRoute><SystemInfoMaster /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
