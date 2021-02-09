import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  const loading = {
    start: { opacity: 0 },
    end: { opacity: 1 },
  };
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
      style={{
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

export default Loading;
