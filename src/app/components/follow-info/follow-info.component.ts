import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FollowsService } from 'src/app/services/follows.service';
@Component({
  selector: 'app-follow-info',
  templateUrl: './follow-info.component.html',
  styleUrls: ['./follow-info.component.scss'],
})
export class FollowInfoComponent {
  currentUser: User;
  followers: User[];
  followings: User[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(
    private followsService: FollowsService,
    private authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;

    this.followsService
      .getUsersFollowers(this.currentUser.userName)
      .subscribe((res: User[]) => {
        this.followers = res;
      });

    this.followsService
      .getUsersFollowings(this.currentUser.userName)
      .subscribe((res: User[]) => {
        this.followings = res;
      });

    this.primengConfig.ripple = true;
  }

  onSortChange(event: HTMLInputElement) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
