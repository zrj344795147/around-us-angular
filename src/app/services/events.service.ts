import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {
    constructor(http: HttpClient) {
    }

    getEvents(centerLat, centerLng) {
        return new Promise((resolve, reject) => {
            let events = [{
                latitude: 40.730,
                longitude: -73.997,
                mood: 'happy',
                title: 'title1'
            }, {
                latitude: 40.731,
                longitude: -73.997,
                mood: 'sad',
                title: 'title2'
            },
            {
                latitude: 40.732,
                longitude: -73.998,
                mood: 'sad',
                title: 'title3'
            }
            ];

            resolve(events);
        });
    }
}
