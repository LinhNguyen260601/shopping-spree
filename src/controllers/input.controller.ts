import { useState } from 'react'

const useInputController = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleFocus = (focus: boolean) => () => setIsFocused(focus)

  const handleTogglePassword = () => setShowPassword(!showPassword)

  return {
    isFocused,
    showPassword,
    handleFocus,
    handleTogglePassword
  }
}

export default useInputController
