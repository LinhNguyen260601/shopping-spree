import { arrow, flip, offset, shift, useFloating, type Placement } from '@floating-ui/react'
import { useRef, useState } from 'react'

const usePopoverController = (initialOpen: boolean, placement: Placement) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, middlewareData, strategy } = useFloating({
    placement,
    middleware: [
      offset(6),
      shift({ padding: 8 }),
      flip({ fallbackPlacements: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] }),
      // eslint-disable-next-line react-hooks/refs
      arrow({ element: arrowRef })
    ]
  })

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return {
    x,
    y,
    refs,
    isOpen,
    arrowRef,
    strategy,
    middlewareData,
    handleClose,
    handleOpen
  }
}

export default usePopoverController
