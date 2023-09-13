import { TABS } from './constants'
import { MenuItem } from './MenuItem'

export const PersonalCabinet = ({ children, products }) => {
  return (
    <div className='container mb-50'>
      <h1
        className='text-24 leading-28 text-d-gray-400 font-bold mb-38'
      >
        Личный кабинет
      </h1>
      <div className='grid grid-cols-12 gap-30'>
        <div className='col-start-1 col-end-13 md:col-start-1 md:col-end-4'>
          <ul className='text-d-gray-300 text-16 stroke-current'>
            {TABS.map(({ link, label, img }) => <MenuItem key={label} img={img} link={link} label={label} />)}
          </ul>

        </div>
        <div className=' col-start-1 col-end-13 md:col-start-4 md:col-end-13 '>
          {children}
        </div>

      </div>

    </div>
  )
}
