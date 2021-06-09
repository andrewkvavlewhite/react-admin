import { EventRecord } from '../types';
import { LogGroup } from './types';

const sortByDate = (a: EventRecord, b: EventRecord): number =>
    new Date(b.date).valueOf() - new Date(a.date).valueOf();

const getDayForAuditLog = (record: EventRecord): string => {
    const date = new Date(record.date);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toISOString();
};

const getDayString = (date: string | Date, locale: string): string =>
    new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const groupByDay = (
    records: EventRecord[],
    locale: string
): LogGroup[] => {
    const initialMap: Record<string, EventRecord[]> = {};

    const map = records.reduce((acc, record) => {
        const label = getDayString(getDayForAuditLog(record), locale);
        acc[label] = acc[label] || [];
        acc[label] = acc[label].concat(record);
        return acc;
    }, initialMap);

    return Object.keys(map).reduce((acc, label) => {
        acc.push({ label, records: map[label].sort(sortByDate) });
        return acc;
    }, []);
};
