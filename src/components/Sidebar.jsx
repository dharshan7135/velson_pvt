import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Building2, Users, Handshake,
    Package, Layers, BarChart3, Factory, Cog, Briefcase,
    Landmark, BookOpen, Receipt, Settings, Link2, FileText,
    Truck, ChevronDown,
} from 'lucide-react';

const menuItems = [
    {
        label: 'Dashboard', icon: LayoutDashboard, path: '/',
    },
    {
        label: 'Masters', icon: Building2,
        children: [
            { label: 'Company Master', path: '/masters/company' },
            { label: 'Employee Master', path: '/masters/employees' },
            { label: 'Contractor Master', path: '/masters/contractors' },
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
            { label: 'Vehicle Service Master', path: '/production/service-jobs', icon: Briefcase },
        ],
    },
    {
        label: 'Finance', icon: Landmark,
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

const Sidebar = ({ activePage, setActivePage }) => {
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
                                        key={child.label}
                                        className={`sidebar__subitem ${isActive(child.path) ? 'sidebar__subitem--active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (child.path) navigate(child.path);
                                        }}
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
