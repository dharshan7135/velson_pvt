import React from 'react';
import { useAppContext } from '../store/AppContext';
import {
    Building2, Users, Package, Factory, Cog, BookOpen,
    Truck, Layers, Receipt, TrendingUp, ArrowUpRight,
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
        <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            {trend && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {trend}
                </span>
            )}
        </div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
);

const Dashboard = () => {
    const { state } = useAppContext();

    const stats = [
        { label: 'Companies', value: state.companies.length, icon: Building2, color: 'bg-blue-50 text-blue-600', trend: '+2' },
        { label: 'Employees', value: state.employees.length, icon: Users, color: 'bg-violet-50 text-violet-600', trend: '+5' },
        { label: 'Items', value: state.items.length, icon: Package, color: 'bg-amber-50 text-amber-600', trend: '+12' },
        { label: 'Machines', value: state.machines.length, icon: Cog, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Suppliers', value: state.suppliers.length, icon: Truck, color: 'bg-rose-50 text-rose-600', trend: '+3' },
        { label: 'Accounts', value: state.accounts.length, icon: BookOpen, color: 'bg-cyan-50 text-cyan-600' },
        { label: 'Item Groups', value: state.itemGroups.length, icon: Layers, color: 'bg-orange-50 text-orange-600' },
        { label: 'Tax Entries', value: state.taxes.length, icon: Receipt, color: 'bg-pink-50 text-pink-600' },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-br from-[#0097A7] to-[#00838F] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold mb-2">Welcome back, Admin 👋</h1>
                    <p className="text-white/70 text-sm max-w-lg">
                        Here's an overview of your ERP system. Navigate through the sidebar to manage all your business operations.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#0097A7]" />
                        Recent Items
                    </h3>
                    <div className="space-y-3">
                        {state.items.slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{item.partName}</p>
                                    <p className="text-xs text-slate-400">{item.partNo} • {item.itemGroup}</p>
                                </div>
                                <span className="text-sm font-bold text-[#0097A7]">₹{item.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Factory className="w-5 h-5 text-[#0097A7]" />
                        Active Machines
                    </h3>
                    <div className="space-y-3">
                        {state.machines.slice(0, 5).map((m) => (
                            <div key={m.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{m.machineName}</p>
                                    <p className="text-xs text-slate-400">{m.machineCode} • {m.machineCategory}</p>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
