// ============================================================
// MOCK DATA — Velson Manufacturing Command Center
// ============================================================

// ---- KPI Cards ----
export const kpiData = [
  {
    id: 'revenue',
    label: 'Live Gross Revenue',
    value: 18420000,
    prefix: '₹',
    suffix: '',
    change: 12.4,
    trend: 'up',
    sparkline: [12, 15, 13, 18, 16, 20, 19, 22, 21, 24, 23, 26],
    color: '#10B981',
    icon: 'TrendingUp',
  },
  {
    id: 'profit',
    label: 'Net Profit',
    value: 4250000,
    prefix: '₹',
    suffix: '',
    change: 8.7,
    trend: 'up',
    sparkline: [8, 10, 9, 11, 10, 13, 12, 14, 13, 15, 14, 16],
    color: '#6366F1',
    icon: 'Wallet',
  },
  {
    id: 'production',
    label: 'Production Output',
    value: 2840,
    prefix: '',
    suffix: ' tons',
    change: 5.2,
    trend: 'up',
    sparkline: [20, 22, 21, 25, 24, 28, 26, 30, 29, 32, 31, 34],
    color: '#F59E0B',
    icon: 'Factory',
  },
  {
    id: 'efficiency',
    label: 'Factory Efficiency',
    value: 94.2,
    prefix: '',
    suffix: '%',
    change: 2.1,
    trend: 'up',
    sparkline: [88, 89, 90, 91, 90, 92, 91, 93, 92, 94, 93, 94],
    color: '#EC4899',
    icon: 'Gauge',
  },
  {
    id: 'utilization',
    label: 'Machine Utilization',
    value: 87.5,
    prefix: '',
    suffix: '%',
    change: -1.3,
    trend: 'down',
    sparkline: [90, 89, 88, 87, 88, 86, 87, 86, 88, 87, 88, 87],
    color: '#3B82F6',
    icon: 'Cog',
  },
  {
    id: 'inventory',
    label: 'Inventory Health',
    value: 91.8,
    prefix: '',
    suffix: '%',
    change: 3.5,
    trend: 'up',
    sparkline: [85, 86, 87, 88, 89, 90, 89, 91, 90, 92, 91, 92],
    color: '#8B5CF6',
    icon: 'Package',
  },
];

// ---- Machines ----
export const machines = [
  { id: 'M-01', name: 'TMT Rolling Mill #1', status: 'running', temperature: 842, rpm: 1450, load: 78, vibration: 2.1, healthScore: 96, x: -3, z: -2 },
  { id: 'M-02', name: 'TMT Rolling Mill #2', status: 'running', temperature: 856, rpm: 1420, load: 82, vibration: 2.3, healthScore: 93, x: -1, z: -2 },
  { id: 'M-03', name: 'Pipe Forming Line', status: 'running', temperature: 620, rpm: 980, load: 65, vibration: 1.8, healthScore: 97, x: 1, z: -2 },
  { id: 'M-04', name: 'Structural Cutter', status: 'idle', temperature: 180, rpm: 0, load: 0, vibration: 0.2, healthScore: 88, x: 3, z: -2 },
  { id: 'M-05', name: 'Induction Furnace #1', status: 'running', temperature: 1580, rpm: 0, load: 92, vibration: 3.2, healthScore: 89, x: -3, z: 0 },
  { id: 'M-06', name: 'Induction Furnace #2', status: 'maintenance', temperature: 320, rpm: 0, load: 0, vibration: 0.5, healthScore: 74, x: -1, z: 0 },
  { id: 'M-07', name: 'Ladle Refining', status: 'running', temperature: 1620, rpm: 45, load: 88, vibration: 2.8, healthScore: 91, x: 1, z: 0 },
  { id: 'M-08', name: 'Continuous Caster', status: 'running', temperature: 1100, rpm: 120, load: 75, vibration: 2.0, healthScore: 95, x: 3, z: 0 },
  { id: 'M-09', name: 'Wire Drawing Machine', status: 'running', temperature: 380, rpm: 2200, load: 70, vibration: 1.5, healthScore: 98, x: -3, z: 2 },
  { id: 'M-10', name: 'Threading Machine', status: 'running', temperature: 290, rpm: 1800, load: 55, vibration: 1.2, healthScore: 99, x: -1, z: 2 },
  { id: 'M-11', name: 'Quenching Line', status: 'running', temperature: 950, rpm: 340, load: 80, vibration: 2.5, healthScore: 92, x: 1, z: 2 },
  { id: 'M-12', name: 'Pipe Cutter', status: 'failure', temperature: 420, rpm: 0, load: 0, vibration: 8.5, healthScore: 32, x: 3, z: 2 },
  { id: 'M-13', name: 'Bending Machine', status: 'running', temperature: 310, rpm: 600, load: 62, vibration: 1.6, healthScore: 94, x: -2, z: 4 },
  { id: 'M-14', name: 'Heat Treatment Oven', status: 'running', temperature: 1240, rpm: 0, load: 85, vibration: 3.8, healthScore: 67, x: 0, z: 4 },
  { id: 'M-15', name: 'Finishing Line', status: 'idle', temperature: 150, rpm: 0, load: 0, vibration: 0.1, healthScore: 82, x: 2, z: 4 },
  { id: 'M-16', name: 'Packaging Unit', status: 'running', temperature: 75, rpm: 450, load: 40, vibration: 0.8, healthScore: 100, x: 4, z: 4 },
];

