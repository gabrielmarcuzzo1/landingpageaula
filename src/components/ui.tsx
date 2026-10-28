import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Diamond } from 'lucide-react'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="section-badge">
      <Diamond size={11} strokeWidth={1.6} />
      {children}
    </span>
  )
}

export function SectionHeading({
  badge,
  title,
  children,
  align = 'center',
}: {
  badge: string
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <Reveal className={`section-heading align-${align}`}>
      <Badge>{badge}</Badge>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}

export function PrimaryButton({
  children,
  className = '',
  href = '#diagnostico',
}: {
  children: ReactNode
  className?: string
  href?: string
}) {
  return (
    <a className={`button button-primary ${className}`} href={href}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  )
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? 'brand-footer' : ''}`}
      href="#inicio"
      aria-label="Agência V3 — início"
    >
      <svg
        width="37"
        height="32"
        viewBox="0 0 43 36"
        fill="none"
        aria-hidden="true"
      >
        <path d="M1 5H10L20.5 31H12L1 5Z" fill="currentColor" />
        <path d="M28 5H37L23 31H14L28 5Z" fill="currentColor" />
        <path d="M30 25H42L38.8 31H26.7L30 25Z" fill="currentColor" />
      </svg>
      <span>
        agência{' '}
        <span className="brand-v3">
          v3
          <span className="brand-dot" aria-hidden="true">
            ®
          </span>
        </span>
      </span>
    </a>
  )
}
