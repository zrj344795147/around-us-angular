import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    @Output() close: EventEmitter<any> = new EventEmitter();
    comment: string;

    constructor() {

    }

    ngOnInit() {

    }

    clickClose() {
        // this.mapClicked = false;
        console.log('Click Close');
        this.close.emit(null);
    }

}
