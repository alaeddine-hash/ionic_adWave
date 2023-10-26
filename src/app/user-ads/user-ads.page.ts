import { Component, OnInit } from '@angular/core';
import { ListTasksService } from '../list-tasks.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.page.html',
  styleUrls: ['./user-ads.page.scss'],
})
export class UserAdsPage implements OnInit {

  currentDate;
  allAds: any[] = [];
  showButton = true;
  searchText = ''; // Champ pour stocker le texte de recherche
  categories: string[] = ['Immobilier', 'Électronique'];
  selectedCategory: string = 'Toutes';
  filteredAds: any[] = [];



  constructor(
    private adSer: ListTasksService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthServiceService, private navCtrl: NavController,private userService: UserService
  ) {}

  ngOnInit() {
    this.currentDate = new Date();

    this.adSer.getAllAd().subscribe({
      next: (response: any[]) => {
        // this.allTasks = response;

        this.allAds = [];
        for (const key in response) {
          response[key]['id'] = key;
          this.allAds.push(response[key]);
        }
        const userId = this.userService.getUserId();
        this.filteredAds = this.allAds.filter((ad) => ad.userId === userId);
        console.log( "hello"+this.allAds);
      },
    });
  }

  



  changeChecked(ad) {
    ad.checked = !ad.checked;
    this.adSer.updateTask(ad).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearchChange() {
    this.filteredAds = this.allAds.filter((ad) => {
      // Vous pouvez ajuster la logique de filtrage en fonction de vos besoins.
      // Par exemple, recherchez dans le titre de l'annonce ou la description.
      return (
        ad.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        ad.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }


  async presentAlert(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes vous sur de vouloir supprimer cette annonce ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.adSer.deleteAd(id).subscribe({
              next: (response) => {
                this.ngOnInit();
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        },
        {
          text: 'Non',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

 

  toggleButton() {
    this.showButton = !this.showButton;
  }

  filterByCategory() {
    if (this.selectedCategory === 'Toutes') {
      // Si "Toutes" est sélectionné, afficher toutes les annonces
      this.ngOnInit(); // Réinitialiser la liste complète
    } else {
      // Sinon, filtrez les annonces par catégorie
      this.filteredAds = this.allAds.filter(ad => ad.category === this.selectedCategory);
    }
  }
  

  redirectToAdCreationForm() {
    // Redirect the user to the ad creation form route
    this.router.navigate(['/create-ad']);
  }
  
  editAd(ad) {
    this.router.navigate(['/edit-ad', ad]);
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
        this.router.navigate(['/login']); // Replace 'home' with the actual route to your home page
      },
      error => {
        console.log('logout failed');
        console.error(error);
        this.router.navigate(['/login']); // Replace 'home' with the actual route to your home page

      
        if (error.error && error.error.error) {
          // Firebase-specific error details
          console.log('Error Code:', error.error.error.code);
          console.log('Error Message:', error.error.error.message);
          this.router.navigate(['/login']); // Replace 'home' with the actual route to your home page

        } else {
          // Handle other errors or provide a generic error message
          console.log('An unexpected error occurredw while logOut.');
          this.router.navigate(['/login']); // Replace 'home' with the actual route to your home page

        }
      }
    );
  }

}
