import InputMask from 'react-input-mask'

const Input = ({
  className,
  type = 'text',
  placeholder = '',
  label,
  name,
  error,
  register = () => {},
  control,
  required
}) => {
  const classes = `border rounded px-18 py-15 text-15 leading-17 w-full placeholder-d-gray-100 ${error ? 'border-f-red-400' : 'border-gray-100'}`
  let pattern = ''
  if (type === 'phone') {
    pattern = /^[\+]?[0-9]{3}?[-\s\.]?[(]?[0-9]{2}?[)][-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{2}?[-\s\.]?[0-9]{2}$/im
  } else if (type === 'email') {
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  }
  return (
    <div className='relative'>
      {label ? <label className='absolute left-16 -top-7 text-13 leading-15 text-d-gray-400 bg-white-100 px-3'>{label}</label> : null}
      {type === 'phone'
        ? (
          <InputMask
            mask='+\9\98 (99) 999 99 99'
            placeholder={placeholder}
            alwaysShowMask
            name={type}
            {...register(name, {
              required: required || required,
              pattern: pattern || pattern
            })}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                className={classes}
              />
            )}
          </InputMask>
          )
        : <input
            type={type}
            placeholder={placeholder}
            className={classes}
            {...register(name, {
              required: required || required,
              pattern: pattern || pattern
            })}
          />}

      {error ? <span className='absolute -bottom-21 left-0 text-13 leading-15 text-f-red-400 px-20'>{error.message}</span> : null}
    </div>
  )
}
export default Input
