import React from 'react';
import { motion } from 'framer-motion';
import TimelineCard from '../components/TimelineCard';
import { timelineEvents } from '../../data/commandCenterData';

export default function ActivityTimeline() {
  return (
    <motion.div
      className="cc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="cc-page__heading">Activity Timeline</h2>
      <p className="cc-page__subheading">Real-time event log of factory operations</p>

      <div className="cc-panel">
        <div className="cc-timeline">
          {timelineEvents.map((event, i) => (
            <TimelineCard key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
