import { AppContext } from '@/contexts'
import { PROFILE_DEFAULT_VALUES, profileSchema, type ProfileFormData } from '@/pages/User/core'
import { userService } from '@/services'
import type { User } from '@/types'
import { saveUserToLocalStorage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { toast } from 'react-toastify'

const useProfileController = () => {
  const { data } = useLoaderData()
  const revalidator = useRevalidator()
  const setUser = useContext(AppContext).setUser

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

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ProfileFormData>({
    defaultValues: PROFILE_DEFAULT_VALUES,
    resolver: yupResolver(profileSchema) as Resolver<ProfileFormData>,
    mode: 'onChange'
  })

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

  const onSubmit = handleSubmit((data: ProfileFormData) => {
    updateProfileMutation.mutate({
      ...data,
      date_of_birth: data.date_of_birth?.toISOString()
    })
  })

  return {
    errors,
    isValid,
    control,
    isDirty,
    profile,
    register,
    isSubmiting: updateProfileMutation.isPending,
    onSubmit
  }
}

export default useProfileController
