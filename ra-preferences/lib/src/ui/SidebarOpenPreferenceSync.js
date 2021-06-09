"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var __1 = require("../");
/**
 * Save Sidebar open status in Preferences, and restore it on load.
 *
 * @example
 *
 *     import { SidebarOpenPreferenceSync } from '@react-admin/ra-preferences';
 *
 *     const MyLayout: FC = props => (
 *         <>
 *             <SidebarOpenPreferenceSync />
 *             <Layout {...props} />
 *         </>
 *     );
 *
 *     export const App = () => (
 *         <Admin dataProvider={dataProvider} layout={MyLayout}>
 *             ...
 *         </Admin>
 *     );
 */
var SidebarOpenPreferenceSync = function () {
    var sidebarOpenFromStore = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var _a = __1.usePreferences('ui.sidebarOpen'), sidebarPref = _a[0], setSidebarPref = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var stateRef = react_1.useRef();
    react_1.useEffect(function () {
        if (typeof stateRef.current === 'undefined') {
            // first mount
            stateRef.current =
                typeof sidebarPref !== 'undefined'
                    ? sidebarPref
                    : sidebarOpenFromStore;
            if (typeof sidebarPref !== 'undefined' &&
                sidebarPref !== sidebarOpenFromStore) {
                // restore preference
                dispatch(react_admin_1.setSidebarVisibility(sidebarPref));
            }
        }
        else {
            if (stateRef.current !== sidebarOpenFromStore) {
                // sidebar state changed in store
                if (sidebarPref !== sidebarOpenFromStore) {
                    // store latest state in preferences
                    setSidebarPref(sidebarOpenFromStore);
                    stateRef.current = sidebarOpenFromStore;
                }
            }
            else {
                // sidebar preference changed in localStorage (probably from another window)
                if (sidebarPref != undefined &&
                    sidebarPref !== sidebarOpenFromStore) {
                    // store latest preference in state
                    dispatch(react_admin_1.setSidebarVisibility(sidebarPref));
                    stateRef.current = sidebarPref;
                }
            }
        }
    }, [dispatch, sidebarPref, setSidebarPref, sidebarOpenFromStore]);
    return null;
};
exports.default = SidebarOpenPreferenceSync;
