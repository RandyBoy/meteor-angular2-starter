import 'zone.js/dist/zone';
import 'reflect-metadata';
import {Component, provide} from 'angular2/core';
// import {bootstrap} from 'angular2/platform/browser';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {MeteorComponent} from 'angular2-meteor';
import {Mongo} from 'meteor/mongo';
import {RequestService} from '../collections/requestService.ts';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import { APP_BASE_HREF} from 'angular2/platform/common';
import {Parties} from '../collections/parties';
import {TodoItem} from "../collections/TodoItem.ts";
import {PartiesList} from './parties-list/parties-list.ts';
import {PartyDetails} from "./party-details/party-details";
import {HeroParentComponent} from './component-interaction/HeroParentComponent';
import { CountdownViewChildParentComponent } from './component-interaction/CountdownViewChildParentComponent';

@Component({
    selector: 'app',
    templateUrl: 'client/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RequestService]
})

@RouteConfig([
    { path: '/', as: 'PartiesList', component: PartiesList, useAsDefault: true },
    { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails },
    { path: '/ptcinput', as: 'PTCInput', component: HeroParentComponent },
    { path: '/ptcviewchild', as: 'PTCviewchild', component: CountdownViewChildParentComponent }
])
export class App extends MeteorComponent {
    parties: Mongo.Cursor<Party>;
    result: any;
    todoItems: TodoItem[];
    todoJson: string;
    errorMessage: any;

    constructor(private requestService: RequestService) {

        super();
        //this.parties = Parties.find();private requestService: RequestService
        //  this.subscribe('parties', () => {  private requestService: RequestService
        //         this.parties = Parties.find();
        //     });

        this.autorun(() => {
            this.subscribe('parties', () => {
                this.parties = Parties.find();
            });
        }, true);

        requestService.GetTodoItems()
            .subscribe((res) => {
                this.result = JSON.stringify(res.json());
            });
    }

    UpdateTodoItem() {

        this.requestService
            .AddTodoItem(35, "add todo item", true)
            .subscribe(data => {
                this.todoItems = data;
                this.todoJson = JSON.stringify(this.todoItems);
            },
            error => this.errorMessage = <any>error);
    }

}

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);