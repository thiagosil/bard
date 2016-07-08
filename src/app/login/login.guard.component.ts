import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate  {
  constructor(private router: Router) {}

  //If user already logged in, go to the homePage
  canActivate() {
    if (localStorage.getItem('id_token')) {
      this.router.navigate(['/champion']);
      return false;
    }
    return true;
  }

}
