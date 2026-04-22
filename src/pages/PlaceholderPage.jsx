import React from 'react';
import PageHeader from '../components/PageHeader';

const PlaceholderPage = ({ icon, title, description }) => (
  <div>
    <PageHeader icon={icon} title={title} description={description} />
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center animate-scale-in">
      <div className="w-16 h-16 rounded-2xl bg-[#0097A7]/10 flex items-center justify-center mx-auto mb-4">
        {icon && React.createElement(icon, { size: 28, className: 'text-[#0097A7]' })}
      </div>
      <h2 className="text-lg font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{description || 'This page will be implemented with full CRUD functionality.'}</p>
      <div className="mt-6 flex justify-center gap-3">
        <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] text-xs font-bold rounded-full">Coming Soon</span>
      </div>
    </div>
  </div>
);

export default PlaceholderPage;
