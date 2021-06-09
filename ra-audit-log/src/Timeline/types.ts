import { EventRecord } from '../types';

export type LogGroup = {
    label: string;
    records: EventRecord[];
};

export type GroupLogs = (records: EventRecord[], locale: string) => LogGroup[];
