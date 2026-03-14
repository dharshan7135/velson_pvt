import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Factory, Box, HeartPulse, Package,
  Truck, BarChart3, Clock, AlertTriangle, ChevronLeft,
  ChevronRight, Zap,
} from 'lucide-react';
import { commandCenterNav } from '../data/commandCenterData';

const iconMap = {
  LayoutDashboard, Factory, Box, HeartPulse, Package,
  Truck, BarChart3, Clock, AlertTriangle,
};

export default function CommandSidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <motion.aside
      className="cc-sidebar"
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="cc-sidebar__logo">
        <motion.div
          className="cc-sidebar__logo-icon"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Zap size={24} />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="cc-sidebar__logo-text"
            >
              <span className="cc-sidebar__brand">VELSON</span>
              <span className="cc-sidebar__sub">Command Center</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="cc-sidebar__nav">
        {commandCenterNav.map((item, idx) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className="cc-sidebar__link-wrapper"
            >
              <motion.div
                className={`cc-sidebar__link ${isActive ? 'cc-sidebar__link--active' : ''}`}
                whileHover={{ x: 4, backgroundColor: 'rgba(16, 100, 70, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className={`cc-sidebar__icon ${isActive ? 'cc-sidebar__icon--active' : ''}`}>
                  <Icon size={20} />
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="cc-sidebar__label"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    className="cc-sidebar__active-bar"
                    layoutId="activeNavBar"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button className="cc-sidebar__toggle" onClick={onToggle}>
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
}
