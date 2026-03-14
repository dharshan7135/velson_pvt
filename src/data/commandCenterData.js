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
