import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { FollowStatusComponent } from './follow-status.component';
import {FollowReqState} from "../../store/reducers/follows.reducer";

describe('FollowStatusComponent', () => {
  let component: FollowStatusComponent;
  let fixture: ComponentFixture<FollowStatusComponent>;
  let store = MockStore;
  let initialState : FollowReqState ={
    followersUserName: "user1",
    followingsUserName: "user2",
    inProgress: false,
    completed: false,
    error: false,
    errorResponse: '',
    successResponse: '',
    isFollowOrUnfollow: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowStatusComponent],
      providers: [provideMockStore({initialState})],


    }).compileComponents();

    fixture = TestBed.createComponent(FollowStatusComponent);

    component = fixture.componentInstance;
    // @ts-ignore
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
