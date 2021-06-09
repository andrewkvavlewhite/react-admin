import * as React from 'react';
import {
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MultiLevelMenuContext } from './MultiLevelMenuContext';
import { Menu } from './Menu';

/**
 * The <MultiLevelMenu> component allows to have complex menus with collapsible
 * sub menus inside our application.
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * It accepts <MenuItem> components as children which accepts <MenuItems> children as well.
 *
 * @example <caption>Simple Menu</caption>
 * import * as React from 'react';
 * import { Admin, Resource, Layout } from 'react-admin';
 * import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';
 * import { Dashboard } from './Dashboard';
 * import { SongList } from './SongList';
 * import { ArtistList } from './ArtistList';
 *
 * const BasicMultiLevelMenu = () => (
 *     <MultiLevelMenu>
 *         <MenuItem name="dashboard" to="/" exact label="Dashboard" />
 *         <MenuItem name="songs" to="/songs" label="Songs" />
 *         <MenuItem name="artists" to={'/artists?filter={}'} label="Artists">
 *             <MenuItem name="artists.rock" to={'/artists?filter={"type":"Rock"}'} label="Rock" />
 *             <MenuItem name="artists.jazz" to={'/artists?filter={"type":"Jazz"}'} label="Jazz" />
 *         </MenuItem>
 *     </MultiLevelMenu>
 * );
 *
 * const BasicLayout = props => (
 *     <AppLocationContext>
 *         <Layout {...props} menu={BasicMultiLevelMenu} />
 *     </AppLocationContext>
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         layout={BasicLayout}
 *         dashboard={Dashboard}
 *     >
 *         <Resource name="songs" list={SongList} />
 *         <Resource name="artists" list={ArtistList} />
 *     </Admin>
 * );
 */
export const MultiLevelMenu = (props: MultiLevelMenuProps): ReactElement => {
    const {
        children,
        initialOpen = false,
        variant = 'default',
        ...rest
    } = props;

    const classes = useStyles(props);
    const openedItems = useRef([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const rootRef = useRef<HTMLDivElement>();
    const openingListeners = useRef([]);

    const onOpen = (callback: (name: string) => void): void => {
        openingListeners.current.push(callback);
    };

    const offOpen = (callback: (name: string) => void): void => {
        openingListeners.current = openingListeners.current.filter(
            l => l !== callback
        );
    };

    const isOpen = useCallback(
        (name: string) => Array.from(openedItems.current).includes(name),
        []
    );

    const close = useCallback((name: string) => {
        openedItems.current = openedItems.current.filter(item => item !== name);
    }, []);

    const open = useCallback((name: string) => {
        const set = new Set(openedItems.current);
        set.add(name);
        openedItems.current = Array.from(set);

        openingListeners.current.forEach(callback => callback(name));
    }, []);

    const setIsOpen = useCallback(
        (name: string, isOpen: boolean) => {
            if (isOpen) {
                return open(name);
            }

            close(name);
        },
        [open, close]
    );

    const toggle = useCallback(
        (name: string) => {
            setIsOpen(name, !isOpen);
        },
        [setIsOpen, isOpen]
    );

    const [hasCategories, setHasCategories] = useState(false);

    const context = {
        close,
        hasCategories,
        initialOpen,
        isFirstLoad,
        isOpen,
        offOpen,
        onOpen,
        open,
        rootRef,
        setHasCategories,
        setIsOpen,
        toggle,
    };

    useEffect(() => {
        setTimeout(() => setIsFirstLoad(false), 150);
    }, []);

    return (
        <div ref={rootRef} className={classes.root} {...rest}>
            <MultiLevelMenuContext.Provider value={context}>
                <nav
                    className={
                        variant === 'categories'
                            ? classes.navWithCategories
                            : classes.nav
                    }
                >
                    <Menu className={classes.list}>{children}</Menu>
                </nav>
            </MultiLevelMenuContext.Provider>
        </div>
    );
};

export type MultiLevelMenuVariants = 'categories' | 'default';

export interface MultiLevelMenuProps {
    children?: ReactNode;
    initialOpen?: boolean;
    variant?: MultiLevelMenuVariants;
}

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            zIndex: theme.zIndex.appBar - 1, // Display the menu under the AppBar
        },
        navWithCategories: {
            backgroundColor: theme.palette.grey[800],
            display: 'flex',
            height: '100%',
            zIndex: theme.zIndex.appBar - 1, // Display the menu categories under the AppBar
        },
        nav: {
            display: 'flex',
            flexDirection: 'column',
        },
        list: {},
    }),
    {
        name: 'RaMultiLevelMenu',
    }
);
