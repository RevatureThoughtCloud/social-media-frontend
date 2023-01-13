import User from './User';

export default class Post {
  id: number;
  text: string;
  imageUrl: string;
  author: User;
  comments: Post[];
  postType: string;
  likes: number;

  constructor(
    id: number,
    text: string,
    imageUrl: string,
    author: User,
    comments: Post[],
    postType: string,
    likes?: number
  ) {
    this.id = id;
    this.text = text;
    this.imageUrl = imageUrl;
    this.author = author;
    this.comments = comments;
    this.postType = postType;
    this.likes = likes? likes: 0;
  }
}
