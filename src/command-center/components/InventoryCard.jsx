import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers, Warehouse, AlertTriangle, RefreshCw,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const iconMap = { Layers, Warehouse, AlertTriangle, RefreshCw };

const statusColors = {
  healthy: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
};

export default function InventoryCard({ data, index }) {
  const Icon = iconMap[data.icon] || Layers;
  const color = statusColors[data.status];
  const isUp = data.change > 0;

  return (
    <motion.div
      className="cc-inv-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${color}20` }}
      style={{ '--inv-color': color }}
    >
      <div className="cc-inv-card__top">
        <div className="cc-inv-card__icon" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        {data.change !== 0 && (
          <div className={`cc-inv-card__change ${isUp ? 'cc-inv-card__change--up' : 'cc-inv-card__change--down'}`}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(data.change)}%
          </div>
        )}
      </div>
      <span className="cc-inv-card__value">{data.value}</span>
      <span className="cc-inv-card__label">{data.label}</span>
      <div className="cc-inv-card__status-bar">
        <div className="cc-inv-card__status-fill" style={{ background: color, width: data.status === 'healthy' ? '85%' : data.status === 'warning' ? '50%' : '20%' }} />
      </div>
    </motion.div>
  );
}
