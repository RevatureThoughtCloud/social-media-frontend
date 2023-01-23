import { NgModule } from '@angular/core';
import { AppReducersModule } from './reducer.module';
import { FollowEffect } from './effects/follows.effects';
import { EffectsModule } from '@ngrx/effects';
import { PreferencesEffect } from './effects/user-preferences.effects';
import { AuthEffect } from './effects/auth.effects';
import { UserDataEffect } from './effects/user-data.effects';
@NgModule({
  providers: [],
  imports: [
    AppReducersModule,
    EffectsModule.forRoot([
      FollowEffect,
      PreferencesEffect,
      AuthEffect,
      UserDataEffect,
    ]),
  ],
})
export class AppStoreModule {}
