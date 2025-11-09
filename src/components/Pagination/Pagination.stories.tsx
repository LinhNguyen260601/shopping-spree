import type { Meta, StoryObj } from '@storybook/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import Pagination from './Pagination'
import type { QueryConfig } from '@/pages/ProductList/types'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component with page navigation, dots for skipped pages, and React Router integration.'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (_, context) => {
      const args = context.args as { queryConfig?: QueryConfig; pageSize?: number }
      const queryConfig: QueryConfig = args?.queryConfig || { page: '1', limit: '20' }
      const pageSize: number = args?.pageSize || 10
      const router = createMemoryRouter(
        [
          {
            path: '/',
            element: <Pagination pageSize={pageSize} queryConfig={queryConfig} />
          }
        ],
        { initialEntries: ['/'] }
      )
      return <RouterProvider router={router} />
    }
  ],
  argTypes: {
    pageSize: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Total number of pages'
    }
  }
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    pageSize: 10,
    queryConfig: { page: '1', limit: '20' } as QueryConfig
  }
}

export const FirstPage: Story = {
  args: {
    pageSize: 10,
    queryConfig: { page: '1', limit: '20' } as QueryConfig
  }
}

export const MiddlePage: Story = {
  args: {
    pageSize: 10,
    queryConfig: { page: '5', limit: '20' } as QueryConfig
  }
}

export const LastPage: Story = {
  args: {
    pageSize: 10,
    queryConfig: { page: '10', limit: '20' } as QueryConfig
  }
}

export const ManyPages: Story = {
  args: {
    pageSize: 20,
    queryConfig: { page: '10', limit: '20' } as QueryConfig
  }
}

export const WithDots: Story = {
  args: {
    pageSize: 15,
    queryConfig: { page: '8', limit: '20' } as QueryConfig
  }
}

export const SinglePage: Story = {
  args: {
    pageSize: 1,
    queryConfig: { page: '1', limit: '20' } as QueryConfig
  }
}

export const FewPages: Story = {
  args: {
    pageSize: 3,
    queryConfig: { page: '2', limit: '20' } as QueryConfig
  }
}
