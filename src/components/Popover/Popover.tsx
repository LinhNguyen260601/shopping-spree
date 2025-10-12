import { arrowStyle, floatingStyle } from '@/components/Header/style'
import { usePopoverController } from '@/controllers'
import { cn } from '@/utils'
import { FloatingPortal, type Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  className?: string
  placement?: Placement
  initialOpen?: boolean
  as?: React.ElementType
  children: React.ReactNode
  renderPopover: React.ReactNode
}

const Popover = ({
  children,
  renderPopover,
  className = '',
  initialOpen = false,
  as: Element = 'article',
  placement = 'bottom-end'
}: PopoverProps) => {
  const { isOpen, refs, middlewareData, strategy, x, y, arrowRef, handleOpen, handleClose } = usePopoverController(
    initialOpen,
    placement
  )

  return (
    <Element className='popover-selector'>
      <h3 className='sr-only'>Popover Selection</h3>
      <button
        className={cn(className)}
        ref={refs.setReference}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        aria-label='Select popover'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        {children}
      </button>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyle(middlewareData?.arrow?.x ?? 0, strategy, x ?? 0, y ?? 0)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              role='menu'
              aria-label='Language options'
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
                style={arrowStyle(middlewareData?.arrow?.x ?? 0, middlewareData?.arrow?.y ?? 0)}
                aria-hidden='true'
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
