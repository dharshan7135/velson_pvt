import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Plus, AlertCircle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

const DropdownWithCreate = ({
    label, id, required, options = [], value, onChange, onAdd,
    error, placeholder, className = '', disabled,
    displayField = 'label', valueField = 'value',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');
    const [inlineError, setInlineError] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const ref = useRef(null);
    const inputRef = useRef(null);

    // Dynamic overlay for CRUD inside dropdown, persisting to AppContext (the global mocked DB)
    const { state, updateDropdown } = useAppContext();
    const localKey = useMemo(() => `dropdown_state_${label}_${id}`, [label, id]);

    const localChanges = state.dropdownState?.[localKey] || { added: [], removed: [], edits: {} };

    const updateLocalChanges = (updates) => {
        const next = { ...localChanges, ...updates };
        updateDropdown(localKey, next);
    };

    const finalOptions = useMemo(() => {
        const baseList = [];
        options.forEach(opt => {
            const val = typeof opt === 'string' ? opt : opt[valueField];
            if (!localChanges.removed.includes(val)) {
                if (localChanges.edits[val]) {
                    const nextVal = localChanges.edits[val];
                    // Check if the new value already exists in the original options or added list
                    const isDuplicate = options.some(o => (typeof o === 'string' ? o : o[valueField]) === nextVal) ||
                        localChanges.added.includes(nextVal);
                    if (!isDuplicate) {
                        baseList.push(typeof opt === 'string' ? nextVal : { ...opt, [valueField]: nextVal, [displayField]: nextVal });
                    }
                } else {
                    baseList.push(opt);
                }
            }
        });
        localChanges.added.forEach(addedVal => {
            // Ensure addedVal is not already in the baseList (from original options or edited)
            if (!baseList.some(o => (typeof o === 'string' ? o : o[valueField]) === addedVal)) {
                baseList.push({ [valueField]: addedVal, [displayField]: addedVal });
            }
        });
        return baseList;
    }, [options, localChanges, displayField, valueField]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
                setEditIndex(-1);
                setDeleteIndex(-1);
                setIsAdding(false);
                setInlineError('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = useMemo(() => {
        if (!search) return finalOptions;
        return finalOptions.filter((o) => {
            const lbl = typeof o === 'string' ? o : o[displayField];
            return lbl?.toLowerCase().includes(search.toLowerCase());
        });
    }, [finalOptions, search, displayField]);

    const selectedLabel = useMemo(() => {
        if (!value && value !== 0) return '';
        const opt = finalOptions.find((o) => {
            const val = typeof o === 'string' ? o : o[valueField];
            return val === value;
        });
        if (!opt) return value;
        return typeof opt === 'string' ? opt : opt[displayField];
    }, [value, finalOptions, displayField, valueField]);

    const handleSelect = (opt) => {
        if (editIndex !== -1 || isAdding || deleteIndex !== -1) return;
        const val = typeof opt === 'string' ? opt : opt[valueField];
        onChange?.(val);
        setIsOpen(false);
        setSearch('');
    };

    const duplicateCheck = (val, skipIndex = -1) => {
        return finalOptions.some((o, i) => {
            if (i === skipIndex) return false;
            const oVal = typeof o === 'string' ? o : o[displayField];
            return oVal.toLowerCase() === val.toLowerCase();
        });
    };

    const handleEditSave = (e, i, oldOpt) => {
        e.stopPropagation();
        const val = editValue.trim();
        if (!val) {
            setInlineError('Value cannot be empty');
            return;
        }
        if (duplicateCheck(val, i)) {
            setInlineError(`'${val}' already exists`);
            return;
        }
        setInlineError('');
        setEditIndex(-1);

        const oldVal = typeof oldOpt === 'string' ? oldOpt : oldOpt[valueField];

        const originalKey = Object.keys(localChanges.edits).find(key => localChanges.edits[key] === oldVal);
        const isAdded = localChanges.added.includes(oldVal);

        const newChanges = { ...localChanges };

        if (originalKey) {
            newChanges.edits = { ...newChanges.edits, [originalKey]: val };
        } else if (isAdded) {
            newChanges.added = newChanges.added.map(a => a === oldVal ? val : a);
        } else {
            newChanges.edits = { ...newChanges.edits, [oldVal]: val };
        }

        // Update local edits mapping
        updateLocalChanges(newChanges);

        // Trigger change if the currently selected item was edited
        if (value === oldVal) {
            onChange?.(val);
        }
    };

    const handleDelete = (e, opt) => {
        e.stopPropagation();

        const val = typeof opt === 'string' ? opt : opt[valueField];

        const originalKey = Object.keys(localChanges.edits).find(key => localChanges.edits[key] === val);
        const isAdded = localChanges.added.includes(val);

        const newChanges = { ...localChanges };

        if (originalKey) {
            const { [originalKey]: _, ...restEdits } = newChanges.edits;
            newChanges.edits = restEdits;
            newChanges.removed = [...newChanges.removed, originalKey];
        } else if (isAdded) {
            newChanges.added = newChanges.added.filter(a => a !== val);
        } else {
            newChanges.removed = [...newChanges.removed, val];
        }

        updateLocalChanges(newChanges);

        if (value === val) {
            onChange?.('');
        }
        setDeleteIndex(-1);
    };

    const handleAddSave = (e) => {
        e.stopPropagation();
        const val = editValue.trim();
        if (!val) {
            setInlineError('Value cannot be empty');
            return;
        }
        if (duplicateCheck(val)) {
            setInlineError(`'${val}' already exists`);
            return;
        }
        setInlineError('');
        setIsAdding(false);

        updateLocalChanges({
            added: [...localChanges.added, val]
        });
        onChange?.(val);
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
                        <div className="p-2 border-b border-slate-100 flex items-center justify-between gap-2">
                            <div className="relative flex-1">
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
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsAdding(true); setEditIndex(-1); setEditValue(''); setInlineError(''); }}
                                className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                title="Add Inline Option"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="max-h-56 overflow-y-auto">
                            {filtered.length === 0 && !isAdding && (
                                <div className="px-3 py-3 text-sm text-slate-400 text-center italic">No options found</div>
                            )}
                            {filtered.map((opt, i) => {
                                const lbl = typeof opt === 'string' ? opt : opt[displayField];
                                const val = typeof opt === 'string' ? opt : opt[valueField];
                                const isEditing = editIndex === i;
                                const isDeleting = deleteIndex === i;

                                return (
                                    <div
                                        key={`${val}-${i}`}
                                        onClick={() => handleSelect(opt)}
                                        className={`px-3 py-2 text-sm transition-colors flex items-center justify-between group
                                        ${value === val && !isEditing && !isDeleting ? 'bg-[#0097A7]/10 text-[#0097A7] font-semibold' : 'text-slate-700 hover:bg-slate-50'}
                                        ${(isEditing || isDeleting) ? 'bg-slate-50 cursor-default' : 'cursor-pointer'}`}
                                    >
                                        {isDeleting ? (
                                            <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden">
                                                <span className="text-xs text-red-600 font-medium truncate">Delete this option?</span>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <button onClick={(e) => handleDelete(e, opt)} type="button" className="px-2 py-0.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors shadow-sm font-semibold">Yes</button>
                                                    <button onClick={(e) => { e.stopPropagation(); setDeleteIndex(-1); }} type="button" className="px-2 py-0.5 text-xs bg-slate-200 text-slate-700 hover:bg-slate-300 rounded transition-colors shadow-sm font-semibold">No</button>
                                                </div>
                                            </div>
                                        ) : isEditing ? (
                                            <div className="flex-1 flex items-center gap-2 mr-2">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={editValue}
                                                    onChange={e => setEditValue(e.target.value)}
                                                    className="w-full px-2 py-1 text-xs border border-[#0097A7] rounded outline-none"
                                                />
                                                <button onClick={(e) => handleEditSave(e, i, opt)} type="button" className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 bg-emerald-50 hover:bg-emerald-100 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); setEditIndex(-1); setInlineError(''); }} type="button" className="text-slate-500 hover:text-slate-700 transition-colors p-1 bg-slate-100 hover:bg-slate-200 rounded">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="truncate">{lbl}</span>
                                        )}

                                        {!isEditing && !isDeleting && (
                                            <div className="hidden group-hover:flex items-center gap-1.5 ml-3 shrink-0">
                                                <button onClick={(e) => { e.stopPropagation(); setEditIndex(i); setEditValue(lbl); setDeleteIndex(-1); setInlineError(''); setIsAdding(false); }} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); setDeleteIndex(i); setEditIndex(-1); setIsAdding(false); setInlineError(''); }} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {isAdding && (
                                <div className="px-3 py-2 text-sm transition-colors flex items-center justify-between bg-slate-50 cursor-default">
                                    <div className="flex-1 flex items-center gap-2 mr-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editValue}
                                            onChange={e => setEditValue(e.target.value)}
                                            className="w-full px-2 py-1 text-xs border border-[#0097A7] rounded outline-none"
                                            placeholder="Enter new value..."
                                        />
                                        <button onClick={handleAddSave} type="button" className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 bg-emerald-50 hover:bg-emerald-100 rounded shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); setIsAdding(false); setInlineError(''); }} type="button" className="text-slate-500 hover:text-slate-700 transition-colors p-1 bg-slate-100 hover:bg-slate-200 rounded shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        {inlineError && (
                            <div className="px-3 py-1.5 text-xs text-red-500 bg-red-50 border-t border-red-100 flex items-center gap-1.5 break-words">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {inlineError}
                            </div>
                        )}

                        {/* Add button */}
                        {onAdd && (
                            <>
                                <div className="border-t border-slate-100" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false); setSearch(''); onAdd();
                                    }}
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
