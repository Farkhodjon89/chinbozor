import Link from 'next/link'

export const MenuItem = ({ label, link, img }) => {
  return (
    <li className=' mb-14'>
      <Link legacyBehavior href={link}>
        <a className='border border-white-200 hover:border-f-green-500 rounded flex items-center p-15 bg-white-200  h-48 hover:bg-f-green-100 hover:text-f-green-500'>
          <i className='mr-13' dangerouslySetInnerHTML={{ __html: img }} />
          {label}
        </a>
      </Link>
    </li>
  )
}
