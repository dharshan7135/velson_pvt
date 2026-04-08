import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashboard';
import CompanyMaster from './pages/masters/CompanyMaster';
import EmployeeMaster from './pages/masters/EmployeeMaster';
import ContractorMaster from './pages/masters/ContractorMaster';
import ItemMaster from './pages/inventory/ItemMaster';
import ItemGroupMaster from './pages/inventory/ItemGroupMaster';
import Characteristics from './pages/inventory/Characteristics';
import MachineMaster from './pages/production/MachineMaster';
import ProcessMaster from './pages/production/ProcessMaster';
import ServiceJobMaster from './pages/production/ServiceJobMaster';
import AccountCreation from './pages/finance/AccountCreation';
import GroupMaster from './pages/finance/GroupMaster';
import TaxMaster from './pages/finance/TaxMaster';
import ReferenceGroupMaster from './pages/config/ReferenceGroupMaster';
import ReferenceMaster from './pages/config/ReferenceMaster';
import SupplierDetails from './pages/config/SupplierDetails';
import CommandDashboard from './command-center/pages/CommandDashboard';
import ProductionMonitoring from './command-center/pages/ProductionMonitoring';
import Factory3DView from './command-center/pages/Factory3DView';
import MachineHealth from './command-center/pages/MachineHealth';
import InventoryIntelligence from './command-center/pages/InventoryIntelligence';
import SupplyChain from './command-center/pages/SupplyChain';
import SalesAnalytics from './command-center/pages/SalesAnalytics';
import ActivityTimeline from './command-center/pages/ActivityTimeline';
import IncidentAlerts from './command-center/pages/IncidentAlerts';
import QuotationEntry from './pages/sales/QuotationEntry';
import QuotationDetails from './pages/sales/QuotationDetails';
import QuotationFileUpload from './pages/sales/QuotationFileUpload';
import QuotationMaster from './pages/sales/QuotationMaster';
import QuotationTran from './pages/sales/QuotationTran';
import QuotationSalesMaster from './pages/sales/QuotationSalesMaster';
import QuotationSalesTran from './pages/sales/QuotationSalesTran';
import QuoteRequestEntry from './pages/sales/QuoteRequestEntry';
import QuoteRequestDetails from './pages/sales/QuoteRequestDetails';
import SalesMaster from './pages/sales/SalesMaster';
import SalesTran from './pages/sales/SalesTran';
import SalesPlan from './pages/sales/SalesPlan';
import BillsOut from './pages/sales/BillsOut';
import DCSalesMaster from './pages/sales/DCSalesMaster';
import DCSalesTran from './pages/sales/DCSalesTran';
import ConformationMaster from './pages/sales/ConformationMaster';
import ConformationDetails from './pages/sales/ConformationDetails';
import ConformationFinalMaster from './pages/sales/ConformationFinalMaster';
import ConformationFinalDetails from './pages/sales/ConformationFinalDetails';
import PurchaseRequest from './pages/purchase/PurchaseRequest';
import PurchaseOrder from './pages/purchase/PurchaseOrder';
import PurchaseOrder2 from './pages/purchase/PurchaseOrder2';
import PurchaseOrderDetails from './pages/purchase/PurchaseOrderDetails';
import PurchaseOrderDetails2 from './pages/purchase/PurchaseOrderDetails2';
import PurchaseFreight from './pages/purchase/PurchaseFreight';
import PurchasePriceLink from './pages/purchase/PurchasePriceLink';
import POMaster from './pages/purchase/POMaster';
import POOrder from './pages/purchase/POOrder';
import POOrderDetails from './pages/purchase/POOrderDetails';
import GateEntry from './pages/purchase/GateEntry';
import GateEntryDetails from './pages/purchase/GateEntryDetails';
import GRNEntry from './pages/purchase/GRNEntry';
import GRNEntryDetails from './pages/purchase/GRNEntryDetails';
import GRNEntryDetailsTrack from './pages/purchase/GRNEntryDetailsTrack';
import GRNEntryTrack from './pages/purchase/GRNEntryTrack';
import GRNFreightDetails from './pages/purchase/GRNFreightDetails';
import GRNReturnDetails from './pages/purchase/GRNReturnDetails';
import MaterialRequest from './pages/inventory/MaterialRequest';
import MaterialRequest1 from './pages/inventory/MaterialRequest1';
import MaterialInward from './pages/inventory/MaterialInward';
import MaterialIssue from './pages/inventory/MaterialIssue';
import MaterialIssue1 from './pages/inventory/MaterialIssue1';
import StockInward from './pages/inventory/StockInward';
import StockOutward from './pages/inventory/StockOutward';
import StockOutwardCorrection from './pages/inventory/StockOutwardCorrection';
import StockOutwardCorrectionDel from './pages/inventory/StockOutwardCorrectionDel';
import StockLiability1 from './pages/inventory/StockLiability1';
import StockLiability3 from './pages/inventory/StockLiability3';
import StockLiabilityTrack from './pages/inventory/StockLiabilityTrack';
import IndexMaster from './pages/inventory/IndexMaster';
import IndexCreation from './pages/inventory/IndexCreation';
import IndexCreationTrack from './pages/inventory/IndexCreationTrack';
import MainIndexMaster from './pages/inventory/MainIndexMaster';
import MainIndexDetails from './pages/inventory/MainIndexDetails';
import CCMSEntry from './pages/inventory/CCMSEntry';
import JobEntry from './pages/production/JobEntry';
import JobEntryDetails from './pages/production/JobEntryDetails';
import JobEntryDetailsUpdate from './pages/production/JobEntryDetailsUpdate';
import JobEntryDetailsAudit from './pages/production/JobEntryDetailsAudit';
import JobFileUploaded from './pages/production/JobFileUploaded';
import JobSpareEntry from './pages/production/JobSpareEntry';
import ApprovedDetails from './pages/production/ApprovedDetails';
import ProcessCardMain from './pages/production/ProcessCardMain';
import ProcessCardDetails from './pages/production/ProcessCardDetails';
import ProcessCardTracking from './pages/production/ProcessCardTracking';
import JobcardRMIssueMaster from './pages/production/JobcardRMIssueMaster';
import JobcardRMIssueDetails from './pages/production/JobcardRMIssueDetails';
import BreakdownEntry from './pages/production/BreakdownEntry';
import DeliveryChallan from './pages/delivery/DeliveryChallan';
import DeliveryChallanDetails from './pages/delivery/DeliveryChallanDetails';
import DCMain from './pages/delivery/DCMain';
import DCDetails from './pages/delivery/DCDetails';
import NCDCMain from './pages/delivery/NCDCMain';
import NCDCDetails from './pages/delivery/NCDCDetails';
import BookingMaster from './pages/service/BookingMaster';
import BookingServiceDetails from './pages/service/BookingServiceDetails';
import BookingServiceSpareList from './pages/service/BookingServiceSpareList';
import ServiceOrder from './pages/service/ServiceOrder';
import ServiceOrderDetails from './pages/service/ServiceOrderDetails';
import ServiceRequest from './pages/service/ServiceRequest';
import ServiceTran from './pages/service/ServiceTran';
import PartSpareList from './pages/service/PartSpareList';
import ServiceBillMaster from './pages/service/ServiceBillMaster';
import ServiceBillTrans from './pages/service/ServiceBillTrans';
import ServiceBillLabourChargeDetails from './pages/service/ServiceBillLabourChargeDetails';
import TempServiceBillMaster from './pages/service/TempServiceBillMaster';
import TempServiceBillTrans from './pages/service/TempServiceBillTrans';
import TempServiceBillLabourChargeDetails from './pages/service/TempServiceBillLabourChargeDetails';
import QCEntry from './pages/quality/QCEntry';
import QCEntryDetails from './pages/quality/QCEntryDetails';
import GRNQCDetails from './pages/quality/GRNQCDetails';
import NCDetails from './pages/quality/NCDetails';
import PRNFile from './pages/quality/PRNFile';
import FastenerListLink from './pages/quality/FastenerListLink';
import PartFileDrawingUploaded from './pages/quality/PartFileDrawingUploaded';
import DrawingMaster from './pages/drawing/DrawingMaster';
import DrawingDetails from './pages/drawing/DrawingDetails';
import DrawingRevisionDetails from './pages/drawing/DrawingRevisionDetails';
import AutoPoDetails from './pages/automation/AutoPoDetails';
import AutoPoDetailsTrack from './pages/automation/AutoPoDetailsTrack';
import GeneralFileUpload from './pages/automation/GeneralFileUpload';
import CurrentEditDetails from './pages/automation/CurrentEditDetails';
import ErrorLogs from './pages/automation/ErrorLogs';
import BackupEntry from './pages/automation/BackupEntry';
import BackupTbl from './pages/automation/BackupTbl';
import TempEntry from './pages/automation/TempEntry';
import TestEntry from './pages/automation/TestEntry';
import Test66Entry from './pages/automation/Test66Entry';
import Table1Entry from './pages/automation/Table1Entry';
import VoucherMast1 from './pages/finance/VoucherMast1';
import VoucherEntry1 from './pages/finance/VoucherEntry1';
import Adjustment1 from './pages/finance/Adjustment1';
import AccountTran1 from './pages/finance/AccountTran1';
import DayBook1 from './pages/finance/DayBook1';
import DayTotal1 from './pages/finance/DayTotal1';
import PaymentMaster1 from './pages/finance/PaymentMaster1';
import AutoVoucherPaymentAdjustment1 from './pages/finance/AutoVoucherPaymentAdjustment1';
import AutoVoucherPaymentCash1 from './pages/finance/AutoVoucherPaymentCash1';
import ReceiptMaster1 from './pages/finance/ReceiptMaster1';
import ReceiptTrans1 from './pages/finance/ReceiptTrans1';
import AutoVoucherReceiptAdjustment1 from './pages/finance/AutoVoucherReceiptAdjustment1';
import AutoVoucherReceiptCash1 from './pages/finance/AutoVoucherReceiptCash1';
import './command-center/CommandCenter.css';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="app-main">
          <TopNavbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<CommandDashboard />} />
              <Route path="/production" element={<ProductionMonitoring />} />
              <Route path="/factory-3d" element={<Factory3DView />} />
              <Route path="/machine-health" element={<MachineHealth />} />
              <Route path="/inventory-intel" element={<InventoryIntelligence />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
              <Route path="/sales-analytics" element={<SalesAnalytics />} />
              <Route path="/timeline" element={<ActivityTimeline />} />
              <Route path="/alerts" element={<IncidentAlerts />} />
              <Route path="/masters/company" element={<CompanyMaster />} />
              <Route path="/masters/employees" element={<EmployeeMaster />} />
              <Route path="/masters/contractors" element={<ContractorMaster />} />
              <Route path="/inventory/items" element={<ItemMaster />} />
              <Route path="/inventory/item-groups" element={<ItemGroupMaster />} />
              <Route path="/inventory/characteristics" element={<Characteristics />} />
              <Route path="/production/machines" element={<MachineMaster />} />
              <Route path="/production/processes" element={<ProcessMaster />} />
              <Route path="/production/service-jobs" element={<ServiceJobMaster />} />
              <Route path="/finance/accounts" element={<AccountCreation />} />
              <Route path="/finance/groups" element={<GroupMaster />} />
              <Route path="/finance/taxes" element={<TaxMaster />} />
              <Route path="/config/reference-groups" element={<ReferenceGroupMaster />} />
              <Route path="/config/references" element={<ReferenceMaster />} />
              <Route path="/config/suppliers" element={<SupplierDetails />} />
              <Route path="/sales/quotation" element={<QuotationEntry />} />
              <Route path="/sales/quotation-details" element={<QuotationDetails />} />
              <Route path="/sales/quotation-files" element={<QuotationFileUpload />} />
              <Route path="/sales/quotation-master" element={<QuotationMaster />} />
              <Route path="/sales/quotation-tran" element={<QuotationTran />} />
              <Route path="/sales/quotation-sales-master" element={<QuotationSalesMaster />} />
              <Route path="/sales/quotation-sales-tran" element={<QuotationSalesTran />} />
              <Route path="/sales/quote-request" element={<QuoteRequestEntry />} />
              <Route path="/sales/quote-request-details" element={<QuoteRequestDetails />} />
              <Route path="/sales/sales-master" element={<SalesMaster />} />
              <Route path="/sales/sales-tran" element={<SalesTran />} />
              <Route path="/sales/sales-plan" element={<SalesPlan />} />
              <Route path="/sales/bills-out" element={<BillsOut />} />
              <Route path="/sales/dc-sales-master" element={<DCSalesMaster />} />
              <Route path="/sales/dc-sales-tran" element={<DCSalesTran />} />
              <Route path="/sales/conformation-master" element={<ConformationMaster />} />
              <Route path="/sales/conformation-details" element={<ConformationDetails />} />
              <Route path="/sales/conformation-final-master" element={<ConformationFinalMaster />} />
              <Route path="/sales/conformation-final-details" element={<ConformationFinalDetails />} />
              <Route path="/purchase/request" element={<PurchaseRequest />} />
              <Route path="/purchase/order" element={<PurchaseOrder />} />
              <Route path="/purchase/order-rev" element={<PurchaseOrder2 />} />
              <Route path="/purchase/order-details" element={<PurchaseOrderDetails />} />
              <Route path="/purchase/order-details-rev" element={<PurchaseOrderDetails2 />} />
              <Route path="/purchase/freight" element={<PurchaseFreight />} />
              <Route path="/purchase/price-link" element={<PurchasePriceLink />} />
              <Route path="/purchase/po-master" element={<POMaster />} />
              <Route path="/purchase/po-order" element={<POOrder />} />
              <Route path="/purchase/po-order-details" element={<POOrderDetails />} />
              <Route path="/purchase/gate-entry" element={<GateEntry />} />
              <Route path="/purchase/gate-entry-details" element={<GateEntryDetails />} />
              <Route path="/purchase/grn-entry" element={<GRNEntry />} />
              <Route path="/purchase/grn-details" element={<GRNEntryDetails />} />
              <Route path="/purchase/grn-details-track" element={<GRNEntryDetailsTrack />} />
              <Route path="/purchase/grn-track" element={<GRNEntryTrack />} />
              <Route path="/purchase/grn-freight" element={<GRNFreightDetails />} />
              <Route path="/purchase/grn-return" element={<GRNReturnDetails />} />
              <Route path="/inventory/material-request" element={<MaterialRequest />} />
              <Route path="/inventory/material-request-ext" element={<MaterialRequest1 />} />
              <Route path="/inventory/material-inward" element={<MaterialInward />} />
              <Route path="/inventory/material-issue" element={<MaterialIssue />} />
              <Route path="/inventory/material-issue-ext" element={<MaterialIssue1 />} />
              <Route path="/inventory/stock-inward" element={<StockInward />} />
              <Route path="/inventory/stock-outward" element={<StockOutward />} />
              <Route path="/inventory/stock-correction" element={<StockOutwardCorrection />} />
              <Route path="/inventory/stock-correction-del" element={<StockOutwardCorrectionDel />} />
              <Route path="/inventory/stock-liability" element={<StockLiability1 />} />
              <Route path="/inventory/stock-liability-alt" element={<StockLiability3 />} />
              <Route path="/inventory/stock-liability-track" element={<StockLiabilityTrack />} />
              <Route path="/inventory/index-master" element={<IndexMaster />} />
              <Route path="/inventory/index-creation" element={<IndexCreation />} />
              <Route path="/inventory/index-creation-track" element={<IndexCreationTrack />} />
              <Route path="/inventory/main-index-master" element={<MainIndexMaster />} />
              <Route path="/inventory/main-index-details" element={<MainIndexDetails />} />
              <Route path="/inventory/ccms" element={<CCMSEntry />} />
              <Route path="/production/job-entry" element={<JobEntry />} />
              <Route path="/production/job-details" element={<JobEntryDetails />} />
              <Route path="/production/job-details-update" element={<JobEntryDetailsUpdate />} />
              <Route path="/production/job-details-audit" element={<JobEntryDetailsAudit />} />
              <Route path="/production/job-files" element={<JobFileUploaded />} />
              <Route path="/production/job-spares" element={<JobSpareEntry />} />
              <Route path="/production/approvals" element={<ApprovedDetails />} />
              <Route path="/production/process-card" element={<ProcessCardMain />} />
              <Route path="/production/process-details" element={<ProcessCardDetails />} />
              <Route path="/production/process-tracking" element={<ProcessCardTracking />} />
              <Route path="/production/rm-issue-master" element={<JobcardRMIssueMaster />} />
              <Route path="/production/rm-issue-details" element={<JobcardRMIssueDetails />} />
              <Route path="/production/breakdown" element={<BreakdownEntry />} />
              <Route path="/delivery/challan" element={<DeliveryChallan />} />
              <Route path="/delivery/challan-details" element={<DeliveryChallanDetails />} />
              <Route path="/delivery/dc-main" element={<DCMain />} />
              <Route path="/delivery/dc-details" element={<DCDetails />} />
              <Route path="/delivery/nc-dc-main" element={<NCDCMain />} />
              <Route path="/delivery/nc-dc-details" element={<NCDCDetails />} />
              <Route path="/service/booking-master" element={<BookingMaster />} />
              <Route path="/service/booking-details" element={<BookingServiceDetails />} />
              <Route path="/service/booking-spares" element={<BookingServiceSpareList />} />
              <Route path="/service/order" element={<ServiceOrder />} />
              <Route path="/service/order-details" element={<ServiceOrderDetails />} />
              <Route path="/service/request" element={<ServiceRequest />} />
              <Route path="/service/transaction" element={<ServiceTran />} />
              <Route path="/service/part-spares" element={<PartSpareList />} />
              <Route path="/service/bill-master" element={<ServiceBillMaster />} />
              <Route path="/service/bill-trans" element={<ServiceBillTrans />} />
              <Route path="/service/bill-labour" element={<ServiceBillLabourChargeDetails />} />
              <Route path="/service/temp-bill-master" element={<TempServiceBillMaster />} />
              <Route path="/service/temp-bill-trans" element={<TempServiceBillTrans />} />
              <Route path="/service/temp-bill-labour" element={<TempServiceBillLabourChargeDetails />} />
              <Route path="/quality/qc-entry" element={<QCEntry />} />
              <Route path="/quality/qc-details" element={<QCEntryDetails />} />
              <Route path="/quality/grn-qc" element={<GRNQCDetails />} />
              <Route path="/quality/nc-details" element={<NCDetails />} />
              <Route path="/quality/prn-file" element={<PRNFile />} />
              <Route path="/quality/fastener-list" element={<FastenerListLink />} />
              <Route path="/quality/drawing-upload" element={<PartFileDrawingUploaded />} />
              <Route path="/drawing/master" element={<DrawingMaster />} />
              <Route path="/drawing/details" element={<DrawingDetails />} />
              <Route path="/drawing/revision" element={<DrawingRevisionDetails />} />
              <Route path="/automation/auto-po" element={<AutoPoDetails />} />
              <Route path="/automation/auto-po-track" element={<AutoPoDetailsTrack />} />
              <Route path="/automation/file-upload" element={<GeneralFileUpload />} />
              <Route path="/automation/edit-details" element={<CurrentEditDetails />} />
              <Route path="/automation/error-logs" element={<ErrorLogs />} />
              <Route path="/automation/backup" element={<BackupEntry />} />
              <Route path="/automation/backup-tbl" element={<BackupTbl />} />
              <Route path="/automation/temp" element={<TempEntry />} />
              <Route path="/automation/test" element={<TestEntry />} />
              <Route path="/automation/test66" element={<Test66Entry />} />
              <Route path="/automation/table1" element={<Table1Entry />} />
              <Route path="/finance/voucher-master" element={<VoucherMast1 />} />
              <Route path="/finance/voucher-entry" element={<VoucherEntry1 />} />
              <Route path="/finance/adjustment" element={<Adjustment1 />} />
              <Route path="/finance/account-tran" element={<AccountTran1 />} />
              <Route path="/finance/day-book" element={<DayBook1 />} />
              <Route path="/finance/day-total" element={<DayTotal1 />} />
              <Route path="/finance/payment-master" element={<PaymentMaster1 />} />
              <Route path="/finance/auto-voucher-payment-adj" element={<AutoVoucherPaymentAdjustment1 />} />
              <Route path="/finance/auto-voucher-payment-cash" element={<AutoVoucherPaymentCash1 />} />
              <Route path="/finance/receipt-master" element={<ReceiptMaster1 />} />
              <Route path="/finance/receipt-trans" element={<ReceiptTrans1 />} />
              <Route path="/finance/auto-voucher-receipt-adj" element={<AutoVoucherReceiptAdjustment1 />} />
              <Route path="/finance/auto-voucher-receipt-cash" element={<AutoVoucherReceiptCash1 />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;