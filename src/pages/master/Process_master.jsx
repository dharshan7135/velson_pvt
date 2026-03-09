import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap min-w-[130px]';
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

const Process_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">PROCESS MASTER</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4 flex justify-between items-center pr-8">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Process Master</h2>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm transition-colors uppercase tracking-wider">
                            <span className="text-lg">✖</span> Delete All
                        </button>
                    </div>
                </div>

                <div className="px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-x-12 gap-y-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <F label="Part Name" required />
                            <Sel label="Process Name" required options={[{ label: '', value: '' }]} />
                            <F label="Process Name1" />
                            <Sel label="Team" required options={[{ label: '', value: '' }]} />
                            <Sel label="Machine Code" options={[{ label: '', value: '' }]} />
                            <div className="flex items-center gap-3">
                                <label className={labelCls}>Process Order :</label>
                                <input type="text" className={`${inputCls} max-w-[150px]`} />
                            </div>
                            <Sel label="Machine Name" required options={[{ label: '', value: '' }]} />
                        </div>

                        {/* Middle Column */}
                        <div className="space-y-4">
                            <F label="Day's" defaultValue="0" />
                            <F label="Hours" defaultValue="0" />
                            <F label="Minutes" defaultValue="0" />
                            <F label="Setting Time" defaultValue="0" />
                            <F label="Cycle Time" defaultValue="0" />
                            <F label="Handling Time" defaultValue="0" />
                            <div className="flex items-center gap-3">
                                <label className={labelCls}>Idle Time :</label>
                                <div className="flex items-center gap-3 flex-1">
                                    <input type="text" className={`${inputCls} max-w-[150px]`} defaultValue="0" />
                                    <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Idle Time in minutes</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="lg:pl-6 lg:border-l border-slate-200">
                            <div className="w-full aspect-square bg-slate-50/50 border border-slate-200 rounded-lg p-3 flex flex-col items-start justify-start">
                                <span className="text-xs font-semibold text-slate-700">Image</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ActionBar showSave showEdit showDelete showClear />
            </div>

            {/* Empty space/Data Table container matching screenshot */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
                 
            </div>
        </div>
    </div>
);

export default Process_master;
