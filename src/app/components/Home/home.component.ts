import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
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
    // centerLat: number = 42;
    // centerLng: number = -70;
    events: any = [];
    currentEvent: any = null;
    mapClicked: boolean = false;
    clickedLat: number;
    clickedLng: number;
    clickedLocation: string = '';
    isLogin: boolean = false;
    username: string = '';
    expressions: [string] = ['Happy', 'Sad', 'Angry', 'Love', 'Heartbroken'];
    expressionFilters: any;
    // map style
    mapStyle: any = [
        {
            elementType: 'geometry',
            stylers: [
                // {
                //     hue: '#28f38b'
                // },
                // {
                //     saturation: 15
                // },
                {
                    lightness: 80
                },
                {
                    gamma: 0.5
                }
            ]
        },
    ];


    constructor(
        private eventsService: EventsService,
        private accountService: AccountService,
        private router: Router
    ) {
        this.expressionFilters = [];
        for (let expression of this.expressions) {

            this.expressionFilters.push({
                expression: expression,
                isSelected: true
            });
        }
        console.log(this.expressionFilters);
    }

    ngOnInit() {
        this.getGeolocation();
        this.getEvents(this.centerLat, this.centerLng);
        this.checkSession();

    }

    getGeolocation () {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
            return;
        }
        console.log('Trying to get geolocation');
        navigator.geolocation.getCurrentPosition(position => {
            console.log('got geolocation');
            this.centerLat = position.coords.latitude;
            this.centerLng = position.coords.longitude;
            this.getEvents(this.centerLat, this.centerLng);
        }, err => {
            console.log(err);
            });
    }

    getEvents(lat, lng) {
        this.eventsService.getEvents(lat, lng)
            .then(events => {
                console.log('events' + events);
                this.events = events;
            })
            .catch(err => {
                console.log(err);
            });

        this.checkSession();
    }
    checkSession() {
        this.accountService.getSession()
            .then(session => {
                console.log('Already login');
                this.isLogin = true;
                this.accountService.getUserName()
                    .then(username => {
                        this.username = String(username);
                    })
                    .catch(err => {
                        console.log(err);
                        this.username = '';
                    });
            })
            .catch(err => {
                console.log('Not login');
                // console.log(err);
                this.isLogin = false;
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
        console.log('lat: ' + this.clickedLat + ' lng: ' + this.clickedLng);
        this.eventsService.getLocation(this.clickedLat, this.clickedLng)
            .then(res => {
                this.clickedLocation = res.toString();
            })
            .catch(err => {
                console.log(err);
                this.clickedLocation = 'Unknown Location';
            });
    }

    changeCenter($event) {
        // console.log('center: ' + $event);
        if ($event.lat - this.centerLat > 1.5 || $event.lat - this.centerLat < -1.5 || $event.lng - this.centerLng > 1.5 || $event.lng - this.centerLng < -1.5) {
            this.centerLat = $event.lat;
            this.centerLng = $event.lng;
            console.log('Center changed, lat: ' + $event.lat + ' lng: ' + $event.lng);
            this.getEvents(this.centerLat, this.centerLng);
        }
    }

    clickCloseEventPost() {
        this.mapClicked = false;
    }

    clickCloseEventDetail() {
        this.currentEvent = null;
    }

    goToHome() {
        this.router.navigateByUrl('home');
    }

    goToLogin() {
        this.router.navigateByUrl('login');
    }

    goToSignup() {
        this.router.navigateByUrl('signup');
    }

    clickLogout() {
        this.accountService.signOut()
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                window.location.reload();
            });
    }

}
