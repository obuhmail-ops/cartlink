import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const listMotion = { visible: { transition: { staggerChildren: 0.16 } } };
const lineMotion = { visible: { transition: { staggerChildren: 0.055 } } };
const wordMotion = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35 } },
};

export default function BenefitsWordReveal({ benefits }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className="mt-6 grid max-w-md grid-cols-1 gap-y-2 text-sm text-white md:text-base"
      variants={listMotion}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {benefits.map((benefit) => (
        <motion.li key={benefit} variants={lineMotion} className="my-1 flex items-center gap-2 text-xl font-semibold [font-family:'Sora',_sans-serif]">
          <span className="font-bold text-solar" aria-hidden="true">✓</span>
          <span>{benefit.split(' ').map((word, index) => <motion.span key={`${word}-${index}`} variants={wordMotion} className="mr-[0.28em] inline-block">{word}</motion.span>)}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}