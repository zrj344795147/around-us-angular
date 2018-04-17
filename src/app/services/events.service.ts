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
                latitude: 40.735,
                longitude: -73.999,
                mood: 'happy',
                title: 'title1'
            }, {
                id: '2',
                latitude: 40.722,
                longitude: -73.987,
                mood: 'sad',
                title: 'title2'
            },
            {
                id: '3',
                latitude: 40.727,
                longitude: -73.988,
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
                latitude: 40.750,
                longitude: -73.995,
                title: 'title1',
                writer_id: '89757',
                writer_name: 'developer',
                mood: 'happy',
                content: 'content1',
                created_at: '2018-4-12 12:28:02',
                comments: [{
                    id: '1',
                    event_id: '1',
                    content: 'hhhhh',
                    created_id: '10086',
                    writer_id: '1',
                    writer_name: 'Passer-By',
                    created_at: '2018-4-12 16:51:11',
                }, {
                    id: '2',
                    event_id: '1',
                    content: '233333',
                    created_id: '10000',
                    writer_name: 'NoName',
                    created_at: '2018-4-12 16:55:13',
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
