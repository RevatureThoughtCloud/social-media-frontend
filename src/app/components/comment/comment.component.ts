import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Like from 'src/app/models/Like';
import Post from 'src/app/models/Post';
import { getImage } from 'src/app/pictures';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  });

  public getImg = getImage;
  editForm: FormGroup;
  editPost: boolean = false;

  @Output() handleDeletePost = new EventEmitter();
  @Output() handleNewComment = new EventEmitter();

  @Input('comment') inputComment: Post;
  @Input('parentPost') parentPost: Post;
  replies: number;
  replyToComment: boolean = false;
  userLikedPost: boolean = false;
  parentPostId: number | undefined;

  @Input('comment')
  set myVar(data: Post) {
    this.inputComment = data;
  }

  @Input('parentPost')
  set myVar2(data: Post) {
    this.parentPost = data;
  }


  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.replies = this.inputComment.comments.length;

    this.postService
      .likeExists(this.inputComment, this.authService.currentUser)
      .subscribe((response) => {
        this.userLikedPost = response;
      });
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  toggleReplyToComment = () => {
    this.replyToComment = !this.replyToComment;
  };

  submitReply = (e: any) => {
    e.preventDefault();
    let newComment = new Post(
      0,
      this.commentForm.value.text || '',
      '',
      this.authService.currentUser,
      [],
      'Reply'
    );
    this.postService
      .upsertPost({
        ...this.inputComment,
        comments: [...this.inputComment.comments, newComment],
      })
      .subscribe((response) => {
        this.inputComment = response;
        this.replies = response.comments.length;
        this.toggleReplyToComment();
        this.handleNewComment.emit(this.inputComment);
      });
  };

  /*************** DELETE  POSTS    **********/
  handleDelete() {
    this.handleDeletePost.emit(this.inputComment.id);
  }

  handleCommentDelete(commentId: number) {
    if (confirm('Are you sure that you want to delete this post?')) {
      this.inputComment.comments = this.inputComment.comments.filter(
        (comment) => comment.id != commentId
      );
      this.postService
        .upsertPost({
          ...this.inputComment,
          comments: [...this.inputComment.comments],
        })
        .subscribe((response) => {
          this.inputComment = response;
          this.replies = response.comments.length;
        });
    }
  }
  /* ************************************************* */

  /* ******************** Modify Posts **********************/

  toggleEdit() {
    this.editForm = new FormGroup({
      text: new FormControl(this.inputComment.text),
    });
    this.editPost = !this.editPost;
  }
  handleEdit() {
    this.inputComment.text = this.editForm.value.text;
    this.postService.upsertPost(this.inputComment).subscribe((comment) => {
      this.inputComment = comment;
      this.editPost = !this.editPost;
    });
  }
  /* *********************** Update Comments ****************************** */
  updateForNewComment(comment: Post) {
    this.inputComment.comments.forEach((element, index) => {
      if (element.id == comment.id) {
        this.inputComment.comments[index] = comment;
      }
    })
    this.postService
      .upsertPost({
        ...this.inputComment,
        comments: [...this.inputComment.comments],
      })
      .subscribe((response) => {
        this.inputComment = response;
        this.replies = response.comments.length;
      });
    this.handleNewComment.emit(this.inputComment);
  }

   /* *********************** Like Post ****************************** */

  updateLikes() {
    this.postService.postById(this.inputComment.id).subscribe((response) => {
      this.inputComment.likeCount = response.likeCount;
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
    let like = new Like(this.inputComment, this.authService.currentUser);
    this.postService.postLike(like).subscribe(() => {
      this.updateLikes();
      this.userLikedPost = true;
      element.className = 'fa-solid fa-heart-circle-check';
    });
  }

  unlikePost(element: any) {
    let like = new Like(this.inputComment, this.authService.currentUser);
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
