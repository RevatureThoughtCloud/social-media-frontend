import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css'],
})
export class PostFeedPageComponent implements OnInit {
  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  posts: Post[] = [];
  createPost: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.postService.getAllTopPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost;
  };

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService
      .upsertPost(
        new Post(
          0,
          this.postForm.value.text || '',
          this.postForm.value.imageUrl || '',
          this.authService.currentUser,
          [],
          'Top'
        )
      )
      .subscribe((response) => {
        this.posts = [response, ...this.posts];
        this.toggleCreatePost();
      });
  };

  deletePost(postId: number) {
    if (confirm('Are you sure that you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id != postId);
      });
    }
  }
}
