import 'reflect-metadata';
import {Component} from 'angular2/core';
import {HeroChildComponent} from './HeroChildComponent';
import {HEROES} from '../models/Hero';

/**
 * Pass data from parent to child with input binding
 */
@Component({
    selector: 'hero-parent',
    template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="#hero of heroes"
      [hero]="hero"
      [master]="master">
    </hero-child>
  `,
    directives: [HeroChildComponent]
})
export class HeroParentComponent {
    heroes = HEROES;
    master: string = 'Master';
}