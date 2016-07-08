import { provideRouter, RouterConfig }  from '@angular/router';

import {Champion} from './champion/champion.component';
import {Login}    from './login/login.component';
import {Signup}   from './signup/signup.component';

import {LoginGuard}    from './login/login.guard.component';

const routes: RouterConfig = [
    { path: '', component: Champion },
    { path: 'champion', component: Champion },
    { path: 'login',  component: Login, canActivate: [LoginGuard] },
    { path: 'signup', component: Signup }
];

export const APP_ROUTER_PROVIDERS = [
  LoginGuard, provideRouter(routes)
];
