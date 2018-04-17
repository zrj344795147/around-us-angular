import {Time} from '@angular/common';
import { Comment } from './Comment';

export class Event {
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    created_by: string;
    writer_name: string;
    mood: string;
    content: string;
    created_at: Time;
    comments: Comment[];
}
