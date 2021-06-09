import { ReactElement } from 'react';
import { SearchInputColor, SearchPanelProps, SearchRequestOptions } from './types';
/**
 * A component which displays an input, calls the dataProvider `search` method
 * when the input changes and shows the search results inside a Material UI
 * [`<PopOver>`](https://material-ui.com/components/popover/).
 *
 * By default, it will group the search result items by resource and show their
 * `content.label` and `content.description`.
 *
 * @param props {SearchProps}
 * @param props.children {ReactElement} A React Element which will be rendered inside the Material UI `<Popover>`
 * @param {'light' | 'dark'} props.color The color mode for the search input, applying light or dark backgrounds
 *
 * @example <caption>Here's how to include it inside a custom `<AppBar>` component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
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
 *             <Search />
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
 *     <Admin dataProvider={searchDataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 *
 * @example <caption>Customizing the <Popover> Content</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
 *
 * const MySearchResultsPanel = () => {
 *     const { data, onClose } = useSearchResultContext();
 *
 *     return (
 *         <ul>
 *             {data.map(item => (
 *                 <li key={item.id}>
 *                     <Link to={item.url} onClick={onClose}>
 *                         <strong>{item.content.label}</strong>
 *                     </Link>
 *                     <p>{item.content.description}</p>
 *                 </li>
 *             ))}
 *         </ul>
 *     );
 * };
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
 *                 <CustomSearchResultsPanel />
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
 *     <Admin
 *         dataProvider={searchDataProvider}
 *         layout={MyLayout}
 *     >
 *         {...}
 *     </Admin>
 * );
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
export declare const Search: (props: SearchProps) => ReactElement;
export interface SearchProps {
    children?: ReactElement<SearchPanelProps>;
    color?: SearchInputColor;
    options?: SearchRequestOptions;
    wait?: number;
}
