'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BouncyButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  external?: boolean
}

export default function BouncyButton({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled = false,
  external = false,
}: BouncyButtonProps) {
  const spring = { type: 'spring' as const, stiffness: 400, damping: 17 }
  const hoverStyle = { scale: 1.05, y: -2 }
  const tapStyle = { scale: 0.96 }

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        whileHover={hoverStyle}
        whileTap={tapStyle}
        transition={spring}
      >
        {children}
      </motion.a>
    )
  }

  if (href) {
    return (
      <motion.div whileHover={hoverStyle} whileTap={tapStyle} transition={spring} className="inline-block">
        <Link href={href} className={className}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={disabled ? {} : hoverStyle}
      whileTap={disabled ? {} : tapStyle}
      transition={spring}
    >
      {children}
    </motion.button>
  )
}
