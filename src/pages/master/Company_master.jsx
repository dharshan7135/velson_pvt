import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap';
const reqStar = <span className="text-red-500">*</span>;

const Field = ({ label, required, children, colSpan }) => (
    <div className={`grid grid-cols-[160px_1fr] items-center gap-3 ${colSpan || ''}`}>
        <label className={labelCls}>{required && reqStar} {label} :</label>
        {children || <input type="text" className={inputCls} />}
    </div>
);

const Company_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">COMPANY MASTER</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Company Information</h2>
                </div>

                <div className="px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                        {/* Left Column */}
                        <Field label="Company Code" required />
                        <div className="grid grid-cols-[160px_1fr_60px_1fr] items-center gap-3">
                            <label className={labelCls}>State :</label>
                            <input type="text" className={inputCls} />
                            <label className={labelCls}>Code :</label>
                            <input type="text" className={`${inputCls} max-w-[100px]`} />
                        </div>
                        <Field label="Full Name" required />
                        <Field label="Phone (Off)" />
                        <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                            <label className={`${labelCls} mt-2`}>Address :</label>
                            <textarea className={`${inputCls} resize-none`} rows="3" placeholder="Enter address" />
                        </div>
                        <div className="space-y-5">
                            <Field label="Phone (Res)" />
                            <Field label="Sub Head" />
                            <Field label="Subject To" />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 my-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                        <Field label="Bank Name" />
                        <Field label="Account Name" />
                        <Field label="Email ID" />
                        <Field label="Account No" />
                        <div className="grid grid-cols-[160px_1fr_10px_1fr] items-center gap-3">
                            <label className={labelCls}>GSTIN :</label>
                            <input type="text" className={inputCls} />
                            <span></span>
                            <input type="text" className={inputCls} />
                        </div>
                        <Field label="IFSC Code" />
                        <Field label="Pan No" />
                        <Field label="Branch" />
                    </div>

                    <div className="border-t border-slate-100 my-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                        <Field label="Sales Phone No" />
                        <Field label="Quotation Phone No" />
                        <Field label="Sales Email ID" />
                        <Field label="Quotation Email ID" />
                        <Field label="Sales Website" />
                        <Field label="Quotation Website" />
                        <Field label="Purchase Phoneno" />
                        <Field label="Purchase Email ID" />
                    </div>

                    <div className="border-t border-slate-100 my-6" />

                    {/* Image Upload */}
                    <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                        <label className={`${labelCls} mt-2`}>Logo :</label>
                        <div className="flex items-center gap-4">
                            <div className="w-28 h-28 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-[#0097A7] transition-colors cursor-pointer">
                                <span className="text-2xl">📂</span>
                                <span className="text-[10px] font-medium text-slate-500">Browse</span>
                            </div>
                            <button className="px-4 py-2 text-xs font-bold border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <ActionBar showSave showEdit showDelete showClear />
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#0097A7] text-white">
                                {['Code', 'Name', 'Address1', 'Address2', 'Address3', 'Email_ID', 'GST_No', 'State_Code'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 text-slate-500 italic">
                                <td colSpan={8} className="px-4 py-6 text-center text-sm">No records found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Company_master;
