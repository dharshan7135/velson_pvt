import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Building2, Users, Handshake,
    Package, Layers, BarChart3, Factory, Cog, Briefcase,
    Landmark, BookOpen, Receipt, Settings, Link2, FileText,
    Truck, ChevronDown, ShoppingCart, Upload, Activity, ClipboardList, ListTree, PenTool,
    ArrowRightLeft, CalendarRange, Banknote, FileOutput, ClipboardCheck, List, CheckCheck, ListChecks,
    Copy, ListOrdered, FileInput, DoorOpen, PackageCheck, History, RotateCcw,
    ArrowDownToLine, ArrowUpFromLine, PenLine, Trash2, ListPlus, LayoutList, MessageSquareWarning,
    RefreshCw, FileSearch, Wrench, AlertTriangle, Car, Hammer, FileClock,
    HardDrive, FlaskConical, Table,
} from 'lucide-react';

const menuItems = [
    {
        label: 'Dashboard', icon: LayoutDashboard, path: '/',
    },
    {
        label: 'Customer & Sales', icon: ShoppingCart,
        children: [
            { label: 'Quotation Entry', path: '/sales/quotation', icon: FileText },
            { label: 'Quotation Details', path: '/sales/quotation-details', icon: Layers },
            { label: 'Quotation Files', path: '/sales/quotation-files', icon: Upload },
            { label: 'Quotation Master', path: '/sales/quotation-master', icon: Landmark },
            { label: 'Quotation Transaction', path: '/sales/quotation-tran', icon: Activity },
            { label: 'Sales Master', path: '/sales/quotation-sales-master', icon: ShoppingCart },
            { label: 'Sales Transaction', path: '/sales/quotation-sales-tran', icon: Activity },
            { label: 'Quote Requests', path: '/sales/quote-request', icon: ClipboardList },
            { label: 'Request Details', path: '/sales/quote-request-details', icon: ListTree },
        ],
    },
    {
        label: 'Sales Order & Billing', icon: Receipt,
        children: [
            { label: 'Sales Master', path: '/sales/sales-master', icon: Receipt },
            { label: 'Sales Transaction', path: '/sales/sales-tran', icon: ArrowRightLeft },
            { label: 'Sales Plan', path: '/sales/sales-plan', icon: CalendarRange },
            { label: 'Bills Outstanding', path: '/sales/bills-out', icon: Banknote },
            { label: 'DC Sales Master', path: '/sales/dc-sales-master', icon: FileOutput },
            { label: 'DC Sales Tran', path: '/sales/dc-sales-tran', icon: FileOutput },
        ],
    },
    {
        label: 'Confirmation List', icon: ClipboardCheck,
        children: [
            { label: 'Confirmation Master', path: '/sales/conformation-master', icon: ClipboardCheck },
            { label: 'Confirmation Details', path: '/sales/conformation-details', icon: List },
            { label: 'Final Master', path: '/sales/conformation-final-master', icon: CheckCheck },
            { label: 'Final Details', path: '/sales/conformation-final-details', icon: ListChecks },
        ],
    },
    {
        label: 'Purchase Request', icon: ClipboardList,
        children: [
            { label: 'Purchase Request', path: '/purchase/request', icon: ClipboardList },
        ],
    },
    {
        label: 'Purchase Order', icon: ShoppingCart,
        children: [
            { label: 'Purchase Order', path: '/purchase/order', icon: ShoppingCart },
            { label: 'PO (Revision)', path: '/purchase/order-rev', icon: Copy },
            { label: 'PO Line Items', path: '/purchase/order-details', icon: ListOrdered },
            { label: 'PO Lines (Rev)', path: '/purchase/order-details-rev', icon: Copy },
            { label: 'PO Freight', path: '/purchase/freight', icon: Truck },
            { label: 'Price Link', path: '/purchase/price-link', icon: Link2 },
            { label: 'PO Template', path: '/purchase/po-master', icon: FileText },
            { label: 'PO Order', path: '/purchase/po-order', icon: FileInput },
            { label: 'PO Order Details', path: '/purchase/po-order-details', icon: ListOrdered },
        ],
    },
    {
        label: 'Gate Entry', icon: DoorOpen,
        children: [
            { label: 'Gate Entry', path: '/purchase/gate-entry', icon: DoorOpen },
            { label: 'Gate Entry Details', path: '/purchase/gate-entry-details', icon: List },
        ],
    },
    {
        label: 'GRN', icon: PackageCheck,
        children: [
            { label: 'GRN Entry', path: '/purchase/grn-entry', icon: PackageCheck },
            { label: 'GRN Details', path: '/purchase/grn-details', icon: ListChecks },
            { label: 'GRN Details Track', path: '/purchase/grn-details-track', icon: History },
            { label: 'GRN Entry Track', path: '/purchase/grn-track', icon: History },
            { label: 'GRN Freight', path: '/purchase/grn-freight', icon: Truck },
            { label: 'GRN Returns', path: '/purchase/grn-return', icon: RotateCcw },
        ],
    },
    {
        label: 'Material Request & Issue', icon: ClipboardList,
        children: [
            { label: 'Material Request', path: '/inventory/material-request', icon: ClipboardList },
            { label: 'Request (Extended)', path: '/inventory/material-request-ext', icon: ClipboardList },
            { label: 'Material Inward', path: '/inventory/material-inward', icon: ArrowDownToLine },
            { label: 'Material Issue', path: '/inventory/material-issue', icon: ArrowUpFromLine },
            { label: 'Issue (Extended)', path: '/inventory/material-issue-ext', icon: ArrowUpFromLine },
        ],
    },
    {
        label: 'Stock Transactions', icon: ArrowRightLeft,
        children: [
            { label: 'Stock Inward', path: '/inventory/stock-inward', icon: ArrowDownToLine },
            { label: 'Stock Outward', path: '/inventory/stock-outward', icon: ArrowUpFromLine },
            { label: 'Outward Correction', path: '/inventory/stock-correction', icon: PenLine },
            { label: 'Correction (Deleted)', path: '/inventory/stock-correction-del', icon: Trash2 },
        ],
    },
    {
        label: 'Stock Liability', icon: BookOpen,
        children: [
            { label: 'Stock Liability', path: '/inventory/stock-liability', icon: BookOpen },
            { label: 'Liability (Alt)', path: '/inventory/stock-liability-alt', icon: BookOpen },
            { label: 'Liability Track', path: '/inventory/stock-liability-track', icon: History },
        ],
    },
    {
        label: 'Index / BOM', icon: ListPlus,
        children: [
            { label: 'Index Master', path: '/inventory/index-master', icon: FileText },
            { label: 'Index Creation', path: '/inventory/index-creation', icon: ListPlus },
            { label: 'Index Track', path: '/inventory/index-creation-track', icon: History },
            { label: 'Main Index Master', path: '/inventory/main-index-master', icon: LayoutList },
            { label: 'Main Index Details', path: '/inventory/main-index-details', icon: ListTree },
        ],
    },
    {
        label: 'CCMS', icon: MessageSquareWarning,
        children: [
            { label: 'CCMS Entry', path: '/inventory/ccms', icon: MessageSquareWarning },
        ],
    },
    {
        label: 'Job Entry', icon: Briefcase,
        children: [
            { label: 'Job Entry', path: '/production/job-entry', icon: Briefcase },
            { label: 'Job Details', path: '/production/job-details', icon: ListOrdered },
            { label: 'Details Update', path: '/production/job-details-update', icon: RefreshCw },
            { label: 'Details Audit', path: '/production/job-details-audit', icon: FileSearch },
            { label: 'File Uploads', path: '/production/job-files', icon: Upload },
            { label: 'Spare Entry', path: '/production/job-spares', icon: Wrench },
            { label: 'Approvals', path: '/production/approvals', icon: CheckCheck },
        ],
    },
    {
        label: 'Process Card', icon: Settings,
        children: [
            { label: 'Process Card', path: '/production/process-card', icon: Cog },
            { label: 'Process Details', path: '/production/process-details', icon: Settings },
            { label: 'Process Tracking', path: '/production/process-tracking', icon: History },
        ],
    },
    {
        label: 'RM Issue', icon: Package,
        children: [
            { label: 'RM Issue Master', path: '/production/rm-issue-master', icon: Package },
            { label: 'RM Issue Details', path: '/production/rm-issue-details', icon: ListOrdered },
        ],
    },
    {
        label: 'Breakdown', icon: AlertTriangle,
        children: [
            { label: 'Breakdown Entry', path: '/production/breakdown', icon: AlertTriangle },
        ],
    },
    {
        label: 'Delivery Challan', icon: FileOutput,
        children: [
            { label: 'Delivery Challan', path: '/delivery/challan', icon: FileOutput },
            { label: 'Challan Details', path: '/delivery/challan-details', icon: ListOrdered },
        ],
    },
    {
        label: 'DC — Dispatch', icon: Truck,
        children: [
            { label: 'DC Main', path: '/delivery/dc-main', icon: Truck },
            { label: 'DC Details', path: '/delivery/dc-details', icon: ListOrdered },
        ],
    },
    {
        label: 'Non-Conformance DC', icon: AlertTriangle,
        children: [
            { label: 'NC DC Main', path: '/delivery/nc-dc-main', icon: AlertTriangle },
            { label: 'NC DC Details', path: '/delivery/nc-dc-details', icon: ListOrdered },
        ],
    },
    {
        label: 'Service Booking', icon: CalendarRange,
        children: [
            { label: 'Booking Master', path: '/service/booking-master', icon: CalendarRange },
            { label: 'Service Details', path: '/service/booking-details', icon: Wrench },
            { label: 'Spare List', path: '/service/booking-spares', icon: Package },
        ],
    },
    {
        label: 'Service Order', icon: ShoppingCart,
        children: [
            { label: 'Service Order', path: '/service/order', icon: ShoppingCart },
            { label: 'Order Details', path: '/service/order-details', icon: ListOrdered },
            { label: 'Service Request', path: '/service/request', icon: ClipboardList },
        ],
    },
    {
        label: 'Service Transactions', icon: Activity,
        children: [
            { label: 'Service Transaction', path: '/service/transaction', icon: Activity },
            { label: 'Part Spare List', path: '/service/part-spares', icon: Layers },
        ],
    },
    {
        label: 'Service Bill', icon: Receipt,
        children: [
            { label: 'Bill Master', path: '/service/bill-master', icon: Receipt },
            { label: 'Bill Transaction', path: '/service/bill-trans', icon: ArrowRightLeft },
            { label: 'Labour Charges', path: '/service/bill-labour', icon: Hammer },
        ],
    },
    {
        label: 'Temp Service Bill', icon: FileClock,
        children: [
            { label: 'Temp Bill Master', path: '/service/temp-bill-master', icon: FileClock },
            { label: 'Temp Bill Trans', path: '/service/temp-bill-trans', icon: FileInput },
            { label: 'Temp Labour Charges', path: '/service/temp-bill-labour', icon: Hammer },
        ],
    },
    {
        label: 'QC Entry', icon: ClipboardCheck,
        children: [
            { label: 'QC Entry', path: '/quality/qc-entry', icon: ClipboardCheck },
            { label: 'QC Details', path: '/quality/qc-details', icon: ListChecks },
            { label: 'GRN QC Details', path: '/quality/grn-qc', icon: PackageCheck },
        ],
    },
    {
        label: 'Non-Conformance', icon: AlertTriangle,
        children: [
            { label: 'NC Details', path: '/quality/nc-details', icon: AlertTriangle },
        ],
    },
    {
        label: 'Parts & Drawings', icon: Layers,
        children: [
            { label: 'PRN File', path: '/quality/prn-file', icon: FileText },
            { label: 'Fastener List', path: '/quality/fastener-list', icon: Link2 },
            { label: 'Drawing Upload', path: '/quality/drawing-upload', icon: Upload },
        ],
    },
    {
        label: 'Drawing Management', icon: PenTool,
        children: [
            { label: 'Drawing Master', path: '/drawing/master', icon: FileText },
            { label: 'Drawing Details', path: '/drawing/details', icon: Layers },
            { label: 'Revision Details', path: '/drawing/revision', icon: RefreshCw },
        ],
    },
    {
        label: 'Auto PO Tracking', icon: ShoppingCart,
        children: [
            { label: 'Auto PO Details', path: '/automation/auto-po', icon: ShoppingCart },
            { label: 'Auto PO Track', path: '/automation/auto-po-track', icon: History },
        ],
    },
    {
        label: 'File Uploads', icon: Upload,
        children: [
            { label: 'General File Upload', path: '/automation/file-upload', icon: Upload },
        ],
    },
    {
        label: 'Error & Audit Logs', icon: AlertTriangle,
        children: [
            { label: 'Edit Details', path: '/automation/edit-details', icon: PenLine },
            { label: 'Error Logs', path: '/automation/error-logs', icon: AlertTriangle },
            { label: 'Backup', path: '/automation/backup', icon: HardDrive },
            { label: 'Backup Table', path: '/automation/backup-tbl', icon: HardDrive },
        ],
    },
    {
        label: 'Temp / Test Tables', icon: FlaskConical,
        children: [
            { label: 'Temp', path: '/automation/temp', icon: FileText },
            { label: 'Test', path: '/automation/test', icon: FlaskConical },
            { label: 'Test66', path: '/automation/test66', icon: FlaskConical },
            { label: 'Table 1', path: '/automation/table1', icon: Table },
        ],
    },
    {
        label: 'Masters', icon: Building2,
        children: [
            { label: 'Company', path: '/masters/company', icon: Building2 },
            { label: 'Employees', path: '/masters/employees', icon: Users },
            { label: 'Contractors', path: '/masters/contractors', icon: Handshake },
        ],
    },
    {
        label: 'Inventory', icon: Package,
        children: [
            { label: 'Items', path: '/inventory/items', icon: Package },
            { label: 'Item Groups', path: '/inventory/item-groups', icon: Layers },
            { label: 'Characteristics', path: '/inventory/characteristics', icon: BarChart3 },
        ],
    },
    {
        label: 'Production', icon: Factory,
        children: [
            { label: 'Machines', path: '/production/machines', icon: Cog },
            { label: 'Processes', path: '/production/processes', icon: Settings },
            { label: 'Service Jobs', path: '/production/service-jobs', icon: Briefcase },
        ],
    },
    {
        label: 'Voucher & Journal', icon: BookOpen,
        children: [
            { label: 'Voucher Master', path: '/finance/voucher-master', icon: BookOpen },
            { label: 'Voucher Entry', path: '/finance/voucher-entry', icon: FileText },
            { label: 'Adjustment', path: '/finance/adjustment', icon: ArrowRightLeft },
            { label: 'Account Trans', path: '/finance/account-tran', icon: Activity },
        ],
    },
    {
        label: 'Day Book & Totals', icon: CalendarRange,
        children: [
            { label: 'Day Book', path: '/finance/day-book', icon: BookOpen },
            { label: 'Day Total', path: '/finance/day-total', icon: BarChart3 },
        ],
    },
    {
        label: 'Payment', icon: Banknote,
        children: [
            { label: 'Payment Master', path: '/finance/payment-master', icon: Banknote },
            { label: 'Auto Pmt Adjustment', path: '/finance/auto-voucher-payment-adj', icon: RefreshCw },
            { label: 'Auto Pmt Cash', path: '/finance/auto-voucher-payment-cash', icon: Banknote },
        ],
    },
    {
        label: 'Receipt', icon: Receipt,
        children: [
            { label: 'Receipt Master', path: '/finance/receipt-master', icon: Receipt },
            { label: 'Receipt Trans', path: '/finance/receipt-trans', icon: ArrowRightLeft },
            { label: 'Auto Rct Adjustment', path: '/finance/auto-voucher-receipt-adj', icon: RefreshCw },
            { label: 'Auto Rct Cash', path: '/finance/auto-voucher-receipt-cash', icon: Receipt },
        ],
    },
    {
        label: 'Finance Masters', icon: Landmark,
        children: [
            { label: 'Accounts', path: '/finance/accounts', icon: BookOpen },
            { label: 'Groups', path: '/finance/groups', icon: BookOpen },
            { label: 'Taxes', path: '/finance/taxes', icon: Receipt },
        ],
    },
    {
        label: 'Configuration', icon: Settings,
        children: [
            { label: 'Reference Groups', path: '/config/reference-groups', icon: Link2 },
            { label: 'References', path: '/config/references', icon: FileText },
            { label: 'Suppliers', path: '/config/suppliers', icon: Truck },
        ],
    },
];

