import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';

import { contentHeaders } from '../common/headers';

const styles   = require('./signup.component.css');
const template = require('./signup.component.html');

@Component({
  selector: 'signup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('/api/auth/signup', body, { headers: contentHeaders })
      .subscribe(
        response => {
          console.log(response);
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/champion']);
        },
        error => {
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

}
