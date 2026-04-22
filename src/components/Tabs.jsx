import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-slate-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative px-5 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.key
              ? 'text-[#0097A7]'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0097A7] rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
