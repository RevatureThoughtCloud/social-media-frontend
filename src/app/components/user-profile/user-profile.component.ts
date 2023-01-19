import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileId: number;
  user: User = {} as User;
  posts: Post[] = [];
  postCount: number;
  isCurrentUserProfile: boolean;
  profileOwner: User = {} as User;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.profileId = Number(params.get('id'));
      this.postService
        .getPostsByAuthor(this.profileId)
        .subscribe((response) => {
          this.posts = response;
          this.postCount = this.posts.length;
          this.isCurrentUserProfile = this.user.id === this.profileId;
          if (!this.isCurrentUserProfile) {
            this.userService.getUserById(this.profileId).subscribe((profileAuthor) => {
              this.profileOwner = profileAuthor;
            });
          } else {
            this.profileOwner = this.user;
          }
        });
    });
  }

  //Toggle Follow / Unfollow button
  onToggleFollowing(following: boolean) {
    this.profileOwner.followedByCurrentUser = following;
  }
}
