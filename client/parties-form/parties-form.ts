import 'reflect-metadata';
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, NgFormModel, NgControl, Control} from 'angular2/common';
import {Parties} from '../../collections/parties';
import {InjectUser} from 'angular2-meteor-accounts-ui';

@Component({
    selector: 'parties-form',
    templateUrl: 'client/parties-form/parties-form.html'
})

//@InjectUser()
export class PartiesForm {
    partiesForm: ControlGroup;

    constructor() {
        let fb = new FormBuilder();
        this.partiesForm = fb.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            public: [true]
        });
    }
    addParty(party: Party) {
        if (this.partiesForm.valid) {
            if (Meteor.userId()) {
                Parties.insert({
                    name: party.name,
                    description: party.description,
                    location: party.location,
                    public: party.public
                });
                (<Control>this.partiesForm.controls['name']).updateValue('');
                (<Control>this.partiesForm.controls['description']).updateValue('');
                (<Control>this.partiesForm.controls['location']).updateValue('');
                (<Control>this.partiesForm.controls['public']).updateValue(false);
            } else {
                alert('Please log in to add a party');
            }
        }
    }
}