export type Comment = {
    id?: Number,
    created_at?: String,
    text: String,
    username: String,
    post_id: Number,
}

export type Post = {
    id?: Number,
    title: String,
    body: String,
    image: String,
    username: String,
    created_at?: String,
    subreddit_id: Number
}

export type Subreddit = {
    id?: Number,
    topic: String,
    created_at?: String,
}

export type Vote = {
    id?: Number,
    created_at?: String,
    post_id: Number,
    upvote: boolean,
    username: String
}
