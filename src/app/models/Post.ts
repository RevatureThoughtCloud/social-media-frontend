import User from './User';

export default class Post {
  id: number;
  text: string;
  imageUrl: string;
  author: User;
  comments: Post[];
  postType: string;
  likeCount: number;

  constructor(
    id: number,
    text: string,
    imageUrl: string,
    author: User,
    comments: Post[],
    postType: string,
    likeCount?: number
  ) {
    this.id = id;
    this.text = text;
    this.imageUrl = imageUrl;
    this.author = author;
    this.comments = comments;
    this.postType = postType;
    this.likeCount = likeCount? likeCount: 0;
  }
}
