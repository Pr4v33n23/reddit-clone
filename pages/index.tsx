import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { getSubreddit } from '../database/initSupabase'
import { Subreddit } from '../models/models'

const Home: NextPage = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>()

  useEffect(() => {
    const fetchSubreddits = async () => {
      const { data } = await getSubreddit()
      setSubreddits(data!)
    }
    fetchSubreddits()
  })

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit</title>
      </Head>
      <PostBox />
      <div className="flex">
        <Feed />
        {subreddits && (
          <div className="top-46 sticky mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
            <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
            <div>
              {subreddits?.map((subreddit, i) => (
                <SubredditRow
                  key={subreddit.id}
                  topic={subreddit.topic}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
