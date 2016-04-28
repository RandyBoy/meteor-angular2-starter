import 'zone.js/dist/zone';
import 'reflect-metadata';
import {Component, provide} from 'angular2/core';
// import {bootstrap} from 'angular2/platform/browser';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {MeteorComponent} from 'angular2-meteor';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {APP_BASE_HREF, Location} from 'angular2/platform/common';
import {HeroParentComponent} from './component-interaction/HeroParentComponent';
import { CountdownViewChildParentComponent } from './component-interaction/CountdownViewChildParentComponent';
import { PartiesList } from './parties-list/parties-list';

@Component({
    selector: 'app',
    templateUrl: 'client/app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', as: 'PartiesList', component: PartiesList, useAsDefault: true },
    { path: '/ptcinput', as: 'PTCInput', component: HeroParentComponent },
    { path: '/ptcviewchild', as: 'PTCviewchild', component: CountdownViewChildParentComponent }
])
export class App extends MeteorComponent {
    constructor() {
        super();
    }
}

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);