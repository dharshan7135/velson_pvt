import React from 'react';
import { motion } from 'framer-motion';
import KPICard from '../components/KPICard';
import Factory3D from '../components/Factory3D';
import MachineCard from '../components/MachineCard';
import AlertCard from '../components/AlertCard';
import TimelineCard from '../components/TimelineCard';
import ProductionSimulator from '../components/ProductionSimulator';
import { ProductionTrendChart, RevenueChart, EfficiencyGauge} from '../components/ProductionCharts';
import {
  kpiData, machines, alerts, timelineEvents,
  dailyProductionTrend, revenueData, efficiencyGaugeData,
} from '../../data/commandCenterData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export default function CommandDashboard() {
  const criticalMachines = machines.filter((m) => m.healthScore < 80);
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical');
  const recentTimeline = timelineEvents.slice(0, 5);

  return (
    <motion.div
      className="cc-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* KPI Grid */}
      <section className="cc-dashboard__section">
        <div className="cc-dashboard__kpi-grid">
          {kpiData.map((kpi, i) => (
            <KPICard key={kpi.id} data={kpi} index={i} />
          ))}
        </div>
      </section>

      {/* 3D Factory + Quick Alerts */}
      <section className="cc-dashboard__section cc-dashboard__split">
        <div className="cc-dashboard__split-main">
          <div className="cc-panel">
            <h3 className="cc-panel__title">3D Factory Monitoring</h3>
            <Factory3D height="420px" />
          </div>
        </div>
        <div className="cc-dashboard__split-side">
          <div className="cc-panel">
            <h3 className="cc-panel__title cc-panel__title--red">
              <span className="cc-panel__title-dot cc-panel__title-dot--red" />
              Critical Alerts
            </h3>
            <div className="cc-panel__scroll">
              {criticalAlerts.map((alert, i) => (
                <AlertCard key={alert.id} alert={alert} index={i} />
              ))}
            </div>
          </div>

          <div className="cc-panel">
            <h3 className="cc-panel__title">
              <span className="cc-panel__title-dot cc-panel__title-dot--amber" />
              Machines Requiring Attention
            </h3>
            <div className="cc-panel__scroll">
              {criticalMachines.map((m, i) => (
                <MachineCard key={m.id} machine={m} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charts Row */}
      <section className="cc-dashboard__section cc-dashboard__charts-row">
        <ProductionTrendChart data={dailyProductionTrend} />
        <EfficiencyGauge value={efficiencyGaugeData.value} target={efficiencyGaugeData.target} />
      </section>

      {/* Revenue + Simulator */}
      <section className="cc-dashboard__section cc-dashboard__split">
        <div className="cc-dashboard__split-main">
          <RevenueChart data={revenueData} />
        </div>
        <div className="cc-dashboard__split-side">
          <ProductionSimulator />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="cc-dashboard__section">
        <div className="cc-panel">
          <h3 className="cc-panel__title">Recent Activity</h3>
          <div className="cc-timeline">
            {recentTimeline.map((event, i) => (
              <TimelineCard key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
