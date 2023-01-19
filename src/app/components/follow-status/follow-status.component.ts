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
  target: User;

  //Switch between unfollow/follow label
  @Output() toggle = new EventEmitter<boolean>();

  //View follow request status
  followStatus$: Observable<FollowReqState>;

  //whether request is in progress
  inProgress: boolean = false;

  constructor(private store: Store<{ follow: FollowReqState }>) {
    this.followStatus$ = store.select('follow');

    this.followStatus$
      .pipe(
        tap((res: FollowReqState) => {
          //get progress
          this.inProgress = res.inProgress;

          //if complete and no error
          //let parent know the follow/unfollow
          //was successful
          if (res.completed && !res.error && !res.inProgress) {
            this.toggle.emit(!this.target.followedByCurrentUser);
          }
        })
      )
      .subscribe();
  }

  //Dispatch new (un)follow request
  followAction() {
    if (this.target.followedByCurrentUser) {
      this.store.dispatch(new UnFollow(this.target.userName));
    } else {
      this.store.dispatch(new Follow(this.target.userName));
    }
  }
}
