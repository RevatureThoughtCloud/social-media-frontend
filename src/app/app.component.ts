import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PreferencesState } from "./store/reducers/user-preferences.reducers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'social-media-angular';
  preferences$: Observable<PreferencesState>;
  constructor(private store: Store<{ preferences: PreferencesState }>) {
    this.preferences$ = store.select('preferences');
  }
}
