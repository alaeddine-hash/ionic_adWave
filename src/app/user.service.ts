import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string;
  private userEmail: string;

  setUserData(userId: string, userEmail: string): void {
    this.userId = userId;
    this.userEmail = userEmail;
  }

  getUserId(): string {
    return this.userId;
  }

  getUserEmail(): string {
    return this.userEmail;
  }}
