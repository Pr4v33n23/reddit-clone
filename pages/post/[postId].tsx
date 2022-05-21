import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import PostFeed from '../../components/PostFeed'
import { addComment, getPostById } from '../../database/initSupabase'
import { Post, Comment } from '../../models/models'
import TimeAgo from 'react-timeago'

type FormData = {
  comment: string
}

const PostPage = () => {
  const router = useRouter()
  const [post, setPost] = useState<Post>()
  const postId = router.query.postId as unknown as number
  const { data: session } = useSession()

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    const Posts = async () => {
      const { data, error } = await getPostById(postId)
      setPost(data)
    }

    Posts()
  }, [postId])

  const onSubmit: SubmitHandler<FormData> = async ({ comment }) => {
    const notification = toast.loading('Adding your comment...')

    const commentToInsert: Comment = {
      text: comment,
      username: session?.user?.name!,
      post_id: postId,
    }

    const { data, error } = await addComment(commentToInsert)

    reset({ comment: '' })
    toast.success('Comment added successfully', {
      id: notification,
    })

    router.reload()
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      {post && <PostFeed post={post!} />}
      <div className="-mt-1  rounded-b-md  border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as{' '}
          <span className="text-orange-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            {...register('comment')}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts?' : 'Please sign in to comment'
            }
          />
          <button
            disabled={!session}
            type="submit"
            className="rounded-full bg-orange-500 p-3 font-semibold disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comment?.map((comment) => (
          <div
            className="relative flex items-center space-x-2 space-y-5"
            key={comment.id?.toString()}
          >
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username}{' '}
                </span>
                <TimeAgo date={comment.created_at!} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
