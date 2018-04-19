import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// Services
import { EventsService } from '../../services/events.service';

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
    title: string;
    content: string;
    mood: string;
    moodOptions: [string];


    constructor( private eventsService: EventsService) {
        this.moodOptions = ['Happy', 'Sad', 'Angry', 'Love', 'Heartbroken'];
        this.title = '';
        this.content = '';
        this.mood = 'happy';


    }

    ngOnInit() {
    }

    clickClose() {
        // this.mapClicked = false;
        console.log('Click Close');
        this.close.emit(null);
    }

}
