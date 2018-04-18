import {Time} from '@angular/common';

export class Comment {
    id: string;
    event_id: string;
    content: string;
    created_by: string;
    writer_name: string;
    created_at: Time;
}
