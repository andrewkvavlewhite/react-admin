"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLocationContext = exports.defaultLocation = exports.LocationContext = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var AppBreadcrumbContext_1 = require("./AppBreadcrumbContext");
var getDeepestLocation_1 = require("./getDeepestLocation");
var ResourceLocationListener_1 = require("./ResourceLocationListener");
exports.LocationContext = react_1.createContext([]);
exports.defaultLocation = {
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
exports.AppLocationContext = function (_a) {
    var children = _a.children, _b = _a.initialLocation, initialLocation = _b === void 0 ? exports.defaultLocation : _b, _c = _a.hasDashboard, hasDashboard = _c === void 0 ? false : _c;
    var locations = react_1.useRef([]);
    var timeout = react_1.useRef(undefined);
    var _d = react_1.useState(initialLocation), location = _d[0], setLocation = _d[1];
    var optimizedSetLocation = react_1.useCallback(function (appLocation) {
        locations.current.push(appLocation);
        if (!timeout.current) {
            timeout.current = setTimeout(function () {
                setLocation(getDeepestLocation_1.getDeepestLocation(locations.current));
                locations.current = [];
                timeout.current = undefined;
            }, 50);
        }
    }, []);
    return (React.createElement(exports.LocationContext.Provider, { value: [location, optimizedSetLocation] },
        React.createElement(AppBreadcrumbContext_1.AppBreadcrumbContextProvider, { hasDashboard: hasDashboard },
            React.createElement(ResourceLocationListener_1.ResourceLocationListener, { hasDashboard: hasDashboard }),
            children)));
};
