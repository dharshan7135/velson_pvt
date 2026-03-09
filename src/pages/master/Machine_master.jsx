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
    { code: 'VMC1', name: 'VMC- BFW BT 40', serial: '', category: 'VMC', workHours: '0.00', model: '', manufacture: '', yearFg: '30/08/2024', country: '', price: '0', currency: '', purchaseDate: '30/08/2024' },
    { code: 'VMC2', name: 'VMC- SIEMENS(AMS)', serial: '', category: 'VMC', workHours: '0.00', model: '', manufacture: '', yearFg: '30/08/2024', country: '', price: '0', currency: '', purchaseDate: '30/08/2024' },
    { code: 'VMC3', name: 'VMC- SUPER MAX', serial: '', category: 'VMC', workHours: '0.00', model: '', manufacture: '', yearFg: '30/08/2024', country: '', price: '0', currency: '', purchaseDate: '30/08/2024' },
    { code: 'TC1', name: 'TURNING(TC)-SAND', serial: '', category: 'CNC-TURNING', workHours: '0.00', model: '', manufacture: '', yearFg: '30/08/2024', country: '', price: '0', currency: '', purchaseDate: '30/08/2024' },
    { code: 'TC2', name: 'TURNING(TC)-ACE', serial: '', category: 'CNC-TURNING', workHours: '0.00', model: '', manufacture: '', yearFg: '30/08/2024', country: '', price: '0', currency: '', purchaseDate: '30/08/2024' },
];

const Machine_master = () => (
    <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">MACHINE MASTER</h1>

        <div className="w-full flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#0097A7] w-full py-4">
                    <h2 className="text-xl font-black text-white pl-8 tracking-wide">Machine Details</h2>
                </div>

                <div className="px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                        {/* Left Column */}
                        <div className="space-y-5">
                            <F label="Machine Code" />
                            <F label="Machine Name" required />
                            <F label="Serial No" />
                            <Sel label="Machine Categroy" required options={[{ label: '', value: '' }, { label: 'VMC', value: 'VMC' }]} />
                            
                            <div className="grid grid-cols-[150px_1fr_60px_1fr] items-center gap-3">
                                <label className={labelCls}>WorkHoursPer Day :</label>
                                <input type="text" className={inputCls} defaultValue="0" />
                                <label className={labelCls}>Model :</label>
                                <input type="text" className={inputCls} />
                            </div>

                            <F label="Manufacture" />
                            <F label="Country" />
                            
                            <div className="grid grid-cols-[150px_1fr_60px_1fr] items-center gap-3">
                                <label className={labelCls}>Currency :</label>
                                <input type="text" className={inputCls} />
                                <label className={labelCls}>Price :</label>
                                <input type="text" className={inputCls} defaultValue="0" />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <Sel label="Vendor Name" options={[{ label: '', value: '' }]} />
                            <F label="Installation Place" />
                            <F label="Remark" />
                            <F label="Year_Of_FG" type="date" defaultValue="2026-03-05" />
                            <F label="Date of Purchase" type="date" defaultValue="2026-03-05" />
                            <F label="Date of Installation" type="date" defaultValue="2026-03-05" />
                            <F label="Waranty ExpDate" type="date" defaultValue="2026-03-05" />
                            <F label="AMC ExpDate" type="date" defaultValue="2026-03-05" />
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
                                {['MachineID', 'Name', 'SerialNo', 'Machinecategory', 'WorkHoursPerDay', 'Model', 'Manufacture', 'Year_Of_FG', 'Country', 'Price', 'Currency', 'Date_of_Purch'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData.map((row, i) => (
                                <tr key={row.code} className={`border-b border-slate-100 hover:bg-[#0097A7]/5 transition-colors cursor-pointer ${i === 0 ? 'bg-[#0097A7]/10' : ''}`}>
                                    <td className="px-4 py-2.5 font-medium text-[#0097A7]">{row.code}</td>
                                    <td className="px-4 py-2.5">{row.name}</td>
                                    <td className="px-4 py-2.5">{row.serial}</td>
                                    <td className="px-4 py-2.5">{row.category}</td>
                                    <td className="px-4 py-2.5">{row.workHours}</td>
                                    <td className="px-4 py-2.5">{row.model}</td>
                                    <td className="px-4 py-2.5">{row.manufacture}</td>
                                    <td className="px-4 py-2.5">{row.yearFg}</td>
                                    <td className="px-4 py-2.5">{row.country}</td>
                                    <td className="px-4 py-2.5">{row.price}</td>
                                    <td className="px-4 py-2.5">{row.currency}</td>
                                    <td className="px-4 py-2.5">{row.purchaseDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default Machine_master;
