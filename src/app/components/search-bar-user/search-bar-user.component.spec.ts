import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { SearchBarUserComponent } from './search-bar-user.component';

describe('SearchBarUserComponent', () => {
  let component: SearchBarUserComponent;
  let fixture: ComponentFixture<SearchBarUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AngularMaterialModule, BrowserAnimationsModule, FormsModule],
      declarations: [SearchBarUserComponent, MatAutocomplete],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
