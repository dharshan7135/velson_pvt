import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap';
const reqStar = <span className="text-red-500">*</span>;

const TaxRow = ({ label, required }) => (
    <div className="grid grid-cols-[160px_1fr_1fr] items-center gap-4">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <div className="flex items-center gap-2">
            <input type="text" className={`${inputCls} w-24`} placeholder="0" />
            <select className={`${selectCls} flex-1`}>
                <option value="">Select %</option>
                <option>0%</option><option>2.5%</option><option>6%</option><option>9%</option><option>14%</option>
            </select>
        </div>
        <select className={selectCls}>
            <option value="">Select %</option>
            <option>0%</option><option>2.5%</option><option>6%</option><option>9%</option><option>14%</option>
        </select>
    </div>
);

const Tax_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">TAX MASTER</h1>
        <div className="w-full flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Tax Details</h2>
                </div>
                <div className="px-8 py-8 space-y-5">
                    <div className="grid grid-cols-[160px_1fr] items-center gap-3">
                        <label className={labelCls}>{reqStar} Tax Ledger A/C :</label>
                        <select className={`${selectCls} max-w-md`}><option value="">Select Ledger</option></select>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] items-center gap-3">
                        <label className={labelCls}>{reqStar} Tax % :</label>
                        <input type="text" className={`${inputCls} max-w-[200px]`} placeholder="0" />
                    </div>
                    <div className="border-t border-slate-100 my-4" />
                    <div className="grid grid-cols-[160px_1fr_1fr] items-end gap-4">
                        <div />
                        <span className="text-sm font-bold text-[#0097A7] uppercase tracking-wider border-b-2 border-[#0097A7] pb-2 text-center">Purchase Tax</span>
                        <span className="text-sm font-bold text-[#0097A7] uppercase tracking-wider border-b-2 border-[#0097A7] pb-2 text-center">Sales Tax</span>
                    </div>
                    <TaxRow label="CGST Tax %" required />
                    <TaxRow label="SGST Tax %" required />
                    <TaxRow label="IGST Tax %" required />
                    <div className="border-t border-slate-100 my-4" />
                    <div className="grid grid-cols-[160px_1fr] items-center gap-3">
                        <label className={labelCls}>HSN Code :</label>
                        <input type="text" className={`${inputCls} max-w-[200px]`} placeholder="Enter HSN Code" />
                    </div>
                </div>
                <ActionBar showRefresh showSave showEdit />
            </div>
        </div>
    </div>
);

export default Tax_master;
