import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import User from 'src/app/models/User';
import { Follow, UnFollow } from 'src/app/store/actions/follows.actions';
import { FollowReqState } from 'src/app/store/reducers/follows.reducer';

@Component({
  selector: 'follow-status-button',
  templateUrl: './follow-status.component.html',
  styleUrls: ['./follow-status.component.scss'],
})
export class FollowStatusComponent {
  //User that is being followed/unfollowed
  @Input()
  profileOwner: User;
  //To report changes in following status
  @Output() profileOwnerChange = new EventEmitter<User>();

  //View follow request status
  followStatus$: Observable<FollowReqState>;

  constructor(private store: Store<{ follow: FollowReqState }>) {
    this.followStatus$ = store.select('follow');
  }

  ngOnInit(): void {
    this.followStatus$
      .pipe(
        tap((res: FollowReqState) => {
          //if complete and no error
          //let parent know the follow/unfollow
          //was successful
          if (res.completed && !res.error && !res.inProgress) {
            this.profileOwner.followersCount = this.profileOwner
              .followedByCurrentUser
              ? --this.profileOwner.followersCount
              : ++this.profileOwner.followersCount;
            this.profileOwner.followedByCurrentUser =
              !this.profileOwner.followedByCurrentUser;

            this.profileOwnerChange.emit(this.profileOwner);
          }
        })
      )
      .subscribe();
  }
  //Dispatch new (un)follow request
  followAction() {
    if (this.profileOwner.followedByCurrentUser) {
      this.store.dispatch(new UnFollow(this.profileOwner.userName));
    } else {
      this.store.dispatch(new Follow(this.profileOwner.userName));
    }
  }
}
