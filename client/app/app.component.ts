import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {StateService} from './common/state.service';
import {ExperimentsService} from './common/experiments.service';
import {ViewEncapsulation} from '@angular/core';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app',
  template: require('./app.component.html'),
  styles: [require('./app.component.styl')],
  directives: [ ROUTER_DIRECTIVES ],
  //angular 2 uses shadow DOM.  This allows us to keep our styles related
  // to the component.  ViewEncapsulation.None ignores shadow DOM.
  encapsulation: ViewEncapsulation.None,
  providers: [StateService, ExperimentsService],
})
@Routes([
  {path: '/',            component: HomeComponent },
  {path: '/home',        component: HomeComponent },
  {path: '/*',           component: HomeComponent }
])
export class AppComponent {}
