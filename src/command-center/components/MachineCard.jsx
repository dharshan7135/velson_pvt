import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, RotateCcw, Activity, Zap, Heart } from 'lucide-react';
import { machineStatusColors } from '../../data/commandCenterData';

function CircularMeter({ value, max = 100, size = 80, color, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <svg width={size} height={size} className="cc-machine__meter">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(26,26,46,0.06)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={size * 0.2}
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
      >
        {value}%
      </text>
    </svg>
  );
}

export default function MachineCard({ machine, index }) {
  const statusColor = machineStatusColors[machine.status];
  const isCritical = machine.healthScore < 50;
  const isWarning = machine.healthScore >= 50 && machine.healthScore < 80;
  const healthLabel = isCritical ? 'Critical' : isWarning ? 'Warning' : 'Healthy';
  const healthColor = isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';

  return (
    <motion.div
      className={`cc-machine ${isCritical ? 'cc-machine--critical' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: `0 8px 32px ${statusColor}25` }}
      style={{ '--machine-color': statusColor }}
    >
      {/* Header */}
      <div className="cc-machine__header">
        <div className="cc-machine__id-group">
          <span className="cc-machine__status-dot" style={{ background: statusColor }} />
          <span className="cc-machine__id">{machine.id}</span>
        </div>
        <span className={`cc-machine__health-badge cc-machine__health-badge--${healthLabel.toLowerCase()}`}>
          {healthLabel}
        </span>
      </div>

      <h4 className="cc-machine__name">{machine.name}</h4>

      {/* Health Meter */}
      <div className="cc-machine__meter-wrap">
        <CircularMeter value={machine.healthScore} color={healthColor} />
      </div>

      {/* Stats Grid */}
      <div className="cc-machine__stats">
        <div className="cc-machine__stat">
          <Thermometer size={14} className="cc-machine__stat-icon" />
          <div>
            <span className="cc-machine__stat-label">Temp</span>
            <span className="cc-machine__stat-value">{machine.temperature}°C</span>
          </div>
        </div>
        <div className="cc-machine__stat">
          <RotateCcw size={14} className="cc-machine__stat-icon" />
          <div>
            <span className="cc-machine__stat-label">RPM</span>
            <span className="cc-machine__stat-value">{machine.rpm}</span>
          </div>
        </div>
        <div className="cc-machine__stat">
          <Activity size={14} className="cc-machine__stat-icon" />
          <div>
            <span className="cc-machine__stat-label">Vibration</span>
            <span className="cc-machine__stat-value">{machine.vibration} mm/s</span>
          </div>
        </div>
        <div className="cc-machine__stat">
          <Zap size={14} className="cc-machine__stat-icon" />
          <div>
            <span className="cc-machine__stat-label">Load</span>
            <span className="cc-machine__stat-value">{machine.load}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
