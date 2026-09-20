import React, { useEffect, useState, useRef } from 'react';

export default function Counter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse target number
  const numericEnd = parseInt(end.toString().replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || numericEnd === 0) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, numericEnd, duration]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {numericEnd > 0 ? (hasAnimated ? count.toLocaleString() : '0') : end}
      {suffix}
    </span>
  );
}
