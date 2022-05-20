import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../database/initSupabase'
import { Post } from '../models/models'
import PostFeed from './PostFeed'

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>()

  useEffect(() => {
    async function Posts() {
      const { data } = await getAllPosts()
      setPosts(data!)
    }
    Posts()
  },[posts])

  return (
    <div className='mt-5 space-y-4'>
      {posts?.map((post: Post) => (
        <PostFeed key={post.id?.toString()} post={post} />
      ))}
    </div>
  )
}

export default Feed
