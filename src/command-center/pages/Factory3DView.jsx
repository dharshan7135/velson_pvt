import React from 'react';
import { motion } from 'framer-motion';
import Factory3D from '../components/Factory3D';

export default function Factory3DView() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">3D Factory Floor</h2>
      <p className="cc-page__subheading">Interactive visualization of the manufacturing floor — orbit, zoom, and hover machines for details</p>

      <div className="cc-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <Factory3D height="calc(100vh - 220px)" />
      </div>
    </motion.div>
  );
}
