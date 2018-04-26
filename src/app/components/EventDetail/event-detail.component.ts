import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Services
import { EventsService } from '../../services/events.service';

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
    @Output() commentPosted: EventEmitter<any> = new EventEmitter();
    comment: string;
    info: string = '';

    constructor(private eventsService: EventsService) {

    }

    ngOnInit() {

    }

    clickClose() {
        // this.mapClicked = false;
        console.log('Click Close');
        this.close.emit(null);
    }

    clickSend() {
        this.info = '';
        if (this.comment === '') {
            this.info = 'Comment cannot be empty';
        }
        this.eventsService.postComment(this.event.id, this.comment)
            .then(res => {
                console.log('Comment posted');
                this.commentPosted.emit(this.event.id);
            })
            .catch(err => {
                console.log(err);
                this.info = 'Post failed';
            });

    }

}
