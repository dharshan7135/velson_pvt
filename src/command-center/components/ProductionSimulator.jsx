import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sliders, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function ProductionSimulator() {
  const [scale, setScale] = useState(50);

  const projections = useMemo(() => {
    const baseRevenue = 18420000;
    const baseOutput = 2840;
    const baseInventory = 2450;
    const factor = scale / 50;

    return {
      revenue: Math.round(baseRevenue * factor),
      output: Math.round(baseOutput * factor),
      inventoryConsumption: Math.round(baseInventory * factor * 0.7),
    };
  }, [scale]);

  const formatCurrency = (v) => `₹${(v / 100000).toFixed(2)}L`;

  return (
    <motion.div
      className="cc-simulator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="cc-simulator__header">
        <Sliders size={20} className="cc-simulator__icon" />
        <h3 className="cc-simulator__title">Predictive Production Simulator</h3>
      </div>

      <div className="cc-simulator__slider-section">
        <div className="cc-simulator__slider-header">
          <span className="cc-simulator__slider-label">Scale Production</span>
          <span className="cc-simulator__slider-value">{scale}%</span>
        </div>
        <div className="cc-simulator__slider-track-wrap">
          <input
            type="range"
            min="0"
            max="100"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="cc-simulator__slider"
          />
          <div
            className="cc-simulator__slider-fill"
            style={{ width: `${scale}%` }}
          />
        </div>
        <div className="cc-simulator__slider-labels">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="cc-simulator__projections">
        <motion.div
          className="cc-simulator__projection"
          key={`rev-${scale}`}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <DollarSign size={18} className="cc-simulator__proj-icon cc-simulator__proj-icon--green" />
          <div>
            <span className="cc-simulator__proj-label">Projected Revenue</span>
            <span className="cc-simulator__proj-value">{formatCurrency(projections.revenue)}</span>
          </div>
        </motion.div>

        <motion.div
          className="cc-simulator__projection"
          key={`out-${scale}`}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <TrendingUp size={18} className="cc-simulator__proj-icon cc-simulator__proj-icon--blue" />
          <div>
            <span className="cc-simulator__proj-label">Projected Output</span>
            <span className="cc-simulator__proj-value">{projections.output} tons</span>
          </div>
        </motion.div>

        <motion.div
          className="cc-simulator__projection"
          key={`inv-${scale}`}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Package size={18} className="cc-simulator__proj-icon cc-simulator__proj-icon--amber" />
          <div>
            <span className="cc-simulator__proj-label">Inventory Consumption</span>
            <span className="cc-simulator__proj-value">{projections.inventoryConsumption} tons</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
