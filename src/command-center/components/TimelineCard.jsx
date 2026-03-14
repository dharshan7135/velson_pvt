import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, CheckCircle, Wrench, ShoppingCart, FileInput,
  Thermometer, Package, Users, Activity, Shield, Zap, Target,
} from 'lucide-react';

const iconMap = {
  FileText, CheckCircle, Wrench, ShoppingCart, FileInput,
  Thermometer, Package, Users, Activity, Shield, Zap, Target,
};

const typeColors = {
  finance: '#10B981',
  production: '#3B82F6',
  maintenance: '#F59E0B',
  sales: '#EC4899',
  procurement: '#8B5CF6',
  inventory: '#6366F1',
  hr: '#14B8A6',
  safety: '#EF4444',
  utility: '#F97316',
};

export default function TimelineCard({ event, index }) {
  const Icon = iconMap[event.icon] || Activity;
  const color = typeColors[event.type] || '#64748B';

  return (
    <motion.div
      className="cc-timeline-item"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ x: 6 }}
    >
      <div className="cc-timeline-item__line">
        <div className="cc-timeline-item__dot" style={{ background: color, boxShadow: `0 0 12px ${color}60` }} />
        {index < 11 && <div className="cc-timeline-item__connector" />}
      </div>
      <div className="cc-timeline-item__content">
        <div className="cc-timeline-item__header">
          <div className="cc-timeline-item__icon-wrap" style={{ background: `${color}15` }}>
            <Icon size={14} style={{ color }} />
          </div>
          <span className="cc-timeline-item__time">{event.time}</span>
        </div>
        <p className="cc-timeline-item__event">{event.event}</p>
      </div>
    </motion.div>
  );
}
