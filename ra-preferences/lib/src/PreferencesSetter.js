"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var usePreferences_1 = __importDefault(require("./usePreferences"));
/**
 * A component to set application preferences on mount declaratively
 *
 * To use it, just wrap any component that need to use the corresponding
 * preference with <PreferencesSetter path="my.preference" value="myvalue">.
 * This wrapping needs to be done to ensure that the corresponding preference
 * is set before rendering the wrapped component.
 *
 * Tip: <PreferencesSetter> is a great helper for mocking preferences in
 * unit tests. Prefer it to setting a localStorage value manually.
 *
 * Tip: This component writes to localStorage on mount. Use it sparingly to
 * avoid bottlenecks.
 *
 * @example
 *
 *     <PreferencesSetter path="list.density" value="small">
 *         <MyPreferencesDependentComponent />
 *     </PreferencesSetter>
 *
 * @example // Using <PreferencesSetter> is equivalent to using `usePreferences` and setting its value directly.
 *
 * const [_, setDensity] = usePreferences('list.density');
 *
 * useEffect(() => {
 *     setDensity('small');
 * }, []);
 *
 * @param {Props}    props
 * @param {string}   props.path Preference name. Required. Separate with dots to namespace, e.g. 'posts.list.columns'
 * @param {any}      props.value Preference value. Required.
 * @param {children} props.children Children are rendered as is on mount
 */
var PreferencesSetter = function (_a) {
    var value = _a.value, path = _a.path, children = _a.children;
    var _b = usePreferences_1.default(path), _ = _b[0], setPreferences = _b[1];
    var isInitialized = react_1.useRef(false);
    react_1.useEffect(function () {
        setPreferences(value);
        isInitialized.current = true;
    }, [path, value]); // eslint-disable-line react-hooks/exhaustive-deps
    // do not render the children until the value is set
    if (!isInitialized.current) {
        return null;
    }
    if (!react_1.isValidElement(children)) {
        throw new Error('PreferencesSetter child must be a valid element');
    }
    return children;
};
exports.default = PreferencesSetter;
