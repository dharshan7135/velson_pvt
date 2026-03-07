import React from 'react';

const FormInput = ({ label, id, type = 'text', placeholder, required, icon: Icon, ...props }) => {
    return (
        <div className="grid grid-cols-[140px_1fr] items-center gap-3 group">
            <label htmlFor={id} className="text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 text-right">
                {required && <span className="text-red-500">*</span>}
                {label} :
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm transition-all duration-200 outline-none
            focus:border-main focus:ring-4 focus:ring-main/10 hover:border-slate-300
            ${Icon ? 'pl-10' : ''}
          `}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
};

export default FormInput;
