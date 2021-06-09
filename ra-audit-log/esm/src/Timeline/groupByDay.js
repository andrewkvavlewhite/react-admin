var sortByDate = function (a, b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};
var getDayForAuditLog = function (record) {
    var date = new Date(record.date);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toISOString();
};
var getDayString = function (date, locale) {
    return new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
export var groupByDay = function (records, locale) {
    var initialMap = {};
    var map = records.reduce(function (acc, record) {
        var label = getDayString(getDayForAuditLog(record), locale);
        acc[label] = acc[label] || [];
        acc[label] = acc[label].concat(record);
        return acc;
    }, initialMap);
    return Object.keys(map).reduce(function (acc, label) {
        acc.push({ label: label, records: map[label].sort(sortByDate) });
        return acc;
    }, []);
};
