import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Logout2 } from 'src/app/store/reducer.module';
import { UserInfoPopoverComponent } from './user-info-popover.component';

describe('UserInfoPopoverComponent', () => {
  let component: UserInfoPopoverComponent;
  let fixture: ComponentFixture<UserInfoPopoverComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoPopoverComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserInfoPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a Logout2 action', () => {
    spyOn(store, 'dispatch');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout2());
  });
});
