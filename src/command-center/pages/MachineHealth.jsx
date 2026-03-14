import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MachineCard from '../components/MachineCard';
import { machines } from '../../data/commandCenterData';

const filters = ['All', 'Running', 'Idle', 'Maintenance', 'Failure'];

export default function MachineHealth() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? machines
    : machines.filter((m) => m.status === activeFilter.toLowerCase());

  const counts = {
    All: machines.length,
    Running: machines.filter((m) => m.status === 'running').length,
    Idle: machines.filter((m) => m.status === 'idle').length,
    Maintenance: machines.filter((m) => m.status === 'maintenance').length,
    Failure: machines.filter((m) => m.status === 'failure').length,
  };

  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Machine Health Monitor</h2>
      <p className="cc-page__subheading">Live health status for all factory machines</p>

      <div className="cc-page__filters">
        {filters.map((f) => (
          <motion.button
            key={f}
            className={`cc-page__filter-btn ${activeFilter === f ? 'cc-page__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f}
            <span className="cc-page__filter-count">{counts[f]}</span>
          </motion.button>
        ))}
      </div>

      <div className="cc-page__machine-grid">
        {filtered.map((machine, i) => (
          <MachineCard key={machine.id} machine={machine} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
