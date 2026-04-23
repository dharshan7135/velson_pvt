import React from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import ActionBar from '../../components/ActionBar';
import { FileText } from 'lucide-react';
import { exportToExcel } from '../../utils/exportExcel';
import { useNavigate } from 'react-router-dom';

const QuotationIndex = () => {
  const { state, reload } = useApp();
  const navigate = useNavigate();

  const columns = [
    { key: 'PO_No', label: 'Quotation No' },
    { key: 'PODate', label: 'Date' },
    { key: 'CustomerName', label: 'Customer' },
    { key: 'TaxType', label: 'Tax Type' },
    { key: 'Net_Amt', label: 'Net Amount', render: (v) => `₹${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` },
    { key: 'Status', label: 'Status', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${v === 'Open' ? 'bg-blue-100 text-blue-700' : v === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{v}</span> },
  ];

  return (
    <div>
      <PageHeader icon={FileText} title="Quotations" description="All quotations with filters" />
      <ActionBar onAdd={() => navigate('/sales/quotation/new')} addLabel="New Quotation" onExport={() => exportToExcel(state.quotations, columns, 'quotations')} onRefresh={reload} />
      <div className="mt-4"><DataTable columns={columns} data={state.quotations} onEdit={(r) => navigate('/sales/quotation/new', { state: { editData: r } })} /></div>
    </div>
  );
};

export default QuotationIndex;
