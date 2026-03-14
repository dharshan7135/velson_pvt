// ============================================================
// MOCK DATA — Velson Manufacturing Command Center
// Production-Flow Focused
// ============================================================

// ─── 1. Real-Time Production Flow KPIs ───
export const productionFlowKPIs = [
  {
    id: 'raw-intake',
    label: 'Raw Material Intake',
    value: 520,
    unit: 'tons',
    subLabel: 'In Last 1 Hour',
    subValue: '+45 tons',
    trend: 'up',
    change: 8.6,
    icon: 'ArrowDownToLine',
    color: '#047857',
    sparkline: [380, 400, 420, 440, 455, 470, 485, 500, 510, 520],
  },
  {
    id: 'throughput',
    label: 'Processing Throughput',
    value: 470,
    unit: 'tons',
    subLabel: 'Throughput Rate',
    subValue: '78 tons/hr',
    trend: 'up',
    change: 5.2,
    icon: 'Cog',
    color: '#1e40af',
    sparkline: [350, 370, 390, 400, 420, 435, 445, 455, 465, 470],
  },
  {
    id: 'finished-output',
    label: 'Finished Output',
    value: 442,
    unit: 'tons',
    subLabel: 'Completion Rate',
    subValue: '94%',
    trend: 'up',
    change: 3.8,
    icon: 'PackageCheck',
    color: '#6366F1',
    sparkline: [310, 330, 345, 360, 375, 390, 405, 418, 430, 442],
  },
  {
    id: 'production-loss',
    label: 'Production Loss',
    value: 28,
    unit: 'tons',
    subLabel: 'Loss Rate',
    subValue: '5.3%',
    trend: 'down',
    change: -1.2,
    icon: 'Trash2',
    color: '#881337',
    sparkline: [35, 33, 32, 30, 31, 29, 30, 28, 29, 28],
  },
  {
    id: 'wip',
    label: 'Work-in-Progress',
    value: 62,
    unit: 'tons',
    subLabel: 'Across 4 Stages',
    subValue: '4 active',
    trend: 'up',
    change: 2.1,
    icon: 'Layers',
    color: '#b8860b',
    sparkline: [50, 52, 55, 54, 58, 56, 59, 60, 61, 62],
  },
  {
    id: 'delay',
    label: 'Production Delay',
    value: 18,
    unit: 'tons',
    subLabel: 'Stage: Heat Treatment',
    subValue: 'M-03 overload',
    trend: 'down',
    change: -3.4,
    icon: 'AlertTriangle',
    color: '#DC2626',
    sparkline: [25, 24, 22, 23, 21, 20, 19, 19, 18, 18],
  },
];

// ─── 2. Stage-Based Production Monitoring ───
export const productionStages = [
  { id: 'raw', name: 'Raw Material', shortName: 'Raw', input: 520, output: 520, loss: 0, status: 'Storage', machineId: '-', color: '#78716c', wipUnits: 0 },
  { id: 'cutting', name: 'Cutting', shortName: 'Cutting', input: 520, output: 505, loss: 15, status: 'Running', machineId: 'M-01', color: '#047857', wipUnits: 120 },
  { id: 'heat', name: 'Heat Treatment', shortName: 'Furnace', input: 505, output: 480, loss: 25, status: 'Running', machineId: 'M-03', color: '#b8860b', wipUnits: 80 },
  { id: 'rolling', name: 'Rolling', shortName: 'Rolling', input: 480, output: 470, loss: 10, status: 'Running', machineId: 'M-04', color: '#1e40af', wipUnits: 50 },
  { id: 'quality', name: 'Quality Check', shortName: 'Inspection', input: 470, output: 442, loss: 28, status: 'Inspection', machineId: 'M-11', color: '#6366F1', wipUnits: 32 },
  { id: 'finished', name: 'Finished Goods', shortName: 'Warehouse', input: 442, output: 442, loss: 0, status: 'Complete', machineId: '-', color: '#10B981', wipUnits: 0 },
];

