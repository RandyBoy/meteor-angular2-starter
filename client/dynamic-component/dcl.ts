import {Component, DynamicComponentLoader, Injector, ViewContainerRef} from 'angular2/core';

@Component({
    selector: 'child-component',
    template: '<h5>Child</h5>'
})
class ChildComponent {
}

@Component({
    selector: 'child-component2',
    template: '<h4>Child Child</h4>'
})
class ChildComponent2 {
}

@Component({
    selector: 'my-app',
    template: 'Parent (<child id="child"></child>)'
})

class DynamicLoaderComponent {
    constructor(dcl: DynamicComponentLoader, injector: Injector, viewContainerRef: ViewContainerRef) {
        dcl.loadAsRoot(ChildComponent, '#child', injector);
        dcl.loadNextToLocation(ChildComponent2, viewContainerRef);
    }
}