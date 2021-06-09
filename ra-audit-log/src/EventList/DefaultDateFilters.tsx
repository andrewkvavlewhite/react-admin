import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfQuarter from 'date-fns/startOfQuarter';
import startOfWeek from 'date-fns/startOfWeek';
import { GetDateFilter } from './types';

export const DefaultDateFilters: Record<string, GetDateFilter> = {
    'ra-audit-log.period_filters.today': (date = new Date()) =>
        startOfDay(date).toISOString(),
    'ra-audit-log.period_filters.this_week': (date = new Date()) =>
        startOfWeek(date).toISOString(),
    'ra-audit-log.period_filters.this_month': (date = new Date()) =>
        startOfMonth(date).toISOString(),
    'ra-audit-log.period_filters.this_quarter': (date = new Date()) =>
        startOfQuarter(date).toISOString(),
};
