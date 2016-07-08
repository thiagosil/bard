// # Global Directives
//
// ** These `directives` are available in any template **

import { PLATFORM_DIRECTIVES } from '@angular/core';

// APPLICATION_DIRECTIVES
//
// directives that are global through out the application
export const APPLICATION_DIRECTIVES = [

];

export const DIRECTIVES = [

  {provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES}
];
