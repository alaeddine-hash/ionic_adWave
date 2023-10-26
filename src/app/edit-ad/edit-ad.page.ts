import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ListTasksService } from '../list-tasks.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.page.html',
  styleUrls: ['./edit-ad.page.scss'],
})
export class EditAdPage implements OnInit {

  editedAd: any = {}; // Initialize with the ad details

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private adService: ListTasksService,
    private router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
  }

  ionViewWillEnter() {
    // Fetch the ad details using the ad ID from the route parameters
    const adId = this.route.snapshot.paramMap.get('id');
    // Fetch the ad details using adId and set it to this.editedAd
    this.adService.getAdById(adId).subscribe((ad) => {
      this.editedAd = ad;
      console.log(ad)
    });
  }

  saveChanges() {
    const adId = this.route.snapshot.paramMap.get('id');
    console.log(this.editedAd)

    // Implement the logic to save the changes to the ad
    this.adService.updateAd(adId, this.editedAd).subscribe(() => {
      // After successfully saving the changes, navigate back to the ad details page
      this.navCtrl.navigateBack(`/all-ads`);
    });
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
    } else if (page === 'user-ads') {
      // Navigate to the page for adding an ad
      this.navCtrl.navigateForward('/user-ads');
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

}
