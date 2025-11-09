import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InputFile from './InputFile'

const meta: Meta<typeof InputFile> = {
  title: 'Components/InputFile',
  component: InputFile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A file input component with a custom button trigger and file validation.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., .jpg,.png)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file input'
    }
  }
}

export default meta
type Story = StoryObj<typeof InputFile>

export const Default: Story = {
  args: {
    accept: '.jpg,.jpeg,.png'
  }
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*'
  }
}

export const AllImages: Story = {
  args: {
    accept: '.jpg,.jpeg,.png,.gif,.webp'
  }
}

export const PDFOnly: Story = {
  args: {
    accept: '.pdf'
  }
}

export const Disabled: Story = {
  args: {
    accept: '.jpg,.jpeg,.png',
    disabled: true
  }
}

export const Interactive: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (selectedFile?: File) => {
      setFile(selectedFile || null)
    }

    return (
      <div className='flex flex-col gap-4'>
        <InputFile accept='.jpg,.jpeg,.png' inputChange={handleFileChange} />
        {file && (
          <div className='p-4 border border-gray-200 rounded-sm'>
            <p className='text-sm font-medium text-gray-700'>Selected File:</p>
            <p className='text-sm text-gray-600'>Name: {file.name}</p>
            <p className='text-sm text-gray-600'>Size: {(file.size / 1024).toFixed(2)} KB</p>
            <p className='text-sm text-gray-600'>Type: {file.type}</p>
          </div>
        )}
      </div>
    )
  }
}

export const WithPreview: Story = {
  render: () => {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (selectedFile?: File) => {
      if (selectedFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }

    return (
      <div className='flex flex-col gap-4'>
        <InputFile accept='image/*' inputChange={handleFileChange} />
        {preview && (
          <div className='p-4 border border-gray-200 rounded-sm'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Preview:</p>
            <img src={preview} alt='Preview' className='max-w-xs rounded-sm' />
          </div>
        )}
      </div>
    )
  }
}

