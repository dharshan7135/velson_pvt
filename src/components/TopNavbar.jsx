import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

const routeLabels = {
    '/': ['Dashboard'],
    '/masters/company': ['Masters', 'Company'],
    '/masters/employees': ['Masters', 'Employees'],
    '/masters/contractors': ['Masters', 'Contractors'],
    '/inventory/items': ['Inventory', 'Items'],
    '/inventory/item-groups': ['Inventory', 'Item Groups'],
    '/inventory/characteristics': ['Inventory', 'Characteristics'],
    '/production/machines': ['Production', 'Machines'],
    '/production/processes': ['Production', 'Processes'],
    '/production/service-jobs': ['Production', 'Vehicle Service Master'],
    '/finance/accounts': ['Finance', 'Accounts'],
    '/finance/groups': ['Finance', 'Groups'],
    '/finance/taxes': ['Finance', 'Taxes'],
    '/config/reference-groups': ['Configuration', 'Reference Groups'],
    '/config/references': ['Configuration', 'References'],
    '/config/suppliers': ['Configuration', 'Suppliers'],
};

const TopNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = useAppContext();
    const alerts = state.emergencyAlerts || [];
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const crumbs = routeLabels[location.pathname] || ['Dashboard'];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAlertClick = (e) => {
        setDropdownOpen(false);
        navigate('/alerts');
    };

    const getSeverityColor = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'critical':
            case 'high': return 'text-red-600 bg-red-100'; // High Severity -> Red
            case 'warning':
            case 'medium': return 'text-orange-600 bg-orange-100'; // Medium -> Orange
            case 'info':
            case 'low': return 'text-yellow-600 bg-yellow-100'; // Low -> Yellow
            default: return 'text-slate-600 bg-slate-100';
        }
    };

    const displayCount = alerts.length > 9 ? '9+' : alerts.length;

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                {crumbs.map((crumb, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                        <span className={i === crumbs.length - 1 ? 'text-slate-800 font-semibold' : 'text-slate-400'}>
                            {crumb}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="pl-10 pr-4 py-2 w-60 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 transition-all bg-slate-50/50"
                    />
                </div>

                {/* Notifications */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <Bell className="w-5 h-5 text-slate-500" />
                        {alerts.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-[4px] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                {displayCount}
                            </span>
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-2 z-50">
                            <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                                <h3 className="font-semibold text-slate-800">Emergency Alerts</h3>
                                <span className="text-xs bg-[#0097A7]/10 text-[#0097A7] px-2 py-0.5 rounded-full font-medium">
                                    {alerts.length} New
                                </span>
                            </div>
                            
                            <div className="max-h-[320px] overflow-y-auto">
                                {alerts.length > 0 ? (
                                    alerts.map((alert) => (
                                        <div 
                                            key={alert.id}
                                            onClick={handleAlertClick}
                                            className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors last:border-0"
                                        >
                                            <div className="flex justify-between items-start mb-1 gap-2">
                                                <div className="flex gap-2 items-start">
                                                    <div className={`mt-0.5 p-1 rounded-md shrink-0 ${getSeverityColor(alert.severity)}`}>
                                                        <AlertTriangle className="w-3 h-3" />
                                                    </div>
                                                    <h4 className="text-sm font-medium text-slate-700 leading-tight">
                                                        {alert.title || alert.message}
                                                    </h4>
                                                </div>
                                            </div>
                                            {alert.message && alert.title && (
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 ml-7">
                                                    {alert.message}
                                                </p>
                                            )}
                                            <div className="flex justify-between items-center mt-2 ml-7">
                                                <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${getSeverityColor(alert.severity)}`}>
                                                    {alert.severity}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-slate-500 text-sm">
                                        No active alerts
                                    </div>
                                )}
                            </div>
                            
                            {alerts.length > 0 && (
                                <div className="px-3 pt-2 pb-1 border-t border-slate-100">
                                    <button 
                                        onClick={handleAlertClick}
                                        className="w-full text-center text-sm text-[#0097A7] font-medium hover:text-[#007b8a] hover:bg-[#0097A7]/5 py-2 rounded-lg transition-colors"
                                    >
                                        View All Alerts
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                    A
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
