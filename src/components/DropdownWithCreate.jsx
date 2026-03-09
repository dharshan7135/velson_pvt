import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Plus, AlertCircle } from 'lucide-react';

const DropdownWithCreate = ({
    label, id, required, options = [], value, onChange, onAdd,
    error, placeholder, className = '', disabled,
    displayField = 'label', valueField = 'value',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = useMemo(() => {
        if (!search) return options;
        return options.filter((o) => {
            const lbl = typeof o === 'string' ? o : o[displayField];
            return lbl?.toLowerCase().includes(search.toLowerCase());
        });
    }, [options, search, displayField]);

    const selectedLabel = useMemo(() => {
        if (!value && value !== 0) return '';
        const opt = options.find((o) => {
            const val = typeof o === 'string' ? o : o[valueField];
            return val === value;
        });
        if (!opt) return value;
        return typeof opt === 'string' ? opt : opt[displayField];
    }, [value, options, displayField, valueField]);

    const handleSelect = (opt) => {
        const val = typeof opt === 'string' ? opt : opt[valueField];
        onChange?.(val);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className={`form-field-group ${className}`} ref={ref}>
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    id={id}
                    onClick={() => { if (!disabled) { setIsOpen(!isOpen); setTimeout(() => inputRef.current?.focus(), 50); } }}
                    className={`form-input flex items-center justify-between text-left cursor-pointer
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    <span className={selectedLabel ? 'text-slate-900' : 'text-slate-400'}>
                        {selectedLabel || placeholder || `Select ${label}`}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-dropdown">
                        {/* Search */}
                        <div className="p-2 border-b border-slate-100">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/10"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>

                        {/* Options */}
                        <div className="max-h-44 overflow-y-auto">
                            {filtered.length === 0 && (
                                <div className="px-3 py-3 text-sm text-slate-400 text-center italic">No options found</div>
                            )}
                            {filtered.map((opt, i) => {
                                const lbl = typeof opt === 'string' ? opt : opt[displayField];
                                const val = typeof opt === 'string' ? opt : opt[valueField];
                                return (
                                    <div
                                        key={`${val}-${i}`}
                                        onClick={() => handleSelect(opt)}
                                        className={`px-3 py-2 text-sm cursor-pointer transition-colors
                      ${value === val
                                                ? 'bg-[#0097A7]/10 text-[#0097A7] font-semibold'
                                                : 'text-slate-700 hover:bg-slate-50'}`}
                                    >
                                        {lbl}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Add button */}
                        {onAdd && (
                            <>
                                <div className="border-t border-slate-100" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); setSearch(''); onAdd(); }}
                                    className="w-full px-3 py-2.5 text-sm font-bold text-white bg-[#0097A7] hover:bg-[#00838F] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" /> ADD NEW
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default DropdownWithCreate;
