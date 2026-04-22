import React from 'react';
import { Search, Plus, RefreshCw, Download, Trash2, X, RotateCcw } from 'lucide-react';

const ActionBar = ({ onSearch, onAdd, onRefresh, onExport, onDelete, onClear, onUndelete, searchValue, onSearchChange, addLabel = 'Add New' }) => {
  return (
    <div className="bg-white border-t border-slate-200 rounded-b-2xl px-4 py-3 flex flex-wrap items-center gap-2 animate-fade-in">
      {/* Search */}
      {onSearchChange && (
        <div className="relative mr-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 w-52 focus:outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 transition-all duration-200"
          />
        </div>
      )}

      {/* Add / Search */}
      {onAdd && (
        <button
          onClick={onAdd}
          className="px-4 py-2 text-xs font-bold rounded-lg bg-[#0097A7] text-white hover:bg-[#007a87] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <Plus size={14} /> {addLabel}
        </button>
      )}

      {onSearch && (
        <button
          onClick={onSearch}
          className="px-4 py-2 text-xs font-bold rounded-lg border border-[#0097A7] text-[#0097A7] hover:bg-[#0097A7]/5 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <Search size={14} /> Search
        </button>
      )}

      {onRefresh && (
        <button
          onClick={onRefresh}
          className="px-4 py-2 text-xs font-bold rounded-lg border border-[#0097A7] text-[#0097A7] hover:bg-[#0097A7]/5 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="px-4 py-2 text-xs font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <Trash2 size={14} /> Delete All
        </button>
      )}

      {onUndelete && (
        <button
          onClick={onUndelete}
          className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <RotateCcw size={14} /> View Deleted
        </button>
      )}

      {onExport && (
        <button
          onClick={onExport}
          className="px-4 py-2 text-xs font-bold rounded-lg text-white hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
          style={{
            background: 'linear-gradient(135deg, #1B5E20, #0D3B13)',
            boxShadow: '0 0 12px rgba(27,94,32,0.45)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 22px rgba(27,94,32,0.7)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 12px rgba(27,94,32,0.45)'; }}
        >
          <Download size={14} /> Export Excel
        </button>
      )}

      {onClear && (
        <button
          onClick={onClear}
          className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
        >
          <X size={14} /> Clear
        </button>
      )}
    </div>
  );
};

export default ActionBar;
