import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { Activity, Database, ShoppingBag, DollarSign, Percent, Calculator, Info, Calendar } from 'lucide-react';

const columns = [
    { key: 'BILLNO', label: 'Bill No' },
    { key: 'Item_name', label: 'Item Name' },
    { key: 'Qty', label: 'Qty' },
    { key: 'NET_AMT', label: 'Net Amount' },
    { key: 'Batch', label: 'Batch' },
];

const emptyForm = {
    // Primary & Multi-References
    TRNSID: '', LEDGER_ID: '', LIABILITY_ID: '', Item_ID: '', SLEDGER_ID: '', TAX_ID: '', CGST_TAX_ID: '', SGST_TAX_ID: '', IGST_TAX_ID: '',
    COMPANY: '', SALES_ID: '', USERID: '', BRANCHID: '', ACCOUNT_ID: '', SHIFT_ID: '',
    // Document Details
    BILLNO: '', Batch: '', BILL_MODE: 'Credit', STATUS: 'A', BILLDATE: '',
    // Item Details
    Item_name: '', Name_List: '', HSNCode: '', COMMODITY: '', MRP: 0, MfrDate: '', ExpiryDate: '',
    // Quantity / UOM
    UNIT: '', Qty: 0, Unit_Qty: 0, Unit_Qty1: 0, BAG: 0,
    // Rates
    NET_RATE: 0, PURCHASE_RATE: 0, RESALE_RATE: 0, SALE_RATE: 0, NETRATE: 0, Rateby: 1, Cost_Rate: 0,
    // Amounts
    LIABILITY_VALUE: 0, TOT_AMT: 0, TAXABLE_AMT: 0, NET_AMT: 0, Material_Charge: 0, Labour_Charge: 0,
    // Discounts
    DISC_TYPE: 'Amount', DISC_PER: 0, DISC_AMT: 0, Disc_Amt2: 0, DISC_AMT3: 0, DISC_AMT4: 0, CUS_FREE: 0, SOC_FREE: 0,
    // Taxes
    TAX_YESNO: 'Yes', TAX_REVYES: 'No', TAX_TYPE: '', TAX_PER: 0, CGST_TAX: 0, SGST_TAX: 0, IGST_TAX: 0,
    CGST_TAX_AMT: 0, SGST_TAX_AMT: 0, IGST_TAX_AMT: 0, TOTAL_TAX: 0,
    // Audit
    CREATED_BY: '', CREATED_DATE: new Date().toISOString().slice(0, 10),
};

