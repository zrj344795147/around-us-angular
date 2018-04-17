import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { EventsService } from '../../services/events.service';
// Components
import { EventDetailComponent } from '../EventDetail/event-detail.component';
import { EventPostComponent } from '../EventPost/event-post.component';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ],
    // directives: [EventDetailComponent, EventPostComponent]
})

export class HomeComponent implements OnInit {
    centerLat: number = 40.73082279999999;
    centerLng: number = -73.99733200000003;
    events: any;
    currentEvent: any;
    mapClicked: boolean;
    clickedLat: number;
    clickedLng: number;

    constructor(
        private eventsService: EventsService,
    ) {
        this.events = [];
        this.currentEvent = null;
        this.mapClicked = false;
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
        // Close EventPost
        this.mapClicked = false;

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
        // Close EventDetail
        this.currentEvent = null;
        this.clickedLat = $event.coords.lat;
        this.clickedLng = $event.coords.lng;
        this.mapClicked = true;
    }

    clickCloseEventPost() {
        this.mapClicked = false;
    }

    clickCloseEventDetail() {
        this.currentEvent = null;
    }



}
