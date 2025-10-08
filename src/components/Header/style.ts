import type { Strategy } from '@floating-ui/react'

export const arrowStyle = (x: number, y: number): React.CSSProperties => ({
  left: x,
  top: y
})

export const floatingStyle = (arrowX: number, strategy: Strategy, x: number, y: number): React.CSSProperties => ({
  position: strategy,
  top: y ?? 0,
  left: x ?? 0,
  width: 'max-content',
  transformOrigin: `${arrowX}px top`
})
