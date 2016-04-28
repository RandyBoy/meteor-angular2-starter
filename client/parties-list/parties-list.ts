import 'reflect-metadata';
import {Component} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
import {DynamicComponentDemo} from '../dynamic-component/parent';

@Component({
    selector: 'parties-list',
    templateUrl: 'client/parties-list/parties-list.html',
    directives: [DynamicComponentDemo]
})
export class PartiesList extends MeteorComponent {
    constructor() {
        super();
    }

}