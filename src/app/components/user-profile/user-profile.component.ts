import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  updateProfileForm = new FormGroup({
    userName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    aboutMe: new FormControl(''),
  });

  profileId: number;
  currentUser: User = {} as User;
  posts: Post[] = [];
  postCount: number;
  isCurrentUserProfile: boolean;
  profileOwner: User = {} as User;
  isEditing: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.profileId = Number(params.get('id'));
      this.postService
        .getPostsByAuthor(this.profileId)
        .subscribe((response) => {
          this.posts = response;
          this.postCount = this.posts.length;
          this.isCurrentUserProfile = this.currentUser.id === this.profileId;

          if (!this.isCurrentUserProfile) {
            this.userService
              .getUserById(this.profileId)
              .subscribe((profileAuthor) => {
                this.profileOwner = profileAuthor;
              });
          } else {
            this.profileOwner = this.currentUser;
          }
        });
    });
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  updateProfile = (e: any) => {
    e.preventDefault();
    this.userService
      .updateUser(
        new User(
          this.profileOwner.id,
          this.profileOwner.email,
          this.updateProfileForm.value.firstName || '',
          this.updateProfileForm.value.lastName || '',
          this.updateProfileForm.value.userName || '',
          this.profileOwner.followersCount,
          this.profileOwner.followingsCount,
          this.updateProfileForm.value.aboutMe || '',
          this.profileOwner.followedByCurrentUser
        )
      )
      .subscribe((res) => {
        this.profileOwner = res;
        this.toggleEditMode();
      });
};

  //Toggle Follow / Unfollow button
  onToggleFollowing(following: boolean) {
    this.profileOwner.followedByCurrentUser = following;

    this.profileOwner.followersCount = following
      ? ++this.profileOwner.followersCount
      : --this.profileOwner.followersCount;
  }
}
