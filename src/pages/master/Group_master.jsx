import React from 'react';
import ActionBar from '../../components/ActionBar';
import { useMasterForm } from '../../hooks/useMasterForm';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap min-w-[140px]';
const reqStar = <span className="text-red-500">*</span>;

const F = ({ label, required, type = 'text', name, value, onChange, children }) => (
    <div className="flex items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        {children || <input type={type} name={name} value={value || ''} onChange={onChange} className={inputCls} />}
    </div>
);

const Sel = ({ label, required, name, value, onChange, options = [] }) => (
    <div className="flex items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <select name={name} value={value || ''} onChange={onChange} className={selectCls}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

const initialData = [
    { id: 1, group: 'ACCOUNTS', sub: '', main: 'ACCOUNTS', created: '', createdBy: '', printingOrder: '', groupTotal: '' },
    { id: 2, group: 'AGENT ACCOUNT', sub: 'INDIRECT EXPENSES', main: 'ACCOUNTS', created: '', createdBy: '', printingOrder: '', groupTotal: '' },
    { id: 3, group: 'ASSETS', sub: 'ACCOUNTS', main: 'ASSETS', created: '', createdBy: '', printingOrder: '', groupTotal: '' },
    { id: 4, group: 'BANK ACCOUNTS', sub: 'CURRENT ASSETS', main: 'CURRENT ASSETS', created: '', createdBy: '', printingOrder: '', groupTotal: '' },
    { id: 5, group: 'BANK OCC A/C', sub: 'LOANS (LIABILITY)', main: 'BANK OCC A/C', created: '', createdBy: '', printingOrder: '', groupTotal: '' },
];

const Group_master = () => {
    const { formData, tableData, selectedId, handleChange, handleRowClick, handleClear, handleSave, handleDelete } = useMasterForm({
        group: '',
        sub: '',
        printingOrder: '',
        groupTotal: ''
    }, initialData);

    // Provide default main group calculation before save
    const onSaveWrapper = () => {
        if (!formData.group) return alert('Group name is required');
        const saveData = { ...formData, main: formData.sub || formData.group };
        // We inject main directly into formData state before calling useMasterForm's save if we needed, 
        // but let's just use the hook and override main locally by mutating formData before calling handleSave
        formData.main = formData.sub || formData.group; 
        handleSave();
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">GROUP MASTER</h1>

            <div className="w-full flex-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-[#0097A7] w-full py-4 flex justify-between items-center pr-8">
                        <h2 className="text-xl font-black text-white pl-8 tracking-wide">Group Master</h2>
                    </div>

                    <div className="px-8 py-8">
                        <div className="space-y-5 max-w-5xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                                <F label="Group" required name="group" value={formData.group} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 items-center">
                                <Sel label="Under Group Of" required name="sub" value={formData.sub} onChange={handleChange} options={[
                                    { label: 'Select Group', value: '' },
                                    { label: 'ACCOUNTS', value: 'ACCOUNTS' },
                                    { label: 'ASSETS', value: 'ASSETS' },
                                    { label: 'INDIRECT EXPENSES', value: 'INDIRECT EXPENSES' },
                                    { label: 'CURRENT ASSETS', value: 'CURRENT ASSETS' }
                                ]} />
                                <div className="flex items-center gap-6 mt-5 lg:mt-0">
                                    <div className="flex items-center gap-3 flex-1">
                                        <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Printing Order :</label>
                                        <input type="text" name="printingOrder" value={formData.printingOrder || ''} onChange={handleChange} className={inputCls} />
                                    </div>
                                    <div className="flex items-center gap-3 flex-1">
                                        <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Group Total :</label>
                                        <select name="groupTotal" value={formData.groupTotal || ''} onChange={handleChange} className={selectCls}>
                                            <option value=""></option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ActionBar 
                        onSave={onSaveWrapper} 
                        onClear={handleClear} 
                        onDelete={handleDelete} 
                        showRefresh showSave showEdit showDelete showClear 
                    />
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#0097A7] text-white">
                                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap w-10"></th>
                                    {['Group Name', 'Sub Group', 'Main Grop', 'Created Date', 'Created by'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr 
                                        key={row.id} 
                                        onClick={() => handleRowClick(row)}
                                        className={`border-b border-slate-100 hover:bg-[#0097A7]/5 transition-colors cursor-pointer ${selectedId === row.id ? 'bg-[#0097A7]/10' : ''}`}
                                    >
                                        <td className="px-4 py-2.5 text-center">
                                            {selectedId === row.id && <span className="text-blue-600 text-lg leading-none">▶</span>}
                                        </td>
                                        <td className={`px-4 py-2.5 font-medium ${selectedId === row.id ? 'text-[#0097A7]' : ''}`}>{row.group}</td>
                                        <td className="px-4 py-2.5">{row.sub}</td>
                                        <td className={`px-4 py-2.5 font-medium ${selectedId === row.id ? 'text-[#0097A7]' : ''}`}>{row.main}</td>
                                        <td className="px-4 py-2.5">{row.created}</td>
                                        <td className="px-4 py-2.5">{row.createdBy}</td>
                                    </tr>
                                ))}
                                {tableData.length === 0 && (
                                    <tr className="border-b border-slate-100 text-slate-500 italic">
                                        <td colSpan={6} className="px-4 py-6 text-center text-sm">No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Group_master;
