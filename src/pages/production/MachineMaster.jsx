import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Cog } from 'lucide-react';
import { countryList } from '../../store/mockData';

const columns = [
    { key: 'machineCode', label: 'Code' },
    { key: 'machineName', label: 'Machine' },
    { key: 'machineCategory', label: 'Category' },
    { key: 'model', label: 'Model' },
    { key: 'manufacture', label: 'Manufacturer' },
    { key: 'installationPlace', label: 'Location' },
];

const emptyForm = {
    machineCode: '', machineName: '', serialNo: '', machineCategory: '',
    workHoursPerDay: '', model: '', manufacture: '', country: '', currency: '',
    price: '', vendorName: '', installationPlace: '', remark: '', yearOfFG: '',
    dateOfPurchase: '', dateOfInstallation: '', warrantyExpDate: '', amcExpDate: '',
};

const MachineMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [addCatModal, setAddCatModal] = useState(false);
    const [newCat, setNewCat] = useState('');

    const catOptions = state.references.filter(r => r.referenceType === 'Machine Category').map(r => ({ label: r.description, value: r.description }));
    const currOptions = state.references.filter(r => r.referenceType === 'Currency').map(r => ({ label: r.description, value: r.description }));
    const vendorOptions = state.suppliers.map(s => ({ label: s.supplierName, value: s.supplierCode }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'machineCode') {
                const val = (v || '').trim();
                if (!val) e.machineCode = 'Machine Code is required';
                else if (!/^[A-Za-z0-9]+$/.test(val)) e.machineCode = 'Must contain only alphanumeric characters';
                else {
                    const isDup = state.machines.some(m => m.machineCode.toLowerCase() === val.toLowerCase() && m.id !== editId);
                    if (isDup) e.machineCode = 'Machine Code must be unique';
                    else delete e.machineCode;
                }
            }
            if (f === 'machineName') {
                const val = (v || '').trim();
                if (!val) e.machineName = 'Machine Name is required';
                else if (val.length < 3) e.machineName = 'Minimum 3 characters required';
                else if (!/^[A-Za-z0-9\s]+$/.test(val)) e.machineName = 'Only alphabets, numbers, and spaces allowed';
                else delete e.machineName;
            }
            if (['machineCategory', 'country', 'currency'].includes(f)) {
                if (!v) e[f] = `${f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
                else delete e[f];
            }
            if (f === 'serialNo') {
                const val = (v || '').trim();
                if (val) {
                    if (!/^[A-Za-z0-9]+$/.test(val)) e.serialNo = 'Must be alphanumeric';
                    else {
                        const isDup = state.machines.some(m => m.serialNo?.toLowerCase() === val.toLowerCase() && m.id !== editId);
                        if (isDup) e.serialNo = 'Serial Number must be unique';
                        else delete e.serialNo;
                    }
                } else delete e.serialNo;
            }
            if (f === 'workHoursPerDay') {
                if (v) {
                    const hrs = Number(v);
                    if (isNaN(hrs) || hrs < 1 || hrs > 24) e.workHoursPerDay = 'Must be between 1 and 24';
                    else delete e.workHoursPerDay;
                } else delete e.workHoursPerDay;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};

        // 1. Required Fields: Machine Code, Machine Name, and Machine Category
        if (!form.machineCode?.trim()) e.machineCode = 'Machine Code is required';
        else if (!/^[A-Za-z0-9]+$/.test(form.machineCode.trim())) e.machineCode = 'Must contain only alphanumeric characters';
        else {
            const isDuplicate = state.machines.some(m => m.machineCode.toLowerCase() === form.machineCode.trim().toLowerCase() && m.id !== editId);
            if (isDuplicate) e.machineCode = 'Machine Code must be unique';
        }

        if (!form.machineName?.trim()) e.machineName = 'Machine Name is required';
        else if (form.machineName.trim().length < 3) e.machineName = 'Minimum 3 characters required';
        else if (!/^[A-Za-z0-9\s]+$/.test(form.machineName.trim())) e.machineName = 'Only alphabets, numbers, and spaces allowed';

        if (!form.machineCategory) e.machineCategory = 'Machine Category is required';

        // 4. Serial Number (Unique if provided)
        if (form.serialNo?.trim()) {
            if (!/^[A-Za-z0-9]+$/.test(form.serialNo.trim())) e.serialNo = 'Must be alphanumeric';
            else {
                const isDuplicate = state.machines.some(m => m.serialNo?.toLowerCase() === form.serialNo.trim().toLowerCase() && m.id !== editId);
                if (isDuplicate) e.serialNo = 'Serial Number must be unique';
            }
        }

        // 6. WorkHoursPer Day (1 - 24)
        if (form.workHoursPerDay) {
            const hrs = Number(form.workHoursPerDay);
            if (isNaN(hrs) || hrs < 1 || hrs > 24) e.workHoursPerDay = 'Must be between 1 and 24';
        }

        // 7. Model (Alphanumeric and spaces)
        if (form.model?.trim() && !/^[A-Za-z0-9\s]+$/.test(form.model.trim())) {
            e.model = 'Only alphanumeric and spaces allowed';
        }

        // 8. Manufacture (Alphabetic and spaces)
        if (form.manufacture?.trim() && !/^[A-Za-z\s]+$/.test(form.manufacture.trim())) {
            e.manufacture = 'Only alphabets and spaces allowed';
        }

        // Country & Currency (Standard dropdowns - required attribute handled by UI props if needed, here we just ensure selection)
        if (!form.country) e.country = 'Country is required';
        if (!form.currency) e.currency = 'Currency is required';

        // 11. Price (Greater than zero)
        if (form.price !== '' && (isNaN(Number(form.price)) || Number(form.price) <= 0)) {
            e.price = 'Price must be greater than zero';
        }

        // 13. Installation Place (Alphabetic and numeric)
        if (form.installationPlace?.trim() && !/^[A-Za-z0-9\s]+$/.test(form.installationPlace.trim())) {
            e.installationPlace = 'Only alphabets and numbers allowed';
        }

        // 15. Year Of FG (4-digit)
        if (form.yearOfFG?.trim() && !/^\d{4}$/.test(form.yearOfFG.trim())) {
            e.yearOfFG = 'Must be a valid 4-digit year';
        }

        // 17. Date Logic Validation
        const dPurchase = form.dateOfPurchase ? new Date(form.dateOfPurchase) : null;
        const dInstall = form.dateOfInstallation ? new Date(form.dateOfInstallation) : null;
        const dWarranty = form.warrantyExpDate ? new Date(form.warrantyExpDate) : null;
        const dAmc = form.amcExpDate ? new Date(form.amcExpDate) : null;

        if (dInstall && dPurchase && dInstall < dPurchase) {
            e.dateOfInstallation = 'Installation date cannot be earlier than Purchase date';
        }

        if (dWarranty && dInstall && dWarranty <= dInstall) {
            e.warrantyExpDate = 'Warranty expiry must be later than Installation date';
        }

        if (dAmc && dWarranty && dAmc <= dWarranty) {
            e.amcExpDate = 'AMC expiry must be later than Warranty expiry';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('machines', editId, form);
        else addRecord('machines', form);
        close();
    };

    const saveCategory = () => {
        if (!newCat.trim()) return;
        addRecord('references', { referenceType: 'Machine Category', code: `MCAT${state.references.length + 1}`, description: newCat });
        set('machineCategory', newCat);
        setNewCat('');
        setAddCatModal(false);
    };

    return (
        <div className="p-6">
            <PageHeader title="Machine Master" description="Manage machines, installation details and maintenance schedules" icon={Cog} />
            <DataTable columns={columns} data={state.machines} onAdd={openAdd} addLabel="Add Machine" onEdit={openEdit} onDelete={(r) => deleteRecord('machines', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Machine' : 'Add Machine'} size="xl">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <FormField label="Machine Code" id="machineCode" required value={form.machineCode} onChange={(e) => set('machineCode', e.target.value)} error={errors.machineCode} />
                        <FormField label="Machine Name" id="machineName" required value={form.machineName} onChange={(e) => set('machineName', e.target.value)} error={errors.machineName} />
                        <FormField label="Serial No" id="serialNo" value={form.serialNo} onChange={(e) => set('serialNo', e.target.value)} error={errors.serialNo} />
                        <DropdownWithCreate label="Machine Category" id="machineCategory" required options={catOptions} value={form.machineCategory} onChange={(v) => set('machineCategory', v)} onAdd={() => setAddCatModal(true)} error={errors.machineCategory} />
                        <FormField label="WorkHoursPer Day" id="workHoursPerDay" type="number" value={form.workHoursPerDay} onChange={(e) => set('workHoursPerDay', e.target.value)} error={errors.workHoursPerDay} />
                        <FormField label="Model" id="model" value={form.model} onChange={(e) => set('model', e.target.value)} error={errors.model} />
                        <FormField label="Manufacture" id="manufacture" value={form.manufacture} onChange={(e) => set('manufacture', e.target.value)} error={errors.manufacture} />
                        <div className="form-field-group">
                            <label className="form-label">Country <span className="text-red-500 ml-0.5">*</span></label>
                            <select className={`form-input ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} value={form.country} onChange={(e) => set('country', e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.country && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle w-3 h-3"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>{errors.country}</p>}
                        </div>
                        <DropdownWithCreate label="Currency" id="currency" required options={currOptions} value={form.currency} onChange={(v) => set('currency', v)} error={errors.currency} />
                        <FormField label="Price" id="price" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} error={errors.price} />
                        <DropdownWithCreate label="Vendor Name" id="vendorName" options={vendorOptions} value={form.vendorName} onChange={(v) => set('vendorName', v)} error={errors.vendorName} />
                        <FormField label="Installation Place" id="installationPlace" value={form.installationPlace} onChange={(e) => set('installationPlace', e.target.value)} error={errors.installationPlace} />
                        <FormField label="Remark" id="remark" value={form.remark} onChange={(e) => set('remark', e.target.value)} />
                        <FormField label="Year Of FG" id="yearOfFG" value={form.yearOfFG} onChange={(e) => set('yearOfFG', e.target.value)} error={errors.yearOfFG} />
                        <FormField label="Date of Purchase" id="dateOfPurchase" type="date" value={form.dateOfPurchase} onChange={(e) => set('dateOfPurchase', e.target.value)} error={errors.dateOfPurchase} />
                        <FormField label="Date of Installation" id="dateOfInstallation" type="date" value={form.dateOfInstallation} onChange={(e) => set('dateOfInstallation', e.target.value)} error={errors.dateOfInstallation} />
                        <FormField label="Warranty ExpDate" id="warrantyExpDate" type="date" value={form.warrantyExpDate} onChange={(e) => set('warrantyExpDate', e.target.value)} error={errors.warrantyExpDate} />
                        <FormField label="AMC ExpDate" id="amcExpDate" type="date" value={form.amcExpDate} onChange={(e) => set('amcExpDate', e.target.value)} error={errors.amcExpDate} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            <FormModal isOpen={addCatModal} onClose={() => setAddCatModal(false)} title="Add Machine Category" size="sm">
                <div className="p-6 space-y-4">
                    <FormField label="Category Name" id="newCat" required value={newCat} onChange={(e) => setNewCat(e.target.value)} />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setAddCatModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={saveCategory} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">Save</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default MachineMaster;
