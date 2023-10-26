import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListTasksService {


  
  constructor(private http: HttpClient) {}

  getAllAd() {
    return this.http.get('https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads.json');
  }

  addAd(newTask) {
    return this.http.post(
      'https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads.json',
      newTask
    );
  }

  updateTask(task) {
    return this.http.patch(
      `https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads/${task.id}.json`,
      {
        checked: task.checked,
      }
    );
  }

  deleteAd(id) {
    return this.http.delete(
      `https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads/${id}.json`
    );
  }

  updateAd(adId: string, updatedAd: any) {
    return this.http.put(
      `https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads/${adId}.json`,
      updatedAd
    );
  }

  getAdById(adId: string) {
    return this.http.get(
      `https://adwave-b4dc4-default-rtdb.europe-west1.firebasedatabase.app/Ads/${adId}.json`
    );
  }
  
}


