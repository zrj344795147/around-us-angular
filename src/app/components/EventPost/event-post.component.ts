import { Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-event-post',
    templateUrl: './event-post.component.html',
    styleUrls: [
        '../../../assets/css/style.css',
        '../../../assets/css/bootstrap.css'
    ]
})

export class EventPostComponent implements OnInit {
    @Input() latitude: number;
    @Input() longitude: number;
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

}
