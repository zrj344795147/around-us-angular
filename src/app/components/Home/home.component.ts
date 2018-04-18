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
    clickedLocation: string;

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
        // fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.clickedLat + ',' + this.clickedLng +
        //     '&key=AIzaSyA895-jWHSZUww1OaXBJeb6xSXveFSBulg')
        //     .then(data => {
        //         console.log(data);
        //         this.clickedLocation = data.results.formatted_address;
        //     })
        //     .catch(err => {
        //        console.log(err);
        //        this.clickedLocation = 'Lat: ' + this.clickedLat + ' Lng: ' + this.clickedLng;
        //     });
    }

    clickCloseEventPost() {
        this.mapClicked = false;
    }

    clickCloseEventDetail() {
        this.currentEvent = null;
    }



}
