import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, Handshake, Package, Layers,
  BarChart3, Factory, Cog, Briefcase, Landmark, BookOpen, Receipt,
  Settings, Link2, FileText, Truck, ChevronDown, ShoppingCart,
  Activity, ClipboardList, Car, Wrench, Shield, HardDrive, Database
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  {
    label: 'Masters', icon: Building2,
    children: [
      { label: 'Company', path: '/masters/company', icon: Building2 },
      { label: 'Employees', path: '/masters/employees', icon: Users },
      { label: 'Customers', path: '/masters/customers', icon: Briefcase },
      { label: 'Suppliers', path: '/masters/suppliers', icon: Truck },
      { label: 'Contractors', path: '/masters/contractors', icon: Handshake },
      { label: 'Machines', path: '/masters/machines', icon: Cog },
      { label: 'Processes', path: '/masters/processes', icon: Settings },
      { label: 'Vehicles', path: '/masters/vehicles', icon: Car },
      { label: 'Vehicle Service', path: '/masters/vehicle-service', icon: Wrench },
    ],
  },
  {
    label: 'Inventory', icon: Package,
    children: [
      { label: 'Items', path: '/inventory/items', icon: Package },
      { label: 'Item Groups', path: '/inventory/item-groups', icon: Layers },
      { label: 'Part Number Base', path: '/inventory/part-number-base', icon: BarChart3 },
      { label: 'Part Usage List', path: '/inventory/part-usage', icon: ClipboardList },
      { label: 'Auto PO', path: '/inventory/auto-po', icon: ShoppingCart },
    ],
  },
  {
    label: 'Sales', icon: ShoppingCart,
    children: [
      { label: 'Quotations', path: '/sales/quotations', icon: FileText },
      { label: 'Create Quotation', path: '/sales/quotation/new', icon: FileText },
    ],
  },
  {
    label: 'Accounting', icon: Landmark,
    children: [
      { label: 'Invoices', path: '/accounting/invoices', icon: Receipt },
      { label: 'Journal Entries', path: '/accounting/journal-entries', icon: BookOpen },
      { label: 'Ledger Groups', path: '/accounting/ledger-groups', icon: Layers },
    ],
  },
  {
    label: 'Quality Control', icon: ClipboardList,
    children: [
      { label: 'Check Methods', path: '/quality/check-methods', icon: Activity },
      { label: 'Inspection Chars', path: '/quality/inspection-chars', icon: BarChart3 },
      { label: 'Material Standards', path: '/quality/material-standards', icon: ClipboardList },
    ],
  },
  {
    label: 'Configuration', icon: Settings,
    children: [
      { label: 'Reference Groups', path: '/config/reference-groups', icon: Link2 },
      { label: 'Reference Values', path: '/config/reference-values', icon: FileText },
      { label: 'Ledger Master', path: '/config/ledger-master', icon: BookOpen },
      { label: 'Tax Master', path: '/config/tax-master', icon: Receipt },
    ],
  },
  {
    label: 'User Management', icon: Users,
    children: [
      { label: 'Create User', path: '/users/create', icon: Users },
      { label: 'All Users', path: '/users/all', icon: Users },
      { label: 'Roles', path: '/users/roles', icon: Shield },
      { label: 'Menus', path: '/users/menus', icon: Layers },
      { label: 'Sub Menus', path: '/users/sub-menus', icon: Layers },
      { label: 'Assign Role to Menu', path: '/users/assign-role-menu', icon: Link2 },
      { label: 'Assign Role to User', path: '/users/assign-role-user', icon: Link2 },
    ],
  },
  {
    label: 'System Admin', icon: HardDrive,
    children: [
      { label: 'System Info', path: '/admin/system-info', icon: Database },
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
