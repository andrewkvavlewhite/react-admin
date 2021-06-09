import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfQuarter from 'date-fns/startOfQuarter';
import startOfWeek from 'date-fns/startOfWeek';
export var DefaultDateFilters = {
    'ra-audit-log.period_filters.today': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfDay(date).toISOString();
    },
    'ra-audit-log.period_filters.this_week': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfWeek(date).toISOString();
    },
    'ra-audit-log.period_filters.this_month': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfMonth(date).toISOString();
    },
    'ra-audit-log.period_filters.this_quarter': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfQuarter(date).toISOString();
    },
};
