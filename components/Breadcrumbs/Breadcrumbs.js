import { nanoid } from 'nanoid'

const Breadcrumbs = ({ data = [] }) => {
  if (data.length < 1) {
    return <div className='h-36' />
  }
  const breadCrumbsElement = []

  for (const k in data) {
    breadCrumbsElement.push(
      <li className='mr-3' key={nanoid()}>
        <a href={data[k].url} className={`hover:text-f-red-500 ${data[k].active ? 'text-f-red-400' : ''}`}>{data[k].name}</a>
      </li>
    )
    if (parseInt(k) !== data.length - 1) {
      breadCrumbsElement.push(
        <li className='mr-3' key={nanoid()}> / </li>
      )
    }
  }

  return (
    <div className='bg-white-200 mb-36'>
      <div className='container py-11'>
        <ul className='flex text-gray-400 text-12 leading-14'>
          {breadCrumbsElement}
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumbs
