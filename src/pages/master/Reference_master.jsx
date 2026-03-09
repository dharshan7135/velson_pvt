import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap min-w-[140px]';
const reqStar = <span className="text-red-500">*</span>;

const F = ({ label, required, type = 'text', defaultValue, children }) => (
    <div className="flex items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        {children || <input type={type} defaultValue={defaultValue} className={inputCls} />}
    </div>
);

const Sel = ({ label, required, options = [], defaultValue }) => (
    <div className="flex items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <select className={selectCls} defaultValue={defaultValue}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

const Reference_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">REFERENCE MASTER</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4 flex justify-between items-center pr-8">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Reference Master</h2>
                </div>

                <div className="px-8 py-8">
                    <div className="space-y-5 max-w-xl">
                        <Sel label="Reference Type" required options={[{ label: '', value: '' }]} />
                        <F label="Code" required defaultValue="001" />
                        <F label="Description" required />
                    </div>
                </div>

                <ActionBar showSave showEdit showDelete showClear />
            </div>

            {/* Empty white space container matching screenshot */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
                 
            </div>
        </div>
    </div>
);

export default Reference_master;
