import 'core-js';
import 'zone.js/dist/zone';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
// Angular 2 entrypoint class
bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);
