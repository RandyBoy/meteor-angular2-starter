import 'reflect-metadata';
import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Parties} from '../../collections/parties';
import {MeteorComponent} from 'angular2-meteor';
import {Router} from 'angular2/router';
import {RouterLink} from 'angular2/router';
import {RequireUser} from 'angular2-meteor-accounts-ui';
import {CanActivate, ComponentInstruction} from 'angular2/router';

function checkPermissions(instruction: ComponentInstruction) {
    var partyId = instruction.params['partyId'];
    var party = Parties.findOne(partyId);
    return (party && party.owner == Meteor.userId());
}

@Component({
    selector: 'party-details',
    templateUrl: 'client/party-details/party-details.html',
    directives: [RouterLink]
})

@RequireUser()
@CanActivate(checkPermissions)
export class PartyDetails extends MeteorComponent {
    partyId: any;
    party: Party;
    constructor(params: RouteParams, private router: Router) {
        super();
        this.partyId = params.get('partyId');
        this.subscribe('party', this.partyId, () => {
            this.party = Parties.findOne(this.partyId);
        }, true);
    }
    saveParty(party) {
        if (Meteor.userId()) {
            Parties.update(party._id, {
                $set: {
                    name: party.name,
                    description: party.description,
                    location: party.location
                }
            });
            this.router.navigate(["/PartiesList"]);
        } else {
            alert('Please log in to change this party');
        }

    }
}