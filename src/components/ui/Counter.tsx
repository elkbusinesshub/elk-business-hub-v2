"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  className?: string;
}

export default function Counter({ target, className = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const increment = target / (duration / 16);
          let val = 0;

          const step = () => {
            val += increment;
            if (val >= target) {
              setCount(target);
              return;
            }
            setCount(Math.floor(val));
            requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString("en-IN")}+
    </span>
  );
}