const Sidebar = () => {
    const [hovered, setHovered] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(['Masters']);
    const location = useLocation();
    const navigate = useNavigate();

    const expanded = hovered;

    const toggleMenu = (label) => {
        setExpandedMenus((prev) =>
            prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
        );
    };

    const isActive = (path) => location.pathname === path;
    const isGroupActive = (item) =>
        item.children?.some((c) => location.pathname === c.path);

    return (
        <aside
            className={`sidebar ${!expanded ? 'sidebar--collapsed' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Brand */}
            <div className="sidebar__brand">
                <div className="sidebar__logo">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">V</div>
                </div>
                <span className="sidebar__brand-text">Velson ERP</span>
            </div>

            {/* Nav */}
            <nav className="sidebar__nav">
                {menuItems.map((item) => (
                    <div key={item.label} className="sidebar__menu-group">
                        <button
                            className={`sidebar__item ${(item.path && isActive(item.path)) || isGroupActive(item) ? 'sidebar__item--active' : ''}`}
                            onClick={() => {
                                if (item.children) {
                                    toggleMenu(item.label);
                                    if (!expanded) setHovered(true);
                                } else {
                                    navigate(item.path);
                                }
                            }}
                            title={!expanded ? item.label : ''}
                        >
                            <span className="sidebar__item-icon">
                                <item.icon size={20} />
                            </span>
                            <span className="sidebar__item-label">{item.label}</span>
                            {item.children && (
                                <ChevronDown
                                    size={16}
                                    className={`sidebar__chevron ${expandedMenus.includes(item.label) ? 'sidebar__chevron--open' : ''}`}
                                />
                            )}
                        </button>

                        {item.children && expandedMenus.includes(item.label) && (
                            <div className="sidebar__submenu">
                                {item.children.map((child) => (
                                    <button
                                        key={child.path}
                                        className={`sidebar__subitem ${isActive(child.path) ? 'sidebar__subitem--active' : ''}`}
                                        onClick={() => navigate(child.path)}
                                    >
                                        <span className="sidebar__subitem-dot" />
                                        {child.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar__footer">
                <div className="sidebar__user">
                    <div className="sidebar__avatar">A</div>
                    <div className="sidebar__user-info">
                        <span className="sidebar__user-name">Admin</span>
                        <span className="sidebar__user-role">Super Admin</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
