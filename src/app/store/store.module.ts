import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppReducersModule } from './reducer.module';

@NgModule({
  providers: [],
  imports: [AppReducersModule, HttpClientModule],
})
export class AppStoreModule {}