// ─── 3. Product-Level Production Monitoring ───
export const productProduction = [
  {
    id: 'tmt', name: 'TMT Bars', color: '#10B981',
    inputMaterial: 300, processed: 270, finished: 252, loss: 18,
    status: 'running', activeMachines: 4, qualityRate: 98.2,
    stages: [
      { name: 'Intake', qty: 300 }, { name: 'Cutting', qty: 290 },
      { name: 'Furnace', qty: 278 }, { name: 'Rolling', qty: 270 },
      { name: 'QC', qty: 258 }, { name: 'Finished', qty: 252 },
    ],
  },
  {
    id: 'pipes', name: 'Steel Pipes', color: '#3B82F6',
    inputMaterial: 220, processed: 200, finished: 190, loss: 10,
    status: 'running', activeMachines: 2, qualityRate: 97.5,
    stages: [
      { name: 'Intake', qty: 220 }, { name: 'Cutting', qty: 215 },
      { name: 'Furnace', qty: 208 }, { name: 'Forming', qty: 200 },
      { name: 'QC', qty: 194 }, { name: 'Finished', qty: 190 },
    ],
  },
  {
    id: 'hardware', name: 'Hardware Components', color: '#F59E0B',
    inputMaterial: 150, processed: 130, finished: 118, loss: 12,
    status: 'delayed', activeMachines: 1, qualityRate: 99.1,
    stages: [
      { name: 'Intake', qty: 150 }, { name: 'Cutting', qty: 142 },
      { name: 'Furnace', qty: 136 }, { name: 'Bending', qty: 130 },
      { name: 'QC', qty: 122 }, { name: 'Finished', qty: 118 },
    ],
  },
  {
    id: 'structural', name: 'Structural Steel', color: '#8B5CF6',
    inputMaterial: 180, processed: 168, finished: 158, loss: 10,
    status: 'running', activeMachines: 3, qualityRate: 96.8,
    stages: [
      { name: 'Intake', qty: 180 }, { name: 'Cutting', qty: 175 },
      { name: 'Furnace', qty: 170 }, { name: 'Rolling', qty: 168 },
      { name: 'QC', qty: 162 }, { name: 'Finished', qty: 158 },
    ],
  },
  {
    id: 'wire-rods', name: 'Wire Rods', color: '#EC4899',
    inputMaterial: 120, processed: 108, finished: 100, loss: 8,
    status: 'running', activeMachines: 2, qualityRate: 97.8,
    stages: [
      { name: 'Intake', qty: 120 }, { name: 'Cutting', qty: 116 },
      { name: 'Furnace', qty: 112 }, { name: 'Drawing', qty: 108 },
      { name: 'QC', qty: 104 }, { name: 'Finished', qty: 100 },
    ],
  },
];

// ─── 4. WIP Tracker ───
export const wipTracker = [
  { stage: 'Cutting Stage', units: 120, color: '#047857' },
  { stage: 'Heat Treatment', units: 80, color: '#b8860b' },
  { stage: 'Rolling Stage', units: 50, color: '#1e40af' },
  { stage: 'Inspection', units: 32, color: '#6366F1' },
];

// ─── 5. Machine-Level Production Contribution ───
export const machineContribution = [
  { id: 'M-01', name: 'Rolling Mill #1', output: 420, unit: 'kg', status: 'Running', load: 86, healthScore: 96, color: '#10B981' },
  { id: 'M-02', name: 'Pipe Cutter', output: 360, unit: 'kg', status: 'Running', load: 72, healthScore: 93, color: '#3B82F6' },
  { id: 'M-03', name: 'Induction Furnace', output: 310, unit: 'kg', status: 'High Load', load: 95, healthScore: 78, color: '#b8860b' },
  { id: 'M-04', name: 'Rolling Mill #2', output: 290, unit: 'kg', status: 'Running', load: 68, healthScore: 91, color: '#8B5CF6' },
  { id: 'M-05', name: 'Wire Drawing', output: 240, unit: 'kg', status: 'Running', load: 60, healthScore: 98, color: '#EC4899' },
  { id: 'M-06', name: 'Finisher', output: 210, unit: 'kg', status: 'Idle', load: 0, healthScore: 88, color: '#78716c' },
  { id: 'M-07', name: 'Ladle Refining', output: 280, unit: 'kg', status: 'Running', load: 82, healthScore: 91, color: '#14B8A6' },
  { id: 'M-08', name: 'Continuous Caster', output: 350, unit: 'kg', status: 'Running', load: 78, healthScore: 95, color: '#F97316' },
  { id: 'M-09', name: 'Threading Machine', output: 180, unit: 'kg', status: 'Running', load: 55, healthScore: 99, color: '#0EA5E9' },
  { id: 'M-10', name: 'Bending Machine', output: 150, unit: 'kg', status: 'Maintenance', load: 0, healthScore: 74, color: '#DC2626' },
];

