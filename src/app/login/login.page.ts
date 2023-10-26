import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router, private navCtrl: NavController,private userService : UserService) {}

  login() {
    this.authService.loginUser(this.email, this.password)
      .subscribe(
        response => {
          this.userService.setUserData(response.localId, response.email);
          // Handle successful registration, e.g., navigate to another page.
          console.log('login successful');
          console.log(response);
          this.router.navigate(['/all-ads']); // Replace 'home' with the actual route to your home page
        },
        error => {
          console.log('login failed');
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

  navigateToPage(page: string) {
    if (page === 'home') {
      // Navigate to the home page
      this.navCtrl.navigateForward('/home');
    } else if (page === 'add-ad') {
      // Navigate to the page for adding an ad
      this.navCtrl.navigateForward('/create-ad');
    } else if (page === 'all-ads') {
      // Navigate to the page for adding an ad
      this.navCtrl.navigateForward('/all-ads');
    } else if (page === 'login') {
      // Navigate to the login page
      this.navCtrl.navigateForward('/login');
    } else if (page === 'register') {
      // Navigate to the registration page
      this.navCtrl.navigateForward('/register');
    }
  }

  logout() {
    this.authService.logoutUser().subscribe(
      response => {
        // Handle successful registration, e.g., navigate to another page.
        console.log('logout successful');
        console.log(response);
        this.router.navigate(['/login']); // Replace '' with the actual route to your home page
      },
      error => {
        console.log('logout failed');
        console.error(error);
      
        if (error.error && error.error.error) {
          // Firebase-specific error details
          console.log('Error Code:', error.error.error.code);
          console.log('Error Message:', error.error.error.message);
          this.router.navigate(['/login']); // Replace '' with the actual route to your home page
        } else {
          // Handle other errors or provide a generic error message
          console.log('An unexpected error occurredw while logOut.');
          this.router.navigate(['/login']); // Replace '' with the actual route to your home page
        }
      }
    );
  }

  ngOnInit() {
  }

}
