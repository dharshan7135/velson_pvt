import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownToLine, Cog, PackageCheck, Trash2, Layers, AlertTriangle,
  ChevronDown, Factory, TrendingUp, TrendingDown, Search, X,
  ShoppingCart, Truck, Flame, Scissors, CheckCircle, Warehouse,
  Wrench, ShieldAlert, Zap, Lightbulb, BarChart3, Clock,
  Activity, ArrowRight, Eye, Phone, Package, Timer,
} from 'lucide-react';
import {
  productionFlowKPIs, productionStages, productProduction,
  wipTracker, machineContribution, inventoryFlow, inventoryFlowSteps,
  bottlenecks, productionEfficiency, eodSummary,
  digitalTwinStages,
} from '../../data/commandCenterData';
import { useAppContext } from '../../store/AppContext';
import '../CommandCenter.css';

// ── Animation Variants ──
const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ── Helper: Animated Counter ──
function AnimNum({ value, suffix = '', prefix = '' }) {
  const [disp, setDisp] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisp(value * e);
      if (p < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  const fmt = value >= 1000 ? Math.round(disp).toLocaleString('en-IN') : value >= 10 ? Math.round(disp).toString() : disp.toFixed(1);
  return <span>{prefix}{fmt}{suffix}</span>;
}

// ── Section Header ──
function SectionHeader({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="cc-section-header">
      <div className="cc-section-header__left">
        <div className="cc-section-header__icon"><Icon size={18} /></div>
        <div>
          <h2 className="cc-section-header__title">{title}</h2>
          {subtitle && <p className="cc-section-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {badge && <div className="cc-section-header__badge">{badge}</div>}
    </div>
  );
}

// ── Mini Sparkline ──
function Spark({ data, color, w = 72, h = 28 }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`sp-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#sp-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ══════════════════════════════════════════════
// 1️⃣ PRODUCTION FLOW KPI CARDS
// ══════════════════════════════════════════════
const iconMap = { ArrowDownToLine, Cog, PackageCheck, Trash2, Layers, AlertTriangle };

function FlowKPICard({ kpi, index }) {
  const Icon = iconMap[kpi.icon] || Activity;
  const isUp = kpi.trend === 'up';
  return (
    <motion.div
      className="pf-kpi"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${kpi.color}18` }}
      style={{ '--kpi-accent': kpi.color }}
    >
      <div className="pf-kpi__top">
        <div className="pf-kpi__icon" style={{ background: `${kpi.color}12` }}>
          <Icon size={18} style={{ color: kpi.color }} />
        </div>
        <div className={`pf-kpi__badge ${isUp ? 'pf-kpi__badge--up' : 'pf-kpi__badge--down'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      <div className="pf-kpi__value">
        <AnimNum value={kpi.value} /> <small>{kpi.unit}</small>
      </div>
      <div className="pf-kpi__label">{kpi.label}</div>
      <div className="pf-kpi__sub">
        <span className="pf-kpi__sub-label">{kpi.subLabel}</span>
        <span className="pf-kpi__sub-value" style={{ color: kpi.color }}>{kpi.subValue}</span>
      </div>
      <Spark data={kpi.sparkline} color={kpi.color} />
    </motion.div>
  );
}

// ══════════════════════════════════════════════
// 2️⃣ STAGE-BASED PRODUCTION MONITORING
// ══════════════════════════════════════════════
function StageMonitor({ stages }) {
  const maxInput = stages[0].input;
  return (
    <div className="pf-stage-monitor">
      {/* Flow visualization */}
      <div className="pf-stage-flow">
        {stages.map((s, i) => {
          const widthPct = (s.output / maxInput) * 100;
          return (
            <div key={s.id} className="pf-stage-flow__item">
              <div className="pf-stage-flow__bar-wrap">
                <motion.div
                  className="pf-stage-flow__bar"
                  style={{ background: s.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
                <span className="pf-stage-flow__qty">{s.output}</span>
              </div>
              <span className="pf-stage-flow__name">{s.shortName}</span>
              {i < stages.length - 1 && (
                <div className="pf-stage-flow__arrow">
                  <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                    <ArrowRight size={14} style={{ color: '#b8860b', transform: 'rotate(90deg)' }} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="pf-stage-table-wrap">
        <table className="pf-stage-table">
          <thead>
            <tr>
              <th>Production Stage</th>
              <th>Input</th>
              <th>Output</th>
              <th>Loss</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stages.filter(s => s.id !== 'raw' && s.id !== 'finished').map((s) => {
              const lossPct = ((s.loss / s.input) * 100).toFixed(1);
              return (
                <tr key={s.id}>
                  <td>
                    <span className="pf-stage-table__dot" style={{ background: s.color }} />
                    {s.name}
                    <span className="pf-stage-table__machine">{s.machineId}</span>
                  </td>
                  <td>{s.input} kg</td>
                  <td className="pf-stage-table__bold">{s.output} kg</td>
                  <td style={{ color: s.loss > 15 ? '#881337' : '#b8860b' }}>{s.loss} kg ({lossPct}%)</td>
                  <td>
                    <span className={`pf-stage-table__status pf-stage-table__status--${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// 3️⃣ PRODUCT-LEVEL PRODUCTION MONITORING
// ══════════════════════════════════════════════
function ProductCard({ product, index }) {
  const lossPct = ((product.loss / product.inputMaterial) * 100).toFixed(1);
  const statusCfg = {
    running: { label: 'Running', color: '#047857', bg: '#d1fae5' },
    delayed: { label: 'Delayed', color: '#881337', bg: 'rgba(136,19,55,0.08)' },
    idle: { label: 'Idle', color: '#78716c', bg: '#f5f5f4' },
  };
  const st = statusCfg[product.status] || statusCfg.running;

  return (
    <motion.div
      className="pf-product"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(26,26,46,0.1)' }}
    >
      <div className="pf-product__header">
        <div className="pf-product__name-group">
          <span className="pf-product__dot" style={{ background: product.color }} />
          <span className="pf-product__name">{product.name}</span>
        </div>
        <span className="pf-product__status" style={{ color: st.color, background: st.bg }}>{st.label}</span>
      </div>

      <div className="pf-product__metrics">
        <div className="pf-product__metric">
          <span className="pf-product__metric-val">{product.inputMaterial}</span>
          <span className="pf-product__metric-lbl">Input (tons)</span>
        </div>
        <div className="pf-product__metric">
          <span className="pf-product__metric-val pf-product__metric-val--bold">{product.processed}</span>
          <span className="pf-product__metric-lbl">Processed</span>
        </div>
        <div className="pf-product__metric">
          <span className="pf-product__metric-val" style={{ color: '#047857' }}>{product.finished}</span>
          <span className="pf-product__metric-lbl">Finished</span>
        </div>
        <div className="pf-product__metric">
          <span className="pf-product__metric-val" style={{ color: '#881337' }}>{product.loss}</span>
          <span className="pf-product__metric-lbl">Loss ({lossPct}%)</span>
        </div>
      </div>

      {/* Mini stage flow */}
      <div className="pf-product__flow">
        {product.stages.map((s, i) => (
          <React.Fragment key={i}>
            <div className="pf-product__flow-step">
              <span className="pf-product__flow-qty">{s.qty}</span>
              <span className="pf-product__flow-name">{s.name}</span>
            </div>
            {i < product.stages.length - 1 && <span className="pf-product__flow-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════
// 4️⃣ WIP TRACKER
// ══════════════════════════════════════════════
function WIPTracker({ data }) {
  const total = data.reduce((s, d) => s + d.units, 0);
  return (
    <div className="pf-wip">
      <div className="pf-wip__total">
        <span className="pf-wip__total-val"><AnimNum value={total} /></span>
        <span className="pf-wip__total-lbl">Total WIP Units</span>
      </div>
      <div className="pf-wip__bars">
        {data.map((d, i) => (
          <div key={i} className="pf-wip__bar-row">
            <span className="pf-wip__bar-label">{d.stage}</span>
            <div className="pf-wip__bar-track">
              <motion.div
                className="pf-wip__bar-fill"
                style={{ background: d.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(d.units / total) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              />
            </div>
            <span className="pf-wip__bar-val">{d.units} units</span>
          </div>
        ))}
      </div>
      {/* Pipeline bar */}
      <div className="pf-wip__pipeline">
        <span>Raw</span><ArrowRight size={14} />
        <span>Cutting</span><ArrowRight size={14} />
        <span>Furnace</span><ArrowRight size={14} />
        <span>Rolling</span><ArrowRight size={14} />
        <span>Inspection</span><ArrowRight size={14} />
        <span>Warehouse</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// 5️⃣ MACHINE CONTRIBUTION
// ══════════════════════════════════════════════
function MachineTable({ machines }) {
  const statusColors = { Running: '#047857', 'High Load': '#b8860b', Idle: '#78716c', Maintenance: '#1e40af' };
  return (
    <div className="pf-machine-table-wrap">
      <table className="pf-machine-table">
        <thead>
          <tr><th>Machine</th><th>Output</th><th>Load</th><th>Health</th><th>Status</th></tr>
        </thead>
        <tbody>
          {machines.map((m) => (
            <tr key={m.id}>
              <td>
                <span className="pf-machine-table__dot" style={{ background: m.color }} />
                <strong>{m.id}</strong> {m.name}
              </td>
              <td className="pf-machine-table__bold">{m.output} {m.unit}</td>
              <td>
                <div className="pf-machine-table__load-track">
                  <div className="pf-machine-table__load-fill" style={{ width: `${m.load}%`, background: m.load > 90 ? '#881337' : m.load > 70 ? '#b8860b' : '#047857' }} />
                </div>
                <span className="pf-machine-table__load-val">{m.load}%</span>
              </td>
              <td style={{ color: m.healthScore > 90 ? '#047857' : m.healthScore > 75 ? '#b8860b' : '#881337' }}>{m.healthScore}%</td>
              <td>
                <span className="pf-machine-table__status" style={{ color: statusColors[m.status], background: `${statusColors[m.status]}12` }}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ══════════════════════════════════════════════
// 6️⃣ INVENTORY FLOW
// ══════════════════════════════════════════════
const invIconMap = { Layers, Cog, PackageCheck, ShoppingCart, Truck };

function InventoryFlowPanel({ items, steps }) {
  return (
    <div className="pf-inv-flow">
      <div className="pf-inv-flow__cards">
        {items.map((item, i) => {
          const Icon = invIconMap[item.icon] || Package;
          return (
            <motion.div key={item.id} className="pf-inv-flow__card"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            >
              <div className="pf-inv-flow__card-icon" style={{ background: `${item.color}12` }}>
                <Icon size={18} style={{ color: item.color }} />
              </div>
              <div className="pf-inv-flow__card-val"><AnimNum value={item.value} /> <small>{item.unit}</small></div>
              <div className="pf-inv-flow__card-lbl">{item.label}</div>
            </motion.div>
          );
        })}
      </div>
      {/* Flow visualization */}
      <div className="pf-inv-flow__chain">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="pf-inv-flow__chain-step">
              <span className="pf-inv-flow__chain-name">{s.from}</span>
              <span className="pf-inv-flow__chain-val">{s.value} tons</span>
            </div>
            <motion.div className="pf-inv-flow__chain-arrow" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowRight size={16} style={{ color: '#b8860b' }} />
            </motion.div>
            {i === steps.length - 1 && (
              <div className="pf-inv-flow__chain-step">
                <span className="pf-inv-flow__chain-name">{s.to}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// 7️⃣ BOTTLENECK DETECTOR
// ══════════════════════════════════════════════
function BottleneckPanel({ data }) {
  return (
    <div className="pf-bottleneck-list">
      {data.map((b) => (
        <div key={b.id} className={`pf-bottleneck pf-bottleneck--${b.severity}`}>
          <div className="pf-bottleneck__header">
            <ShieldAlert size={18} style={{ color: b.severity === 'critical' ? '#881337' : '#b8860b' }} />
            <div>
              <span className="pf-bottleneck__title">Bottleneck — {b.stage}</span>
              <span className="pf-bottleneck__delay">Delay: {b.delay}</span>
            </div>
          </div>
          <p className="pf-bottleneck__reason">{b.reason}</p>
          <div className="pf-bottleneck__meta">
            <span>Impact: <strong>{b.impact}</strong></span>
            <span>Machine: <strong>{b.machineId}</strong></span>
          </div>
          <div className="pf-bottleneck__suggestion">
            <Lightbulb size={13} /> {b.suggestion}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
// 8️⃣ ALERT CARDS
// ══════════════════════════════════════════════
function ProdAlertCard({ alert, index }) {
  const sevColors = { critical: '#881337', warning: '#b8860b', info: '#1e40af' };
  const sevBgs = { critical: 'rgba(136,19,55,0.05)', warning: 'rgba(184,134,11,0.05)', info: 'rgba(30,64,175,0.05)' };
  return (
    <motion.div
      className="pf-alert"
      style={{ borderLeftColor: sevColors[alert.severity], background: sevBgs[alert.severity] }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="pf-alert__top">
        <AlertTriangle size={16} style={{ color: sevColors[alert.severity] }} />
        <span className="pf-alert__title">{alert.title}</span>
        <span className="pf-alert__time">{alert.time}</span>
      </div>
      <p className="pf-alert__msg">{alert.message}</p>
      <div className="pf-alert__actions">
        {alert.actions.map((a, i) => (
          <button key={i} className="pf-alert__btn">{a}</button>
        ))}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════
// 9️⃣ EFFICIENCY METER
// ══════════════════════════════════════════════
function EfficiencyMeter({ data }) {
  const pct = data.efficiency;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 90 ? '#047857' : pct >= 80 ? '#b8860b' : '#881337';

  return (
    <div className="pf-efficiency">
      <div className="pf-efficiency__gauge">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(26,26,46,0.06)" strokeWidth="10" />
          <motion.circle
            cx="65" cy="65" r="52" fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div className="pf-efficiency__gauge-text">
          <span className="pf-efficiency__gauge-val" style={{ color }}><AnimNum value={pct} suffix="%" /></span>
        </div>
      </div>
      <div className="pf-efficiency__stats">
        <div className="pf-efficiency__stat">
          <span className="pf-efficiency__stat-lbl">Expected Output</span>
          <span className="pf-efficiency__stat-val">{data.expected} {data.unit}</span>
        </div>
        <div className="pf-efficiency__stat">
          <span className="pf-efficiency__stat-lbl">Actual Output</span>
          <span className="pf-efficiency__stat-val pf-efficiency__stat-val--bold">{data.actual} {data.unit}</span>
        </div>
        <div className="pf-efficiency__stat">
          <span className="pf-efficiency__stat-lbl">Throughput Efficiency</span>
          <span className="pf-efficiency__stat-val" style={{ color }}>{data.efficiency}%</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// 🔟 EOD SUMMARY
// ══════════════════════════════════════════════
function EODPanel({ data }) {
  const metrics = [
    { label: 'Total Input', value: data.totalInput, color: '#78716c' },
    { label: 'Finished Output', value: data.finishedOutput, color: '#047857' },
    { label: 'Scrap Generated', value: data.scrapGenerated, color: '#881337' },
    { label: 'Efficiency', value: data.efficiency, color: '#1e40af' },
    { label: 'Orders Fulfilled', value: data.ordersFulfilled, color: '#6366F1' },
    { label: 'Downtime', value: `${data.downtimeHours} hrs`, color: '#b8860b' },
  ];
  return (
    <div className="pf-eod">
      <div className="pf-eod__grid">
        {metrics.map((m, i) => (
          <div key={i} className="pf-eod__metric">
            <span className="pf-eod__metric-val" style={{ color: m.color }}>{m.value}</span>
            <span className="pf-eod__metric-lbl">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="pf-eod__insights">
        <div className="pf-eod__insights-hdr"><Lightbulb size={15} style={{ color: '#b8860b' }} /> Insights</div>
        <ul className="pf-eod__insights-list">
          {data.insights.map((ins, i) => <li key={i}>{ins}</li>)}
        </ul>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// ⭐ DIGITAL PRODUCTION TWIN
// ══════════════════════════════════════════════
const twinIcons = { Layers, Scissors, Flame, Cog, CheckCircle, Warehouse };

function DigitalTwin({ stages }) {
  return (
    <div className="pf-twin">
      {stages.map((s, i) => {
        const Icon = twinIcons[s.icon] || Activity;
        return (
          <React.Fragment key={i}>
            <motion.div
              className="pf-twin__stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="pf-twin__icon" style={{ background: `${s.color}15`, color: s.color }}>
                <Icon size={20} />
              </div>
              <div className="pf-twin__info">
                <span className="pf-twin__qty">{s.qty}</span>
                <span className="pf-twin__name">{s.name}</span>
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div className="pf-twin__connector" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}>
                <ArrowRight size={18} style={{ color: '#b8860b' }} />
              </motion.div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════
export default function CommandDashboard() {
  const [searchProduct, setSearchProduct] = useState('');
  const { state } = useAppContext();
  const alerts = state.emergencyAlerts || [];

  const filteredProducts = productProduction.filter(p =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="pf-dashboard">
      {/* 1️⃣ Production Flow KPIs */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Activity} title="Real-Time Production Flow" badge="LIVE" />
        <div className="pf-kpi-grid">
          {productionFlowKPIs.map((kpi, i) => <FlowKPICard key={kpi.id} kpi={kpi} index={i} />)}
        </div>
      </motion.section>

      {/* 2️⃣ Stage-Based Production Monitoring */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={BarChart3} title="Stage-Based Production Monitoring" subtitle="Track IN and OUT for every production stage" />
        <StageMonitor stages={productionStages} />
      </motion.section>

      {/* ⭐ Digital Production Twin */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Zap} title="Digital Production Twin" subtitle="Visualize product movement through stages" badge="ADVANCED" />
        <div className="pf-panel">
          <DigitalTwin stages={digitalTwinStages} />
        </div>
      </motion.section>

      {/* 3️⃣ Product-Level Production Monitoring */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Package} title="Product-Level Monitoring" subtitle="Track production per product type" />
        <div className="pf-product-search">
          <Search size={15} />
          <input type="text" placeholder="Search products..." value={searchProduct} onChange={e => setSearchProduct(e.target.value)} />
          {searchProduct && <button onClick={() => setSearchProduct('')}><X size={14} /></button>}
        </div>
        <div className="pf-product-grid">
          {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          {filteredProducts.length === 0 && <div className="pf-empty">No products match "{searchProduct}"</div>}
        </div>
      </motion.section>

      {/* 4️⃣ WIP Tracker + 9️⃣ Efficiency Meter */}
      <motion.section className="pf-section pf-section--split" variants={sectionVariants} initial="hidden" animate="visible">
        <div className="pf-split-left">
          <SectionHeader icon={Layers} title="Work-In-Progress Tracker" />
          <div className="pf-panel"><WIPTracker data={wipTracker} /></div>
        </div>
        <div className="pf-split-right">
          <SectionHeader icon={Zap} title="Production Efficiency" />
          <div className="pf-panel"><EfficiencyMeter data={productionEfficiency} /></div>
        </div>
      </motion.section>

      {/* 5️⃣ Machine Contribution */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Cog} title="Machine-Level Production Contribution" subtitle="Each machine's output, load, and health" />
        <div className="pf-panel"><MachineTable machines={machineContribution} /></div>
      </motion.section>

      {/* 6️⃣ Inventory Flow */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Truck} title="Real-Time Inventory Flow" subtitle="Inventory updates based on production stages" />
        <div className="pf-panel"><InventoryFlowPanel items={inventoryFlow} steps={inventoryFlowSteps} /></div>
      </motion.section>

      {/* 7️⃣ Bottleneck + 8️⃣ Alerts */}
      <motion.section className="pf-section pf-section--split" variants={sectionVariants} initial="hidden" animate="visible">
        <div className="pf-split-left">
          <SectionHeader icon={ShieldAlert} title="Bottleneck Detector" badge="AUTO" />
          <BottleneckPanel data={bottlenecks} />
        </div>
        <div className="pf-split-right">
          <SectionHeader icon={AlertTriangle} title="Emergency Alerts" badge={`${alerts.length}`} />
          <div className="pf-alert-scroll">
            {alerts.map((a, i) => <ProdAlertCard key={a.id} alert={a} index={i} />)}
          </div>
        </div>
      </motion.section>

      {/* 🔟 EOD Summary */}
      <motion.section className="pf-section" variants={sectionVariants} initial="hidden" animate="visible">
        <SectionHeader icon={Clock} title="End-of-Day Production Summary" subtitle="Daily production status and insights" />
        <div className="pf-panel"><EODPanel data={eodSummary} /></div>
      </motion.section>
    </div>
  );
}
