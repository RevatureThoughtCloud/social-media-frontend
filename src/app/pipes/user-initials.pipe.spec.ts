import User from '../models/User';
import { UserInitialsPipe } from './user-initials.pipe';

describe('UserInitialsPipe', () => {
  let pipe: UserInitialsPipe;
  let user: User;
  // Create a new instance of the pipe before each test
  beforeEach(() => {
    pipe = new UserInitialsPipe();
  });

  // Test to ensure that the pipe is created successfully
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // Test to ensure that the pipe correctly transforms the John's initials
  it(`transforms 'John Doe' into initials 'JD'`, () => {
    const user = new User(1, 'johndoe@test.com', 'John', 'Doe', 'johndoe');
    expect(pipe.transform(user)).toEqual('JD');
  });

  // Test to ensure that the pipe correctly transforms the AJ's initials
  it(`transforms 'AJ Barea' into initials 'AB'`, () => {
    const user = new User(1, 'test@test.com', 'AJ', 'Barea', 'ajbarea');
    expect(pipe.transform(user)).toEqual('AB');
  });
  
  // Test to ensure that the pipe correctly returns ''
  it(`transform returns ''`, () => {
    expect(pipe.transform(user)).toEqual('');
  });
});
