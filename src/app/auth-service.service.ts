import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, ) {}

  createUser(email: string, password: string): Observable<any> {
    const apiKey = 'AIzaSyAdumIec5Cy_yAblbfMEp-iu2HcCuECuis'; // Remplacez par votre clé Web Firebase
    const createUserUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(data)
    return this.http.post(createUserUrl, data);
  }

  loginUser(email: string, password: string): Observable<any> {
    const apiKey = 'AIzaSyAdumIec5Cy_yAblbfMEp-iu2HcCuECuis'; // Remplacez par votre clé Web Firebase
    const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post(loginUrl, data);
  }

  logoutUser(): Observable<any> {
    // Implement the user logout logic here
    const apiKey = 'AIzaSyAdumIec5Cy_yAblbfMEp-iu2HcCuECuis';
    const logoutUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signOut?key=${apiKey}`;
    
    return this.http.post(logoutUrl, null);
  }

}
