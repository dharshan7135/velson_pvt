import React from 'react';

const PageHeader = ({ title, description, icon: Icon, children }) => {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="p-2.5 bg-[#0097A7]/10 rounded-xl">
                        <Icon className="w-6 h-6 text-[#0097A7]" />
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                    {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
                </div>
            </div>
            {children && <div className="flex items-center gap-3">{children}</div>}
        </div>
    );
};

export default PageHeader;
