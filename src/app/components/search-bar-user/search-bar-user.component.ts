import { Component } from "@angular/core";
import User from "src/app/models/User";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'search-bar-user',
  templateUrl: './search-bar-user.component.html',
  styleUrls: ['./search-bar-user.component.scss'],
})
export class SearchBarUserComponent {
  searchResults: User[] = [];
  public search: string = '';
  //s
  constructor(private userService: UserService) { }

  onChangeEvent(event: any) {
    if (this.search != '') {
      this.userService
        .getUserBySearchText(this.search)
        .subscribe((res) => (this.searchResults = res));
    }
  }

  ngOnInit(): void { }
}
