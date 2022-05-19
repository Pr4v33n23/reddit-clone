import { PhotographIcon, LinkIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  addPost,
  addSubreddit,
  getSubredditByTopic,
} from '../database/initSupabase'
import { Post, Subreddit } from '../models/models'
import Avatar from './Avatar'

type PostFormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

const PostBox = () => {
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormData>()

  const onSubmit = handleSubmit(async (postFormData) => {
    console.log(postFormData)
    const notification = toast.loading('Creating new post...')
    try {
      const { data: subreddit } = await getSubredditByTopic(
        postFormData.subreddit
      )
      if (subreddit) {
        let post: Post = {
          title: postFormData.postTitle,
          body: postFormData.postBody,
          image: postFormData.postImage || '',
          username: session?.user?.name!,
          subreddit_id: subreddit.id!,
        }
        await addPost(post)
        toast.success('New post added successfully', {
          id: notification,
        })
      } else {
        let newSubreddit: Subreddit = {
          topic: postFormData.subreddit.toLowerCase(),
        }

        const { data: subreddit } = await addSubreddit(newSubreddit)
        let post: Post = {
          title: postFormData.postTitle,
          body: postFormData.postBody,
          image: postFormData.postImage || '',
          username: session?.user?.name!,
          subreddit_id: subreddit?.id!,
        }
        await addPost(post)
        toast.success('New post added successfully', {
          id: notification,
        })
      }

      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')
    } catch (err) {
      toast.error('Something went wrong', {
        id: notification,
      })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title' : 'Sign in to post'
          }
        />
        <LinkIcon className="h-6 text-gray-300" />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body: </p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit: </p>
            <input
              {...register('subreddit', { required: true })}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="i.e. nextjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL: </p>
              <input
                {...register('postImage')}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="i.e. nextjs"
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p className="">- A Post Title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p className="">- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button className="w-full rounded-full bg-blue-400 p-2 text-white">
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
