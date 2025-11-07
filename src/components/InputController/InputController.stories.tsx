import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import InputController from './InputController'

const meta: Meta<typeof InputController> = {
  title: 'Components/InputController',
  component: InputController,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input component integrated with react-hook-form for form validation and control.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof InputController>

interface FormData {
  name: string
  email: string
  age: number
}

export const WithReactHookForm: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<FormData>({
      defaultValues: {
        name: '',
        email: '',
        age: 0
      }
    })

    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-96'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
            Name
          </label>
          <InputController
            name='name'
            control={control}
            placeholder='Enter your name'
            rules={{ required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } }}
            id='name'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
            Email
          </label>
          <InputController
            name='email'
            control={control}
            type='email'
            placeholder='Enter your email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            id='email'
          />
        </div>

        <div>
          <label htmlFor='age' className='block text-sm font-medium text-gray-700 mb-2'>
            Age
          </label>
          <InputController
            name='age'
            control={control}
            type='number'
            placeholder='Enter your age'
            rules={{
              required: 'Age is required',
              min: { value: 18, message: 'Must be at least 18' },
              max: { value: 100, message: 'Must be less than 100' }
            }}
            id='age'
          />
        </div>

        <button type='submit' className='px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600'>
          Submit
        </button>
      </form>
    )
  }
}

export const WithValidation: Story = {
  render: () => {
    const { control } = useForm<{ username: string; password: string }>({
      defaultValues: {
        username: '',
        password: ''
      }
    })

    return (
      <div className='flex flex-col gap-4 w-96'>
        <div>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
            Username
          </label>
          <InputController
            name='username'
            control={control}
            placeholder='Enter username'
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' }
            }}
            id='username'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
            Password
          </label>
          <InputController
            name='password'
            control={control}
            type='password'
            placeholder='Enter password'
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' }
            }}
            id='password'
          />
        </div>
      </div>
    )
  }
}
