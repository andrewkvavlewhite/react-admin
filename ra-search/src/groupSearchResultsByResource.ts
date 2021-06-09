import * as inflection from 'inflection';
import { Translate } from 'react-admin';
import { SearchResultDataItem } from './types';

type GroupedSearchResultItem = {
    label: string;
    data: SearchResultDataItem[];
};

export const groupSearchResultsByResource = (
    data: SearchResultDataItem[],
    translate: Translate
): GroupedSearchResultItem[] => {
    const groupedSearchResultItems = data.reduce((acc, item) => {
        if (!acc[item.type]) {
            const resourceName = translate(`resources.${item.type}.name`, {
                smart_count: 2,
                _: inflection.capitalize(
                    inflection.humanize(inflection.pluralize(item.type))
                ),
            });

            acc[item.type] = {
                label: resourceName,
                data: [],
            };
        }

        acc[item.type].data.push(item);
        return acc;
    }, {});

    return Object.keys(groupedSearchResultItems).map(key => ({
        label: groupedSearchResultItems[key].label,
        data: groupedSearchResultItems[key].data,
    }));
};
