var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useMemo, cloneElement, isValidElement } from 'react';
import { usePreferences } from '..';
var defaultThemeFromType = function (type) { return ({
    palette: { type: type },
}); };
/**
 * Inject a MUI theme object to its child component based on the theme in preferences
 *
 * @example
 *
 *     export const App = () => (
 *         <PreferencesBasedThemeProvider>
 *             <Admin dataProvider={dataProvider}>
 *                 <Resource name="posts" list={PostList} />
 *             </Admin>
 *         </PreferencesBasedThemeProvider>
 *     );
 *
 * @param {function} themeFromType Function returning a MUI Theme based on the theme string stored in preferences. Defaults to type => ({ palette: { type } }).
 *
 * Additional props are passed down to the child component.
 */
var PreferencesBasedThemeProvider = function (_a) {
    var children = _a.children, _b = _a.themeFromType, themeFromType = _b === void 0 ? defaultThemeFromType : _b, rest = __rest(_a, ["children", "themeFromType"]);
    var type = usePreferences('theme', 'light')[0];
    var theme = useMemo(function () { return themeFromType(type); }, [type] // eslint-disable-line react-hooks/exhaustive-deps
    );
    if (!isValidElement(children)) {
        throw new Error('PreferencesBasedThemeProvider must be used with a valid child');
    }
    return cloneElement(children, __assign({ theme: theme }, rest));
};
export default PreferencesBasedThemeProvider;
