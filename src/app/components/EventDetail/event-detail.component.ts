import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class EventDetailComponent implements OnInit {
    @Input() event: any;

    constructor() {

    }

    ngOnInit() {

    }

}
