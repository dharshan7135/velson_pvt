import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Package, Factory, Users,
  AlertCircle, Activity, IndianRupee, Briefcase, ShieldCheck, 
  Info, Filter, ChevronRight, Sliders, ChevronDown, BellRing
} from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';

// --- Luxury Color Palette ---
const LUXURY = {
    royal: '#1D4ED8', emerald: '#047857', gold: '#D97706',
    burgundy: '#831843', charcoal: '#334155', lightBg: '#F8FAFC',
};
const PIE_COLORS = [LUXURY.royal, LUXURY.emerald, LUXURY.gold];

// --- Mock Data Generators ---
const generateSales = (multiplier = 1) => [
  { name: 'Mon', sales: 65 * multiplier, orders: 45 },
  { name: 'Tue', sales: 78 * multiplier, orders: 52 },
  { name: 'Wed', sales: 62 * multiplier, orders: 48 },
  { name: 'Thu', sales: 95 * multiplier, orders: 61 },
  { name: 'Fri', sales: 115 * multiplier, orders: 75 },
  { name: 'Sat', sales: 145 * multiplier, orders: 95 },
  { name: 'Sun', sales: 130 * multiplier, orders: 88 },
];
const categoryData = [{ name: 'Steel', value: 45 }, { name: 'Pipes', value: 25 }, { name: 'Hardware', value: 30 }];
const timelineEvents = [
    { id: 1, time: '10:45 AM', text: 'Invoice #1024 generated for Ram Pipes.', details: 'Amount: ₹24,500. Items: Steel Bars (120 units). Due in 30 days.', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
    { id: 2, time: '10:32 AM', text: 'New employee (John Doe) added to Team B.', details: 'Role: Senior Technician. Assigned to: Machine Shop Floor 1.', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' },
    { id: 3, time: '10:20 AM', text: 'Purchase order #4102 created.', details: 'Vendor: Lakshmi Steels. ETA: 2.4 days. Total Value: ₹1.2 Lakhs.', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    { id: 4, time: '10:05 AM', text: 'Inventory updated for TMT Bars.', details: 'Stock replenished by 500 units. Current stock level is optimal.', icon: Package, color: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' },
];

// --- Animation Variants ---
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

// --- Components ---
const Card = ({ children, className = '' }) => (
  <motion.div variants={cardVariants} className={`bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 ${className}`}>
    {children}
  </motion.div>
);

const NumberCounter = ({ value, duration = 1 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime = null;
        const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
        const format = (val) => typeof value === 'string' && value.includes('₹') ? `₹${val.toLocaleString()}` : typeof value === 'string' && value.includes('%') ? `${Math.floor(val)}%` : Math.floor(val).toLocaleString();
        
        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(format(progress * numericValue));
            if (progress < 1) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    }, [value, duration]);
    return <span>{count}</span>;
};

const KPICard = ({ title, value, icon, trend, trendValue, subtitle, theme = 'royal' }) => {
  const IconComponent = icon;
  const themes = {
    royal: { text: 'text-blue-700', bg: 'bg-blue-50/80', icon: 'text-blue-700' },
    emerald: { text: 'text-emerald-700', bg: 'bg-emerald-50/80', icon: 'text-emerald-700' },
    gold: { text: 'text-amber-600', bg: 'bg-amber-50/80', icon: 'text-amber-600' },
    burgundy: { text: 'text-rose-800', bg: 'bg-rose-50/80', icon: 'text-rose-800' }
  };
  const activeTheme = themes[theme] || themes.royal;

  return (
    <Card className="flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-400 border border-transparent hover:border-slate-100 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3.5 rounded-2xl ${activeTheme.bg} border-b-2 border-r-2 border-white shadow-sm inset-shadow-sm`}>
          <IconComponent className={`w-6 h-6 ${activeTheme.icon}`} strokeWidth={1.5} />
        </div>
        {trend && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${trend === 'up' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-rose-700 bg-rose-50 border border-rose-100'}`}>
            {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trendValue}
          </motion.span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight leading-none mb-2">
            <NumberCounter value={value} />
        </p>
        <h3 className="text-slate-500 font-semibold text-sm">{title}</h3>
        {subtitle && <p className="text-slate-400 text-xs mt-1.5 font-medium">{subtitle}</p>}
      </div>
    </Card>
  );
};

const SectionTitle = ({ title, subtitle, className = "" }) => (
  <div className={`mb-5 ${className}`}>
    <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-slate-500 font-medium mt-0.5">{subtitle}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <motion.div initial={{opacity: 0, y: 5}} animate={{opacity: 1, y: 0}} className="bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-xl border border-slate-100 z-50">
                <p className="text-slate-800 font-bold mb-2 tracking-tight text-sm uppercase">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-semibold mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                        <span style={{ color: entry.color }}>{entry.name}: {entry.value}</span>
                    </div>
                ))}
            </motion.div>
        );
    }
    return null;
};

