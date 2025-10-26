import { PROFILE_DEFAULT_VALUES, profileSchema, type ProfileFormData } from '@/pages/User/core'
import type { User } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useLoaderData } from 'react-router-dom'

const useProfileController = () => {
  const { data } = useLoaderData()

  const profile = data?.data as User

  const form = useForm<ProfileFormData>({
    defaultValues: PROFILE_DEFAULT_VALUES,
    resolver: yupResolver(profileSchema) as Resolver<ProfileFormData>
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        avatar: profile.avatar,
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      })
    }
  }, [profile, form.reset])

  return {
    form,
    profile
  }
}

export default useProfileController
