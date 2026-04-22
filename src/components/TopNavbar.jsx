import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 right-0 left-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Breadcrumb area */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400">Home</span>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">Dashboard</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 w-56 focus:outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 transition-all duration-200"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200">
          <Bell size={20} className="text-slate-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-slate-800">Admin</span>
            <span className="text-xs text-slate-400">Super Admin</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-200"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
