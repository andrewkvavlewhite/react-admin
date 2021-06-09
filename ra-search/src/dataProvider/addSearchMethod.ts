import { DataProvider, Record as RaRecord } from 'react-admin';
import { SearchDataProvider, SearchResult } from '../types';

/**
 * A helper function to create a `ra-search`-compatible `dataProvider` based
 * on a regular react-admin `dataProvider`. This helper add the `search` method
 * by calling the regular `getList()` method with a filter object containing
 * a `q` key on the configured resources. The value of the `q` filter will be
 * the search query.
 *
 * Be aware that this builder will call the regular `dataProvider` several times,
 * for each resource. We don't recommend using it in production - instead, you
 * should modify your API to support the search method, and return data structures
 * in the format expected by `ra-search`.
 *
 * The builder requires either an array of resources names or a map of the resources
 * specifying how to format their records for search results.
 *
 * If provided an array of resources, it will infer the records fields to use as
 * the content label and description:
 *
 * - label: Returns the record `label`, `name` or `title`
 * - description: Returns the record `description` or `body`
 *
 * If provided a map, each key being a resource name, the value can have the
 * following properties:
 *
 * - `label`: Either the field name to use as the label or a function which
 * will be called with a record and must return a string. Defaults to the
 * inference described above.
 * - `description`: Either the field name to use as the description or a
 * function which will be called with a record and must return a string.
 * Defaults to the inference described above.
 *
 * @example <caption>Example with an array of resources</caption>
 * import simpleRestProvider from 'ra-data-simple-rest';
 * import { addSearchMethod } from '@react-admin/ra-search';
 *
 * const dataProvider = simpleRestProvider('http://path.to.my.api/');
 *
 * const dataProviderWithSearch = addSearchMethod(dataProvider, ['artists', 'albums']);
 *
 * @example <caption>Example with a map of resources</caption>
 * import simpleRestProvider from 'ra-data-simple-rest';
 * import { addSearchMethod } from '@react-admin/ra-search';
 *
 * const dataProvider = simpleRestProvider('http://path.to.my.api/');
 *
 * const dataProviderWithSearch = addSearchMethod(dataProvider, {
 *     artists: {
 *         label: 'full_name',
 *         description: record => `${record.born_at}-${record.died_at} ${record.biography}`,
 *     },
 *     albums: {
 *         description: record => `${record.released_at.getFullYear()} by ${record.recordCompany}`,
 *     },
 * });
 *
 * @param dataProvider The dataProvider to augment
 * @param options The options, either a string array of resources names or a map of options where the key is the resource name
 */
export const addSearchMethod = (
    dataProvider: DataProvider,
    options: AddSearchMethodOptions = {}
): SearchDataProvider => {
    const builderOptions = getBuilderOptions(options);
    const defaultTargets = getDefaultTargetsFromOptions(options);
    return {
        ...dataProvider,
        search: async (query, options) => {
            const finalTargets = (options && options.targets) || defaultTargets;

            const resultsByResource = await Promise.all(
                finalTargets.map(resource =>
                    searchInResource(
                        dataProvider,
                        resource,
                        query,
                        builderOptions[resource]
                    )
                )
            );

            return {
                data: resultsByResource.reduce(
                    (acc, resultForResource) => [
                        ...acc,
                        ...resultForResource.data,
                    ],
                    []
                ),
                total: resultsByResource.reduce(
                    (acc, resultForResource) => acc + resultForResource.total,
                    0
                ),
            };
        },
    };
};

const getDefaultTargetsFromOptions = (options: AddSearchMethodOptions) => {
    if (Array.isArray(options)) {
        return options;
    }

    return Object.keys(options);
};

const getBuilderOptions = (options: AddSearchMethodOptions) => {
    if (Array.isArray(options)) {
        return buildOptionsFromArrayOfResources(options);
    }

    return options as AddSearchMethodResourceOptionsMap;
};

const buildOptionsFromArrayOfResources = (
    resources: string[]
): AddSearchMethodResourceOptionsMap =>
    resources.reduce(
        (acc, resource) => ({
            ...acc,
            [resource]: {},
        }),
        {}
    );

type AddSearchMethodResourceOptionsMap = Record<
    string,
    AddSearchMethodResourceOptions
>;
export type AddSearchMethodOptions =
    | string[]
    | AddSearchMethodResourceOptionsMap;

export interface GetValueFromRecordFunction<
    RecordType extends RaRecord = RaRecord
> {
    (record?: RecordType): string;
}

export type AddSearchMethodResourceOptions = {
    label?: string | GetValueFromRecordFunction;
    description?: string | GetValueFromRecordFunction;
};

const defaultGetLabel = (record: RaRecord) =>
    record.label || record.name || record.title;

const defaultGetDescription = (record: RaRecord) =>
    record.description || record.body;

const searchInResource = async (
    dataProvider: DataProvider,
    resource: string,
    query: string,
    options: AddSearchMethodResourceOptions = {}
): Promise<SearchResult> => {
    const { data, total } = await dataProvider.getList(resource, {
        filter: { q: query },
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
    });

    const {
        label = defaultGetLabel,
        description = defaultGetDescription,
    } = options;

    return {
        data: data.map(record => ({
            id: `${resource}/${record.id}`,
            type: resource,
            url: `/${resource}/${record.id}`,
            content: {
                id: record.id,
                label:
                    typeof label === 'string' ? record[label] : label(record),
                description:
                    typeof description === 'string'
                        ? record[description]
                        : description(record),
            },
        })),
        total,
    };
};
