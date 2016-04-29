import 'reflect-metadata';
import {Component}                from 'angular2/core';
import {CountdownTimerComponent}  from './CountdownTimerComponent';
/**
 * Parent interacts with child via local variable
 */
@Component({
    selector: 'countdown-parent-lv',
    template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <countdown-timer #timer></countdown-timer>
  `,
    directives: [CountdownTimerComponent],
    styleUrls: ['demo.css']
})
export class CountdownLocalVarParentComponent { }
