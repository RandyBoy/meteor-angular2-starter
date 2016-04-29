import 'reflect-metadata';
import {Component} from 'angular2/core';
import {NameChildComponent} from './NameChildComponent';
@Component({
    selector: 'name-parent',
    template: `
    <h2>Master controls {{names.length}} names</h2>
    <name-child *ngFor="#name of names"
      [name]="name">
    </name-child>
  `,
    directives: [NameChildComponent]
})
/**
 * Intercept input property changes with a setter
 */
export class NameParentComponent {
    // Displays 'Mr. IQ', '<no name set>', 'Bombasto'
    names = ['Mr. IQ', '   ', '  Bombasto  '];
}
