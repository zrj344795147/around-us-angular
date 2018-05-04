import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import * as uuid from 'uuid/v4';

// Base Url
const baseUrl = 'https://ot44xdmdt1.execute-api.us-east-1.amazonaws.com/dev';

@Injectable()
export class EventsService {
    constructor(
        private http: HttpClient,
        private accountService: AccountService
    ) {
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
            const httpOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            let url = baseUrl + '/events?latitude=' + centerLat + '&longitude=' + centerLng;
            // let url = baseUrl + '/events';
            this.http.get(url, httpOption).toPromise()
                .then(res => {
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('GetEvents Error: ' + err);
                });
        });
    }

    getEvent(eventId) {
        return new Promise((resolve, reject) => {
            const httpOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            let url = baseUrl + '/events/' + eventId;
            // let url = baseUrl + '/events';
            this.http.get(url, httpOption).toPromise()
                .then(res => {
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('GetEvents Error: ' + err);
                });
        });
    }

     postEvent(latitude, longitude, mood, title, content, photo: File) {
        return new Promise( async (resolve, reject) => {
            let idToken = await this.accountService.getIdToken()
                .catch(err => {
                    reject('PostEvent Error');
                    console.log('Cannot get IdToken: ' + err);
                    return;
                });
            if (!idToken) {
                reject('PostEvent Error');
                return;
            }
            // image
            let photoUrl = '';
            const photoTypes = ['jpg', 'gif', 'png', 'jpeg'];
            if (photo) {

                let photoPath = String(photo);
                console.log('PhotoName: ' + photoPath);
                let photoType = photo.name.split('.').pop();
                if (photoTypes.indexOf(photoType) === -1) {
                    reject('Photo type is not supported');
                    return;
                }
                let photoName = uuid() + '.' + photoType;

                const S3UrlBase = 'https://s3.amazonaws.com/around-us-photos/';
                // let formData: FormData = new FormData();
                // formData.append('', photo, photoName);

                photoUrl = S3UrlBase + photoName;

                await this.http.put(photoUrl, photo, { }).toPromise()
                    .catch(err => {
                        console.log('Photo Upload Error: ' + err);
                        reject('Photo Upload Error');
                        return;
                    });
            }

            let url = baseUrl + '/events';
            let data = {
                'latitude': latitude,
                'longitude': longitude,
                'mood': mood,
                'title': title,
                'content': content,
                'image': photoUrl,
            };

            const httpOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': String(idToken),
                })
            };

            this.http.post(url, data, httpOption).toPromise()
                .then(res => {
                    resolve();
                })
                .catch(err => {
                    console.log('postEvent Error: ' + err);
                    reject('PostEvent Error');
                });
        });
    }

    postComment(eventId, comment) {
        return new Promise(async (resolve, reject) => {
            let idToken = await this.accountService.getIdToken()
                .catch(err => {
                    console.log('Cannot get IdToken: ' + err);
                    reject('postComment Error');
                    return;
                });

            let url = baseUrl + '/comments';
            let data = {
                'eventId': eventId,
                'content': comment,
            };

            const httpOption = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': String(idToken),
                })
            };


            this.http.post(url, data, httpOption).toPromise()
                .then(res => {
                    resolve();
                })
                .catch(err => {
                    console.log('postComment Error: ' + err);
                    reject('postComment Error');
                });
        });
    }
}
