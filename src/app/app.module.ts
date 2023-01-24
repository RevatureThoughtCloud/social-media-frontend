import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AppStoreModule } from './store/store.module';
import { Store } from '@ngrx/store';
import { GeneralEntityAppState } from './store/app.state';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationComponent } from './components/notification/notification.component';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { FollowStatusComponent } from './components/follow-status/follow-status.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { UserInfoPopoverComponent } from './components/user-info-popover/user-info-popover.component';
import { SearchBarUserComponent } from './components/search-bar-user/search-bar-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PersonalizedFeedComponent } from './components/personalized-feed/personalized-feed.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifiedAccountComponent } from './components/verified-account/verified-account.component';

import { PostDetailsComponent } from './components/post-details/post-details.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    UserProfileComponent,
    NotificationListComponent,
    NotificationComponent,

    FollowStatusComponent,
    SidenavWrapperComponent,
    UserInfoPopoverComponent,
    SearchBarUserComponent,
    PersonalizedFeedComponent,
    ResetPasswordComponent,
    VerifiedAccountComponent,

    PostDetailsComponent,
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    MatAutocompleteModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppStoreModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    RatingModule,
    RippleModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store: Store<GeneralEntityAppState>) { }
}
