import React from 'react';
import ActionBar from '../../components/ActionBar';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap';
const reqStar = <span className="text-red-500">*</span>;

const F = ({ label, required, type = 'text', defaultValue, children }) => (
    <div className="grid grid-cols-[150px_1fr] items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        {children || <input type={type} defaultValue={defaultValue} className={inputCls} />}
    </div>
);

const Sel = ({ label, required, options = [], defaultValue }) => (
    <div className="grid grid-cols-[150px_1fr] items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <select className={selectCls} defaultValue={defaultValue}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

const sampleData = [
    { code: 'LM2434', name: 'KSM DRILLING SERVICE', short: 'KSM DRILLING SERVICE', type: 'Cr', contact: '', email: '', cell: '', phone: '' },
    { code: 'LM2433', name: 'TIRUPATI ENTERPRISES', short: 'TIRUPATI ENTERPRISES', type: '', contact: 'Mr. Krishna Kumar', email: '', cell: '', phone: '' },
    { code: 'LM2432', name: 'SHRIKANT NIVRITTI MANEPATIL', short: 'SHRIKANT NIVRITTI MANEPATIL', type: 'Cr', contact: '', email: '', cell: '', phone: '' },
    { code: 'LM2431', name: 'GEO EXPLORATION AND MINING SOLUTIONS', short: 'GEO EXPLORATION AND MINING SOLUTIONS', type: '', contact: '', email: '', cell: '', phone: '' },
];

const Ledger_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">ACCOUNT CREATION</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Ledger Master</h2>
                </div>

                <div className="px-8 py-8 space-y-5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5">
                        <F label="A/C Code" />
                        <F label="L ID" />
                        <F label="Address" />
                        <F label="Due Days" required defaultValue="0" />
                        <F label="TDS %" defaultValue="0.00" />
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5">
                        <F label="A/C Name" required />
                        <div className="col-span-2" />
                        <F label="Credit Limit" required defaultValue="0.00" />
                        <F label="Disc %" defaultValue="0.00" />
                    </div>
                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5">
                        <F label="Short Name" required />
                        <div className="col-span-2" />
                        <F label="Hire Charges" defaultValue="0.00" />
                        <F label="KM" required defaultValue="0.00" />
                    </div>

                    <div className="border-t border-slate-100 my-2" />

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <Sel label="Ledger Type" options={[
                            { label: 'ACCOUNTS', value: 'accounts' },
                            { label: 'SUNDRY DEBTORS', value: 'debtors' },
                            { label: 'SUNDRY CREDITORS', value: 'creditors' },
                        ]} defaultValue="accounts" />
                        <div />
                        <F label="Account Name" />
                    </div>
                    {/* Row 5 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <Sel label="Group" required options={[
                            { label: 'Select Group', value: '' },
                            { label: 'CASH-IN-HAND', value: 'cash' },
                            { label: 'BANK ACCOUNTS', value: 'bank' },
                            { label: 'SUNDRY DEBTORS', value: 'debtors' },
                            { label: 'SUNDRY CREDITORS', value: 'creditors' },
                        ]} />
                        <div />
                        <F label="Bank A/C No" />
                    </div>
                    {/* Row 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5">
                        <F label="Opening Balance" defaultValue="0.00" />
                        <Sel label="A/C Type" options={[
                            { label: 'Cr', value: 'cr' },
                            { label: 'Dr', value: 'dr' },
                        ]} defaultValue="cr" />
                        <F label="Area" />
                        <F label="IFSC Code" />
                    </div>

                    <div className="border-t border-slate-100 my-2" />

                    {/* Row 7 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <Sel label="Tax Type" required options={[
                            { label: 'LOCAL', value: 'local' },
                            { label: 'CENTRAL', value: 'central' },
                            { label: 'OVERSEAS', value: 'overseas' },
                        ]} defaultValue="local" />
                        <Sel label="State Name" options={[
                            { label: 'Select State', value: '' },
                            { label: 'Maharashtra', value: 'MH' },
                            { label: 'Karnataka', value: 'KA' },
                            { label: 'Tamil Nadu', value: 'TN' },
                        ]} />
                        <F label="Branch" />
                    </div>
                    {/* Row 8 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <F label="GST No" />
                        <F label="State Code" />
                        <F label="Bank" />
                    </div>
                    {/* Row 9 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <F label="Pan No" />
                        <F label="Email ID" />
                        <F label="Status" required>
                            <span className="px-3 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg">Active</span>
                        </F>
                    </div>
                    {/* Row 10 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <F label="Aadhar No" />
                        <F label="Phone No" />
                        <Sel label="Ledger ID" options={[{ label: 'Select', value: '' }]} />
                    </div>
                    {/* Row 11 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
                        <F label="Contact Person" />
                        <F label="Cell No" />
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
                                {['Code', 'Account Name', 'Short_Name', 'Opening_Type', 'Contact Person', 'Email Id', 'Cell No', 'Phone Number'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData.map((row, i) => (
                                <tr key={row.code} className={`border-b border-slate-100 hover:bg-[#0097A7]/5 transition-colors cursor-pointer ${i === 0 ? 'bg-[#0097A7]/10' : ''}`}>
                                    <td className="px-4 py-2.5 font-medium text-[#0097A7]">{row.code}</td>
                                    <td className="px-4 py-2.5">{row.name}</td>
                                    <td className="px-4 py-2.5">{row.short}</td>
                                    <td className="px-4 py-2.5">{row.type}</td>
                                    <td className="px-4 py-2.5">{row.contact}</td>
                                    <td className="px-4 py-2.5">{row.email}</td>
                                    <td className="px-4 py-2.5">{row.cell}</td>
                                    <td className="px-4 py-2.5">{row.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Ledger_master;
