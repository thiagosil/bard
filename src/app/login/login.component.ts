import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require('./login.component.css');
const template = require('./login.component.html');

@Component({
  selector: 'login',
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();

    // todo call auth.service
    let body = JSON.stringify({ username, password });
    this.http.post('/api/auth/login', body, { headers: contentHeaders })
      .subscribe(
        response => {
          console.log(response);
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/champion']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }
}
