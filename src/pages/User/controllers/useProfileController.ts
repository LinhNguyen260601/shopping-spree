import { AppContext } from '@/contexts'
import { PROFILE_DEFAULT_VALUES, profileSchema, type FormDataError, type ProfileFormData } from '@/pages/User/core'
import { userService } from '@/services'
import type { ErrorResponse, User } from '@/types'
import { isAxiosUnprocessableEntityError, saveUserToLocalStorage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { toast } from 'react-toastify'

const useProfileController = () => {
  const [file, setFile] = useState<File>()

  const { data } = useLoaderData()
  const revalidator = useRevalidator()

  const setUser = useContext(AppContext).setUser

  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])

  const profile = data?.data as User

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      const response = data.data
      setUser(response.data)
      saveUserToLocalStorage(response.data)
      toast.success(response.message)
      revalidator.revalidate()
    }
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userService.uploadAvatar
  })

  const {
    watch,
    control,
    register,
    setValue,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ProfileFormData>({
    defaultValues: PROFILE_DEFAULT_VALUES,
    resolver: yupResolver(profileSchema) as Resolver<ProfileFormData>,
    mode: 'onChange'
  })

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        avatar: profile.avatar,
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      })
    }
  }, [profile, reset])

  const onSubmit = handleSubmit(async (data: ProfileFormData) => {
    try {
      let src = avatar

      if (file) {
        const uploadRes = await uploadAvatarMutation.mutateAsync(file)
        src = uploadRes.data.data
        setValue('avatar', src)
      }

      updateProfileMutation.mutate({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: src
      })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleFileChange = (file?: File) => {
    setFile(file)
  }

  return {
    avatar,
    errors,
    isValid,
    control,
    isDirty,
    profile,
    register,
    previewImage,
    fileInputRef,
    isSubmiting: updateProfileMutation.isPending,
    onSubmit,
    handleFileChange
  }
}

export default useProfileController
