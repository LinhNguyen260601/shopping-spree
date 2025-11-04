import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Popover from './Popover'

describe('Popover', () => {
  it('renders children', () => {
    render(
      <Popover renderPopover={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('opens on mouse enter', async () => {
    render(
      <Popover renderPopover={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    )
    const trigger = screen.getByLabelText('Select popover')
    await userEvent.hover(trigger)
    await waitFor(() => {
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })
  })

  it('closes on mouse leave', async () => {
    render(
      <Popover renderPopover={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    )
    const trigger = screen.getByLabelText('Select popover')
    await userEvent.hover(trigger)
    await waitFor(() => {
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })
    await userEvent.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })
  })

  it('starts open when initialOpen is true', () => {
    render(
      <Popover initialOpen renderPopover={<div>Popover content</div>}>
        <button>Open</button>
      </Popover>
    )
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('renders as custom element', () => {
    render(
      <Popover as='div' renderPopover={<div>Content</div>}>
        Trigger
      </Popover>
    )
    const element = document.querySelector('.popover-selector')
    expect(element?.tagName).toBe('DIV')
  })

  it('has correct aria attributes', () => {
    render(<Popover renderPopover={<div>Content</div>}>Trigger</Popover>)
    const trigger = screen.getByLabelText('Select popover')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
  })

  it('applies custom className', () => {
    render(
      <Popover className='custom-class' renderPopover={<div>Content</div>}>
        Trigger
      </Popover>
    )
    const trigger = screen.getByLabelText('Select popover')
    expect(trigger).toHaveClass('custom-class')
  })
})
