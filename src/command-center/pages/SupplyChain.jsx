import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck, Clock, CheckCircle, AlertTriangle, MapPin,
} from 'lucide-react';
import { supplyChainData } from '../../data/commandCenterData';

const statusConfig = {
  'on-time': { color: '#10B981', icon: CheckCircle, label: 'On Time' },
  'delayed': { color: '#F59E0B', icon: Clock, label: 'Delayed' },
  'at-risk': { color: '#EF4444', icon: AlertTriangle, label: 'At Risk' },
};

export default function SupplyChain() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Supply Chain Tracking</h2>
      <p className="cc-page__subheading">Monitor inbound material shipments and supplier performance</p>

      <div className="cc-supply__grid">
        {supplyChainData.map((item, i) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={item.supplier}
              className="cc-supply__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              style={{ '--supply-color': config.color }}
            >
              <div className="cc-supply__card-header">
                <div className="cc-supply__card-icon" style={{ background: `${config.color}15` }}>
                  <Truck size={20} style={{ color: config.color }} />
                </div>
                <span className="cc-supply__status" style={{ color: config.color, borderColor: `${config.color}40` }}>
                  <StatusIcon size={12} />
                  {config.label}
                </span>
              </div>

              <h4 className="cc-supply__supplier">{item.supplier}</h4>
              <p className="cc-supply__material">{item.material} — {item.quantity}</p>

              <div className="cc-supply__meta">
                <div className="cc-supply__meta-item">
                  <Clock size={14} />
                  <span>ETA: {item.eta}</span>
                </div>
                <div className="cc-supply__meta-item">
                  <MapPin size={14} />
                  <span>In Transit</span>
                </div>
              </div>

              <div className="cc-supply__progress-track">
                <motion.div
                  className="cc-supply__progress-fill"
                  style={{ background: config.color }}
                  initial={{ width: 0 }}
                  animate={{ width: item.status === 'on-time' ? '75%' : item.status === 'delayed' ? '40%' : '20%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
