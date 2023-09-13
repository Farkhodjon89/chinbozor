import { StaticDataSingleton } from '../../utils/staticData'
import Layout from '../../components/Layout/Layout'
import client from '../../appolo/apollo-client'
import { POST, POSTS_SLUGS } from '../../queries/posts'
import React from 'react'

const Blog = ({ post, categories }) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Блог',
      url: '/'
    },
    {
      name: post.title,
      active: true
    }
  ]
  return (
    <Layout breadcrumbs={breadcrumbs} categories={categories}>
      <div className='container'>
        {post.fullImage &&
          (
            <div className='mb-26'>
              <img className='block mx-auto' src={post.fullImage?.node.sourceUrl} />
            </div>
          )}
        <article className='mb-100 prose max-w-full' dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = []

  const getPostsSlugs = async (after) => {
    const temp = await client.query({
      query: POSTS_SLUGS,
      variables: {
        first: 100,
        ...(after ? { after } : {})
      }
    })

    paths.push(
      ...temp.data.posts.nodes.map((post) => ({
        params: { slug: post.slug }
      }))
    )

    if (temp.data.posts.pageInfo.hasNextPage) {
      await getPostsSlugs(temp.data.posts.pageInfo.endCursor)
    }
  }

  if (process.env.NODE_ENV === 'production') {
    await getPostsSlugs()
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps ({ params }) {
  const post = await client.query({
    query: POST,
    variables: { id: params.slug }
  })

  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()

  return {
    props: {
      categories,
      post: post.data.post
    },
    revalidate: 60
  }
}

export default Blog
