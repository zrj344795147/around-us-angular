import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { EventsService } from '../../services/events.service';



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
    currentEvent: any;
    eventPost: boolean;
    clickedLat: number;
    clickedLng: number;

    constructor(
        private eventsService: EventsService,
    ) {
        this.events = [];
        this.currentEvent = null;
        this.eventPost = false;
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

    clickMarker(eventId) {
        this.eventsService.getEvent(eventId)
            .then(event => {
                console.log(event);
                this.currentEvent = event;
            })
            .catch(err => {
                console.log(err);
            });
    }

    clickMap($event) {
        this.eventPost = true;
        this.clickedLat = $event.coords.lat;
        this.clickedLng = $event.coords.lng;
    }

    closeEventPost() {
        this.eventPost = false;
    }
}
