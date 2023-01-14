import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user: User = {} as User;
  posts: Post[] = [];
  postCount: number;

  constructor(private postService: PostService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser

    this.activatedRoute.paramMap.subscribe(params => {
      this.postService.getPostsByAuthor(Number(params.get('id'))).subscribe(response => { this.posts = response; this.postCount = this.posts.length;});
    });
  }
  
}
