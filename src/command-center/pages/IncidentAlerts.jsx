import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AlertCard from '../components/AlertCard';
import { alerts } from '../../data/commandCenterData';

const severityFilters = ['All', 'Critical', 'Warning', 'Info'];

export default function IncidentAlerts() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? alerts
    : alerts.filter((a) => a.severity === filter.toLowerCase());

  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Incident Alerts</h2>
      <p className="cc-page__subheading">Monitor and respond to critical factory incidents</p>

      <div className="cc-page__filters">
        {severityFilters.map((f) => (
          <motion.button
            key={f}
            className={`cc-page__filter-btn ${filter === f ? 'cc-page__filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      <div className="cc-alerts-list">
        {filtered.map((alert, i) => (
          <AlertCard key={alert.id} alert={alert} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
