import { Jelly } from '@uiball/loaders'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'

const Subreddit = () => {
  const [topicValue, setTopicValue] = useState('')
  const router = useRouter()
  const {
    query: { topic },
  } = useRouter()

  useEffect(() => {
    router.isReady
      ? setTopicValue(topic as string)
      : console.warn('router is not ready')
  }, [topic])

  if (!topicValue)
    return (
      <div className="p-50 flex w-full items-center justify-center text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  return (
    <div className={`h-24 bg-orange-600 p-8`}>
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topicValue as string} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topicValue} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topicValue}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-5xl pb-10">
        {topicValue ? <PostBox subreddit={topicValue as string} /> : ''}
        {topicValue ? <Feed topic={topicValue as string} /> : ''}
      </div>
    </div>
  )
}

export default Subreddit
