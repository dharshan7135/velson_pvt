import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap';
const reqStar = <span className="text-red-500">*</span>;

const F = ({ label, required, type = 'text', defaultValue, children }) => (
    <div className="grid grid-cols-[150px_1fr] items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        {children || <input type={type} defaultValue={defaultValue} className={inputCls} />}
    </div>
);

const sampleData = [
    { code: 'SM004', name: 'DMG Asia Pvt Ltd', address: 'chennai', city: '', state: '', country: '', pin: '', phone1: '0', phone2: '0', email: '', website: '', bank: '', account: '', gst: '' },
    { code: 'SM005', name: 'BFS Industries', address: 'Chennai', city: '', state: '', country: '', pin: '', phone1: '0', phone2: '0', email: '', website: '', bank: '', account: '', gst: '' },
];

const Supplier_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">SUPPLIER DETAILS</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Supplier Information</h2>
                </div>

                <div className="px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">
                        {/* Left Column */}
                        <div className="space-y-5">
                            <F label="Supplier Code" />
                            <F label="Supplier Name" required />
                            <F label="Address" required />
                            <F label="City" />
                            <F label="State" />
                            <F label="State Code" />
                            <F label="Country" />
                            <F label="Pincode" />
                            <F label="Phone1" required />
                            <F label="Phone2" />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <F label="Grade" />
                            <F label="Email-ID" />
                            <F label="Website" />
                            <F label="GSTNo" />
                            <div className="grid grid-cols-[150px_1fr] items-start gap-3">
                                <label className={`${labelCls} mt-2`}>Part Details :</label>
                                <textarea className={`${inputCls} resize-none h-32`} placeholder=""></textarea>
                            </div>
                            <F label="Bank Name" />
                            <F label="Part No1" />
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
                                {['Code', 'SupplierName', 'Address', 'City', 'State', 'Country', 'Pincode', 'Phone1', 'Phone2', 'EMail', 'Website', 'BankName', 'AccountDetails', 'GSTNo'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData.map((row, i) => (
                                <tr key={row.code} className={`border-b border-slate-100 hover:bg-[#0097A7]/5 transition-colors cursor-pointer ${i === 0 ? 'bg-[#0097A7]/10' : ''}`}>
                                    <td className="px-4 py-2.5 font-medium text-[#0097A7]">{row.code}</td>
                                    <td className="px-4 py-2.5">{row.name}</td>
                                    <td className="px-4 py-2.5">{row.address}</td>
                                    <td className="px-4 py-2.5">{row.city}</td>
                                    <td className="px-4 py-2.5">{row.state}</td>
                                    <td className="px-4 py-2.5">{row.country}</td>
                                    <td className="px-4 py-2.5">{row.pin}</td>
                                    <td className="px-4 py-2.5">{row.phone1}</td>
                                    <td className="px-4 py-2.5">{row.phone2}</td>
                                    <td className="px-4 py-2.5">{row.email}</td>
                                    <td className="px-4 py-2.5">{row.website}</td>
                                    <td className="px-4 py-2.5">{row.bank}</td>
                                    <td className="px-4 py-2.5">{row.account}</td>
                                    <td className="px-4 py-2.5">{row.gst}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Supplier_master;
