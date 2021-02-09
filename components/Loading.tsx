import React from 'react';
import { motion } from 'framer-motion';

const loading = {
  start: { opacity: 0 },
  end: { opacity: 1 },
};
function Loading() {
  return (
    <motion.div
      initial="start"
      animate="end"
      variants={loading}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 2,
      }}
      style={{ background: 'black', width: '100%', height: '100%' }}
    />
  );
}

export default Loading;
