import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import FormField from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form field component that wraps Input with react-hook-form integration.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof FormField>

interface FormData {
  email: string
  password: string
  name: string
  phone: string
}

export const WithReactHookForm: Story = {
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormData>({
      defaultValues: {
        email: '',
        password: '',
        name: '',
        phone: ''
      }
    })

    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data, null, 2))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-96'>
        <FormField
          name='name'
          label='Full Name'
          placeholder='Enter your name'
          required
          register={register}
          error={errors.name?.message}
        />

        <FormField
          name='email'
          type='email'
          label='Email Address'
          placeholder='Enter your email'
          required
          register={register}
          error={errors.email?.message}
        />

        <FormField
          name='password'
          type='password'
          label='Password'
          placeholder='Enter password'
          required
          showPasswordToggle
          register={register}
          error={errors.password?.message}
        />

        <FormField
          name='phone'
          type='tel'
          label='Phone Number'
          placeholder='Enter phone number'
          register={register}
          error={errors.phone?.message}
        />

        <button type='submit' className='px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600'>
          Submit
        </button>
      </form>
    )
  }
}

export const AllFieldTypes: Story = {
  render: () => {
    const { register } = useForm<FormData>()

    return (
      <div className='flex flex-col gap-4 w-96'>
        <FormField name='text' label='Text Input' placeholder='Enter text' register={register} />
        <FormField name='email' type='email' label='Email Input' placeholder='Enter email' register={register} />
        <FormField
          name='password'
          type='password'
          label='Password with Toggle'
          placeholder='Enter password'
          showPasswordToggle
          register={register}
        />
        <FormField name='tel' type='tel' label='Phone Number' placeholder='Enter phone' register={register} />
        <FormField name='url' type='url' label='Website URL' placeholder='Enter URL' register={register} />
      </div>
    )
  }
}

export const WithValidation: Story = {
  render: () => {
    const {
      register,
      formState: { errors }
    } = useForm<FormData>({
      defaultValues: {
        email: '',
        password: ''
      }
    })

    return (
      <div className='flex flex-col gap-4 w-96'>
        <FormField
          name='email'
          type='email'
          label='Email'
          placeholder='Enter email'
          required
          register={register}
          error={errors.email?.message || 'Please enter a valid email address'}
        />

        <FormField
          name='password'
          type='password'
          label='Password'
          placeholder='Enter password'
          required
          showPasswordToggle
          register={register}
          error={errors.password?.message || 'Password must be at least 8 characters'}
        />
      </div>
    )
  }
}
