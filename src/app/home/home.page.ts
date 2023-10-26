import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListTasksService } from '../list-tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate;
  allAds: any[] = [];
  showButton = true;
  searchText = ''; // Champ pour stocker le texte de recherche
  categories: string[] = ['Immobilier', 'Électronique', 'Category1' , 'Category2'];
  selectedCategory: string = 'Toutes';
  filteredAds: any[] = [];



  constructor(
    private adSer: ListTasksService,
    private alertCtrl: AlertController,
    private router: Router
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
        this.filteredAds = this.allAds
        console.log(this.allAds);
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
  

}
