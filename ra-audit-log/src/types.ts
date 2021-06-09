import { Record } from 'react-admin';

export interface EventRecord extends Record {
    date: Date | string;
    author: EventAuthor;
    resource: string;
    action: string;
    payload: any;
}

export interface EventAuthor extends Record {
    fullName?: string;
    avatar?: string;
}
