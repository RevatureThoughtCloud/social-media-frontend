import Post from "./Post";
import User from "./User";

export default class Like {
    post: Post;
    user: User;

    constructor(post: Post, user: User) {
        this.post = post;
        this.user = user;
    }
}