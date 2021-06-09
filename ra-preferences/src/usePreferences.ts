// Part of this code comes from rehooks useLocalStorage
// (https://github.com/rehooks/local-storage/blob/master/src/use-localstorage.ts)
// We needed to reimplement it, because we don't want the hook to rerender
// the component subscribe to preference "density" when another component
// sets any other preference

import { useEffect, useState, useCallback } from 'react';
import set from 'lodash/set';
import get from 'lodash/get';

let localStorageAvailable = undefined;
const storage = {};
const memoryStorage = {
    getItem(key: string): string {
        return get(storage, key);
    },
    setItem(key: string, value: string): void {
        set(storage, key, value);
    },
};

const tryParse = (value: string): any => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

const testLocalStorage = () => {
    if (window.localStorage == undefined) {
        return false;
    }

    try {
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
    } catch {
        return false;
    }
};

const getStorage = () => {
    if (localStorageAvailable == undefined) {
        localStorageAvailable = testLocalStorage();
    }

    return localStorageAvailable ? window.localStorage : memoryStorage;
};

export const RA_PREFERENCE_WORKSPACE = 'preferences';

interface KVP<K, V> {
    key: K;
    value: V;
}

const PreferencesChanged = {
    eventName: 'onPreferencesChange',
    create: <T>(payload: KVP<string, T>): CustomEvent<KVP<string, T>> =>
        new CustomEvent<KVP<string, T>>(PreferencesChanged.eventName, {
            detail: payload,
        }),
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
const readStorage = <T>(key: string): T => {
    const preferences =
        JSON.parse(getStorage().getItem(RA_PREFERENCE_WORKSPACE)) || {};
    if (key) {
        return tryParse(get(preferences, key)) as T;
    }
    return (tryParse(preferences) || {}) as T;
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
const writeStorage = <T>(key: string, value: T): void => {
    const storage = getStorage();
    try {
        const preferences =
            JSON.parse(storage.getItem(RA_PREFERENCE_WORKSPACE)) || {};

        const newPreferences =
            key && value != undefined
                ? set({ ...preferences }, key, value)
                : key || value;

        storage.setItem(
            RA_PREFERENCE_WORKSPACE,
            JSON.stringify(newPreferences)
        );
        window.dispatchEvent(PreferencesChanged.create<T>(newPreferences));
    } catch (err) {
        if (
            err instanceof TypeError &&
            err.message.includes('circular structure')
        ) {
            throw new TypeError(
                'The object that was given to the writeStorage function has circular references.\n' +
                    'For more information, check here: ' +
                    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value'
            );
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
const usePreferences = <T = any>(
    key = '',
    defaultValue?: T
): [T, (value: T) => void] => {
    const initialStoredValue = readStorage<T>(key);
    const [localState, updateLocalState] = useState<T>(
        initialStoredValue != undefined ? initialStoredValue : defaultValue
    );

    const onPreferencesChange = (event: CustomEvent<KVP<string, T>>): void => {
        // preference events are custom events we send when modifying  preferences
        // from the same tabs (because local storage events won't fire in the same tab)

        // custom events payload contain full preferences, so we get the value we're
        // subscribed to from the new preferences
        const newValue = get(event.detail, key /* my own key */);
        // and we update our state no matter what. If same value, it won't redraw anyway
        updateLocalState(newValue);
    };

    const onLocalStorageChange = (event: StorageEvent): void => {
        if (event.key !== RA_PREFERENCE_WORKSPACE) {
            return;
        }
        // localStorage events send the full localstorage value (ie. full preferences)
        // there's a chance we're concerned or not by the event
        // so we get the value we're subscribed to from the new preferences
        const newValue = get(event.newValue, key /* my own key */);
        // and we update our state no matter what. If same value, it won't redraw anyway
        updateLocalState(newValue);
    };

    // when the key changes, update localState to reflect it.
    useEffect(() => {
        updateLocalState(readStorage<T>(key) || defaultValue);
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // the custom storage event allows us to update our component
        // when a change occurs in localStorage outside of our component (same browser tab)
        window.addEventListener(
            PreferencesChanged.eventName,
            onPreferencesChange
        );

        // the storage event only works in the context of other documents (eg. other browser tabs)
        window.addEventListener('storage', onLocalStorageChange);

        const canWrite = getStorage().getItem(RA_PREFERENCE_WORKSPACE) === null;

        // write initial value to the local storage if it's not present or contains invalid JSON data.
        if (defaultValue !== undefined && canWrite) {
            writeStorage<T>(key, defaultValue);
        }

        return (): void => {
            window.removeEventListener(
                PreferencesChanged.eventName,
                onPreferencesChange
            );
            window.removeEventListener('storage', onLocalStorageChange);
        };
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

    const writeState = useCallback((value: T) => writeStorage<T>(key, value), [
        key,
    ]);

    return [localState === undefined ? defaultValue : localState, writeState];
};

export default usePreferences;
