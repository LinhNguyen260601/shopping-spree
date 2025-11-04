import Button from '@/components/Button'
import { MAX_SIZE_UPLOAD_AVATAR } from '@/pages/User/core'
import { useRef, type InputHTMLAttributes } from 'react'
import { toast } from 'react-toastify'

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  accept?: string
  inputChange?: (file?: File) => void
}

const InputFile = ({ accept = '.jpg,.jpeg,.png', inputChange, ...rest }: InputFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setEventValueToEmpty = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.currentTarget.value = ''
  }

  const validateFileBeforeUploading = (file?: File): boolean => {
    if (!file) return false

    if (file && (file.size >= MAX_SIZE_UPLOAD_AVATAR || !file.type.includes('image'))) {
      toast.warn('Dung lượng file tối đa 1 MB và định dạng:.JPEG, .PNG')
      return false
    }

    return true
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    const isFileValid = validateFileBeforeUploading(selectedFile)
    if (!isFileValid) return
    inputChange && inputChange(selectedFile)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept={accept}
        aria-label='Tải ảnh đại diện lên'
        ref={fileInputRef}
        onChange={handleFileChange}
        onClick={setEventValueToEmpty}
        {...rest}
      />
      <Button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm cursor-pointer hover:bg-white'
        onClick={handleUpload}
      >
        Chọn ảnh
      </Button>
    </>
  )
}

export default InputFile
