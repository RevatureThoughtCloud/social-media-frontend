import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { authReducer } from 'src/app/store/reducers/auth.reducer';
import { CommentComponent } from './comment.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentHarness } from '@angular/cdk/testing';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let authService: AuthService;
  let postService: PostService;
  let harnessLoader: HarnessLoader;
  let store: MockStore<{
    loggedIn: boolean;
    loggingIn: boolean;
    user?: User;
    error: boolean;
    errorResponse: any;
    verifying: boolean;
    keepAlive?: boolean;
  }>;
  let parentUser = new User(
    1,
    'test@email.com',
    'firstName',
    'lastName',
    'test user',
    0,
    0,

  );
  let authorUser = new User(
    2,
    'test2@email.com',
    'firstName2',
    'lastName2',
    'test user2',
    0,
    0,

  );

  let parentPost = new Post(
    1,
    'This is a comment',
    '',
    parentUser,
    [],
    'Top',
    0
  );
  let comment = new Post(
    2,
    'This is a comment2',
    '',
    authorUser,
    [],
    'Comment',
    0
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ auth: authReducer }),
        ReactiveFormsModule,
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [PostService, AuthService, provideMockStore({initialState:{user: authorUser, loggedIn: false,
          loggingIn: false,error: false,
          errorResponse: '',verifying: false,}})],
      declarations: [CommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    authService = TestBed.inject(AuthService);

    component.inputComment = comment;
    component.parentPost = parentPost;
    authService.currentUser = authorUser;
    component.editPost = true;
    component.editForm=new FormGroup({
      text: new FormControl(),
    });
    //component.inputComment = comment;
    //component.inputComment.author = author;
    fixture.detectChanges();
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle editPost', () => {
    component.editPost = false;
    component.toggleEdit();
    expect(component.editPost).toBeTruthy();
  });

  it('submit comment', async function () {
    fixture.detectChanges();
    component.editPost = true;
   // component.toggleEdit();
    fixture.detectChanges();
    const rfHarness = await harnessLoader.getHarness(
      CommentInputComponentHarness
    );
    await rfHarness.setnewTextValue("hello");
    const text = await rfHarness.getTextContent();
    expect(text).toBe("hello");
    fixture.detectChanges();

    let newComment = new Post(
      2,
      'hello',
      '',
      authService.currentUser,
      [],
      'Comment'
    );
    spyOn(postService, 'upsertPost').and.returnValue(of(newComment));
    component.ngOnInit();
    await rfHarness.clickSubmit();
    expect(postService.upsertPost).toHaveBeenCalledWith(newComment);

  });
  it('edit comment', async function () {

    component.replyToComment = true;
    component.editPost = false;
    fixture.detectChanges();
    const rfHarness = await harnessLoader.getHarness(
      ReplyFormComponentHarness
    );
    await rfHarness.setnewTextValue("hello");
    const text = await rfHarness.getTextContent();
    expect(text).toBe("hello");

    fixture.detectChanges();
    let copyInput = new Post(
      0,
      'hello',
      '',
      authService.currentUser,
      [],
      'Reply'
    );
    spyOn(postService, 'upsertPost').and.returnValue(of(copyInput));
    component.ngOnInit();
    parentPost.comments.push(parentPost);
    await rfHarness.clickSubmit();



  });
});




export class CommentInputComponentHarness extends ComponentHarness {
  static hostSelector = 'form';
  protected getSubmitButton = this.locatorFor('#testClass');
  protected getTextInput = this.locatorFor(`#textInput`);



  async getTextContent() {
    const textSelectInput = await this.getTextInput();
    return textSelectInput.getProperty('value');
  }

  async clickSubmit() {
    const submitBtn = await this.getSubmitButton();
    return await submitBtn.click();
  }

  async setnewTextValue(version: string) {
    const textInput = await this.getTextInput();
    return await textInput.sendKeys(version);
  }


}


export class ReplyFormComponentHarness extends ComponentHarness {
  static hostSelector = 'form';
  protected getSubmitButton = this.locatorFor('#submitPostButton');
  protected getTextInput = this.locatorFor(`#textPost2`);



  async getTextContent() {
    const textSelectInput = await this.getTextInput();
    return textSelectInput.getProperty('value');
  }

  async clickSubmit() {
    const submitBtn = await this.getSubmitButton();
    return await submitBtn.click();
  }

  async setnewTextValue(version: string) {
    const textInput = await this.getTextInput();
    return await textInput.sendKeys(version);
  }


}
