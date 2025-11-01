import { useDateSelectController } from '@/pages/User/controllers'
import { DATE_SELECTS } from '@/pages/User/core'
import { useTranslation } from 'react-i18next'

interface DateSelectProps {
  value?: Date
  errorMsg?: string
  onChange?: (value: Date) => void
}

const DateSelect = ({ value, errorMsg = '', onChange }: DateSelectProps) => {
  const { t } = useTranslation('user')
  const { selectValue, handleChange } = useDateSelectController(value, onChange)

  const getLabel = (name: 'date' | 'month' | 'year') => {
    return t(`dateSelect.${name}`)
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <label htmlFor='date-of-birth-select' className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
        {t('dateSelect.dateOfBirth')}
      </label>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          {DATE_SELECTS.map(({ label, options, name }) => (
            <select
              key={label}
              name={name}
              id='date-of-birth-select'
              value={selectValue(value, name)}
              onChange={handleChange}
              className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange-500 cursor-pointer focus-visible:border-orange-500 outline-none'
            >
              <option disabled>{getLabel(name)}</option>
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ))}
        </div>
        <div className='mt-1 h-5 flex items-start'>
          <p className='text-red-600 text-sm leading-tight' role='alert' aria-live='polite'>
            {errorMsg}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DateSelect
