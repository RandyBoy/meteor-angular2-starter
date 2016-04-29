import 'reflect-metadata';
import {Component}          from 'angular2/core';
import {AstronautComponent} from './AstronautComponent';
import {MissionService}     from '../services/MissionService';
@Component({
    selector: 'mission-control',
    template: `
    <h2>Mission Control</h2>
    <button (click)="announce()">Announce mission</button>
    <my-astronaut *ngFor="#astronaut of astronauts"
      [astronaut]="astronaut">
    </my-astronaut>
    <h3>History</h3>
    <ul>
      <li *ngFor="#event of history">{{event}}</li>
    </ul>
  `,
    directives: [AstronautComponent],
    providers: [MissionService]
})
export class MissionControlComponent {
    astronauts = ['Lovell', 'Swigert', 'Haise']
    history: string[] = [];
    missions = ['Fly to the moon!',
        'Fly to mars!',
        'Fly to Vegas!'];
    nextMission = 0;
    constructor(private missionService: MissionService) {
        missionService.missionConfirmed$.subscribe(
            astronaut => {
                this.history.push(`${astronaut} confirmed the mission`);
            })
    }
    announce() {
        let mission = this.missions[this.nextMission++];
        this.missionService.announceMission(mission);
        this.history.push(`Mission "${mission}" announced`);
        if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
    }
}
