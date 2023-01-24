import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Like from 'src/app/models/Like';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { getImage } from 'src/app/pictures';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  });

  editForm: FormGroup;
  getImg = getImage;
  @Output() handleDeletePost = new EventEmitter();

  @Input('post') post: Post;
  replies: number;
  replyToPost: boolean = false;
  userLikedPost: boolean = false;
  editPost: boolean = false;
  @Input('detailedView') detailedView: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.replies = this.post.comments.length;
    this.postService
      .likeExists(this.post, this.authService.currentUser)
      .subscribe((response) => {
        this.userLikedPost = response;
      });
  }

  get currentUser() {
    return this.authService.currentUser;
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
        this.replies = response.comments.length;
        this.toggleReplyToPost();
      });
  };

  /*************** DELETE  POSTS    **********/
  handleDelete() {
    this.handleDeletePost.emit(this.post.id);
  }

  handleCommentDelete(commentId: number) {
    if (confirm('Are you sure that you want to delete this post?')) {
      this.post.comments = this.post.comments.filter(
        (comment) => comment.id != commentId
      );
      this.postService
        .upsertPost({ ...this.post, comments: [...this.post.comments] })
        .subscribe((response) => {
          this.post = response;
          this.replies = response.comments.length;
        });
    }
  }

  /* ********************************** */
  /* ******************** Modify Posts **********************/

  toggleEdit() {
    this.editForm = new FormGroup({
      text: new FormControl(this.post.text),
    });
    this.editPost = !this.editPost;
  }
  handleEdit() {
    this.post.text = this.editForm.value.text;

    this.postService.upsertPost(this.post).subscribe((comment) => {
      this.post = comment;

      this.editPost = !this.editPost;
    });
  }
  /* *********************** Update Comments ****************************** */
  updateForNewComment(comment: Post) {
    this.post.comments.forEach((element, index) => {
      if (element.id == comment.id) {
        this.post.comments[index] = comment;
      }
    })

    this.postService
    .upsertPost({ ...this.post, comments: [...this.post.comments] })
    .subscribe((response) => {
      this.post = response;
      this.replies = response.comments.length;
    });
  }


  /* *********************** Like Post ****************************** */

  updateLikes() {
    this.postService.postById(this.post.id).subscribe((response) => {
      this.post.likeCount = response.likeCount;
    });
  }

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
      this.updateLikes();
      this.userLikedPost = true;
      element.className = 'fa-solid fa-heart-circle-check';
    });
  }

  unlikePost(element: any) {
    let like = new Like(this.post, this.authService.currentUser);
    this.postService.deleteLike(like).subscribe((response) => {
      this.updateLikes();
      this.userLikedPost = false;
      element.className = 'fa-regular fa-heart-crack';
    });
  }

  likeEnter(element: any) {
    if (
      element.classList.contains('fa-heart-circle-check') ||
      element.classList.contains('fa-heart-crack')
    ) {
    } else if (!this.userLikedPost) {
      element.className = 'fa-solid fa-heart';
    } else {
      element.className = 'fa-regular fa-heart';
    }
  }

  likeLeave(element: any) {
    if (
      element.classList.contains('fa-heart-circle-check') ||
      this.userLikedPost
    ) {
      element.className = 'fa-solid fa-heart';
    } else {
      element.className = 'fa-regular fa-heart';
    }
  }
}