export const machineStatusColors = {
  running: '#10B981',
  idle: '#F59E0B',
  maintenance: '#3B82F6',
  failure: '#EF4444',
};

// ---- Production Data ----
export const dailyProductionTrend = [
  { day: 'Mon', TMTBars: 420, SteelPipes: 180, Hardware: 95, Structural: 210 },
  { day: 'Tue', TMTBars: 450, SteelPipes: 195, Hardware: 102, Structural: 225 },
  { day: 'Wed', TMTBars: 435, SteelPipes: 170, Hardware: 88, Structural: 198 },
  { day: 'Thu', TMTBars: 480, SteelPipes: 210, Hardware: 110, Structural: 245 },
  { day: 'Fri', TMTBars: 460, SteelPipes: 200, Hardware: 105, Structural: 230 },
  { day: 'Sat', TMTBars: 390, SteelPipes: 160, Hardware: 78, Structural: 185 },
  { day: 'Sun', TMTBars: 320, SteelPipes: 130, Hardware: 60, Structural: 150 },
];

export const productCategoryOutput = [
  { name: 'TMT Bars', value: 2955, color: '#10B981' },
  { name: 'Steel Pipes', value: 1245, color: '#3B82F6' },
  { name: 'Hardware', value: 638, color: '#F59E0B' },
  { name: 'Structural Steel', value: 1443, color: '#8B5CF6' },
];

export const machineUtilizationData = [
  { machine: 'Mill #1', utilization: 92 },
  { machine: 'Mill #2', utilization: 88 },
  { machine: 'Pipe Line', utilization: 76 },
  { machine: 'Cutter', utilization: 45 },
  { machine: 'Furnace #1', utilization: 95 },
  { machine: 'Furnace #2', utilization: 0 },
  { machine: 'Ladle', utilization: 89 },
  { machine: 'Caster', utilization: 82 },
];

export const efficiencyGaugeData = { value: 94.2, target: 96 };

// ---- Alerts ----
export const alerts = [
  {
    id: 'ALT-001',
    severity: 'critical',
    title: 'Pipe Cutter M-12 Failure',
    message: 'Abnormal vibration detected (8.5 mm/s). Machine halted automatically.',
    time: '10 min ago',
    machineId: 'M-12',
    actions: ['Dispatch Maintenance', 'Escalate Issue'],
  },
  {
    id: 'ALT-002',
    severity: 'critical',
    title: 'Overheating — Heat Treatment Oven M-14',
    message: 'Temperature exceeding safe threshold (1240°C). Coolant system check required.',
    time: '25 min ago',
    machineId: 'M-14',
    actions: ['Dispatch Maintenance', 'Emergency Shutdown'],
  },
  {
    id: 'ALT-003',
    severity: 'warning',
    title: 'Furnace #2 Maintenance Overdue',
    message: 'Scheduled maintenance was due 12 hours ago. Lining inspection pending.',
    time: '1 hr ago',
    machineId: 'M-06',
    actions: ['Schedule Maintenance', 'Notify Supervisor'],
  },
  {
    id: 'ALT-004',
    severity: 'warning',
    title: 'Low Raw Material Stock — Scrap Iron',
    message: 'Scrap iron stock at 18% capacity. Reorder threshold breached.',
    time: '2 hrs ago',
    actions: ['Reorder Materials', 'Notify Warehouse'],
  },
  {
    id: 'ALT-005',
    severity: 'info',
    title: 'Shipment Delayed — Order #V-4821',
    message: 'TMT Bar shipment to Hyderabad delayed by 6 hours due to transport issue.',
    time: '3 hrs ago',
    actions: ['Track Shipment', 'Notify Customer'],
  },
  {
    id: 'ALT-006',
    severity: 'warning',
    title: 'Payment Overdue — Invoice #INV-1087',
    message: 'Payment of ₹4,20,000 from Andhra Steel Corp overdue by 15 days.',
    time: '5 hrs ago',
    actions: ['Send Reminder', 'Escalate Issue'],
  },
];

