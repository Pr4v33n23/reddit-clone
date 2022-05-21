import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { Post, Vote } from '../models/models'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'

type PostProps = {
  post: Post
}

const PostFeed = ({ post }: PostProps) => {
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  const seed = post.subreddit!.topic
  return (
    <Link href={`/post/${post.id}`} passHref>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={seed} />
            <p className="text-xs  text-gray-400">
              <Link href={`/subreddit/${seed}`} passHref>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{seed}
                </span>
              </Link>
              - Posted by u/{post.username} <TimeAgo date={post.created_at!} />
            </p>
          </div>

          <div className="py-4 mx-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          <img className="w-full" src={post.image} alt="" />

          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline">
                {post.comment?.length} Comments
              </p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostFeed
