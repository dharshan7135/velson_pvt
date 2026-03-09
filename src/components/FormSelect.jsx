import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDown, IoAdd, IoEye } from 'react-icons/io5';

const FormSelect = ({ label, id, options = [], required, onAdd, onView, defaultValue, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || '');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || '';

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <div className="grid grid-cols-[140px_1fr] items-center gap-3 group" ref={dropdownRef}>
            <label htmlFor={id} className="text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 text-right">
                {required && <span className="text-red-500">*</span>}
                {label} :
            </label>
            <div className="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    id={id}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-left transition-all duration-200 outline-none
                        focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 flex items-center justify-between"
                >
                    <span className={selectedLabel ? 'text-slate-900' : 'text-slate-400'}>
                        {selectedLabel || `Select ${label}`}
                    </span>
                    <IoChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Panel */}
                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
                        {/* Options List */}
                        <div className="max-h-44 overflow-y-auto">
                            {options.length === 0 && (
                                <div className="px-3 py-3 text-sm text-slate-400 text-center italic">No options available</div>
                            )}
                            {options.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => handleSelect(opt.value)}
                                    className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-100
                                        ${selectedValue === opt.value
                                            ? 'bg-[#0097A7]/10 text-[#0097A7] font-semibold'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {opt.label}
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Add & View Buttons */}
                        <div className="flex">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    onAdd && onAdd(label);
                                }}
                                className="flex-1 px-3 py-2.5 text-sm font-bold text-white bg-[#0097A7] hover:bg-[#00838F] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <IoAdd className="w-4 h-4" />
                                ADD
                            </button>
                            <div className="w-px bg-white/30"></div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    onView && onView(label);
                                }}
                                className="flex-1 px-3 py-2.5 text-sm font-bold text-[#0097A7] bg-[#0097A7]/10 hover:bg-[#0097A7]/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <IoEye className="w-4 h-4" />
                                VIEW
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormSelect;
