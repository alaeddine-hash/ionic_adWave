import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  register() {
    if (!this.email || !this.password) {
      // Handle case where email or password is empty
      console.log('Email and password are required.');
      return;
    }
  
    this.authService.createUser(this.email, this.password)
      .subscribe(
        response => {
          // Handle successful registration, e.g., navigate to another page.
          console.log('Registration successful');
          console.log(response);
          this.router.navigate(['/login']); // Replace 'home' with the actual route to your home page
        },
        error => {
          console.log('Registration failed');
          console.error(error);
        
          if (error.error && error.error.error) {
            // Firebase-specific error details
            console.log('Error Code:', error.error.error.code);
            console.log('Error Message:', error.error.error.message);
          } else {
            // Handle other errors or provide a generic error message
            console.log('An unexpected error occurred.');
          }
        }
      );
  }
  
  ngOnInit() {
  }

}
