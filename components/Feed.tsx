import React, { useEffect, useState } from 'react'
import { getAllPosts, getAllPostsByTopic } from '../database/initSupabase'
import { Post } from '../models/models'
import PostFeed from './PostFeed'

type FeedProps = {
  topic?: string
}

const Feed = ({ topic }: FeedProps) => {
  const [posts, setPosts] = useState<Post[]>()
  useEffect(() => {
    async function Posts() {
      const { data } = !topic
        ? await getAllPosts()
        : await getAllPostsByTopic(topic)

      setPosts(data!)
    }
    Posts()
  }, [topic])

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post: Post) => (
        <PostFeed key={post.id?.toString()} post={post} />
      ))}
    </div>
  )
}

export default Feed
