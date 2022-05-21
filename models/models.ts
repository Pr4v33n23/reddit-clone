export type Comment = {
    id?: number,
    created_at?: string,
    text: string,
    username: string,
    post_id: number,
}

export type Post = {
    id?: number,
    title: string,
    body: string,
    image: string,
    username: string,
    created_at?: string,
    subreddit_id: number,
    comment?: Comment[],
    subreddit?: Subreddit,
    votes?: Vote[]
}

export type Subreddit = {
    id?: number,
    topic: string,
    created_at?: string,
}

export type Vote = {
    id?: number,
    created_at?: string,
    post_id: number,
    upvote: boolean,
    username: string
}
