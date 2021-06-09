import { FC, ReactElement } from 'react';
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
declare const PreferencesSetter: FC<PreferencesSetterProps>;
export interface Preferences {
    [key: string]: any;
}
export interface PreferencesSetterProps {
    path: string;
    value: any;
    children: ReactElement;
}
export default PreferencesSetter;
