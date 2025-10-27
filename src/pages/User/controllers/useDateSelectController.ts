import { useState } from 'react'

const useDateSelectController = (value?: Date, onChange?: (value: Date) => void) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value ? value.getMonth() + 1 : 1,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: +value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month - 1, newDate.date))
  }

  const selectValue = (value: Date | undefined, name: keyof typeof date) =>
    value ? { date: value.getDate(), month: value.getMonth() + 1, year: value.getFullYear() }[name] : date[name]

  return {
    selectValue,
    handleChange
  }
}

export default useDateSelectController