// ─── 6. Real-Time Inventory Flow ───
export const inventoryFlow = [
  { id: 'raw', label: 'Raw Material Stock', value: 820, unit: 'tons', color: '#78716c', icon: 'Layers' },
  { id: 'wip', label: 'Work-In-Progress', value: 145, unit: 'tons', color: '#b8860b', icon: 'Cog' },
  { id: 'finished', label: 'Finished Goods', value: 310, unit: 'tons', color: '#047857', icon: 'PackageCheck' },
  { id: 'reserved', label: 'Reserved Orders', value: 120, unit: 'tons', color: '#1e40af', icon: 'ShoppingCart' },
  { id: 'available', label: 'Available Stock', value: 190, unit: 'tons', color: '#6366F1', icon: 'Truck' },
];

export const inventoryFlowSteps = [
  { from: 'Raw Stock', to: 'Production', value: 520 },
  { from: 'Production', to: 'WIP', value: 145 },
  { from: 'WIP', to: 'Finished Goods', value: 442 },
  { from: 'Finished Goods', to: 'Dispatch', value: 280 },
];

// ─── 7. Bottleneck Detection ───
export const bottlenecks = [
  {
    id: 'BN-001', stage: 'Heat Treatment', delay: '22 min',
    reason: 'Machine M-03 overload — processing at 95% capacity',
    severity: 'critical', machineId: 'M-03',
    impact: '18 tons delayed output',
    suggestion: 'Reduce furnace load or activate standby unit M-06',
  },
  {
    id: 'BN-002', stage: 'Quality Check', delay: '12 min',
    reason: 'Increased rejection rate in batch #B-4419 (TMT Bars)',
    severity: 'warning', machineId: 'M-11',
    impact: '28 tons require re-inspection',
    suggestion: 'Assign additional inspector to QC station',
  },
];

// ─── 8. Emergency Production Alerts ───
export const productionAlerts = [
  {
    id: 'PA-001', severity: 'critical',
    title: 'Furnace Temperature Exceeded Threshold',
    message: 'Induction Furnace M-03 temperature at 1,640°C (threshold: 1,600°C). Automatic cooldown initiated.',
    time: '8 min ago', machineId: 'M-03',
    actions: ['Dispatch Maintenance', 'Reduce Load'],
  },
  {
    id: 'PA-002', severity: 'critical',
    title: 'Steel Pipes Raw Material Below Minimum',
    message: 'Scrap iron stock at 18% capacity. Pipe production may halt within 4 hours.',
    time: '22 min ago',
    actions: ['Order Materials', 'Notify Procurement'],
  },
  {
    id: 'PA-003', severity: 'warning',
    title: 'Machine M-10 Downtime Detected',
    message: 'Bending Machine M-10 offline for unscheduled maintenance. Hardware line affected.',
    time: '45 min ago', machineId: 'M-10',
    actions: ['Dispatch Maintenance', 'Escalate Issue'],
  },
  {
    id: 'PA-004', severity: 'warning',
    title: 'Quality Rejection — Batch #B-4419',
    message: 'TMT Bar batch failed tensile strength test. 12 units rejected at QC stage.',
    time: '1 hr ago', machineId: 'M-11',
    actions: ['View Details', 'Notify Supervisor'],
  },
  {
    id: 'PA-005', severity: 'info',
    title: 'Supplier Shipment Delay — SAIL Billets',
    message: 'Billet shipment from SAIL delayed by 48 hours. ETA revised to Mar 18.',
    time: '2 hrs ago',
    actions: ['Track Shipment', 'Notify Procurement'],
  },
];

