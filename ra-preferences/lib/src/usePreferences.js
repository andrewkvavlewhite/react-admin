"use strict";
// Part of this code comes from rehooks useLocalStorage
// (https://github.com/rehooks/local-storage/blob/master/src/use-localstorage.ts)
// We needed to reimplement it, because we don't want the hook to rerender
// the component subscribe to preference "density" when another component
// sets any other preference
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RA_PREFERENCE_WORKSPACE = void 0;
var react_1 = require("react");
var set_1 = __importDefault(require("lodash/set"));
var get_1 = __importDefault(require("lodash/get"));
var localStorageAvailable = undefined;
var storage = {};
var memoryStorage = {
    getItem: function (key) {
        return get_1.default(storage, key);
    },
    setItem: function (key, value) {
        set_1.default(storage, key, value);
    },
};
var tryParse = function (value) {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
var testLocalStorage = function () {
    if (window.localStorage == undefined) {
        return false;
    }
    try {
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
    }
    catch (_a) {
        return false;
    }
};
var getStorage = function () {
    if (localStorageAvailable == undefined) {
        localStorageAvailable = testLocalStorage();
    }
    return localStorageAvailable ? window.localStorage : memoryStorage;
};
exports.RA_PREFERENCE_WORKSPACE = 'preferences';
var PreferencesChanged = {
    eventName: 'onPreferencesChange',
    create: function (payload) {
        return new CustomEvent(PreferencesChanged.eventName, {
            detail: payload,
        });
    },
};
/**
 * reads key preference from storage
 *
 * @param {string} key Path of the preference key to read, uses lodash.get
 *
 * @return {T} Preference value

 * @example // Read full preferences
 *
 * const preferences = readStorage<PreferenceType>();
 *
 * @example // read preference for a particular key
 *
 * const density = readStorage<string>('density');

 * @example // read preference for a deep key
 *
 * const columns = readStorage<string[]>('orders.list.columns');
 */
var readStorage = function (key) {
    var preferences = JSON.parse(getStorage().getItem(exports.RA_PREFERENCE_WORKSPACE)) || {};
    if (key) {
        return tryParse(get_1.default(preferences, key));
    }
    return (tryParse(preferences) || {});
};
/**
 * sets key preference to value on the preference storage
 *
 * @param {string} key Path of the preference key to update, uses lodash.set
 * @param {T} value New preference value
 *
 * @return {void}
 *
 * @example // Write full preferences to localstorage
 *
 * writeStorage<PreferenceType>({
 *      users: {
 *          lists: {
 *              columns: ['id', 'address'],
 *          },
 *      },
 *  });
 * // or
 * writeStorage<PreferenceType>('', {
 *      users: {
 *          lists: {
 *              columns: ['id', 'address'],
 *          },
 *      },
 *  });
 *
 * @example // Update preference for a particular key
 *
 * writeStorage<string>('density', 'small');
 *
 * @example // Update preference for a deep key
 *
 * writeStorage<string[]>('orders.list.columns', ['id', 'date', 'customer']);
 */
var writeStorage = function (key, value) {
    var storage = getStorage();
    try {
        var preferences = JSON.parse(storage.getItem(exports.RA_PREFERENCE_WORKSPACE)) || {};
        var newPreferences = key && value != undefined
            ? set_1.default(__assign({}, preferences), key, value)
            : key || value;
        storage.setItem(exports.RA_PREFERENCE_WORKSPACE, JSON.stringify(newPreferences));
        window.dispatchEvent(PreferencesChanged.create(newPreferences));
    }
    catch (err) {
        if (err instanceof TypeError &&
            err.message.includes('circular structure')) {
            throw new TypeError('The object that was given to the writeStorage function has circular references.\n' +
                'For more information, check here: ' +
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value');
        }
        throw err;
    }
};
/**
 * useState-like hook with localStorage persistence. Syncs changes between tabs.
 *
 * Preferences are stored in a tree structure, to allow retrievalm of the complete
 * preferencs list and namespacing.
 *
 * @param {string} path Name of the preference. Separate with dots to namespace, e.g. 'posts.list.columns'. Leave empty to retrieve the entire preference tree.
 * @param {any} defaultValue Default value
 *
 * @return {Object} A value and a setter for the value, in an array - just like for useState()
 *
 * Depending on the argument passed to usePreferences(), the return tuple concerns
 * either a single value, or the whole preference tree.
 *
 * @example // Here is how to **read a single value** from the preference store, with a default value
 *
 * import { usePreferences } from '@react-admin/ra-preferences';
 *
 * const PostList = props => {
 *     const [density] = usePreferences(
 *         'posts.list.density',
 *         'small'
 *     );
 *
 *     return (
 *         <List {...props}>
 *             <Datagrid size={density}>
 *                 ...
 *             </Datagrid>
 *         </List>
 *     );
 * }
 *
 * @example // To **write a single value** use the second return value:
 *
 * const ChangeDensity: FC<any> = () => {
 *     const [density, setDensity] = usePreferences(
 *         'posts.list.density',
 *         'small'
 *     );
 *
 *     const changeDensity = (): void => {
 *         setDensity(density === 'small' ? 'medium' : 'small');
 *     };
 *
 *     return (
 *         <Button onClick={changeDensity}>
 *             {`Change density (current ${density})`}
 *         </Button>
 *     );
 * };
 *
 * @example // To **read and write the entire preferences tree**, don't pass any argument to the hook. You will find this option useful when building a preferences Form:
 *
 * import { usePreferences } from '@react-admin/ra-preferences';
 * import { useNotify } from 'react-admin';
 * import { Form, Field } from 'react-final-form'
 *
 * const PreferencesPane = () => {
 *     const [preferences, setPreferences] = usePreferences();
 *     const notify = useNotify();
 *
 *     const handleSave = values => {
 *         setPreferences(values);
 *         notify('preferences saved');
 *     }
 *
 *     return (
 *         <Form
 *             initialValues={preferences}
 *             onSubmit={handleSave}
 *             render={({ handleSubmit }) => (
 *                 <form onSubmit={handleSubmit}>
 *                     <div>
 *                         <label>Post list density</label>
 *                         <Field name="posts.list.density" component="select">
 *                             <option value="small">Small</option>
 *                             <option value="medium">Medium</option>
 *                         </Field>
 *                     </div>
 *                     <button type="submit">Submit</button>
 *                 </form>
 *             )}
 *         />
 *     );
 * }
 *
 * **Tip**: The preferences API is synchronous, because preferences are stored in memory, and replicated in localStorage. So even though localStorage has an async API, the preferences API is synchronous.
 */
var usePreferences = function (key, defaultValue) {
    if (key === void 0) { key = ''; }
    var initialStoredValue = readStorage(key);
    var _a = react_1.useState(initialStoredValue != undefined ? initialStoredValue : defaultValue), localState = _a[0], updateLocalState = _a[1];
    var onPreferencesChange = function (event) {
        // preference events are custom events we send when modifying  preferences
        // from the same tabs (because local storage events won't fire in the same tab)
        // custom events payload contain full preferences, so we get the value we're
        // subscribed to from the new preferences
        var newValue = get_1.default(event.detail, key /* my own key */);
        // and we update our state no matter what. If same value, it won't redraw anyway
        updateLocalState(newValue);
    };
    var onLocalStorageChange = function (event) {
        if (event.key !== exports.RA_PREFERENCE_WORKSPACE) {
            return;
        }
        // localStorage events send the full localstorage value (ie. full preferences)
        // there's a chance we're concerned or not by the event
        // so we get the value we're subscribed to from the new preferences
        var newValue = get_1.default(event.newValue, key /* my own key */);
        // and we update our state no matter what. If same value, it won't redraw anyway
        updateLocalState(newValue);
    };
    // when the key changes, update localState to reflect it.
    react_1.useEffect(function () {
        updateLocalState(readStorage(key) || defaultValue);
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    react_1.useEffect(function () {
        // the custom storage event allows us to update our component
        // when a change occurs in localStorage outside of our component (same browser tab)
        window.addEventListener(PreferencesChanged.eventName, onPreferencesChange);
        // the storage event only works in the context of other documents (eg. other browser tabs)
        window.addEventListener('storage', onLocalStorageChange);
        var canWrite = getStorage().getItem(exports.RA_PREFERENCE_WORKSPACE) === null;
        // write initial value to the local storage if it's not present or contains invalid JSON data.
        if (defaultValue !== undefined && canWrite) {
            writeStorage(key, defaultValue);
        }
        return function () {
            window.removeEventListener(PreferencesChanged.eventName, onPreferencesChange);
            window.removeEventListener('storage', onLocalStorageChange);
        };
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    var writeState = react_1.useCallback(function (value) { return writeStorage(key, value); }, [
        key,
    ]);
    return [localState === undefined ? defaultValue : localState, writeState];
};
exports.default = usePreferences;
