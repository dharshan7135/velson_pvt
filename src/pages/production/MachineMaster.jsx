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
    const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

    const validate = () => {
        const e = {};
        if (!form.machineCode.trim()) e.machineCode = 'Required';
        if (!form.machineName.trim()) e.machineName = 'Required';
        if (!form.machineCategory) e.machineCategory = 'Required';
        if (form.dateOfInstallation && form.dateOfPurchase && form.dateOfInstallation < form.dateOfPurchase) {
            e.dateOfInstallation = 'Must be after Purchase Date';
        }
        if (form.price && Number(form.price) < 0) e.price = 'Must be ≥ 0';
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
                        <FormField label="Serial No" id="serialNo" value={form.serialNo} onChange={(e) => set('serialNo', e.target.value)} />
                        <DropdownWithCreate label="Machine Category" id="machineCategory" required options={catOptions} value={form.machineCategory} onChange={(v) => set('machineCategory', v)} onAdd={() => setAddCatModal(true)} error={errors.machineCategory} />
                        <FormField label="WorkHoursPer Day" id="workHoursPerDay" type="number" value={form.workHoursPerDay} onChange={(e) => set('workHoursPerDay', e.target.value)} />
                        <FormField label="Model" id="model" value={form.model} onChange={(e) => set('model', e.target.value)} />
                        <FormField label="Manufacture" id="manufacture" value={form.manufacture} onChange={(e) => set('manufacture', e.target.value)} />
                        <div className="form-field-group">
                            <label className="form-label">Country</label>
                            <select className="form-input" value={form.country} onChange={(e) => set('country', e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <DropdownWithCreate label="Currency" id="currency" options={currOptions} value={form.currency} onChange={(v) => set('currency', v)} />
                        <FormField label="Price" id="price" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} error={errors.price} />
                        <DropdownWithCreate label="Vendor Name" id="vendorName" options={vendorOptions} value={form.vendorName} onChange={(v) => set('vendorName', v)} />
                        <FormField label="Installation Place" id="installationPlace" value={form.installationPlace} onChange={(e) => set('installationPlace', e.target.value)} />
                        <FormField label="Remark" id="remark" value={form.remark} onChange={(e) => set('remark', e.target.value)} />
                        <FormField label="Year Of FG" id="yearOfFG" value={form.yearOfFG} onChange={(e) => set('yearOfFG', e.target.value)} />
                        <FormField label="Date of Purchase" id="dateOfPurchase" type="date" value={form.dateOfPurchase} onChange={(e) => set('dateOfPurchase', e.target.value)} />
                        <FormField label="Date of Installation" id="dateOfInstallation" type="date" value={form.dateOfInstallation} onChange={(e) => set('dateOfInstallation', e.target.value)} error={errors.dateOfInstallation} />
                        <FormField label="Warranty ExpDate" id="warrantyExpDate" type="date" value={form.warrantyExpDate} onChange={(e) => set('warrantyExpDate', e.target.value)} />
                        <FormField label="AMC ExpDate" id="amcExpDate" type="date" value={form.amcExpDate} onChange={(e) => set('amcExpDate', e.target.value)} />
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
