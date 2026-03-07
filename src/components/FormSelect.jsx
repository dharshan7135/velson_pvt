import React from 'react';

const FormSelect = ({ label, id, options = [], required, ...props }) => {
    return (
        <div className="grid grid-cols-[140px_1fr] items-center gap-3 group">
            <label htmlFor={id} className="text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 text-right">
                {required && <span className="text-red-500">*</span>}
                {label} :
            </label>
            <select
                id={id}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm appearance-none transition-all duration-200 outline-none
          focus:border-main focus:ring-4 focus:ring-main/10 hover:border-slate-300
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]
          bg-[length:20px_20px] bg-[right_0.5rem_center] bg-no-repeat
        "
                {...props}
            >
                <option value="" disabled selected>Select {label}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
