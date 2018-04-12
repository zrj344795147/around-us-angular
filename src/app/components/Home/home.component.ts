import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { EventsService } from '../../services/events.service';
// Images


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class HomeComponent implements OnInit {
    centerLat: number = 40.73082279999999;
    centerLng: number = -73.99733200000003;
    events: any;
    constructor(
        private eventsService: EventsService,
    ) {
    }

    ngOnInit() {
        this.eventsService.getEvents(this.centerLat, this.centerLng)
            .then(events => {
                this.events = events;
            })
            .catch(err => {
                console.log(err);
            });


    }

}
