import { FC, useEffect, useRef } from 'react';
import { setSidebarVisibility, ReduxState } from 'react-admin';

import { useSelector, useDispatch } from 'react-redux';

import { usePreferences } from '../';

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
const SidebarOpenPreferenceSync: FC = () => {
    const sidebarOpenFromStore = useSelector(
        (state: ReduxState) => state.admin.ui.sidebarOpen
    );
    const [sidebarPref, setSidebarPref] = usePreferences('ui.sidebarOpen');
    const dispatch = useDispatch();
    const stateRef = useRef();

    useEffect(() => {
        if (typeof stateRef.current === 'undefined') {
            // first mount
            stateRef.current =
                typeof sidebarPref !== 'undefined'
                    ? sidebarPref
                    : sidebarOpenFromStore;
            if (
                typeof sidebarPref !== 'undefined' &&
                sidebarPref !== sidebarOpenFromStore
            ) {
                // restore preference
                dispatch(setSidebarVisibility(sidebarPref));
            }
        } else {
            if (stateRef.current !== sidebarOpenFromStore) {
                // sidebar state changed in store
                if (sidebarPref !== sidebarOpenFromStore) {
                    // store latest state in preferences
                    setSidebarPref(sidebarOpenFromStore);
                    stateRef.current = sidebarOpenFromStore;
                }
            } else {
                // sidebar preference changed in localStorage (probably from another window)
                if (
                    sidebarPref != undefined &&
                    sidebarPref !== sidebarOpenFromStore
                ) {
                    // store latest preference in state
                    dispatch(setSidebarVisibility(sidebarPref));
                    stateRef.current = sidebarPref;
                }
            }
        }
    }, [dispatch, sidebarPref, setSidebarPref, sidebarOpenFromStore]);
    return null;
};

export default SidebarOpenPreferenceSync;
