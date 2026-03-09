import React from 'react';

const FormContainer = ({ title, icon: Icon, children, actions }) => {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {title && (
                <div className="bg-gradient-to-r from-[#0097A7] to-[#00838F] px-6 py-4 flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-white/80" />}
                    <h2 className="text-lg font-bold text-white tracking-wide">{title}</h2>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
            {actions && (
                <div className="px-6 pb-6 flex justify-end gap-3 border-t border-slate-50 pt-4">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default FormContainer;
