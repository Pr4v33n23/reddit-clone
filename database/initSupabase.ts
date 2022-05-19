import { createClient } from '@supabase/supabase-js'
import { Post, Subreddit } from '../models/models';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

export const getSubredditByTopic = async (topic: string) => {
    const { data, error } = await supabase
    .from<Subreddit>('subreddit')
    .select('*')
    .eq('topic', topic)
    .maybeSingle()

    return { data, error }
}

export const addPost = async (post: Post) => {
    const { data, error } = await supabase
    .from<Post>('post')
    .insert(post)
    .maybeSingle()

    return { data, error }
}

export const addSubreddit = async (subreddit:Subreddit) => {
    const {data, error } = await supabase
    .from<Subreddit>('subreddit')
    .insert(subreddit)
    .maybeSingle()

    return  {data, error}
}