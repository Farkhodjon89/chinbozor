import { icons } from '../../public/static/fixture'
import Input from '../Input/Input'
import Select from '../Select/Select'

export const RadioButton = ({
  isActive,
  setPayment,
  value,
  icon,
  image,
  label,
}) => {
  return (
    <button
      className={`group w-full h-58 border pl-20 pr-15 rounded flex items-center justify-between font-medium text-15 leading-17 transition 
                    ${
                      isActive
                        ? 'border-f-green-500 text-f-green-500'
                        : 'border-gray-100 text-d-gray-300 hover:bg-f-red-500 hover:text-white-100 hover:border-f-red-400'
                    }`}
      onClick={() => {
        setPayment(value)
      }}
    >
      {icon ? (
        <span
          className={`fill-current ${
            isActive ? 'text-gray-500' : 'group-hover:text-white-100'
          }`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      ) : image ? (
        <span>{image}</span>
      ) : (
        <span>{label}</span>
      )}
      <span
        className={`stroke-current transition ${
          isActive
            ? 'text-f-green-500'
            : 'text-gray-500 group-hover:text-white-100'
        }`}
        dangerouslySetInnerHTML={{
          __html: isActive ? icons.radioChecked : icons.radioUnchecked,
        }}
      />
    </button>
  )
}

const CheckoutForm = ({
  sections,
  errors,
  dirtyFields,
  total,
  setPayment,
  payment,
}) => {
  const stepLineStyle =
    'absolute left-17 top-0 bottom-0 border-l border-dashed border-gray-100'
  const stepCircleStyle =
    'w-36 h-36 rounded-full bg-gray-100 mr-24 md:mr-59 flex items-center justify-center text-15 leading-17 text-white-100'
  const passedStepLineStyle =
    'absolute left-17 top-0 bottom-0 border-l border-dashed border-f-green-500'
  const passedStepCircleStyle =
    'w-36 h-36 rounded-full bg-d-gray-400 mr-24 md:mr-59 flex items-center justify-center text-15 leading-17 text-white-100 z-10'
  const sectionsElement = []

  for (const key in sections) {
    const fieldsElement = []
    const section = sections[key]
    section.requiredFieldsNum = -1
    const prevSection = sections[parseInt(key) - 1]
    let isActiveStep = false
    if (!prevSection) {
      isActiveStep = true
    } else if (payment) {
      isActiveStep = true
    } else if (
      dirtyFields[prevSection.step] &&
      Object.keys(dirtyFields[prevSection.step]).length >
        prevSection.requiredFieldsNum &&
      !errors[prevSection.step]
    ) {
      isActiveStep = true
    }
    const isLastStep = sections.length - 1 === parseInt(key)
    const stepNumber = `0${parseInt(key) + 1}`
    for (const fieldKey in section.fields) {
      const field = section.fields[parseInt(fieldKey)]
      const rowStyle = `${
        field.row === 'full'
          ? 'col-start-1 col-end-3'
          : 'md:col-auto col-start-1 col-end-3'
      }`
      if (field.type === 'radio') {
        if (field.value === 'zoodpay' && total > 500000) {
          continue
        }
        fieldsElement.push(
          <li key={fieldKey} className={rowStyle}>
            <RadioButton
              label={field.label}
              icon={field.icon}
              value={field.value}
              setPayment={setPayment}
              name={field.name}
              image={field.image}
              isActive={field.value === payment}
            />
          </li>
        )
      } else if (field.type === 'select') {
        fieldsElement.push(
          <li key={fieldKey} className={rowStyle}>
            <Select
              error={field.error}
              options={field.options}
              register={field.register}
              required={field.required}
              placeholder={field.placeholder}
              label={field.label}
              name={field.name}
            />
          </li>
        )
      } else {
        fieldsElement.push(
          <li key={fieldKey} className={rowStyle}>
            <Input
              type={field.type}
              control={field.control}
              error={field.error}
              register={field.register}
              required={field.required}
              placeholder={field.placeholder}
              label={field.label}
              name={field.name}
            />
          </li>
        )
      }
      if (field.required) {
        section.requiredFieldsNum += 1
      }
    }
    sectionsElement.push(
      <li key={key}>
        <div className='pb-32 relative'>
          <div className='flex'>
            {!isLastStep && (
              <div
                className={isActiveStep ? passedStepLineStyle : stepLineStyle}
              />
            )}
            <div
              className={isActiveStep ? passedStepCircleStyle : stepCircleStyle}
            >
              {stepNumber}
            </div>
            <div className='font-medium text-16 leading-18 text-d-gray-400 pt-11'>
              {section.sectionName}
            </div>
          </div>
          <ul
            className={`pl-60 md:pl-96 grid grid-cols-1 md:grid-cols-2 gap-30 pt-32 ${
              isActiveStep ? 'block' : 'hidden'
            }`}
          >
            {fieldsElement}
          </ul>
        </div>
      </li>
    )
  }

  return <ul>{sectionsElement}</ul>
}

export default CheckoutForm
