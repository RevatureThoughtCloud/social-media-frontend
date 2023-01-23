import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserDataReqState } from 'src/app/store/reducers/user-data.reduces';

@Component({
  selector: 'personalized-feed',
  templateUrl: '../post-feed-page/post-feed-page.component.html',
  styleUrls: ['../post-feed-page/post-feed-page.component.css'],
})
export class PersonalizedFeedComponent implements OnInit {
  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  posts: Post[] = [];
  createPost: boolean = false;
  followings: User[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private store: Store<{ userInfo: UserDataReqState }>
  ) {
    this.store.select('userInfo').subscribe((res) => {
      this.followings = res.followings;
    });
  }

  ngOnInit(): void {
    this.postService.getAllTopPosts().subscribe((response: Post[]) => {
      this.posts = response.filter((_user) =>
        this.followings.find((x) => x.id == _user.author.id)
      );
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