// ─── 9. Production Efficiency ───
export const productionEfficiency = {
  expected: 500,
  actual: 442,
  efficiency: 88.4,
  unit: 'tons',
  trend: [
    { hour: '6 AM', expected: 60, actual: 55 },
    { hour: '7 AM', expected: 120, actual: 112 },
    { hour: '8 AM', expected: 180, actual: 170 },
    { hour: '9 AM', expected: 240, actual: 225 },
    { hour: '10 AM', expected: 300, actual: 282 },
    { hour: '11 AM', expected: 360, actual: 340 },
    { hour: '12 PM', expected: 420, actual: 395 },
    { hour: '1 PM', expected: 500, actual: 442 },
  ],
};

// ─── 10. End-of-Day Summary ───
export const eodSummary = {
  totalInput: '540 tons',
  finishedOutput: '442 tons',
  scrapGenerated: '28 tons',
  efficiency: '88%',
  ordersFulfilled: 38,
  downtimeHours: 2.5,
  insights: [
    'Rolling stage improved throughput by 12% compared to yesterday.',
    'Heat treatment stage caused 22-minute delay due to M-03 overload.',
    'Quality pass rate remains excellent at 98.6%.',
    'Scrap iron reorder is critical — stock projected to deplete in 5 days.',
  ],
};

// ─── Digital Production Twin Flow ───
export const digitalTwinStages = [
  { name: 'Raw Steel', qty: 520, icon: 'Layers', color: '#78716c' },
  { name: 'Cutting', qty: 505, icon: 'Scissors', color: '#047857' },
  { name: 'Furnace', qty: 480, icon: 'Flame', color: '#b8860b' },
  { name: 'Rolling', qty: 470, icon: 'Cog', color: '#1e40af' },
  { name: 'Inspection', qty: 442, icon: 'CheckCircle', color: '#6366F1' },
  { name: 'Warehouse', qty: 442, icon: 'Warehouse', color: '#10B981' },
];

// ─── Legacy exports (for components that still import them) ───
export const machines = machineContribution.map((m, i) => ({
  ...m, x: (i % 4) * 2 - 3, z: Math.floor(i / 4) * 2 - 2,
  temperature: 300 + Math.random() * 1200, rpm: Math.random() * 2000,
  vibration: Math.random() * 4,
}));

export const machineStatusColors = {
  Running: '#10B981', 'High Load': '#F59E0B', Idle: '#78716c', Maintenance: '#3B82F6',
};

export const alerts = productionAlerts;

export const kpiData = productionFlowKPIs;

// ─── Additional legacy exports (used by other pages) ───

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

export const revenueData = [
  { date: 'Mar 1', revenue: 520000, orders: 12 },
  { date: 'Mar 2', revenue: 680000, orders: 15 },
  { date: 'Mar 3', revenue: 450000, orders: 10 },
  { date: 'Mar 4', revenue: 720000, orders: 18 },
  { date: 'Mar 5', revenue: 890000, orders: 22 },
  { date: 'Mar 6', revenue: 760000, orders: 19 },
  { date: 'Mar 7', revenue: 610000, orders: 14 },
  { date: 'Mar 8', revenue: 940000, orders: 24 },
  { date: 'Mar 9', revenue: 830000, orders: 20 },
  { date: 'Mar 10', revenue: 1050000, orders: 28 },
  { date: 'Mar 11', revenue: 980000, orders: 25 },
  { date: 'Mar 12', revenue: 1120000, orders: 30 },
  { date: 'Mar 13', revenue: 870000, orders: 21 },
];

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

export const supplyChainData = [
  { supplier: 'Tata Steel Scrap', material: 'Scrap Iron', status: 'on-time', eta: '2 days', quantity: '500 tons' },
  { supplier: 'SAIL Billets', material: 'Billets', status: 'delayed', eta: '5 days', quantity: '300 tons' },
  { supplier: 'JSW Alloys', material: 'Ferro Alloys', status: 'on-time', eta: '1 day', quantity: '80 tons' },
  { supplier: 'Coal India', material: 'Met Coal', status: 'on-time', eta: '3 days', quantity: '200 tons' },
  { supplier: 'Rashtriya Ispat', material: 'Pig Iron', status: 'at-risk', eta: '7 days', quantity: '150 tons' },
];

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
];

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
