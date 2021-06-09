import { EventRecord } from '../types';
export declare type LogGroup = {
    label: string;
    records: EventRecord[];
};
export declare type GroupLogs = (records: EventRecord[], locale: string) => LogGroup[];
