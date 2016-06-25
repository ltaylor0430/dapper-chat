import 'core-js';
import 'zone.js/dist/zone';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

// Angular 2 entrypoint class
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  ROUTER_PROVIDERS
]);
