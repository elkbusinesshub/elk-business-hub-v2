// Applies the .reveal CSS class. The global RevealObserver adds .visible when in viewport.
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  className = "",
  delay,
  style,
}: ScrollRevealProps) {
  const cls = ["reveal", delay ? `reveal-d${delay}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
