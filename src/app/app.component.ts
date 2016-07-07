import {Component, ViewEncapsulation} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {AppState} from './app.service';

// Import Champion component
import {Champion} from './champion/champion.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
      <router-outlet></router-outlet>
  `
})

export class App {
  angularLogo = 'assets/img/angular-logo.png';
}
