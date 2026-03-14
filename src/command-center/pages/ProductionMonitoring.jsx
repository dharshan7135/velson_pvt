import React from 'react';
import { motion } from 'framer-motion';
import {
  ProductionTrendChart, CategoryOutputChart,
  UtilizationChart, EfficiencyGauge,
} from '../components/ProductionCharts';
import ProductionSimulator from '../components/ProductionSimulator';
import {
  dailyProductionTrend, productCategoryOutput,
  machineUtilizationData, efficiencyGaugeData,
} from '../../data/commandCenterData';

export default function ProductionMonitoring() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Production Monitoring</h2>
      <p className="cc-page__subheading">Real-time production analytics and performance metrics</p>

      <div className="cc-page__grid-2">
        <ProductionTrendChart data={dailyProductionTrend} />
        <CategoryOutputChart data={productCategoryOutput} />
      </div>

      <div className="cc-page__grid-2">
        <UtilizationChart data={machineUtilizationData} />
        <EfficiencyGauge value={efficiencyGaugeData.value} target={efficiencyGaugeData.target} />
      </div>

      <ProductionSimulator />
    </motion.div>
  );
}
