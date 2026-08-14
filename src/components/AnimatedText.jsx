import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const animatedTags = {
  h1: motion.h1,
  h2: motion.h2,
  div: motion.div,
};

export default function AnimatedText({ as = 'h2', direction = 'left', className, children }) {
  const reduceMotion = useReducedMotion();
  const Component = animatedTags[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: direction === 'left' ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}