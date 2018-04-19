import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventsService {
    constructor(private http: HttpClient) {
    }

    getLocation(lat: number, lng: number) {
        return new Promise((resolve, reject) => {
            console.log('getLocation: ' + lat + ' ' + lng);
            const API_KEY = 'AIzaSyA895-jWHSZUww1OaXBJeb6xSXveFSBulg';
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + String(lat) + ',' + String(lng) + '&key=' + API_KEY;
            this.http.get(url).toPromise()
                .then(res => {
                    console.log(res);
                    resolve(res['results'][0]['formatted_address']);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getEvents(centerLat, centerLng) {
        return new Promise((resolve, reject) => {
            let events = [
                {
                    id: '1',
                    latitude: 40.735,
                    longitude: -73.999,
                    mood: 'happy',
                    title: 'title1'
                },
                {
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
                    mood: 'angry',
                    title: 'title3'
                },
                {
                    id: '4',
                    latitude: 40.75,
                    longitude: -74.000,
                    mood: 'love',
                    title: 'title3'
                },
                {
                    id: '5',
                    latitude: 40.74,
                    longitude: -73.950,
                    mood: 'heartbroken',
                    title: 'title3'
                },
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
                title: 'simply a random string? (A string as a series of characters like "cat" or "r2d2" or the empty string "".) What\'s the context?',
                writer_id: '89757',
                writer_name: 'developer',
                mood: 'happy',
                content: 'Answered May 9, 2014. ... simply a random string? (A string as a series of characters like "cat" or "r2d2" or the empty string "".) What\'s the context? In jest, an arbitrary string is what you get when you put a noob in front of emacs and tell him/her to quit.',
                write_time: '2018-4-12 12:28:02',
                comments: [{
                    id: '1',
                    event_id: '1',
                    content: 'Da Conner iza liah .u didn\'t go 3 for 3 you lost the third game and won your fourth.\n' +
                    'Clickbaiting youtubers these days﻿',
                    created_id: '10086',
                    writer_id: '1',
                    writer_name: 'Passer-By',
                    write_time: '2018-4-12 16:51:11',
                }, {
                    id: '2',
                    event_id: '1',
                    content: 'Lol, you call it a God Building. My friend discovered those a long time before they got super popular and we just refer to all of them as his buildings.﻿',
                    created_id: '10000',
                    writer_name: 'NoName',
                    write_time: '2018-4-12 16:55:13',
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
