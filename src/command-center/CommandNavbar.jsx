import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Calendar, User, Settings, Moon, Sun,
  ChevronDown, X, Filter,
} from 'lucide-react';

const dateFilters = ['Today', 'This Week', 'This Month', 'This Quarter'];

export default function CommandNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Today');

  return (
    <header className="cc-navbar">
      {/* Left — breadcrumb / title */}
      <div className="cc-navbar__left">
        <motion.h1
          className="cc-navbar__title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Manufacturing Command Center
        </motion.h1>
        <div className="cc-navbar__live-badge">
          <span className="cc-navbar__live-dot" />
          LIVE
        </div>
      </div>

      {/* Center — Date Filters */}
      <div className="cc-navbar__center">
        {dateFilters.map((f) => (
          <motion.button
            key={f}
            className={`cc-navbar__filter ${activeFilter === f ? 'cc-navbar__filter--active' : ''}`}
            onClick={() => setActiveFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Right — actions */}
      <div className="cc-navbar__right">
        {/* Search */}
        <motion.div className="cc-navbar__search-container">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                className="cc-navbar__search-input"
                placeholder="Search machines, orders, alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                autoFocus
              />
            )}
          </AnimatePresence>
          <motion.button
            className="cc-navbar__icon-btn"
            onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </motion.button>
        </motion.div>

        {/* Notifications */}
        <div className="cc-navbar__notif-wrapper">
          <motion.button
            className="cc-navbar__icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={18} />
            <span className="cc-navbar__notif-badge">3</span>
          </motion.button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="cc-navbar__notif-dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
              >
                <div className="cc-navbar__notif-header">
                  <span>Notifications</span>
                  <button className="cc-navbar__notif-clear">Clear all</button>
                </div>
                <div className="cc-navbar__notif-item cc-navbar__notif-item--critical">
                  <div className="cc-navbar__notif-dot cc-navbar__notif-dot--red" />
                  <div>
                    <p className="cc-navbar__notif-title">Machine M-12 Failure</p>
                    <p className="cc-navbar__notif-time">10 mins ago</p>
                  </div>
                </div>
                <div className="cc-navbar__notif-item cc-navbar__notif-item--warning">
                  <div className="cc-navbar__notif-dot cc-navbar__notif-dot--yellow" />
                  <div>
                    <p className="cc-navbar__notif-title">Low stock — Scrap Iron</p>
                    <p className="cc-navbar__notif-time">2 hrs ago</p>
                  </div>
                </div>
                <div className="cc-navbar__notif-item">
                  <div className="cc-navbar__notif-dot cc-navbar__notif-dot--blue" />
                  <div>
                    <p className="cc-navbar__notif-title">Shipment #V-4821 delayed</p>
                    <p className="cc-navbar__notif-time">3 hrs ago</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <motion.div
          className="cc-navbar__profile"
          whileHover={{ scale: 1.03 }}
        >
          <div className="cc-navbar__avatar">
            <User size={16} />
          </div>
          <span className="cc-navbar__username">Admin</span>
        </motion.div>
      </div>
    </header>
  );
}
