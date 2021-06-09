import * as React from 'react';
import { createContext, useCallback, useRef, useState, } from 'react';
import { AppBreadcrumbContextProvider } from './AppBreadcrumbContext';
import { getDeepestLocation } from './getDeepestLocation';
import { ResourceLocationListener } from './ResourceLocationListener';
export var LocationContext = createContext([]);
export var defaultLocation = {
    path: null,
    values: {},
};
/**
 * The <AppLocationContext /> component allows to wrap our application inside an unique location context.
 * This component must be contained by our admin to be able to access the current registred resources from the redux store.
 *
 * So, the easiest way to include it is to use a custom Layout as a wrapper since you (probably) need to insert your breadcrumb here too.
 *
 * @example
 *
 *  import { AppLocationContext } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout } from 'react-admin';
 *
 *  const MyLayout = ({ children, ...props }) => {
 *      const classes = useStyles();
 *
 *      return (
 *          <AppLocationContext>
 *              <Layout {...props}>
 *                  {children}
 *              </Layout>
 *          </AppLocationContext>
 *      );
 *  };
 *
 *  const App = () => (
 *      <Admin dataProvider={dataProvider} layout={MyLayout}>
 *          <Resource name="posts" list={PostList} />
 *      </Admin>
 *  );
 */
export var AppLocationContext = function (_a) {
    var children = _a.children, _b = _a.initialLocation, initialLocation = _b === void 0 ? defaultLocation : _b, _c = _a.hasDashboard, hasDashboard = _c === void 0 ? false : _c;
    var locations = useRef([]);
    var timeout = useRef(undefined);
    var _d = useState(initialLocation), location = _d[0], setLocation = _d[1];
    var optimizedSetLocation = useCallback(function (appLocation) {
        locations.current.push(appLocation);
        if (!timeout.current) {
            timeout.current = setTimeout(function () {
                setLocation(getDeepestLocation(locations.current));
                locations.current = [];
                timeout.current = undefined;
            }, 50);
        }
    }, []);
    return (React.createElement(LocationContext.Provider, { value: [location, optimizedSetLocation] },
        React.createElement(AppBreadcrumbContextProvider, { hasDashboard: hasDashboard },
            React.createElement(ResourceLocationListener, { hasDashboard: hasDashboard }),
            children)));
};
