export declare const RA_PREFERENCE_WORKSPACE = "preferences";
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
declare const usePreferences: <T = any>(key?: string, defaultValue?: T) => [T, (value: T) => void];
export default usePreferences;