// ---- Inventory ----
export const inventoryCards = [
  { label: 'Raw Material Stock', value: '2,450 tons', change: -8.2, status: 'warning', icon: 'Layers' },
  { label: 'Warehouse Utilization', value: '78%', change: 3.1, status: 'healthy', icon: 'Warehouse' },
  { label: 'Reorder Alerts', value: '3 items', change: 0, status: 'critical', icon: 'AlertTriangle' },
  { label: 'Inventory Turnover', value: '6.2x', change: 1.5, status: 'healthy', icon: 'RefreshCw' },
];

export const inventoryByCategory = [
  { category: 'Scrap Iron', stock: 320, capacity: 1800 },
  { category: 'Billets', stock: 680, capacity: 1200 },
  { category: 'Wire Rods', stock: 450, capacity: 800 },
  { category: 'Pig Iron', stock: 280, capacity: 600 },
  { category: 'Alloys', stock: 120, capacity: 300 },
  { category: 'Coal', stock: 890, capacity: 1500 },
];

export const warehouseUsage = [
  { zone: 'Zone A — Raw', used: 85, total: 100 },
  { zone: 'Zone B — WIP', used: 62, total: 100 },
  { zone: 'Zone C — Finished', used: 91, total: 100 },
  { zone: 'Zone D — Spare', used: 34, total: 100 },
];

export const stockDepletion = [
  { day: 'Day 1', scrapIron: 320, billets: 680, wireRods: 450 },
  { day: 'Day 5', scrapIron: 260, billets: 580, wireRods: 400 },
  { day: 'Day 10', scrapIron: 190, billets: 470, wireRods: 340 },
  { day: 'Day 15', scrapIron: 120, billets: 350, wireRods: 270 },
  { day: 'Day 20', scrapIron: 60, billets: 230, wireRods: 190 },
  { day: 'Day 25', scrapIron: 10, billets: 120, wireRods: 110 },
  { day: 'Day 30', scrapIron: 0, billets: 20, wireRods: 40 },
];

// ---- Revenue ----
export const revenueData = [
  { date: 'Mar 1', revenue: 520000, orders: 12, category: 'TMT Bars' },
  { date: 'Mar 2', revenue: 680000, orders: 15, category: 'Steel Pipes' },
  { date: 'Mar 3', revenue: 450000, orders: 10, category: 'Hardware' },
  { date: 'Mar 4', revenue: 720000, orders: 18, category: 'Structural' },
  { date: 'Mar 5', revenue: 890000, orders: 22, category: 'TMT Bars' },
  { date: 'Mar 6', revenue: 760000, orders: 19, category: 'Steel Pipes' },
  { date: 'Mar 7', revenue: 610000, orders: 14, category: 'TMT Bars' },
  { date: 'Mar 8', revenue: 940000, orders: 24, category: 'Structural' },
  { date: 'Mar 9', revenue: 830000, orders: 20, category: 'TMT Bars' },
  { date: 'Mar 10', revenue: 1050000, orders: 28, category: 'Steel Pipes' },
  { date: 'Mar 11', revenue: 980000, orders: 25, category: 'Hardware' },
  { date: 'Mar 12', revenue: 1120000, orders: 30, category: 'TMT Bars' },
  { date: 'Mar 13', revenue: 870000, orders: 21, category: 'Structural' },
];

