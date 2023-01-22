import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';
import { NavbarComponent } from './navbar.component';

interface AppState {
  preferences: any;
  auth: any;
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let service: NotificationService;
  let httpMock: HttpTestingController;
  let router: Router;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NavbarComponent],
      providers: [
        NotificationService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: Store,
          useValue: jasmine.createSpyObj<Store<AppState>>('Store', [
            'select',
            'dispatch',
          ]),
        },
      ],
    }).compileComponents();

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    component = new NavbarComponent(service, router, store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotificationCount on init', () => {
    spyOn(service, 'getNotificationCount');
    component.ngOnInit();
    expect(service.getNotificationCount).toHaveBeenCalled();
  });
});
