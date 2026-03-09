import React from 'react';
import ActionBar from '../../components/ActionBar';
import { useMasterForm } from '../../hooks/useMasterForm';

const inputCls = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 hover:border-slate-300 transition-all duration-200';
const selectCls = inputCls;
const labelCls = 'text-sm font-semibold text-slate-700 text-right flex items-center justify-end gap-1 whitespace-nowrap min-w-[140px]';
const reqStar = <span className="text-red-500">*</span>;

const F = ({ label, required, type = 'text', name, value, onChange, placeholder }) => (
    <div className="grid grid-cols-[150px_1fr] items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <input type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className={inputCls} />
    </div>
);

const Sel = ({ label, required, name, value, onChange, options = [] }) => (
    <div className="grid grid-cols-[150px_1fr] items-center gap-3">
        <label className={labelCls}>{required && reqStar} {label} :</label>
        <select name={name} value={value || ''} onChange={onChange} className={selectCls}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

const initialData = [
    { id: 1, sno: '1', code: '2', name: 'SURESH KUMAR', address: '676', contact: '', adhar: '', joinDate: '2024-06-17', relievingDate: '', dept: 'ACCOUNTS', desig: 'STAFF', team: '', email: '', contract: 'Venkatesh', isActive: true, isReleved: false },
    { id: 2, sno: '2', code: '5', name: 'SAKTHIVEL TAPPING', address: '', contact: '', adhar: '', joinDate: '2025-06-01', relievingDate: '', dept: 'CONVENTIONAL', desig: 'OPERATORS', team: '', email: '', contract: '0', isActive: true, isReleved: false },
    { id: 3, sno: '3', code: '8', name: 'RAM KUMAR', address: '', contact: '', adhar: '', joinDate: '', relievingDate: '', dept: 'ASSEMBLY', desig: '', team: '', email: '', contract: '', isActive: false, isReleved: true },
    { id: 4, sno: '4', code: '10', name: 'JOSEPH-TURNER', address: '', contact: '', adhar: '', joinDate: '', relievingDate: '', dept: 'CNC-CONVEN...', desig: '', team: '', email: '', contract: '', isActive: true, isReleved: false },
    { id: 5, sno: '5', code: '11', name: 'T.KAVIN', address: '', contact: '', adhar: '', joinDate: '', relievingDate: '', dept: 'CNC - CONV...', desig: '', team: '', email: '', contract: '', isActive: true, isReleved: false },
];

const Employee_master = () => {
    const { formData, tableData, selectedId, handleChange, handleRowClick, handleClear, handleSave, handleDelete } = useMasterForm({
        code: '',
        name: '',
        address: '',
        contact: '',
        adhar: '',
        joinDate: '',
        relievingDate: '',
        dept: '',
        desig: '',
        contract: '',
        email: '',
        company: '',
        isActive: true,
        isReleved: false
    }, initialData);

    const onSaveWrapper = () => {
        if (!formData.code || !formData.name || !formData.dept || !formData.desig) {
            return alert('Please fill in all required fields (Code, Name, Department, Designation)');
        }
        
        // Auto assign sno logic
        if (!selectedId) {
            formData.sno = String(tableData.length + 1);
        }
        
        handleSave();
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">EMPLOYEE MASTER</h1>

            <div className="w-full flex-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-[#0097A7] w-full py-4 flex justify-between items-center pr-8">
                        <h2 className="text-xl font-black text-white pl-8 tracking-wide">Employee Details</h2>
                    </div>

                    <div className="px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">
                            {/* Left Column */}
                            <div className="space-y-5">
                                <F label="Employee Code" required name="code" value={formData.code} onChange={handleChange} />
                                <F label="Employee Name" required name="name" value={formData.name} onChange={handleChange} />
                                <F label="Address" name="address" value={formData.address} onChange={handleChange} />
                                <F label="Contact No" name="contact" value={formData.contact} onChange={handleChange} />
                                <F label="Aadhar No" name="adhar" value={formData.adhar} onChange={handleChange} />
                                <F label="Join Date" type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} />
                                <F label="Releving Date" type="date" name="relievingDate" value={formData.relievingDate} onChange={handleChange} />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-5">
                                <Sel label="Department" required name="dept" value={formData.dept} onChange={handleChange} options={[
                                    { label: 'Select Department', value: '' }, 
                                    { label: 'ACCOUNTS', value: 'ACCOUNTS' },
                                    { label: 'CONVENTIONAL', value: 'CONVENTIONAL' },
                                    { label: 'ASSEMBLY', value: 'ASSEMBLY' },
                                    { label: 'CNC', value: 'CNC' }
                                ]} />
                                <Sel label="Designation" required name="desig" value={formData.desig} onChange={handleChange} options={[
                                    { label: 'Select Designation', value: '' }, 
                                    { label: 'STAFF', value: 'STAFF' },
                                    { label: 'OPERATORS', value: 'OPERATORS' },
                                    { label: 'MANAGER', value: 'MANAGER' }
                                ]} />
                                <Sel label="Contract Person" name="contract" value={formData.contract} onChange={handleChange} options={[
                                    { label: 'Select', value: '' },
                                    { label: 'suresh', value: 'suresh' },
                                    { label: 'Venkatesh', value: 'Venkatesh' }
                                ]} />
                                <F label="Email-ID" name="email" value={formData.email} onChange={handleChange} />
                                <Sel label="Company Name" required name="company" value={formData.company} onChange={handleChange} options={[
                                    { label: 'Select Company', value: '' },
                                    { label: 'VELSON PVT LTD', value: 'VELSON PVT LTD' }
                                ]} />
                                
                                <div className="grid grid-cols-[150px_1fr] items-center gap-3 pt-4">
                                    <label className={labelCls}>Total Employee Count :</label>
                                    <span className="text-sm font-bold text-slate-800">{tableData.length}</span>
                                </div>
                                <div className="grid grid-cols-[150px_1fr] items-center gap-3">
                                    <label className={labelCls}>Active Employee Count :</label>
                                    <span className="text-sm font-bold text-slate-800">{tableData.filter(d => d.isActive).length}</span>
                                </div>
                                <div className="grid grid-cols-[150px_1fr] items-center gap-3">
                                    <label className={labelCls}>Releved Employee Count :</label>
                                    <span className="text-sm font-bold text-slate-800">{tableData.filter(d => d.isReleved).length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Status Toggle next to search bar in ActionBar */}
                    <ActionBar onSave={onSaveWrapper} onClear={handleClear} onDelete={handleDelete} showSave showEdit showDelete showClear>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                                <input type="checkbox" name="isActive" checked={formData.isActive || false} onChange={handleChange} className="w-4 h-4 text-[#0097A7] rounded border-slate-300 focus:ring-[#0097A7]" />
                                Active
                            </label>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                                <input type="checkbox" name="isReleved" checked={formData.isReleved || false} onChange={handleChange} className="w-4 h-4 text-[#0097A7] rounded border-slate-300 focus:ring-[#0097A7]" />
                                Releved
                            </label>
                        </div>
                    </ActionBar>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#0097A7] text-white">
                                    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap w-10"></th>
                                    {['S.No', 'Code', 'Employee Name', 'Address', 'Contact No', 'Adhar No', 'Join Date', 'Releving Date', 'Department', 'Designation', 'Team', 'Email ID', 'Contract Name'].map(h => (
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
                                        <td className="px-4 py-2.5 font-medium">{row.sno}</td>
                                        <td className={`px-4 py-2.5 font-medium ${selectedId === row.id ? 'text-[#0097A7]' : ''}`}>{row.code}</td>
                                        <td className="px-4 py-2.5">{row.name}</td>
                                        <td className="px-4 py-2.5">{row.address}</td>
                                        <td className="px-4 py-2.5">{row.contact}</td>
                                        <td className="px-4 py-2.5">{row.adhar}</td>
                                        <td className="px-4 py-2.5">{row.joinDate}</td>
                                        <td className="px-4 py-2.5">{row.relievingDate}</td>
                                        <td className="px-4 py-2.5">{row.dept}</td>
                                        <td className="px-4 py-2.5">{row.desig}</td>
                                        <td className="px-4 py-2.5">{row.team}</td>
                                        <td className="px-4 py-2.5">{row.email}</td>
                                        <td className="px-4 py-2.5">{row.contract}</td>
                                    </tr>
                                ))}
                                {tableData.length === 0 && (
                                    <tr className="border-b border-slate-100 text-slate-500 italic">
                                        <td colSpan={14} className="px-4 py-6 text-center text-sm">No records found</td>
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

export default Employee_master;
