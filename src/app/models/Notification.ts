import Post from "./Post";
import User from "./User";

export default interface Notification {

    id: number;
    recipient: User;
    sender: User;
    post: Post;
    type: string;
    status: string;
    message: string;

}