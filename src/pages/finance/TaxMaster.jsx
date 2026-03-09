import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import { Receipt } from 'lucide-react';

const columns = [
    { key: 'taxLedgerAc', label: 'Tax Ledger A/C' },
    { key: 'taxPercent', label: 'Tax %' },
    { key: 'cgstPercent', label: 'CGST %' },
    { key: 'sgstPercent', label: 'SGST %' },
    { key: 'igstPercent', label: 'IGST %' },
    { key: 'hsnCode', label: 'HSN Code' },
];

const emptyForm = {
    taxLedgerAc: '', taxPercent: '', cgstPercent: '', sgstPercent: '', igstPercent: '',
    purchaseCGST: '', purchaseSGST: '', purchaseIGST: '',
    salesCGST: '', salesSGST: '', salesIGST: '', hsnCode: '',
};

const TaxMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

    const validate = () => {
        const e = {};
        if (!form.taxLedgerAc.trim()) e.taxLedgerAc = 'Required';
        const pctFields = ['taxPercent', 'cgstPercent', 'sgstPercent', 'igstPercent'];
        pctFields.forEach(f => {
            if (form[f] !== '' && (Number(form[f]) < 0 || Number(form[f]) > 100)) e[f] = '0-100';
        });
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('taxes', editId, form);
        else addRecord('taxes', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Tax Master" description="Configure tax slabs and GST mappings" icon={Receipt} />
            <DataTable columns={columns} data={state.taxes} onAdd={openAdd} addLabel="Add Tax" onEdit={openEdit} onDelete={(r) => deleteRecord('taxes', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Tax' : 'Add Tax'} size="lg">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <FormField label="Tax Ledger A/C" id="taxLedgerAc" required value={form.taxLedgerAc} onChange={(e) => set('taxLedgerAc', e.target.value)} error={errors.taxLedgerAc} />
                        <FormField label="Tax %" id="taxPercent" type="number" value={form.taxPercent} onChange={(e) => set('taxPercent', e.target.value)} error={errors.taxPercent} />
                        <FormField label="CGST Tax %" id="cgstPercent" type="number" value={form.cgstPercent} onChange={(e) => set('cgstPercent', e.target.value)} error={errors.cgstPercent} />
                        <FormField label="SGST Tax %" id="sgstPercent" type="number" value={form.sgstPercent} onChange={(e) => set('sgstPercent', e.target.value)} error={errors.sgstPercent} />
                        <FormField label="IGST Tax %" id="igstPercent" type="number" value={form.igstPercent} onChange={(e) => set('igstPercent', e.target.value)} error={errors.igstPercent} />
                        <FormField label="Purchase CGST" id="purchaseCGST" value={form.purchaseCGST} onChange={(e) => set('purchaseCGST', e.target.value)} />
                        <FormField label="Purchase SGST" id="purchaseSGST" value={form.purchaseSGST} onChange={(e) => set('purchaseSGST', e.target.value)} />
                        <FormField label="Purchase IGST" id="purchaseIGST" value={form.purchaseIGST} onChange={(e) => set('purchaseIGST', e.target.value)} />
                        <FormField label="Sales CGST" id="salesCGST" value={form.salesCGST} onChange={(e) => set('salesCGST', e.target.value)} />
                        <FormField label="Sales SGST" id="salesSGST" value={form.salesSGST} onChange={(e) => set('salesSGST', e.target.value)} />
                        <FormField label="Sales IGST" id="salesIGST" value={form.salesIGST} onChange={(e) => set('salesIGST', e.target.value)} />
                        <FormField label="HSN Code" id="hsnCode" value={form.hsnCode} onChange={(e) => set('hsnCode', e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default TaxMaster;
