import 'reflect-metadata';
import {Component, Input} from 'angular2/core';
import {Hero} from '../models/Hero';
@Component({
    selector: 'hero-child',
    template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class HeroChildComponent {
    @Input() hero: Hero;
    @Input('master') masterName: string;
}