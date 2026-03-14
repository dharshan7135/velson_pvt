import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Wallet, Factory, Gauge, Cog, Package,
  ArrowUpRight, ArrowDownRight, CheckCircle, RefreshCw, Shield, Award,
} from 'lucide-react';

const iconMap = { TrendingUp, Wallet, Factory, Gauge, Cog, Package, CheckCircle, RefreshCw, Shield, Award };

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  const formatted = value >= 100000
    ? `${prefix}${(display / 100000).toFixed(2)}L${suffix}`
    : value >= 100
    ? `${prefix}${Math.round(display).toLocaleString('en-IN')}${suffix}`
    : `${prefix}${display.toFixed(1)}${suffix}`;

  return <span>{formatted}</span>;
}

function MiniSparkline({ data, color }) {
  const width = 80;
  const height = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="cc-kpi__sparkline">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#spark-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KPICard({ data, index }) {
  const Icon = iconMap[data.icon] || TrendingUp;
  const isUp = data.trend === 'up';

  return (
    <motion.div
      className="cc-kpi"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${data.color}22` }}
      style={{ '--kpi-color': data.color }}
    >
      <div className="cc-kpi__header">
        <div className="cc-kpi__icon-wrap" style={{ background: `${data.color}15` }}>
          <Icon size={20} style={{ color: data.color }} />
        </div>
        <div className={`cc-kpi__change ${isUp ? 'cc-kpi__change--up' : 'cc-kpi__change--down'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(data.change)}%
        </div>
      </div>
      <div className="cc-kpi__value">
        <AnimatedNumber value={data.value} prefix={data.prefix} suffix={data.suffix} />
      </div>
      <div className="cc-kpi__label">{data.label}</div>
      <div className="cc-kpi__footer">
        <MiniSparkline data={data.sparkline} color={data.color} />
        <div className="cc-kpi__status-dot" style={{ background: data.color }} />
      </div>
    </motion.div>
  );
}
