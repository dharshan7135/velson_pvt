import React from 'react';
import { motion } from 'framer-motion';
import InventoryCard from '../components/InventoryCard';
import { InventoryCategoryChart, WarehouseUsageChart, StockDepletionChart } from '../components/ProductionCharts';
import { inventoryCards, inventoryByCategory, warehouseUsage, stockDepletion } from '../../data/commandCenterData';

export default function InventoryIntelligence() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Inventory Intelligence</h2>
      <p className="cc-page__subheading">Smart inventory monitoring, forecasting, and warehouse analytics</p>

      <div className="cc-page__inv-cards">
        {inventoryCards.map((card, i) => (
          <InventoryCard key={card.label} data={card} index={i} />
        ))}
      </div>

      <div className="cc-page__grid-2">
        <InventoryCategoryChart data={inventoryByCategory} />
        <WarehouseUsageChart data={warehouseUsage} />
      </div>

      <StockDepletionChart data={stockDepletion} />
    </motion.div>
  );
}