const QuotationTran = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);

    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

    const save = () => {
        if (editId) updateRecord('quotationTrans', editId, form);
        else addRecord('quotationTrans', form);
        close();
    };

    return (
        <div className="p-6">
            <PageHeader title="Quotation Transaction Line" description="Detailed line-level transaction and tax breakdown" icon={Activity} />
            
            <DataTable 
                columns={columns} 
                data={state.quotationTrans || []} 
                onAdd={openAdd} 
                addLabel="Add Transaction Line" 
                onEdit={openEdit} 
                onDelete={(r) => deleteRecord('quotationTrans', r.id)} 
            />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Transaction Line' : 'New Transaction Line'} size="full">
                <div className="p-6 space-y-6">
                    {/* Identification & Document */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Transaction Header" icon={Database}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Bill No" id="BILLNO" value={form.BILLNO} onChange={(e) => set('BILLNO', e.target.value)} required />
                                <FormField label="Batch" id="Batch" value={form.Batch} onChange={(e) => set('Batch', e.target.value)} required />
                                <FormField label="Bill Mode" id="BILL_MODE" value={form.BILL_MODE} onChange={(e) => set('BILL_MODE', e.target.value)} />
                                <FormField label="Bill Date" id="BILLDATE" type="date" value={form.BILLDATE} onChange={(e) => set('BILLDATE', e.target.value)} />
                                <FormField label="Sales ID" id="SALES_ID" value={form.SALES_ID} onChange={(e) => set('SALES_ID', e.target.value)} />
                                <FormField label="Company" id="COMPANY" value={form.COMPANY} onChange={(e) => set('COMPANY', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Item Information" icon={ShoppingBag}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField label="Item Name" id="Item_name" value={form.Item_name} className="md:col-span-2" onChange={(e) => set('Item_name', e.target.value)} required />
                                <FormField label="HSN Code" id="HSNCode" value={form.HSNCode} onChange={(e) => set('HSNCode', e.target.value)} required />
                                <FormField label="MRP" id="MRP" type="number" value={form.MRP} onChange={(e) => set('MRP', e.target.value)} required />
                                <FormField label="Mfr Date" id="MfrDate" value={form.MfrDate} onChange={(e) => set('MfrDate', e.target.value)} />
                                <FormField label="Expiry Date" id="ExpiryDate" value={form.ExpiryDate} onChange={(e) => set('ExpiryDate', e.target.value)} />
                                <FormField label="Commodity" id="COMMODITY" value={form.COMMODITY} onChange={(e) => set('COMMODITY', e.target.value)} />
                                <FormField label="Name List" id="Name_List" value={form.Name_List} onChange={(e) => set('Name_List', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Quantity & Unit Pricing */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Quantity & UOM" icon={Calculator}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Unit" id="UNIT" value={form.UNIT} onChange={(e) => set('UNIT', e.target.value)} required />
                                <FormField label="Quantity (Qty)" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} required />
                                <FormField label="Unit Qty" id="Unit_Qty" type="number" value={form.Unit_Qty} onChange={(e) => set('Unit_Qty', e.target.value)} required />
                                <FormField label="Unit Qty 1" id="Unit_Qty1" type="number" value={form.Unit_Qty1} onChange={(e) => set('Unit_Qty1', e.target.value)} required />
                                <FormField label="Bag" id="BAG" value={form.BAG} onChange={(e) => set('BAG', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Pricing & Rates" icon={DollarSign}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Purchase Rate" id="PURCHASE_RATE" type="number" value={form.PURCHASE_RATE} onChange={(e) => set('PURCHASE_RATE', e.target.value)} required />
                                <FormField label="Sale Rate" id="SALE_RATE" type="number" value={form.SALE_RATE} onChange={(e) => set('SALE_RATE', e.target.value)} required />
                                <FormField label="Net Rate" id="NET_RATE" type="number" value={form.NET_RATE} onChange={(e) => set('NET_RATE', e.target.value)} required />
                                <FormField label="Resale Rate" id="RESALE_RATE" type="number" value={form.RESALE_RATE} onChange={(e) => set('RESALE_RATE', e.target.value)} required />
                                <FormField label="Cost Rate" id="Cost_Rate" type="number" value={form.Cost_Rate} onChange={(e) => set('Cost_Rate', e.target.value)} required />
                                <FormField label="Rate By" id="Rateby" type="number" value={form.Rateby} onChange={(e) => set('Rateby', e.target.value)} required />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Discounts & Net Value */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <FormContainer title="Discounts & Free Schemes" icon={Percent}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Disc Type" id="DISC_TYPE" value={form.DISC_TYPE} onChange={(e) => set('DISC_TYPE', e.target.value)} required />
                                <FormField label="Disc %" id="DISC_PER" type="number" value={form.DISC_PER} onChange={(e) => set('DISC_PER', e.target.value)} />
                                <FormField label="Disc Amt" id="DISC_AMT" type="number" value={form.DISC_AMT} onChange={(e) => set('DISC_AMT', e.target.value)} required />
                                <FormField label="Disc Amt 2" id="Disc_Amt2" type="number" value={form.Disc_Amt2} onChange={(e) => set('Disc_Amt2', e.target.value)} />
                                <FormField label="Disc Amt 3" id="DISC_AMT3" type="number" value={form.DISC_AMT3} onChange={(e) => set('DISC_AMT3', e.target.value)} />
                                <FormField label="Disc Amt 4" id="DISC_AMT4" type="number" value={form.DISC_AMT4} onChange={(e) => set('DISC_AMT4', e.target.value)} />
                                <FormField label="Cus Free" id="CUS_FREE" type="number" value={form.CUS_FREE} onChange={(e) => set('CUS_FREE', e.target.value)} />
                                <FormField label="Soc Free" id="SOC_FREE" type="number" value={form.SOC_FREE} onChange={(e) => set('SOC_FREE', e.target.value)} />
                            </div>
                        </FormContainer>

                        <FormContainer title="Calculation Summary & Net Value">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField label="Tot Amt" id="TOT_AMT" type="number" value={form.TOT_AMT} onChange={(e) => set('TOT_AMT', e.target.value)} required />
                                <FormField label="Taxable Amt" id="TAXABLE_AMT" type="number" value={form.TAXABLE_AMT} onChange={(e) => set('TAXABLE_AMT', e.target.value)} required />
                                <FormField label="Liability Value" id="LIABILITY_VALUE" type="number" value={form.LIABILITY_VALUE} onChange={(e) => set('LIABILITY_VALUE', e.target.value)} required />
                                <FormField label="Material Charge" id="Material_Charge" type="number" value={form.Material_Charge} onChange={(e) => set('Material_Charge', e.target.value)} />
                                <FormField label="Labour Charge" id="Labour_Charge" type="number" value={form.Labour_Charge} onChange={(e) => set('Labour_Charge', e.target.value)} />
                                <FormField label="Net Amount" id="NET_AMT" type="number" className="font-bold text-[#0097A7] bg-cyan-50" value={form.NET_AMT} onChange={(e) => set('NET_AMT', e.target.value)} required />
                            </div>
                        </FormContainer>
                    </div>

                    {/* Tax Breakdown */}
                    <FormContainer title="Tax Configuration & Calculations">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Tax %" id="TAX_PER" type="number" value={form.TAX_PER} onChange={(e) => set('TAX_PER', e.target.value)} required />
                            <FormField label="CGST Tax %" id="CGST_TAX" type="number" value={form.CGST_TAX} onChange={(e) => set('CGST_TAX', e.target.value)} required />
                            <FormField label="SGST Tax %" id="SGST_TAX" type="number" value={form.SGST_TAX} onChange={(e) => set('SGST_TAX', e.target.value)} required />
                            <FormField label="IGST Tax %" id="IGST_TAX" type="number" value={form.IGST_TAX} onChange={(e) => set('IGST_TAX', e.target.value)} required />
                            
                            <FormField label="Tax Amt" id="TOTAL_TAX" type="number" value={form.TOTAL_TAX} onChange={(e) => set('TOTAL_TAX', e.target.value)} required />
                            <FormField label="CGST Tax Amt" id="CGST_TAX_AMT" type="number" value={form.CGST_TAX_AMT} onChange={(e) => set('CGST_TAX_AMT', e.target.value)} required />
                            <FormField label="SGST Tax Amt" id="SGST_TAX_AMT" type="number" value={form.SGST_TAX_AMT} onChange={(e) => set('SGST_TAX_AMT', e.target.value)} required />
                            <FormField label="IGST Tax Amt" id="IGST_TAX_AMT" type="number" value={form.IGST_TAX_AMT} onChange={(e) => set('IGST_TAX_AMT', e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-slate-100">
                            <FormField label="Tax Yes/No" id="TAX_YESNO" value={form.TAX_YESNO} onChange={(e) => set('TAX_YESNO', e.target.value)} />
                            <FormField label="Tax Rev Yes/No" id="TAX_REVYES" value={form.TAX_REVYES} onChange={(e) => set('TAX_REVYES', e.target.value)} />
                            <FormField label="Tax Type" id="TAX_TYPE" value={form.TAX_TYPE} onChange={(e) => set('TAX_TYPE', e.target.value)} />
                        </div>
                    </FormContainer>

                    {/* Backend IDs & Tracking */}
                    <FormContainer title="System References & Audit" icon={Info}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Ledger ID" id="LEDGER_ID" value={form.LEDGER_ID} onChange={(e) => set('LEDGER_ID', e.target.value)} />
                            <FormField label="Liability ID" id="LIABILITY_ID" value={form.LIABILITY_ID} onChange={(e) => set('LIABILITY_ID', e.target.value)} />
                            <FormField label="S-Ledger ID" id="SLEDGER_ID" value={form.SLEDGER_ID} onChange={(e) => set('SLEDGER_ID', e.target.value)} />
                            <FormField label="Tax ID" id="TAX_ID" value={form.TAX_ID} onChange={(e) => set('TAX_ID', e.target.value)} />
                            <FormField label="Branch ID" id="BRANCHID" value={form.BRANCHID} onChange={(e) => set('BRANCHID', e.target.value)} />
                            <FormField label="UserID" id="USERID" value={form.USERID} onChange={(e) => set('USERID', e.target.value)} />
                            <FormField label="Shift ID" id="Shift_ID" value={form.SHIFT_ID} onChange={(e) => set('Shift_ID', e.target.value)} />
                            <FormField label="Status" id="STATUS" value={form.STATUS} onChange={(e) => set('STATUS', e.target.value)} required />
                            <FormField label="Created By" id="CREATED_BY" value={form.CREATED_BY} onChange={(e) => set('CREATED_BY', e.target.value)} required />
                            <FormField label="Created Date" id="CREATED_DATE" type="date" value={form.CREATED_DATE} onChange={(e) => set('CREATED_DATE', e.target.value)} />
                        </div>
                    </FormContainer>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                            {editId ? 'Update' : 'Save Line'}
                        </button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default QuotationTran;
