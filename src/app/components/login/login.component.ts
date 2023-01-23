import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void { }

  onSubmit(e: any): void {
    e.preventDefault();
    this.authService
      .login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
      .subscribe((response) => {
        this.router.navigate(['post-feed']);
        this.notificationService.getNotificationCount();

      });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
