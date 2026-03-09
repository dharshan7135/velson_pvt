import React from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="flex items-center gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`relative px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all cursor-pointer
            ${activeTab === tab.key
                            ? 'text-[#0097A7]'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        {tab.icon && <tab.icon className="w-4 h-4" />}
                        {tab.label}
                    </span>
                    {activeTab === tab.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0097A7] rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
