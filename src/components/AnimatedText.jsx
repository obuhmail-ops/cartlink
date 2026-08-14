import React from 'react';

const textTags = { h1: 'h1', h2: 'h2', div: 'div' };

function renderWords(children, count) {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((part) => {
        if (/^\s+$/.test(part)) return part;
        const key = count.current++;
        return <span key={key} className="inline-block font-bold [font-family:'Poppins',_sans-serif] text-5xl text-[hsl(var(--brand))]">{part}</span>;
      });
    }
    if (React.isValidElement(child) && child.props.children) {
      return React.cloneElement(child, {}, renderWords(child.props.children, count));
    }
    return child;
  });
}

export default function AnimatedText({ as = 'h2', className, children }) {
  const Component = textTags[as] || 'div';
  const count = { current: 0 };

  return <Component className={className}>{renderWords(children, count)}</Component>;
}