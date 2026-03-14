import React from 'react';
import { motion } from 'framer-motion';
import { RevenueChart, SalesRegionChart, SalesTrendChart } from '../components/ProductionCharts';
import { revenueData, salesByRegion, salesTrend } from '../../data/commandCenterData';

export default function SalesAnalytics() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Sales Analytics</h2>
      <p className="cc-page__subheading">Revenue tracking, regional performance, and sales trends</p>

      <RevenueChart data={revenueData} />

      <div className="cc-page__grid-2">
        <SalesRegionChart data={salesByRegion} />
        <SalesTrendChart data={salesTrend} />
      </div>
    </motion.div>
  );
}
