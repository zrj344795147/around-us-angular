import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-event-post',
    templateUrl: './event-post.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class EventPostComponent implements OnInit {
    @Input() mapClicked: boolean;
    @Input() latitude: number;
    @Input() longitude: number;
    @Output() close: EventEmitter<any> = new EventEmitter();
    title: string;
    content: string;
    mood: string;


    constructor() {
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

}
