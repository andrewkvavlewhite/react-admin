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
import React from 'react';
import usePreferences from './usePreferences';
/**
 * Extract a value from the preferences and inject if to the child as prop
 *
 * Avoids creating an extra component just to get a preference
 *
 * @example
 *
 *     // set the admin 'theme' prop based on the 'ui.theme' preference
 *     const App = () => (
 *         <WithPreference path="ui.theme" name="theme">
 *             <Admin dataProvider={dataProvider}>
 *                 ...
 *             </Admin>
 *         </WithPreference>
 *     );
 *
 *     // equivalent of
 *     const App = () => {
 *         const [theme] = usePreferences('ui.theme');
 *         return (
 *             // set the admin 'theme' prop based on the 'ui.theme' preference
 *             <WithPreference path="ui.theme" name="theme">
 *                 <Admin dataProvider={dataProvider}>
 *                     ...
 *                 </Admin>
 *             </WithPreference>
 *         );
 *     };
 *
 * @param {string} path The path to use to get the preference, e.g. 'ui.theme'
 * @param {string} name The name of the prop to inject to the child, e.g. 'theme'
 */
var WithPreference = function (_a) {
    var _b;
    var path = _a.path, name = _a.name, children = _a.children, rest = __rest(_a, ["path", "name", "children"]);
    var preference = usePreferences(path)[0];
    if (React.isValidElement(children)) {
        return React.cloneElement(children, __assign((_b = {}, _b[name || path] = preference, _b), rest));
    }
    else {
        throw new Error('Invalid child for WithPreferences. Expecting a valid React element');
    }
};
export default WithPreference;
