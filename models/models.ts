export type Comment = {
    id?: Number,
    created_at?: string,
    text: string,
    username: string,
    post_id: Number,
}

export type Post = {
    id?: Number,
    title: string,
    body: string,
    image: string,
    username: string,
    created_at?: string,
    subreddit_id: Number,
    comment?: Comment[],
    subreddit?: Subreddit,
    votes?: Vote[]
}

export type Subreddit = {
    id?: Number,
    topic: string,
    created_at?: string,
}

export type Vote = {
    id?: Number,
    created_at?: string,
    post_id: Number,
    upvote: boolean,
    username: string
}
