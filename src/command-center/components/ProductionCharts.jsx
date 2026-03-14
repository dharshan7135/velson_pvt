import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const glassTooltipStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid rgba(180, 134, 11, 0.15)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#1a1a2e',
  fontSize: '12px',
  boxShadow: '0 4px 20px rgba(26, 26, 46, 0.08)',
};

export function ProductionTrendChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="cc-chart-card__title">Daily Production Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTMT" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPipes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradHardware" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradStructural" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,46,0.06)" />
          <XAxis dataKey="day" tick={{ fill: '#4a4a6a', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#4a4a6a', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={glassTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
          <Area type="monotone" dataKey="TMTBars" name="TMT Bars" stroke="#10B981" fill="url(#gradTMT)" strokeWidth={2} />
          <Area type="monotone" dataKey="SteelPipes" name="Steel Pipes" stroke="#3B82F6" fill="url(#gradPipes)" strokeWidth={2} />
          <Area type="monotone" dataKey="Hardware" name="Hardware" stroke="#F59E0B" fill="url(#gradHardware)" strokeWidth={2} />
          <Area type="monotone" dataKey="Structural" name="Structural" stroke="#8B5CF6" fill="url(#gradStructural)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function CategoryOutputChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="cc-chart-card__title">Product Category Output</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            animationBegin={200}
            animationDuration={1000}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip contentStyle={glassTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function UtilizationChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="cc-chart-card__title">Machine Utilization</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="machine" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip contentStyle={glassTooltipStyle} />
          <Bar dataKey="utilization" radius={[4, 4, 0, 0]} animationDuration={1200}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.utilization > 80 ? '#10B981' : entry.utilization > 50 ? '#F59E0B' : '#EF4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function RevenueChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="cc-chart-card__title">Revenue Tracking</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip
            contentStyle={glassTooltipStyle}
            formatter={(value, name) => [`₹${(value / 100000).toFixed(2)}L`, name]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            fill="url(#gradRevenue)"
            strokeWidth={2.5}
            dot={{ fill: '#10B981', r: 3 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#ffffff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function EfficiencyGauge({ value, target }) {
  const radius = 70;
  const circumference = Math.PI * radius; // semicircle
  const offset = circumference - (value / 100) * circumference;
  const color = value >= target ? '#10B981' : value >= 80 ? '#F59E0B' : '#EF4444';

  return (
    <motion.div
      className="cc-chart-card cc-chart-card--gauge"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="cc-chart-card__title">Production Efficiency</h3>
      <div className="cc-gauge">
        <svg width="180" height="110" viewBox="0 0 180 110">
          <path
            d="M 10 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="rgba(26,26,46,0.06)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.path
            d="M 10 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <text x="90" y="85" textAnchor="middle" fill={color} fontSize="28" fontWeight="bold" fontFamily="Inter">
            {value}%
          </text>
          <text x="90" y="105" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="Inter">
            Target: {target}%
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

export function StockDepletionChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="cc-chart-card__title">Stock Depletion Forecast</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradScrap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradBillets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradWire" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={glassTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
          <Area type="monotone" dataKey="scrapIron" name="Scrap Iron" stroke="#EF4444" fill="url(#gradScrap)" strokeWidth={2} />
          <Area type="monotone" dataKey="billets" name="Billets" stroke="#3B82F6" fill="url(#gradBillets)" strokeWidth={2} />
          <Area type="monotone" dataKey="wireRods" name="Wire Rods" stroke="#F59E0B" fill="url(#gradWire)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function WarehouseUsageChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="cc-chart-card__title">Warehouse Utilization</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="zone" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
          <Tooltip contentStyle={glassTooltipStyle} />
          <Bar dataKey="used" name="Used %" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.used > 85 ? '#EF4444' : entry.used > 60 ? '#F59E0B' : '#10B981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function SalesRegionChart({ data }) {
  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="cc-chart-card__title">Sales by Region</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="region" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip
            contentStyle={glassTooltipStyle}
            formatter={(value) => [`₹${(value / 100000).toFixed(2)}L`, 'Sales']}
          />
          <Bar dataKey="sales" radius={[4, 4, 0, 0]} animationDuration={1200}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function SalesTrendChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="cc-chart-card__title">Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip
            contentStyle={glassTooltipStyle}
            formatter={(value) => [`₹${(value / 100000).toFixed(2)}L`, 'Sales']}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#6366F1"
            fill="url(#gradSales)"
            strokeWidth={2.5}
            dot={{ fill: '#6366F1', r: 4 }}
            activeDot={{ r: 7, stroke: '#6366F1', strokeWidth: 2, fill: '#ffffff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function InventoryCategoryChart({ data }) {
  return (
    <motion.div
      className="cc-chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="cc-chart-card__title">Inventory by Category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="category" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={glassTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
          <Bar dataKey="stock" name="Current Stock" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="capacity" name="Max Capacity" fill="rgba(26,26,46,0.06)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
