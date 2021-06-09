import * as React from 'react';
import {
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
    useMemo,
    forwardRef,
} from 'react';
import { ListItem, ListItemProps, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { DefaultContent, SearchResultDataItem } from './types';

/**
 * A component responsible for displaying a single search result.
 *
 * @param props {SearchResultItemProps}
 * @param props.data {SearchResultDataItem} The search result item
 * @param props.label {GetValueFromRecordFunction} Either a field name, a ReactElement which will be cloned with the data prop or a function which will be called with the search result and which must return a string or a React node for the label.
 * @param props.description {GetValueFromRecordFunction} Either a field name, a ReactElement which will be cloned with the data prop or a function which will be called with the search result and which must return a string or a React node for the description.
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
 *
 * @example <caption>Customizing the <SearchResultItem> Component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search, SearchResultsPanel, SearchResultItem } from '@react-admin/ra-search';
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search>
 *                 <SearchResultsPanel>
 *                     <SearchResultItem
 *                         label={(record) => (
 *                             <>
 *                                 {record.type === 'artists' ? (
 *                                     <PersonIcon />
 *                                 ) : (
 *                                     <MusicIcon />
 *                                 )}
 *                                 <span>{record.content.label}</span>
 *                             </>
 *                         )}
 *                     />
 *                 </SearchResultsPanel>
 *             </Search>
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin dataProvider={dataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 */
export const SearchResultItem = <RecordType extends unknown = DefaultContent>(
    props: SearchResultItemProps<RecordType>
): ReactElement => {
    const {
        data,
        onClose,
        label = (record): string =>
            record && (record as SearchResultDataItem).content.label,
        description = (record): string =>
            record && (record as SearchResultDataItem).content.description,
        ...rest
    } = props;

    // see https://material-ui.com/guides/composition/#composition for the useMemo/forwardRef explanation
    const CustomLink = useMemo(
        () =>
            forwardRef(function BaseCustomLink(linkProps, ref: any) {
                return <Link ref={ref} to={data.url} {...linkProps} />;
            }),
        [data]
    );

    if (!data) {
        return null;
    }

    return (
        <ListItem button component={CustomLink} onClick={onClose} {...rest}>
            <ListItemText
                primary={getValue<RecordType>(label, data)}
                secondary={getValue<RecordType>(description, data)}
            />
        </ListItem>
    );
};

const getValue = <RecordType extends unknown = DefaultContent>(
    prop: StringOrFunctionOrElement<RecordType>,
    data?: SearchResultDataItem<RecordType>
): ReactNode =>
    isValidElement(prop)
        ? cloneElement(prop, { data })
        : typeof prop === 'function'
        ? prop(data)
        : prop;

interface GetValueFromRecordFunction<
    RecordType extends any = SearchResultDataItem
> {
    (record?: RecordType): ReactNode;
}

type StringOrFunctionOrElement<RecordType extends unknown = DefaultContent> =
    | string
    | ReactElement
    | GetValueFromRecordFunction<SearchResultDataItem<RecordType>>;

interface SearchResultItemProps<RecordType extends unknown = DefaultContent>
    extends Omit<ListItemProps, 'button'> {
    data?: SearchResultDataItem<RecordType>;
    label?: StringOrFunctionOrElement<RecordType>;
    description?: StringOrFunctionOrElement<RecordType>;
    onClose?: () => void;
}
