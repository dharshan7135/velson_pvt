import React from 'react';
import { useApp } from '../../store/AppContext';
import { LayoutDashboard, Users, Package, ShoppingCart, FileText, Cog, Building2, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 text-left w-full"
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </button>
);

const QuickLink = ({ icon: Icon, label, path, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:border-[#0097A7]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div className="w-10 h-10 rounded-lg bg-[#0097A7]/10 flex items-center justify-center">
      <Icon size={18} className="text-[#0097A7]" />
    </div>
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </button>
);

const Dashboard = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const stats = [
    { icon: Building2, label: 'Companies', value: state.companies.length, color: 'bg-gradient-to-br from-[#0097A7] to-[#00BCD4]', path: '/masters/company' },
    { icon: Users, label: 'Employees', value: state.employees.filter((e) => e.EM_Status === 'Active').length, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', path: '/masters/employees' },
    { icon: Package, label: 'Items', value: state.items.length, color: 'bg-gradient-to-br from-violet-500 to-violet-600', path: '/inventory/items' },
    { icon: ShoppingCart, label: 'Quotations', value: state.quotations.length, color: 'bg-gradient-to-br from-amber-500 to-amber-600', path: '/sales/quotations' },
    { icon: ClipboardList, label: 'Customers', value: state.customers.length, color: 'bg-gradient-to-br from-blue-500 to-blue-600', path: '/masters/customers' },
    { icon: Cog, label: 'Machines', value: state.machines.length, color: 'bg-gradient-to-br from-rose-500 to-rose-600', path: '/masters/machines' },
  ];

  const quickLinks = [
    { icon: FileText, label: 'New Quotation', path: '/sales/quotation/new' },
    { icon: Package, label: 'Add Item', path: '/inventory/items' },
    { icon: Users, label: 'Add Employee', path: '/masters/employees' },
    { icon: Building2, label: 'Add Company', path: '/masters/company' },
    { icon: ClipboardList, label: 'Add Customer', path: '/masters/customers' },
    { icon: Cog, label: 'Reference Groups', path: '/config/reference-groups' },
  ];

  const recentActivity = [
    { action: 'Quotation Q00001 created', user: 'Admin', time: '2 hours ago' },
    { action: 'Item RM00003 added to inventory', user: 'Rajesh', time: '4 hours ago' },
    { action: 'Customer Tata Motors updated', user: 'Priya', time: '6 hours ago' },
    { action: 'Employee EMP005 onboarded', user: 'Admin', time: '1 day ago' },
    { action: 'Tax slab 28% configured', user: 'Admin', time: '2 days ago' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#0097A7]/10 rounded-xl flex items-center justify-center">
          <LayoutDashboard size={24} className="text-[#0097A7]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, {state.user.firstName}!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} onClick={() => navigate(s.path)} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map((ql) => (
              <QuickLink key={ql.label} {...ql} onClick={() => navigate(ql.path)} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {recentActivity.map((a, i) => (
              <div key={i} className={`px-4 py-3 ${i > 0 ? 'border-t border-slate-50' : ''}`}>
                <p className="text-sm text-slate-700">{a.action}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#0097A7] font-medium">{a.user}</span>
                  <span className="text-xs text-slate-400">• {a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