// --- Main Interactive Dashboard ---
const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('Week'); // Global Filter
  const [salesMultiplier, setSalesMultiplier] = useState(1); // Simulation state
  const [expandedEvent, setExpandedEvent] = useState(null); // Timeline drill-down
  
  // Real-time mockup
  const [liveSales, setLiveSales] = useState(145000);
  const [salesPulse, setSalesPulse] = useState(false);

  useEffect(() => {
     let isMounted = true;
     // Simulate real-time web socket data injection
     const interval = setInterval(() => {
         if (!isMounted) return;
         const burst = Math.floor(Math.random() * 5000);
         if(Math.random() > 0.6) {
             setLiveSales(prev => prev + burst);
             setSalesPulse(true);
             setTimeout(() => {
                 if (isMounted) setSalesPulse(false);
             }, 1000);
         }
     }, 4000);
     
     // Set initial mount
     setTimeout(() => {
         if (isMounted) setMounted(true);
     }, 100);

     return () => {
         isMounted = false;
         clearInterval(interval);
     };
  }, []);

  const activeSalesData = generateSales(timeRange === 'Month' ? 4 : timeRange === 'Quarter' ? 12 : 1).map(d => ({...d, sales: d.sales * salesMultiplier}));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-10 font-sans text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- HEADER & GLOBAL FILTERS --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Command Center
             <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping mr-0.5"></div> Live Stream
             </motion.span>
          </h1>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-lg">
             Enterprise intelligence layer with real-time analytics, predictive simulations, and deep drill-down capabilities.
          </p>
        </div>

        {/* Global Filters */}
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm self-start xl:self-auto">
            <div className="flex bg-slate-100 p-1 rounded-lg">
                {['Today', 'Week', 'Month', 'Quarter'].map(t => (
                    <button key={t} onClick={() => setTimeRange(t)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === t ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>
                        {t}
                    </button>
                ))}
            </div>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" /> Region <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">

      {/* --- EXECUTIVE INTELLIGENCE & HEALTH SCORE --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Central Health Score */}
          <Card className="xl:col-span-2 overflow-hidden relative bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#0F172A] border-0 shadow-2xl p-0">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#D97706]/15 to-transparent rounded-full blur-3xl pointer-events-none -mt-32 -mr-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#1D4ED8]/20 to-transparent rounded-full blur-3xl pointer-events-none -mb-32 -ml-20"></div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10 p-6 md:p-8">
                  <div className="flex-1 w-full order-2 lg:order-1">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-[#D97706] to-[#B45309] rounded-lg shadow-lg">
                              <Activity className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-2xl font-black text-white tracking-wide uppercase">Business Health</h2>
                      </div>
                      
                      {/* AI Intelligence Block inside Health Score */}
                      <div className="mb-8 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                          <h3 className="text-xs font-bold text-[#D97706] uppercase tracking-widest mb-2 flex items-center gap-1.5"><Info className="w-3.5 h-3.5"/> Executive Insights</h3>
                          <ul className="space-y-2">
                              <li className="text-slate-300 text-sm flex items-start gap-2 leading-relaxed"><span className="text-[#10B981] mt-0.5">●</span> Revenue is trending upward by 15% WoW.</li>
                              <li className="text-slate-300 text-sm flex items-start gap-2 leading-relaxed"><span className="text-[#3B82F6] mt-0.5">●</span> Inventory turnover velocity improved by 14%.</li>
                              <li className="text-slate-300 text-sm flex items-start gap-2 leading-relaxed"><span className="text-[#D97706] mt-0.5">●</span> Action required: TMT Bars approaching reorder threshold.</li>
                          </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[{ label: 'Sales Status', status: 'Excellent', color: 'text-[#10B981]' }, { label: 'Inventory ROI', status: 'Strong', color: 'text-[#3B82F6]' }, { label: 'Cash Flow', status: 'Average', color: 'text-[#F59E0B]' }, { label: 'Efficiency', status: 'Peak', color: 'text-[#D97706]' }].map((item, i) => (
                              <div key={i} className="flex flex-col hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{item.label}</span>
                                  <span className={`text-base md:text-lg font-black tracking-tight ${item.color}`}>{item.status}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="relative order-1 lg:order-2 flex flex-col items-center justify-center p-8 bg-black/20 rounded-[2rem] border border-white/5 backdrop-blur-2xl shadow-inner min-w-[320px]">
                      <div className="h-40 w-56 relative overflow-hidden flex justify-center items-end">
                          <ResponsiveContainer width="100%" height={240}>
                              <PieChart>
                                  <Pie data={[{value: 85}, {value: 15}]} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value" stroke="none">
                                      <Cell fill="url(#goldGradient)" />
                                      <Cell fill="rgba(255,255,255,0.05)" />
                                  </Pie>
                                  <defs>
                                      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#D97706" /><stop offset="100%" stopColor="#FBBF24" /></linearGradient>
                                  </defs>
                              </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute bottom-2 text-center pointer-events-none w-full">
                              <div className="flex items-baseline justify-center gap-1">
                                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E2E8F0] tracking-tighter"><NumberCounter value={85} duration={1.5}/></span>
                                  <span className="text-xl font-bold text-slate-400">/100</span>
                              </div>
                              <span className="text-xs font-bold text-[#D97706] uppercase tracking-[0.2em] mt-2 block ">Index Score</span>
                          </div>
                      </div>
                  </div>
              </div>
          </Card>

          {/* What-If Simulation Panel */}
          <Card className="xl:col-span-1 bg-gradient-to-b from-white to-slate-50 border-blue-100 shadow-[0_8px_30px_rgba(29,78,216,0.06)]">
              <SectionTitle title="Predictive Simulator" subtitle="Interactive What-If Scenario Modeling" className="mb-6"/>
              
              <div className="space-y-6">
                  <div>
                      <div className="flex justify-between items-end mb-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Sliders className="w-4 h-4 text-blue-600"/> Scale Production</label>
                          <span className="text-xs font-black text-blue-700 bg-blue-100 px-2 py-1 rounded-md">+{Math.round((salesMultiplier - 1) * 100)}%</span>
                      </div>
                      <input type="range" min="1" max="2" step="0.1" value={salesMultiplier} onChange={(e) => setSalesMultiplier(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Simulated Target Revenue</p>
                      <p className="text-2xl font-black text-emerald-600 tracking-tight">₹{(activeSalesData.reduce((acc, crr) => acc + crr.sales, 0) * 1000).toLocaleString()}</p>
                      <p className="text-xs font-medium text-slate-400 mt-2">Adjusting production scalar directly recalculates the revenue trend projection matrix below.</p>
                  </div>
                  
                  <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">Apply Strategy Lock-in</button>
              </div>
          </Card>
      </div>

      {/* --- LIVE KPI ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div animate={{ scale: salesPulse ? 1.02 : 1 }} transition={{ duration: 0.2 }}>
            <KPICard title="Live Gross Sales" value={`₹${liveSales.toLocaleString()}`} icon={IndianRupee} trend="up" trendValue="+15%" subtitle="Updating in real-time" theme="royal" />
        </motion.div>
        <KPICard title="Assets Value" value="₹24,50L" icon={Briefcase} subtitle="Total capital locked" theme="gold" />
        <KPICard title="Net Profit" value="₹85,000" icon={TrendingUp} trend="up" trendValue="+8%" subtitle="MTD Accrual" theme="emerald" />
        <KPICard title="Machine Yield" value="82%" icon={Factory} subtitle="Current throughput" theme="burgundy" />
      </div>

      {/* --- DASHBOARD GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- ROW 1: Sales Performance Drilldown --- */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <SectionTitle title="Revenue Tracking Projection" subtitle="Interactive area map. Hover points to drill down." className="mb-0" />
                </div>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activeSalesData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={LUXURY.royal} stopOpacity={0.2}/><stop offset="100%" stopColor={LUXURY.royal} stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: LUXURY.charcoal, fontSize: 13, fontWeight: 600}} dy={15} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: LUXURY.charcoal, fontSize: 13, fontWeight: 600}} tickFormatter={(val) => `₹${val}k`} dx={-10} />
                            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area type="monotone" dataKey="sales" stroke="none" fill="url(#colorSales)" />
                            {/* Drilldown trigger on activeDot click in a real app */}
                            <Line type="smooth" dataKey="sales" name="Simulated Revenue" stroke={LUXURY.royal} strokeWidth={4} dot={{r: 5, fill: '#fff', stroke: LUXURY.royal, strokeWidth: 3}} activeDot={{r: 8, strokeWidth: 0, fill: LUXURY.gold, className: 'cursor-pointer hover:scale-150 transition-transform'}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>

        {/* Actionable Alerts Command Center */}
        <div className="lg:col-span-1 space-y-8">
             <Card className="h-full bg-gradient-to-b from-white to-red-50/10 border-red-50">
                <div className="flex justify-between items-start mb-6">
                    <SectionTitle title="Action Command Alerts" subtitle="Prioritized incidents requiring authorization." className="mb-0" />
                    <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><BellRing className="w-3 h-3 animate-bounce"/> 3 Priority</span>
                </div>
                <div className="space-y-4">
                    {/* Deep Burgundy Action Alert */}
                    <div className="flex flex-col gap-3 p-4 bg-white border border-red-100 rounded-2xl shadow-[0_4px_12px_rgba(225,29,72,0.05)] relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 rounded-lg"><AlertCircle className="w-4 h-4 text-red-600"/></div>
                                <div><p className="text-sm font-bold text-slate-800">Critical Stock Level</p><p className="text-xs text-slate-500 font-medium mt-0.5">Steel Pipes below reorder line.</p></div>
                             </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                            {/* Action Buttons */}
                            <button className="flex-1 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm">Auto-Order Stock</button>
                            <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Notify Warehouse</button>
                        </div>
                    </div>
                    
                    {/* Amber Action Alert */}
                    <div className="flex flex-col gap-3 p-4 bg-white border border-amber-100 rounded-2xl shadow-[0_4px_12px_rgba(245,158,11,0.05)] relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg"><IndianRupee className="w-4 h-4 text-amber-600"/></div>
                                <div><p className="text-sm font-bold text-slate-800">Payment Overdue</p><p className="text-xs text-slate-500 font-medium mt-0.5">Invoice #1023 pending 5 days.</p></div>
                             </div>
                        </div>
                         <div className="flex gap-2 mt-1">
                            <button className="flex-1 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors shadow-sm">Send Reminder</button>
                        </div>
                    </div>
                </div>
             </Card>
        </div>

        {/* --- ROW 2: Sector & Inventory --- */}
        <div className="lg:col-span-1 space-y-8">
            <Card className="h-full flex flex-col min-h-[460px]">
                <SectionTitle title="Sector Allocation" subtitle="Sales volume by category." />
                <div className="flex-1 w-full flex flex-col justify-center items-center relative mt-4">
                    <div className="w-full h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="absolute top-[110px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total</span>
                        <span className="text-2xl font-black text-slate-800 tracking-tighter leading-none mt-1">100<span className="text-sm text-slate-400">%</span></span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2 mb-4 w-full cursor-pointer">
                         {categoryData.map((entry, index) => (
                             <motion.div whileHover={{y:-2}} key={index} className="flex items-center gap-1.5">
                                 <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                                 <span className="text-[13px] font-semibold text-slate-700">{entry.name}</span>
                             </motion.div>
                         ))}
                    </div>
                </div>
            </Card>
        </div>

        {/* Expandable Activity Timeline */}
        <div className="lg:col-span-2 space-y-8">
             <Card className="h-full">
                <SectionTitle title="Interactive Activity Timeline" subtitle="Click any event to drill-down into records." />
                <div className="mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                    {timelineEvents.map((item) => (
                        <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6 last:mb-0 cursor-pointer" onClick={() => setExpandedEvent(expandedEvent === item.id ? null : item.id)}>
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.bg} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 ${expandedEvent === item.id ? 'scale-110 ring-4 ring-blue-50' : 'group-hover:scale-110'}`}>
                                <item.icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${expandedEvent === item.id ? item.border : 'border-slate-100'} bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-xs font-bold ${item.color}`}>{item.time}</span>
                                    <motion.div animate={{ rotate: expandedEvent === item.id ? 90 : 0 }}><ChevronRight className="w-4 h-4 text-slate-400"/></motion.div>
                                </div>
                                <p className="text-sm text-slate-700 font-bold">{item.text}</p>
                                
                                {/* Drilled down details */}
                                {expandedEvent === item.id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mt-3 pt-3 border-t border-slate-100">
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.details}</p>
                                            <button className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">View Full Record <ChevronRight className="w-3 h-3"/></button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

      </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
