import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Filter } from 'lucide-react';
import AlertCard from '../components/AlertCard';
import { useAppContext } from '../../store/AppContext';
import '../CommandCenter.css';

const severityFilters = ['All', 'Critical', 'Warning', 'Info'];

export default function IncidentAlerts() {
  const [filter, setFilter] = useState('All');
  const { state } = useAppContext();
  const alerts = state.emergencyAlerts || [];

  const filtered = filter === 'All'
    ? alerts
    : alerts.filter((a) => a.severity === filter.toLowerCase());

  return (
    <div className="pf-dashboard">
      <motion.section 
        className="pf-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center border border-red-200 shadow-sm shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Incident Alerts</h2>
              <p className="text-sm text-slate-500 font-medium">Monitor and respond to critical factory incidents</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                {alerts.length} Active Incidents
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mr-2 shrink-0">
            <Filter size={16} /> Filter:
          </div>
          {severityFilters.map((f) => (
            <button
              key={f}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filter === f 
                  ? 'bg-slate-800 text-white shadow-md border-transparent' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {filtered.length > 0 ? filtered.map((alert, i) => (
            <AlertCard key={alert.id} alert={alert} index={i} />
          )) : (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300 text-slate-500 font-medium"
            >
              No {filter !== 'All' ? filter : ''} incidents found.
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
