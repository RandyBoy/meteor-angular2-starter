import 'reflect-metadata';
import {AfterViewInit, ViewChild} from 'angular2/core';
import {Component}                from 'angular2/core';
import {CountdownTimerComponent}  from './CountdownTimerComponent';
/**
 * Parent calls a ViewChild
 */
@Component({
    selector: 'countdown-parent-vc',
    template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <countdown-timer></countdown-timer>
  `,
    directives: [CountdownTimerComponent],
    styleUrls: ['demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {
    @ViewChild(CountdownTimerComponent)
    private _timerComponent: CountdownTimerComponent;
    seconds() { return 0; }
    ngAfterViewInit() {
        // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
        // but wait a tick first to avoid one-time devMode
        // unidirectional-data-flow-violation error
        setTimeout(() => this.seconds = () => this._timerComponent.seconds, 0)
    }
    start() { this._timerComponent.start(); }
    stop() { this._timerComponent.stop(); }
}
