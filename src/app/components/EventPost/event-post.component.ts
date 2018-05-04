import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// Services
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-event-post',
    templateUrl: './event-post.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class EventPostComponent implements OnInit {
    // @Input() mapClicked: boolean;
    @Input() latitude: number;
    @Input() longitude: number;
    @Input() location: string;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() eventPosted: EventEmitter<any> = new EventEmitter();
    title: string;
    content: string;
    mood: string;
    moodOptions: [string];
    image: File;
    imageName: string = '';
    info: string = '';


    constructor(
        private eventsService: EventsService,
        private accountService: AccountService
    ) {
        this.moodOptions = ['Happy', 'Sad', 'Angry', 'Love', 'Heartbroken'];
        this.title = '';
        this.content = '';
        this.mood = '';
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
        if (this.title === '') {
            this.info = 'Title cannot be empty';
            return;
        }
        if (!this.moodOptions.includes(this.mood)) {
            this.info = 'Please choose expression';
            return;
        }
        if (this.content === '') {
            this.info = 'Content cannot be empty';
            return;
        }
        let imageFile = null;
        // if (this.image) {
        //     console.log(this.image);
        //     imageFile = this.image.files[0];
        // }
        this.eventsService.postEvent(this.latitude, this.longitude, this.mood, this.title, this.content, this.image)
            .then(res => {
                console.log('Event posted');
                this.eventPosted.emit(null);
                this.close.emit(null);
            })
            .catch(err => {
                console.log(err);
                this.info = err;
            });
    }

    photoChanged(fileInput) {
        this.image = fileInput.files[0];
        this.imageName = this.image.name;
    }
}
