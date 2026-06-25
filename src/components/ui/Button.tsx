import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'sm';

const base =
  'rounded-full font-bold no-underline inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-teal text-white hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(27,191,191,0.35)]',
  secondary:
    'bg-transparent text-ink border-2 border-beige-dark hover:border-teal hover:text-teal hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  md: 'px-8 py-3.5 text-[0.95rem]',
  sm: 'px-8 py-2.5 text-[0.9rem]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    base,
    variants[variant],
    fullWidth ? 'w-full py-3.5 text-[0.95rem]' : sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    // Hash links stay plain anchors to preserve in-page scroll behavior.
    if (href.startsWith('#')) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
