import React, { useState } from 'react';
import logo from '../assets/logo.png';

const menuItems = [
    {
        label: 'Dashboard',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Masters',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4z" />
                <path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        active: true,
        children: [
            { label: 'Item Master', active: true },
            { label: 'Vendor Master', active: false },
            { label: 'Customer Master', active: false },
            { label: 'Employee Master', active: false },
        ],
    },
    {
        label: 'Inventory',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Purchase',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Sales',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Production',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Reports',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
            </svg>
        ),
        active: false,
    },
    {
        label: 'Settings',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        active: false,
    },
];

const Sidebar = () => {
    const [hovered, setHovered] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState('Masters');

    const expanded = hovered;

    return (
        <aside
            className={`sidebar ${!expanded ? 'sidebar--collapsed' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Logo / Brand */}
            <div className="sidebar__brand">
                <div className="sidebar__logo">
                    <img src={logo} alt="Velson ERP Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </div>
                <span className="sidebar__brand-text">Velson ERP</span>
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav">
                {menuItems.map((item) => (
                    <div key={item.label} className="sidebar__menu-group">
                        <button
                            className={`sidebar__item ${item.active ? 'sidebar__item--active' : ''}`}
                            onClick={() =>
                                item.children
                                    ? setExpandedMenu(expandedMenu === item.label ? '' : item.label)
                                    : null
                            }
                            title={!expanded ? item.label : ''}
                        >
                            <span className="sidebar__item-icon">{item.icon}</span>
                            <span className="sidebar__item-label">{item.label}</span>
                            {item.children && (
                                <svg
                                    className={`sidebar__chevron ${expandedMenu === item.label ? 'sidebar__chevron--open' : ''}`}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6,9 12,15 18,9" />
                                </svg>
                            )}
                        </button>

                        {/* Sub-menu */}
                        {item.children && expandedMenu === item.label && (
                            <div className="sidebar__submenu">
                                {item.children.map((child) => (
                                    <button
                                        key={child.label}
                                        className={`sidebar__subitem ${child.active ? 'sidebar__subitem--active' : ''}`}
                                    >
                                        <span className="sidebar__subitem-dot"></span>
                                        {child.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* User section at bottom */}
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
