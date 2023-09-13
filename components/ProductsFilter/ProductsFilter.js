import { nanoid } from 'nanoid'
import Link from 'next/link'
import { icons } from '../../public/static/fixture'

const CategoriesFilter = ({ className, categories, parentCategory }) => {
  const categoriesElement = []
  if (parentCategory) {
    categories = parentCategory.children
  }
  const catsCount = categories.length
  for (const category of categories) {
    categoriesElement.push(
      <li key={nanoid()} className='mb-24'>
        <Link href={`/shop/${category.slug}`}>
          <button className='text-14 leading-16 text-d-gray-300 hover:text-f-red-500'><span />
            <span>{category.name}</span>
          </button>
        </Link>
      </li>
    )
  }
  return (
    <div className={className}>
      <div className='text-16 leading-18 flex items-center justify-between mb-32'>
        <div className='flex items-center'>
          <h4 className='font-medium text-d-gray-400 mr-12'>Популярные категории</h4>
          <span className='text-gray-400'>{catsCount}</span>
        </div>
        <button className='text-d-gray-200 stroke-current' dangerouslySetInnerHTML={{ __html: icons.chevronUp }} />
      </div>
      <div>
        <ul>
          {categoriesElement}
        </ul>
      </div>
    </div>
  )
}

const AttributesFilter = ({
  className,
  attrName,
  name,
  attrs,
  active,
  filterValues
}) => {
  const attrsElement = []
  const attrsCount = attrs.length
  for (const i in attrs) {
    const attr = attrs[i]
    const isActive = (active || []).includes(attr.name)
    attrsElement.push(
      <li key={nanoid()} className={`${parseInt(i) !== attrsCount - 1 ? 'mb-24' : ''}`}>
        <button
          className={`text-14 leading-16 hover:text-f-red-500 flex items-center ${isActive ? 'text-d-gray-400 hover:text-d-gray-400' : 'text-d-gray-300'}`}
          onClick={() => filterValues(attrName, attr.name)}
        >
          <span
            className={`stroke-current block mr-8 ${isActive ? 'text-d-gray-400' : 'text-d-gray-200'}`}
            dangerouslySetInnerHTML={{ __html: isActive ? icons.checked : icons.unchecked }}
          />
          <span>{attr.name}</span>
        </button>
      </li>
    )
  }
  return (
    <div className={className}>
      <div className='text-16 leading-18 flex items-center justify-between mb-32'>
        <div className='flex items-center'>
          <h4 className='font-medium text-d-gray-400 mr-12'>{name}</h4>
          <span className='text-gray-400'>{attrsCount}</span>
        </div>
        <button className='text-d-gray-200 stroke-current' dangerouslySetInnerHTML={{ __html: icons.chevronUp }} />
      </div>
      <div className='max-h-264 overflow-y-auto oxxo-scroll'>
        <ul>
          {attrsElement}
        </ul>
      </div>
    </div>
  )
}

const ProductsFilter = ({
  categories,
  category,
  colors,
  active,
  filterValues
}) => {
  return (
    <div>
      <CategoriesFilter className='mb-38' categories={categories} parentCategory={category} />
      <AttributesFilter
        name='Цвет' attrs={colors} attrName='colors' active={active.colors}
        filterValues={filterValues}
      />
    </div>
  )
}

export default ProductsFilter
