import 'reflect-metadata';
import {Component, DynamicComponentLoader, Injector, ViewContainerRef} from 'angular2/core';

@Component({
    selector: 'child-component',
    template: '<h5>dcl.loadAsRoot(ChildComponent, #child, injector);</h5>'
})
class ChildComponent {
}

@Component({
    selector: 'child-component2',
    template: '<h4>dcl.loadNextToLocation(ChildComponent2, viewContainerRef);</h4>'
})
class ChildComponent2 {
}

@Component({
    selector: 'my-app',
    template: 'Parent (<child id="child"></child>)'
})

export class DynamicLoaderComponent {
    constructor(dcl: DynamicComponentLoader, injector: Injector, viewContainerRef: ViewContainerRef) {
        dcl.loadAsRoot(ChildComponent, '#child', injector);
        dcl.loadNextToLocation(ChildComponent2, viewContainerRef);
    }
}