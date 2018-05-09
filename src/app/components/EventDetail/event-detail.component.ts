import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Services
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';

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
    @Input() isLogin: boolean;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() commentPosted: EventEmitter<any> = new EventEmitter();
    comment: string = '';
    info: string = '';
    isSending: boolean = false;

    constructor(
        private eventsService: EventsService,
        private accountService: AccountService
    ) {

    }

    ngOnInit() {

    }

    clickClose() {
        // this.mapClicked = false;
        console.log('Click Close');
        this.close.emit(null);
    }

    async clickSend() {
        let session = await this.accountService.getSession()
            .catch(err => {
                this.info = 'Please Login';
                return;
            });

        if (!session) {
            this.info = 'Please Login';
            return;
        }

        this.info = '';
        if (this.comment === '') {
            this.info = 'Comment cannot be empty';
            return;
        }
        // isSending
        this.isSending = true;
        this.eventsService.postComment(this.event.id, this.comment)
            .then(res => {
                console.log('Comment posted');
                this.isSending = false;
                this.comment = '';
                this.info = '';
                this.commentPosted.emit(this.event.id);
            })
            .catch(err => {
                console.log(err);
                this.isSending = false;
                this.info = err;
            });

    }

}
