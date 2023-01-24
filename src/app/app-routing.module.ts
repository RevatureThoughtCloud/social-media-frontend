import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { PersonalizedFeedComponent } from './components/personalized-feed/personalized-feed.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'personalized-feed',
    component: PersonalizedFeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-feed',
    component: PostFeedPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-details/:postid',
    component: PostDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'notifications',
    component: NotificationListComponent,
    canActivate: [AuthGuard],
  },
  //until 404 component is made, redirect to post-feed if nonexistent route
  {
    path: '**',
    redirectTo: '/post-feed',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
