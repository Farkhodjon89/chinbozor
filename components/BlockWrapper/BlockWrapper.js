import { icons } from '../../public/static/fixture'

const BlockWrapper = ({ children, className, title, linkName, link }) => {
  return (
    <div className={`container ${className}`}>
      <div className='mb-32 flex justify-between items-center mb-32'>
        <h2 className='font-bold text-d-gray-400 text-24 leading-28'>{title}</h2>
        {linkName && <a href={link} className='flex items-center font-medium text-15 text-d-gray-400 leading-17 hover:underline transition'>{linkName} <i className='ml-8' dangerouslySetInnerHTML={{ __html: icons.longArrowRight }} /></a>}
      </div>
      {children}
    </div>
  )
}

export default BlockWrapper
