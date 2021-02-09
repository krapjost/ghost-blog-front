import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  const item = {
    start: {
      //   borderRadius: '50px',
      rotate: 0,
    },
    end: {
      //   borderRadius: '0px',
      rotate: 180,
    },
  };
  return (
    <motion.div
      initial={false}
      animate="end"
      style={{
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <motion.div
        initial="start"
        animate="end"
        variants={item}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
        }}
        style={{ backgroundColor: '#fff', width: '150px', height: '150px' }}
      ></motion.div>
    </motion.div>
  );
}

export default Loading;
