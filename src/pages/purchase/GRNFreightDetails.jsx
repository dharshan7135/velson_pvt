import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Truck, Database, DollarSign } from 'lucide-react';

const columns = [
    { key: 'GRN_No', label: 'GRN No' },
    { key: 'Fright_Name', label: 'Freight' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Net_Amount', label: 'Net Amt' },
    { key: 'Status', label: 'Status' },
];

const emptyForm = {
    ID: '', Ledger_Id: '', Tax_Id: '', Freight_Ledger_Id: '', Created_by: '', Ref_Row_Id: '',
    GRN_No: '', FPO_No: '', Invoice_No: '', BILL_MODE: '',
    Po_Date: '', Invoice_Date: '', Created_Date: new Date().toISOString().slice(0, 10),
    Ledger_Name: '', Fright_Name: '', Freight_Ledger_Name: '',
    Amount: 0, GST_Per: 0, GST_Amt: 0, IGST_Per: 0, IGST_Amt: 0, Tax_Per: 0, Tax_Amount: 0, Net_Amount: 0,
    FCGST_Per: 0, FSGST_Per: 0, FIGST_Per: 0, FCGST_Amt: 0, FSGST_Amt: 0, FIGST_Amt: 0, TAXABLE_AMT: 0,
    Status: 'A',
};

const GRNFreightDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('grnFreightDetails', editId, form); else addRecord('grnFreightDetails', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="GRN Freight Details" description="Freight charges on GRN with detailed GST split" icon={Truck} />
            <DataTable columns={columns} data={state.grnFreightDetails || []} onAdd={openAdd} addLabel="Add Freight" onEdit={openEdit} onDelete={(r) => deleteRecord('grnFreightDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Freight' : 'New GRN Freight'} size="lg">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Reference" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="GRN No" id="GRN_No" value={form.GRN_No} onChange={(e) => set('GRN_No', e.target.value)} required />
                                <FormField label="FPO No" id="FPO_No" value={form.FPO_No} onChange={(e) => set('FPO_No', e.target.value)} />
                                <FormField label="Invoice No" id="Invoice_No" value={form.Invoice_No} onChange={(e) => set('Invoice_No', e.target.value)} />
                                <FormField label="Ledger Name" id="Ledger_Name" value={form.Ledger_Name} onChange={(e) => set('Ledger_Name', e.target.value)} />
                                <FormField label="Freight Name" id="Fright_Name" value={form.Fright_Name} onChange={(e) => set('Fright_Name', e.target.value)} required />
                                <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Freight Financials" icon={DollarSign}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Amount" id="Amount" type="number" value={form.Amount} onChange={(e) => set('Amount', e.target.value)} required />
                                <FormField label="Taxable" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} />
                                <FormField label="GST %" id="GST_Per" type="number" value={form.GST_Per} onChange={(e) => set('GST_Per', e.target.value)} />
                                <FormField label="GST Amt" id="GST_Amt" type="number" value={form.GST_Amt} onChange={(e) => set('GST_Amt', e.target.value)} />
                                <FormField label="IGST %" id="IGST_Per" type="number" value={form.IGST_Per} onChange={(e) => set('IGST_Per', e.target.value)} />
                                <FormField label="Net Amount" id="Net_Amount" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.Net_Amount} onChange={(e) => set('Net_Amount', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default GRNFreightDetails;
