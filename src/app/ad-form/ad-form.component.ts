import { Component, OnInit } from '@angular/core';
import { ListTasksService } from '../list-tasks.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss'],
})
export class AdFormComponent implements OnInit {
  ad: any = {}; // This should match your Ad model structure
  

  constructor(private adService: ListTasksService, private router: Router, private http: HttpClient, private userService : UserService) { }

  handleImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      // Generate a unique name for the image file
      const imageName = new Date().getTime() + '-' + file.name;

      // Create a reference to the Firebase Storage bucket URL
      const storageUrl = 'https://firebasestorage.googleapis.com/b/adwave-b4dc4.appspot.com/o/ad-images%2F' + imageName;

      // Create a FormData object for the file
      const formData = new FormData();
      formData.append('file', file);

      // Make an HTTP PUT request to upload the file to Firebase Storage
      this.http.put(storageUrl, formData).subscribe((response) => {
        if (response) {
          // If the upload is successful, get the download URL
          const downloadUrl = 'https://firebasestorage.googleapis.com/b/adwave-b4dc4.appspot.com/o/ad-images%2F' + imageName;
          this.ad.image = downloadUrl; // Set the image URL in your 'ad' object
        }
      }, (error) => {
        console.error('Error uploading the image:', error);
      });
    }
  }

  onSubmit() {
    // Call the service to add the new ad
  const userId = this.userService.getUserId();
  const userEmail = this.userService.getUserEmail();
    this.ad.date = new Date();
    this.ad.userId = userId;
    this.adService.addAd(this.ad).subscribe({
      next: (response) => {
        console.log('Ad Added');
        this.router.navigate(['/all-ads']); // Redirect to the home page
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {}
}
