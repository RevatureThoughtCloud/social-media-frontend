import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarUserComponent } from './search-bar-user.component';

describe('SearchBarUserComponent', () => {
  let component: SearchBarUserComponent;
  let fixture: ComponentFixture<SearchBarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
