import { NgModule } from '@angular/core';
import { AppReducersModule } from './reducer.module';
import { FollowEffect } from './effects/follows.effects';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  providers: [],
  imports: [AppReducersModule, EffectsModule.forRoot([FollowEffect])],
})
export class AppStoreModule {}
