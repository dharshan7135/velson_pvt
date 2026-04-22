import React from 'react';

const PageHeader = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 bg-[#0097A7]/10 rounded-xl flex items-center justify-center">
            <Icon size={24} className="text-[#0097A7]" />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};

export default PageHeader;
