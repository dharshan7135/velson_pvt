import React, { useState } from 'react';
import { IoSearch, IoSave, IoCreate, IoTrash, IoRefresh, IoClose } from 'react-icons/io5';

const ActionBar = ({
    onSearch,
    onRefresh,
    onSave,
    onEdit,
    onDelete,
    onClear,
    showRefresh = false,
    showSave = true,
    showEdit = true,
    showDelete = false,
    showClear = false,
    children,
}) => {
    const [searchText, setSearchText] = useState('');

    const btnBase = 'flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer';

    return (
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between rounded-b-2xl">
            {/* Search */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onSearch && onSearch(searchText)}
                    className={`${btnBase} bg-[#0097A7] text-white hover:bg-[#00838F]`}
                >
                    <IoSearch className="w-3.5 h-3.5" />
                    Search
                </button>
                <div className="relative">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/10 w-52"
                        placeholder="Search Here"
                    />
                    <IoSearch className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
            </div>

            {/* Middle Extra Elements (Children) */}
            {children && (
                <div className="flex-1 flex items-center px-4 md:px-8 overflow-hidden">
                    {children}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
                {showRefresh && (
                    <button onClick={onRefresh} className={`${btnBase} border border-[#0097A7] text-[#0097A7] bg-[#0097A7]/5 hover:bg-[#0097A7]/10`}>
                        <IoRefresh className="w-3.5 h-3.5" />
                        Refresh
                    </button>
                )}
                {showSave && (
                    <button onClick={onSave} className={`${btnBase} bg-[#0097A7] text-white hover:bg-[#00838F]`}>
                        <IoSave className="w-3.5 h-3.5" />
                        Save
                    </button>
                )}
                {showEdit && (
                    <button onClick={onEdit} className={`${btnBase} bg-amber-500 text-white hover:bg-amber-600`}>
                        <IoCreate className="w-3.5 h-3.5" />
                        Edit
                    </button>
                )}
                {showDelete && (
                    <button onClick={onDelete} className={`${btnBase} bg-red-500 text-white hover:bg-red-600`}>
                        <IoTrash className="w-3.5 h-3.5" />
                        Delete
                    </button>
                )}
                {showClear && (
                    <button onClick={onClear} className={`${btnBase} border border-slate-300 text-slate-600 bg-white hover:bg-slate-50`}>
                        <IoClose className="w-3.5 h-3.5" />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActionBar;
