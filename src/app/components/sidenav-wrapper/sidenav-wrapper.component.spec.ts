import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AngularMaterialModule } from "src/app/modules/angular-material.module";
import { GetFollowings, GetFollowers } from "src/app/store/actions/user-data.actions";
import { SidenavWrapperComponent } from "./sidenav-wrapper.component";

describe('WrapperComponent', () => {
  let component: SidenavWrapperComponent;
  let fixture: ComponentFixture<SidenavWrapperComponent>;
  let store: MockStore;
  const initialState = { auth: { user: { userName: 'testUser' } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterialModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [ SidenavWrapperComponent ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch GetFollowings action with the correct username', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetFollowings('testUser'));
  });

  it('should dispatch GetFollowers action with the correct username', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetFollowers('testUser'));
  });
});
