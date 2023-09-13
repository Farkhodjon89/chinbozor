import moment from 'moment'

const BlogItem = ({ data }) => {
  const url = `/blog/${data.slug}`
  const date = moment(data.date)
  return (
    <div>
      <div className='mb-14'>
        <a href={url}>
          <img src={data.thumbnail?.node.sourceUrl} />
        </a>
      </div>
      <div className='text-13 leading-15 text-d-gray-100 mb-10'>{`${date.format('DD.MM.YYYY')}`}</div>
      <div>
        <h4>
          <a className='text-15 leading-20 text-d-gray-400 hover:text-f-green-500' href={url}>{data.title}</a>
        </h4>
      </div>
    </div>
  )
}

export default BlogItem