// ---- Timeline ----
export const timelineEvents = [
  { time: '10:45 AM', event: 'Invoice #1024 created for Andhra Steel Corp', type: 'finance', icon: 'FileText' },
  { time: '10:40 AM', event: 'TMT Bar batch #B-4421 quality approved', type: 'production', icon: 'CheckCircle' },
  { time: '10:30 AM', event: 'Machine #22 maintenance started — Est. 4 hrs', type: 'maintenance', icon: 'Wrench' },
  { time: '10:25 AM', event: 'New order received — 200 tons TMT from Chennai Builders', type: 'sales', icon: 'ShoppingCart' },
  { time: '10:20 AM', event: 'Purchase order #PO-881 created for scrap iron', type: 'procurement', icon: 'FileInput' },
  { time: '10:15 AM', event: 'Furnace #1 temperature adjusted to 1580°C', type: 'production', icon: 'Thermometer' },
  { time: '10:05 AM', event: 'Inventory stock updated — Wire Rods +120 tons', type: 'inventory', icon: 'Package' },
  { time: '09:55 AM', event: 'Shift B crew checked in — 42 operators', type: 'hr', icon: 'Users' },
  { time: '09:45 AM', event: 'Conveyor belt speed optimized on Line 3', type: 'production', icon: 'Activity' },
  { time: '09:30 AM', event: 'Daily safety briefing completed', type: 'safety', icon: 'Shield' },
  { time: '09:15 AM', event: 'Power consumption report generated — 2840 kWh', type: 'utility', icon: 'Zap' },
  { time: '09:00 AM', event: 'Morning production targets set for all lines', type: 'production', icon: 'Target' },
];

// ---- Supply Chain ----
export const supplyChainData = [
  { supplier: 'Tata Steel Scrap', material: 'Scrap Iron', status: 'on-time', eta: '2 days', quantity: '500 tons' },
  { supplier: 'SAIL Billets', material: 'Billets', status: 'delayed', eta: '5 days', quantity: '300 tons' },
  { supplier: 'JSW Alloys', material: 'Ferro Alloys', status: 'on-time', eta: '1 day', quantity: '80 tons' },
  { supplier: 'Coal India', material: 'Met Coal', status: 'on-time', eta: '3 days', quantity: '200 tons' },
  { supplier: 'Rashtriya Ispat', material: 'Pig Iron', status: 'at-risk', eta: '7 days', quantity: '150 tons' },
];

// ---- Sales Analytics ----
export const salesByRegion = [
  { region: 'Andhra Pradesh', sales: 4800000 },
  { region: 'Telangana', sales: 3600000 },
  { region: 'Tamil Nadu', sales: 2900000 },
  { region: 'Karnataka', sales: 2200000 },
  { region: 'Maharashtra', sales: 1800000 },
  { region: 'Others', sales: 3120000 },
];

export const salesTrend = [
  { month: 'Oct', sales: 14200000 },
  { month: 'Nov', sales: 15800000 },
  { month: 'Dec', sales: 13900000 },
  { month: 'Jan', sales: 16500000 },
  { month: 'Feb', sales: 17200000 },
  { month: 'Mar', sales: 18420000 },
];

// ---- Sidebar Navigation Items ----
export const commandCenterNav = [
  { id: 'command-center', label: 'Command Center', icon: 'LayoutDashboard', path: '/' },
  { id: 'production', label: 'Production Monitoring', icon: 'Factory', path: '/production' },
  { id: 'factory-3d', label: '3D Factory View', icon: 'Box', path: '/factory-3d' },
  { id: 'machine-health', label: 'Machine Health', icon: 'HeartPulse', path: '/machine-health' },
  { id: 'inventory', label: 'Inventory Intelligence', icon: 'Package', path: '/inventory' },
  { id: 'supply-chain', label: 'Supply Chain', icon: 'Truck', path: '/supply-chain' },
  { id: 'sales', label: 'Sales Analytics', icon: 'BarChart3', path: '/sales' },
  { id: 'timeline', label: 'Activity Timeline', icon: 'Clock', path: '/timeline' },
  { id: 'alerts', label: 'Incident Alerts', icon: 'AlertTriangle', path: '/alerts' },
];
