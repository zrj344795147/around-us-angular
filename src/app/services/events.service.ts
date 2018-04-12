import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {
    constructor(http: HttpClient) {
    }

    getEvents(centerLat, centerLng) {
        return new Promise((resolve, reject) => {
            let events = [{
                id: '1',
                latitude: 40.730,
                longitude: -73.997,
                mood: 'happy',
                title: 'title1'
            }, {
                id: '2',
                latitude: 40.731,
                longitude: -73.997,
                mood: 'sad',
                title: 'title2'
            },
            {
                id: '3',
                latitude: 40.732,
                longitude: -73.998,
                mood: 'sad',
                title: 'title3'
            }
            ];

            resolve(events);
        });
    }

    getEvent(eventId) {
        return new Promise((resolve, reject) => {
            let event = {
                id: '1',
                latitude: 40.730,
                longitude: -73.997,
                title: 'title1',
                writer_id: '89757',
                writer_name: 'developer',
                mood: 'happy',
                content: 'content1',
                created_at: '2018-4-12 12:28:02',
                comments: [{

                }, {

                }],
            };

            resolve(event);
        });
    }

    // getComments(eventId) {
    //     return new Promise((resolve, reject) => {
    //
    //     });
    // }

    postEvent(event) {
        return new Promise((resolve, reject) => {

        });
    }

    postComment(eventId) {
        return new Promise((resolve, reject) => {

        });
    }


}
