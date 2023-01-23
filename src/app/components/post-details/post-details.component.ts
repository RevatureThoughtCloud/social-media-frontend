import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent {
  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  posts: Post[] = [];
  postId: number;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.postId = Number(params.get('postid')))
    );
    this.postService.postById(this.postId).subscribe((response) => {
      this.posts.push(response);
    });
  }

  deletePost(postId: number) {
    if (confirm('Are you sure that you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id != postId);
      });
    }
  }
}
