import React, { useState, useMemo } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import FormField, { FormContainer, FormActions } from '../../components/FormField';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { generateQuotationNumber } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';

const emptyLine = { Item_ID: '', Item_Code: '', Item_Name: '', HSN_Code: '', UOM: '', Qty: 0, Unit_Price: 0, Disc_Per: 0, Desc_Amt: 0, Final_Price: 0, Sub_total: 0, GST_Per: 0, SGST_Per: 0, CGST_Per: 0, IGST_Per: 0, GST_Amt: 0, Net_Amt: 0 };

const QuotationForm = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [header, setHeader] = useState({
    PO_No: generateQuotationNumber(state.quotations),
    PODate: new Date().toISOString().split('T')[0],
    Customer_ID: '', Contact_Person: '', Contact_No: '', LM_Address1: '', GSTTIN: '',
    CustomerRefNo: '', Revision_No: '', Delivery_Date: '', Validity_Until: '',
    QuotationTypeId: '', TaxTypeId: '', TaxId: '', CurrencyTypeId: '', Exchange_Rate: 1,
    Sdiscount: 0, Freight_Amount: 0, Packing_Forward: 0, Payment_Terms: '',
  });
  const [lines, setLines] = useState([{ ...emptyLine }]);
  const setH = (k, v) => setHeader({ ...header, [k]: v });

  // Customer cascade fill
  const handleCustomerChange = (customerId) => {
    const customer = state.customers.find((c) => c.id === parseInt(customerId));
    setHeader({
      ...header,
      Customer_ID: customerId,
      Contact_Person: customer?.LM_Contact_Person || '',
      Contact_No: customer?.LM_Phone_Number || '',
      LM_Address1: customer?.LM_Address1 || '',
      GSTTIN: customer?.LM_GSTIN || '',
    });
  };

  // Item select → auto-fill line
  const handleItemSelect = (idx, itemId) => {
    const item = state.items.find((i) => i.id === parseInt(itemId));
    if (!item) return;
    const taxType = header.TaxTypeId; // Local vs Interstate
    const isLocal = taxType === '231' || taxType === 'Local';
    const gstPer = 18; // Default
    const newLine = {
      ...lines[idx],
      Item_ID: itemId, Item_Code: item.IM_Part_No, Item_Name: item.IM_PartName,
      HSN_Code: item.IM_HSN_Code || '', UOM: item.UnitName || 'Nos', Unit_Price: item.IM_Purchase_Rate || 0,
      GST_Per: gstPer,
      SGST_Per: isLocal ? gstPer / 2 : 0, CGST_Per: isLocal ? gstPer / 2 : 0,
      IGST_Per: !isLocal ? gstPer : 0,
    };
    updateLine(idx, newLine);
  };

  // Recalculate line
  const calcLine = (line) => {
    const qty = parseFloat(line.Qty) || 0;
    const unitPrice = parseFloat(line.Unit_Price) || 0;
    const discPer = parseFloat(line.Disc_Per) || 0;
    const gstPer = parseFloat(line.GST_Per) || 0;
    const descAmt = (unitPrice * qty) * (discPer / 100);
    const finalPrice = unitPrice - (qty > 0 ? descAmt / qty : 0);
    const subTotal = qty * finalPrice;
    const gstAmt = subTotal * (gstPer / 100);
    const netAmt = subTotal + gstAmt;
    return { ...line, Desc_Amt: descAmt.toFixed(2), Final_Price: finalPrice.toFixed(2), Sub_total: subTotal.toFixed(2), GST_Amt: gstAmt.toFixed(2), Net_Amt: netAmt.toFixed(2) };
  };

  const updateLine = (idx, line) => {
    const calc = calcLine(line);
    setLines((prev) => prev.map((l, i) => (i === idx ? calc : l)));
  };

  const setLineField = (idx, k, v) => {
    const updated = { ...lines[idx], [k]: v };
    updateLine(idx, updated);
  };

  const addLine = () => setLines([...lines, { ...emptyLine }]);
  const removeLine = (idx) => setLines(lines.filter((_, i) => i !== idx));

  // Footer calculations
  const totals = useMemo(() => {
    const totalBeforeDisc = lines.reduce((s, l) => s + (parseFloat(l.Sub_total) || 0), 0);
    const discount = parseFloat(header.Sdiscount) || 0;
    const freight = parseFloat(header.Freight_Amount) || 0;
    const packing = parseFloat(header.Packing_Forward) || 0;
    const taxableAmount = totalBeforeDisc - discount + freight + packing;
    const totalGst = lines.reduce((s, l) => s + (parseFloat(l.GST_Amt) || 0), 0);
    const grandTotal = taxableAmount + totalGst;
    const roundOff = Math.round(grandTotal) - grandTotal;
    const netAmt = grandTotal + roundOff;
    return { totalBeforeDisc, discount, freight, packing, taxableAmount, totalGst, grandTotal, roundOff, netAmt };
  }, [lines, header.Sdiscount, header.Freight_Amount, header.Packing_Forward]);

  const handleSave = () => {
    const customer = state.customers.find((c) => c.id === parseInt(header.Customer_ID));
    dispatch({ type: 'ADD', entity: 'quotations', payload: {
      ...header, CustomerName: customer?.LM_Ledger_Name || '', Net_Amt: totals.netAmt, Status: 'Open', lineItems: lines,
    }});
    navigate('/sales/quotations');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader icon={FileText} title="Create Quotation" description="Auto-generated PO number, customer cascade, line item calculations" />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Quotation Header</h3>
        <FormContainer columns={4}>
          <FormField label="Quotation No" required><input className="form-input" value={header.PO_No} readOnly /></FormField>
          <FormField label="Date" required><input type="date" className="form-input" value={header.PODate} onChange={(e) => setH('PODate', e.target.value)} /></FormField>
          <FormField label="Customer" required className="sm:col-span-2">
            <select className="form-input" value={header.Customer_ID} onChange={(e) => handleCustomerChange(e.target.value)}>
              <option value="">Select Customer</option>
              {state.customers.map((c) => <option key={c.id} value={c.id}>{c.LM_Ledger_Name}</option>)}
            </select>
          </FormField>
          <FormField label="Contact Person"><input className="form-input" value={header.Contact_Person} readOnly /></FormField>
          <FormField label="Contact No"><input className="form-input" value={header.Contact_No} readOnly /></FormField>
          <FormField label="Address"><input className="form-input" value={header.LM_Address1} readOnly /></FormField>
          <FormField label="GSTIN"><input className="form-input" value={header.GSTTIN} readOnly /></FormField>
          <FormField label="Customer Ref No"><input className="form-input" value={header.CustomerRefNo} onChange={(e) => setH('CustomerRefNo', e.target.value)} /></FormField>
          <FormField label="Delivery Date"><input type="date" className="form-input" value={header.Delivery_Date} onChange={(e) => setH('Delivery_Date', e.target.value)} /></FormField>
          <FormField label="Validity Until"><input className="form-input" value={header.Validity_Until} onChange={(e) => setH('Validity_Until', e.target.value)} /></FormField>
          <FormField label="Tax Type">
            <select className="form-input" value={header.TaxTypeId} onChange={(e) => setH('TaxTypeId', e.target.value)}>
              <option value="">Select</option><option value="Local">Local (SGST+CGST)</option><option value="Interstate">Interstate (IGST)</option>
            </select>
          </FormField>
          <FormField label="Exchange Rate"><input type="number" step="0.01" className="form-input" value={header.Exchange_Rate} onChange={(e) => setH('Exchange_Rate', e.target.value)} /></FormField>
        </FormContainer>
      </div>

      {/* Line Items */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700">Line Items</h3>
          <button onClick={addLine} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#0097A7] text-white hover:bg-[#007a87] transition-all flex items-center gap-1"><Plus size={14} /> Add Item</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['#', 'Item', 'Part No', 'Name', 'HSN', 'UOM', 'Qty', 'Price', 'Disc %', 'Disc Amt', 'Sub Total', 'GST %', 'GST Amt', 'Net Amt', ''].map((h) => (
                  <th key={h} className="px-2 py-2 text-xs font-bold text-slate-500 uppercase text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="border-t border-slate-100">
                  <td className="px-2 py-2 text-slate-400">{idx + 1}</td>
                  <td className="px-2 py-2 min-w-[150px]">
                    <select className="form-input text-xs py-1" value={line.Item_ID} onChange={(e) => handleItemSelect(idx, e.target.value)}>
                      <option value="">Select</option>
                      {state.items.map((i) => <option key={i.id} value={i.id}>{i.IM_PartName}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-2 text-xs text-slate-500">{line.Item_Code}</td>
                  <td className="px-2 py-2 text-xs text-slate-500 max-w-[120px] truncate">{line.Item_Name}</td>
                  <td className="px-2 py-2 text-xs text-slate-500">{line.HSN_Code}</td>
                  <td className="px-2 py-2 text-xs text-slate-500">{line.UOM}</td>
                  <td className="px-2 py-2"><input type="number" className="form-input text-xs py-1 w-16" value={line.Qty} onChange={(e) => setLineField(idx, 'Qty', e.target.value)} /></td>
                  <td className="px-2 py-2"><input type="number" className="form-input text-xs py-1 w-20" value={line.Unit_Price} onChange={(e) => setLineField(idx, 'Unit_Price', e.target.value)} /></td>
                  <td className="px-2 py-2"><input type="number" className="form-input text-xs py-1 w-16" value={line.Disc_Per} onChange={(e) => setLineField(idx, 'Disc_Per', e.target.value)} /></td>
                  <td className="px-2 py-2 text-xs text-slate-600 font-medium">{line.Desc_Amt}</td>
                  <td className="px-2 py-2 text-xs text-slate-700 font-bold">{line.Sub_total}</td>
                  <td className="px-2 py-2 text-xs text-slate-500">{line.GST_Per}%</td>
                  <td className="px-2 py-2 text-xs text-slate-600">{line.GST_Amt}</td>
                  <td className="px-2 py-2 text-xs text-[#0097A7] font-bold">{line.Net_Amt}</td>
                  <td className="px-2 py-2">
                    {lines.length > 1 && <button onClick={() => removeLine(idx)} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField label="Total Before Discount"><input className="form-input font-bold" value={totals.totalBeforeDisc.toFixed(2)} readOnly /></FormField>
          <FormField label="Discount"><input type="number" className="form-input" value={header.Sdiscount} onChange={(e) => setH('Sdiscount', e.target.value)} /></FormField>
          <FormField label="Freight"><input type="number" className="form-input" value={header.Freight_Amount} onChange={(e) => setH('Freight_Amount', e.target.value)} /></FormField>
          <FormField label="Packing"><input type="number" className="form-input" value={header.Packing_Forward} onChange={(e) => setH('Packing_Forward', e.target.value)} /></FormField>
          <FormField label="Taxable Amount"><input className="form-input" value={totals.taxableAmount.toFixed(2)} readOnly /></FormField>
          <FormField label="Total GST"><input className="form-input" value={totals.totalGst.toFixed(2)} readOnly /></FormField>
          <FormField label="Round Off"><input className="form-input" value={totals.roundOff.toFixed(2)} readOnly /></FormField>
          <FormField label="Net Amount">
            <input className="form-input text-lg font-bold text-[#0097A7]" value={`₹ ${totals.netAmt.toFixed(2)}`} readOnly />
          </FormField>
        </div>
        <FormField label="Payment Terms" className="mt-4">
          <textarea className="form-input" value={header.Payment_Terms} onChange={(e) => setH('Payment_Terms', e.target.value)} placeholder="Enter payment terms..." rows={3} />
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => navigate('/sales/quotations')} className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-all">Cancel</button>
        <button onClick={handleSave} className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#0097A7] text-white hover:bg-[#007a87] hover:-translate-y-0.5 transition-all">Save Quotation</button>
      </div>
    </div>
  );
};

export default QuotationForm;
