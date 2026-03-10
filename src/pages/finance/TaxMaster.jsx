import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import DropdownWithCreate from '../../components/DropdownWithCreate';
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

    const pctOptions = [0, 2.5, 5, 6, 9, 12, 14, 18, 28].map(v => ({ label: `${v}%`, value: v }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (f === 'taxLedgerAc') {
                const val = (v || '').trim();
                if (!val) e.taxLedgerAc = 'Tax Ledger A/C is required';
                else if (!/^[A-Za-z0-9\s%]+$/.test(val)) e.taxLedgerAc = 'Only alphanumeric characters, spaces, and % allowed';
                else {
                    const isDuplicate = state.taxes.some(t => t.taxLedgerAc.toLowerCase() === val.toLowerCase() && t.id !== editId);
                    if (isDuplicate) e.taxLedgerAc = 'Tax Ledger A/C must be unique';
                    else delete e.taxLedgerAc;
                }
            }
            if ([
                'taxPercent', 'cgstPercent', 'sgstPercent', 'igstPercent',
                'purchaseCGST', 'purchaseSGST', 'purchaseIGST',
                'salesCGST', 'salesSGST', 'salesIGST'
            ].includes(f)) {
                if (v === '' || v === null) {
                    e[f] = 'Required';
                } else {
                    const val = Number(v);
                    if (isNaN(val) || val < 0 || val > 100) e[f] = 'Must be between 0 and 100';
                    else delete e[f];
                }
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};

        // 1. Required & Unique Field: Tax Ledger A/C
        if (!form.taxLedgerAc?.trim()) {
            e.taxLedgerAc = 'Tax Ledger A/C is required';
        } else if (!/^[A-Za-z0-9\s%]+$/.test(form.taxLedgerAc.trim())) {
            e.taxLedgerAc = 'Only alphanumeric characters, spaces, and % allowed';
        } else {
            const isDuplicate = state.taxes.some(t => t.taxLedgerAc.toLowerCase() === form.taxLedgerAc.trim().toLowerCase() && t.id !== editId);
            if (isDuplicate) e.taxLedgerAc = 'Tax Ledger A/C must be unique';
        }

        // 2. Numeric Percentages (0-100) & Mandatory check
        const pctFields = [
            'taxPercent', 'cgstPercent', 'sgstPercent', 'igstPercent',
            'purchaseCGST', 'purchaseSGST', 'purchaseIGST',
            'salesCGST', 'salesSGST', 'salesIGST'
        ];

        pctFields.forEach(f => {
            if (form[f] === '' || form[f] === null || form[f] === undefined) {
                e[f] = 'Required';
            } else {
                const val = Number(form[f]);
                if (isNaN(val) || val < 0 || val > 100) {
                    e[f] = 'Must be between 0 and 100';
                }
            }
        });

        // 3. Logical GST Validations
        const totalPct = Number(form.taxPercent) || 0;
        const cgst = Number(form.cgstPercent) || 0;
        const sgst = Number(form.sgstPercent) || 0;
        const igst = Number(form.igstPercent) || 0;

        if (cgst > 0 || sgst > 0) {
            if (cgst + sgst !== totalPct) {
                e.cgstPercent = e.sgstPercent = `Sum (${cgst + sgst}%) must equal Total Tax (${totalPct}%)`;
            }
        }

        if (igst > 0 && igst !== totalPct) {
            e.igstPercent = `IGST (${igst}%) must equal Total Tax (${totalPct}%)`;
        }

        // 4. HSN Code (4, 6, or 8 digits)
        if (form.hsnCode?.trim()) {
            if (!/^\d{4}$|^\d{6}$|^\d{8}$/.test(form.hsnCode.trim())) {
                e.hsnCode = 'Must be 4, 6, or 8 numeric digits';
            }
        }

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
                        <FormField label="Tax Ledger A/C" id="taxLedgerAc" required value={form.taxLedgerAc} onChange={(e) => set('taxLedgerAc', e.target.value)} error={errors.taxLedgerAc} className="md:col-span-2 lg:col-span-3" />

                        {/* Basic Tax Settings Section */}
                        <div className="col-span-full border-b pb-2 mt-2">
                            <h3 className="font-semibold text-slate-700">General Information</h3>
                        </div>
                        <DropdownWithCreate label="Tax %" id="taxPercent" required options={pctOptions} value={form.taxPercent} onChange={(v) => set('taxPercent', v)} error={errors.taxPercent} />
                        <DropdownWithCreate label="CGST Tax %" id="cgstPercent" required options={pctOptions} value={form.cgstPercent} onChange={(v) => set('cgstPercent', v)} error={errors.cgstPercent} />
                        <DropdownWithCreate label="SGST Tax %" id="sgstPercent" required options={pctOptions} value={form.sgstPercent} onChange={(v) => set('sgstPercent', v)} error={errors.sgstPercent} />
                        <DropdownWithCreate label="IGST Tax %" id="igstPercent" required options={pctOptions} value={form.igstPercent} onChange={(v) => set('igstPercent', v)} error={errors.igstPercent} />
                        <FormField label="HSN Code" id="hsnCode" value={form.hsnCode} onChange={(e) => set('hsnCode', e.target.value)} error={errors.hsnCode} />

                        {/* Purchase Tax Section */}
                        <div className="col-span-full border-b pb-2 mt-4 flex items-center gap-2">
                            <div className="p-1.5 bg-[#0097A7]/10 text-[#0097A7] rounded-lg">
                                <Receipt className="w-4 h-4" />
                            </div>
                            <h3 className="font-semibold text-slate-700">Purchase Tax</h3>
                        </div>
                        <DropdownWithCreate label="Purchase CGST %" id="purchaseCGST" required options={pctOptions} value={form.purchaseCGST} onChange={(v) => set('purchaseCGST', v)} error={errors.purchaseCGST} />
                        <DropdownWithCreate label="Purchase SGST %" id="purchaseSGST" required options={pctOptions} value={form.purchaseSGST} onChange={(v) => set('purchaseSGST', v)} error={errors.purchaseSGST} />
                        <DropdownWithCreate label="Purchase IGST %" id="purchaseIGST" required options={pctOptions} value={form.purchaseIGST} onChange={(v) => set('purchaseIGST', v)} error={errors.purchaseIGST} />

                        {/* Sales Tax Section */}
                        <div className="col-span-full border-b pb-2 mt-4 flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Receipt className="w-4 h-4" />
                            </div>
                            <h3 className="font-semibold text-slate-700">Sales Tax</h3>
                        </div>
                        <DropdownWithCreate label="Sales CGST %" id="salesCGST" required options={pctOptions} value={form.salesCGST} onChange={(v) => set('salesCGST', v)} error={errors.salesCGST} />
                        <DropdownWithCreate label="Sales SGST %" id="salesSGST" required options={pctOptions} value={form.salesSGST} onChange={(v) => set('salesSGST', v)} error={errors.salesSGST} />
                        <DropdownWithCreate label="Sales IGST %" id="salesIGST" required options={pctOptions} value={form.salesIGST} onChange={(v) => set('salesIGST', v)} error={errors.salesIGST} />
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
