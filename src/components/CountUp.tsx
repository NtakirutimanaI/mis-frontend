import { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ to, suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
};

export default CountUp;
