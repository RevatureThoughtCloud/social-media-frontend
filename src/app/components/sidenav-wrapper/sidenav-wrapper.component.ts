import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';
import {
  GetFollowings,
  GetFollowers,
} from 'src/app/store/actions/user-data.actions';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { FollowReqState } from 'src/app/store/reducers/follows.reducer';
import { UserDataReqState } from 'src/app/store/reducers/user-data.reduces';
import { getImage } from 'src/app/pictures';
@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss'],
})
export class SidenavWrapperComponent {
  @Input()
  isExpanded: boolean = false;

  auth$: Observable<AuthState>;
  public userInfo$: Observable<UserDataReqState>;
  currentUser: User | undefined;

  public getImg = getImage;
  follows$: Observable<FollowReqState>;

  constructor(
    private store: Store<{
      auth: AuthState;
      userInfo: UserDataReqState;
      follow: FollowReqState;
    }>
  ) {
    this.auth$ = this.store.select('auth');
    this.userInfo$ = this.store.select('userInfo');
    this.follows$ = this.store.select('follow');
  }

  ngOnInit(): void {
    this.auth$.subscribe((res: AuthState) => {
      if (res && res.user && res.user.userName) {
        this.currentUser = res.user;
        this.store.dispatch(new GetFollowings(res.user?.userName ?? ''));
        this.store.dispatch(new GetFollowers(res.user?.userName ?? ''));
      }
    });

    this.follows$.subscribe((res: FollowReqState) => {
      if (res.completed == true && res.error == false) {
        this.store.dispatch(
          new GetFollowings(this.currentUser?.userName ?? '')
        );
      }
    });
  }
}
