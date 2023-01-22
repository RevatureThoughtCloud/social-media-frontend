import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PersonalizedFeedComponent } from './personalized-feed.component';

describe('PersonalizedFeedComponent', () => {
  let component: PersonalizedFeedComponent;
  let fixture: ComponentFixture<PersonalizedFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PersonalizedFeedComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });
  fixture = TestBed.createComponent(PersonalizedFeedComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
