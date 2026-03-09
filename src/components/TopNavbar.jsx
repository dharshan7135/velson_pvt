import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ChevronRight } from 'lucide-react';

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
    '/production/service-jobs': ['Production', 'Service Jobs'],
    '/finance/accounts': ['Finance', 'Accounts'],
    '/finance/groups': ['Finance', 'Groups'],
    '/finance/taxes': ['Finance', 'Taxes'],
    '/config/reference-groups': ['Configuration', 'Reference Groups'],
    '/config/references': ['Configuration', 'References'],
    '/config/suppliers': ['Configuration', 'Suppliers'],
};

const TopNavbar = () => {
    const location = useLocation();
    const crumbs = routeLabels[location.pathname] || ['Dashboard'];

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
                <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                    <Bell className="w-5 h-5 text-slate-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                    A
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
