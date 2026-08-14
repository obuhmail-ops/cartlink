import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const animatedTags = { h1: motion.h1, h2: motion.h2, div: motion.div };
const wordMotion = {
  hidden: { opacity: 0, y: '0.7em', filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } }
};

function revealWords(children, count) {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((part) => {
        if (/^\s+$/.test(part)) return part;
        const key = count.current++;
        return <motion.span key={key} variants={wordMotion} className="inline-block font-bold [font-family:'Poppins',_sans-serif]">{part}</motion.span>;
      });
    }
    if (React.isValidElement(child) && child.props.children) {
      return React.cloneElement(child, {}, revealWords(child.props.children, count));
    }
    return child;
  });
}

export default function AnimatedText({ as = 'h2', className, children }) {
  const reduceMotion = useReducedMotion();
  const Component = animatedTags[as] || motion.div;
  const count = { current: 0 };

  return (
    <Component
      className={className}
      variants={{ visible: { transition: { staggerChildren: 0.065 } } }}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}>
      
      {revealWords(children, count)}
    </Component>);

}