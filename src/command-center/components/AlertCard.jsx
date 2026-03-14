import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, AlertOctagon, Info, Wrench, Package,
  Truck, CreditCard, ChevronRight, ExternalLink,
} from 'lucide-react';

const severityConfig = {
  critical: { color: '#EF4444', icon: AlertOctagon, bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)' },
  warning: { color: '#F59E0B', icon: AlertTriangle, bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
  info: { color: '#3B82F6', icon: Info, bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)' },
};

const actionIcons = {
  'Dispatch Maintenance': Wrench,
  'Schedule Maintenance': Wrench,
  'Reorder Materials': Package,
  'Notify Warehouse': Package,
  'Track Shipment': Truck,
  'Notify Customer': ExternalLink,
  'Send Reminder': CreditCard,
  'Escalate Issue': AlertOctagon,
  'Emergency Shutdown': AlertOctagon,
  'Notify Supervisor': ExternalLink,
};

export default function AlertCard({ alert, index }) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;
  const isCritical = alert.severity === 'critical';

  return (
    <motion.div
      className={`cc-alert ${isCritical ? 'cc-alert--critical' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ x: 4 }}
      style={{
        '--alert-color': config.color,
        background: config.bg,
        borderLeft: `3px solid ${config.border}`,
      }}
    >
      <div className="cc-alert__header">
        <div className="cc-alert__icon-wrap">
          <Icon size={18} style={{ color: config.color }} />
        </div>
        <div className="cc-alert__info">
          <h4 className="cc-alert__title">{alert.title}</h4>
          <p className="cc-alert__message">{alert.message}</p>
        </div>
        <span className="cc-alert__time">{alert.time}</span>
      </div>

      {alert.actions && (
        <div className="cc-alert__actions">
          {alert.actions.map((action) => {
            const ActionIcon = actionIcons[action] || ChevronRight;
            return (
              <motion.button
                key={action}
                className="cc-alert__action-btn"
                whileHover={{ scale: 1.05, backgroundColor: `${config.color}20` }}
                whileTap={{ scale: 0.95 }}
              >
                <ActionIcon size={14} />
                {action}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
