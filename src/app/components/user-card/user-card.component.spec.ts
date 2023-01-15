import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import User from 'src/app/models/User';

import { UserCardComponent } from './user-card.component';

fdescribe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ UserCardComponent ],
      providers: [HttpClient]
      }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
