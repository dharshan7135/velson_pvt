import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import { Cog } from 'lucide-react';


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
            if (f === 'machineCategory') {
                if (!v) e[f] = 'Machine Category is required';
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

        // Country & Currency — optional text fields, no validation needed

        // 11. Price (Greater than zero)
        if (form.price !== '' && (isNaN(Number(form.price)) || Number(form.price) <= 0)) {
            e.price = 'Price must be greater than zero';
        }

        // 13. Installation Place (Alphabetic and numeric)
        if (form.installationPlace?.trim() && !/^[A-Za-z0-9\s]+$/.test(form.installationPlace.trim())) {
            e.installationPlace = 'Only alphabets and numbers allowed';
        }

        // 15. Year Of FG — date picker, no special validation needed

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
                        <FormField label="Country" id="country" value={form.country} onChange={(e) => set('country', e.target.value)} />
                        <FormField label="Currency" id="currency" value={form.currency} onChange={(e) => set('currency', e.target.value)} />
                        <FormField label="Price" id="price" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} error={errors.price} />
                        <DropdownWithCreate label="Vendor Name" id="vendorName" options={vendorOptions} value={form.vendorName} onChange={(v) => set('vendorName', v)} error={errors.vendorName} />
                        <FormField label="Installation Place" id="installationPlace" value={form.installationPlace} onChange={(e) => set('installationPlace', e.target.value)} error={errors.installationPlace} />
                        <FormField label="Remark" id="remark" value={form.remark} onChange={(e) => set('remark', e.target.value)} />
                        <FormField label="Year Of FG" id="yearOfFG" type="date" value={form.yearOfFG} onChange={(e) => set('yearOfFG', e.target.value)} />
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
