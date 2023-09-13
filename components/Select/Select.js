const Select = ({
  className,
  placeholder = '',
  label,
  error,
  name,
  register = () => {},
  required,
  options
}) => {
  return (
    <div className='relative'>
      {label ? <label className='absolute left-16 -top-7 text-13 leading-15 text-d-gray-300 bg-white-100 px-3'>{label}</label> : null}
      <select
        className={`oxxo-select border text-d-gray-400 rounded px-18 py-15 text-15 leading-17 w-full appearance-none ${error ? 'border-f-red-400' : 'border-gray-100'}`}
        {...register(name, { required })}
      >
        <option disabled selected>{placeholder}</option>
        {options && options.map(({ name, value }, key) => (
          <option value={value} key={key}>{name}</option>
        ))}
      </select>
      {error ? <span className='absolute -bottom-21 left-0 text-13 leading-15 text-f-red-400 px-20'>{error}</span> : null}
    </div>
  )
}
export default Select
