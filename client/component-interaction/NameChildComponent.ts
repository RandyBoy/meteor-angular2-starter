import 'reflect-metadata';
import {Component, Input} from 'angular2/core';
@Component({
    selector: 'name-child',
    template: `
    <h3>"{{name}}"</h3>
  `
})
export class NameChildComponent {
    _name: string = '<no name set>';
    @Input()
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get name() { return this._name; }
}
