import * as inflection from 'inflection';
export var groupSearchResultsByResource = function (data, translate) {
    var groupedSearchResultItems = data.reduce(function (acc, item) {
        if (!acc[item.type]) {
            var resourceName = translate("resources." + item.type + ".name", {
                smart_count: 2,
                _: inflection.capitalize(inflection.humanize(inflection.pluralize(item.type))),
            });
            acc[item.type] = {
                label: resourceName,
                data: [],
            };
        }
        acc[item.type].data.push(item);
        return acc;
    }, {});
    return Object.keys(groupedSearchResultItems).map(function (key) { return ({
        label: groupedSearchResultItems[key].label,
        data: groupedSearchResultItems[key].data,
    }); });
};
