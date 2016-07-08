import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public router: Router) { }

  loggedIn() {
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }


  logout() {
    // TODO REMOVE FROM PASSPORT
    localStorage.removeItem('id_token');
    this.router.navigate(['/champion']);

}
