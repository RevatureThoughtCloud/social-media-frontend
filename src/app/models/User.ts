export default class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  followersCount: number;
  followingsCount: number;
  aboutMe: string;
  followedByCurrentUser: boolean;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    numOfFollowers: number = 0,
    numOfFollowings: number = 0,
    aboutMe: string = 'About Me',
    followedByCurrentUser: boolean = false
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.followersCount = numOfFollowers;
    this.followingsCount = numOfFollowings;
    this.aboutMe = aboutMe;
    this.followedByCurrentUser = followedByCurrentUser;
  }
}
