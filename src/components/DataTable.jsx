import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, onAdd, addLabel = 'Add New', pageSize = 8 }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const filtered = useMemo(() => {
        if (!search) return data;
        const q = search.toLowerCase();
        return data.filter((row) =>
            columns.some((col) => {
                const val = row[col.key];
                return val != null && String(val).toLowerCase().includes(q);
            })
        );
    }, [data, search, columns]);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        placeholder="Search records..."
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 transition-all"
                    />
                </div>
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#0097A7] to-[#00838F] text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[#0097A7]/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        {addLabel}
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-10">#</th>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                                        {col.label}
                                    </th>
                                ))}
                                {(onEdit || onDelete) && (
                                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-28">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paged.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-slate-400 italic">
                                        No records found
                                    </td>
                                </tr>
                            )}
                            {paged.map((row, i) => (
                                <tr key={row.id || i} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3 text-slate-400 font-medium">{page * pageSize + i + 1}</td>
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-slate-700 whitespace-nowrap">
                                            {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="p-1.5 text-[#0097A7] hover:bg-[#0097A7]/10 rounded-lg transition-colors cursor-pointer"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-slate-500">
                        Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer transition-all
                  ${page === i ? 'bg-[#0097A7] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                            disabled={page === totalPages - 1}
                            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
