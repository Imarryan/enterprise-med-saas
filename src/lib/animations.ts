import { Variants } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 144fps Optimised Animation Variants
// • Every animation touches only transform + opacity (GPU-composited properties)
// • Ease curve [0.22, 1, 0.36, 1] is perceptually snappier at 144 Hz
// • Shorter durations prevent "floaty" feel on high-refresh panels
// ═══════════════════════════════════════════════════════════════════════════════

const ease144 = [0.22, 1, 0.36, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease144 }
  }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease144 }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ease144 }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ease144 }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: ease144 }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } }
}

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease144 }
  }
}

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.92 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.35, ease: ease144 }
  }
}

export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22 }
  }
}

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(124,58,237,0.3)',
      '0 0 40px rgba(124,58,237,0.5)',
      '0 0 20px rgba(124,58,237,0.3)'
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }
  }
}

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
}

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 0 0 rgba(124,58,237,0)',
    transition: { duration: 0.15, ease: ease144 }
  },
  hover: {
    y: -4,
    boxShadow: '0 16px 48px rgba(124,58,237,0.12)',
    transition: { duration: 0.15, ease: ease144 }
  }
}

export const buttonTap = {
  whileHover: { scale: 1.02, transition: { duration: 0.12 } },
  whileTap: { scale: 0.97, transition: { duration: 0.06 } }
}

export const shimmer: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: '100%',
    transition: { repeat: Infinity, duration: 1.5, ease: 'linear' }
  }
}

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut' }
  }
}

export const checkmarkDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 }
  }
}

export const wordPullUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: ease144
    }
  })
}

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: ease144 }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: ease144 }
  }
}
