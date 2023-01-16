import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import LikeModel from 'src/app/models/Like';
import Like from 'src/app/models/Like';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  });

  @Input('post') post: Post;
  replyToPost: boolean = false;
  userLikedPost: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.likeExists(this.post, this.authService.currentUser).subscribe((response) =>{
      this.userLikedPost = response;
    })
  }
  

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost;
  };

  submitReply = (e: any) => {
    e.preventDefault();
    let newComment = new Post(
      0,
      this.commentForm.value.text || '',
      '',
      this.authService.currentUser,
      [],
      'Comment'
    );
    this.postService
      .upsertPost({
        ...this.post,
        comments: [...this.post.comments, newComment],
      })
      .subscribe((response) => {
        this.post = response;
        this.toggleReplyToPost();
      });
  };
  handleClick(element: any) {
    if (this.userLikedPost) {
      this.unlikePost(element);
    } else {
      this.likePost(element);
    }
  }
  likePost(element: any) {
    let like = new Like(this.post, this.authService.currentUser);
    this.postService.postLike(like).subscribe(() => {
      //change to get likes from db
      this.post.likeCount++;
      this.userLikedPost = true;
      element.className = "fa-solid fa-heart-circle-check";
    })
    
  }

  unlikePost(element: any) {
    let like = new Like(this.post, this.authService.currentUser);
    this.postService.deleteLike(like).subscribe((response) => {
      if (response) {
        this.post.likeCount--;
        this.userLikedPost = false;
        element.className = "fa-regular fa-heart-crack";
      }
    })
  }

  likeEnter(element: any) {
    if (!this.userLikedPost) {
      element.className = "fa-solid fa-heart";
    } else {
      element.className = "fa-regular fa-heart";
    }
  }

  likeLeave(element: any) {
    if (element.classList.contains("fa-heart-circle-check") || this.userLikedPost) {
      element.className = "fa-solid fa-heart";
    } else {
      element.className = "fa-regular fa-heart";
    }
  }
}
