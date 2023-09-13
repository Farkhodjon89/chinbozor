import BlogItem from '../BlogItem/BlogItem'
import { nanoid } from 'nanoid'

const BlogList = ({ posts }) => {
  const postsElement = []
  for (const post of posts) {
    postsElement.push(
      <li key={nanoid()} className='mb-14'>
        <BlogItem data={post} />
      </li>
    )
  }

  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 gap-30'>
      {postsElement}
    </ul>
  )
}

export default BlogList
