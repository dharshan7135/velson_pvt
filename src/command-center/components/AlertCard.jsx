import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, AlertOctagon, Info, Wrench, Package,
  Truck, CreditCard, ChevronRight, ExternalLink, Clock
} from 'lucide-react';

const severityConfig = {
  critical: { color: 'text-red-600', icon: AlertOctagon, bg: 'bg-red-50/60', border: 'border-red-500', btnBg: 'bg-red-100', btnHover: 'hover:bg-red-200' },
  warning: { color: 'text-orange-600', icon: AlertTriangle, bg: 'bg-orange-50/60', border: 'border-orange-500', btnBg: 'bg-orange-100', btnHover: 'hover:bg-orange-200' },
  info: { color: 'text-blue-600', icon: Info, bg: 'bg-blue-50/60', border: 'border-blue-500', btnBg: 'bg-blue-100', btnHover: 'hover:bg-blue-200' },
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
  'Check Generators': Wrench,
  'Contact Grid Support': ExternalLink,
  'View Storage': Package,
  'Reroute Logistics': Truck,
  'View Camera Feed': ExternalLink,
  'Dispatch Security': AlertTriangle,
  'Review Schedule': Clock,
  'Assign Crew': Wrench,
  'Run Diagnostics': Wrench,
  'Reset Sensor': Wrench,
};

export default function AlertCard({ alert, index }) {
  const config = severityConfig[alert.severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      className={`relative p-5 rounded-xl border border-slate-200 border-l-4 shadow-sm backdrop-blur-md transition-all ${config.bg} ${config.border}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 items-start">
          <div className={`p-2.5 rounded-xl bg-white shadow-sm shrink-0 ${config.color}`}>
            <Icon size={24} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-base font-bold text-slate-800">{alert.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium pr-8">{alert.message}</p>
            {alert.machineId && (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <span className="px-2 py-1 rounded-md bg-white shadow-sm border border-slate-200 uppercase">
                        Machine: {alert.machineId}
                    </span>
                </div>
            )}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200">
          <Clock size={12} /> {alert.time}
        </div>
      </div>

      {alert.actions && alert.actions.length > 0 && (
        <div className="mt-4 ml-[60px] flex flex-wrap gap-2">
          {alert.actions.map((action) => {
            const ActionIcon = actionIcons[action] || ChevronRight;
            return (
              <button
                key={action}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${config.color} ${config.btnBg} ${config.btnHover} shadow-sm border border-white`}
              >
                <ActionIcon size={14} strokeWidth={2.5} />
                {action}
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
