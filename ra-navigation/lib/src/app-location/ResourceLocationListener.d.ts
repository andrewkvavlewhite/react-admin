/**
 * This component acts as a listener on changes in the resource location.
 * When the location of the resource changes, it modifies the location of the application accordingly.
 */
export declare const ResourceLocationListener: ({ hasDashboard, }: ResourceLocationListenerProps) => null;
export interface ResourceLocationListenerProps {
    hasDashboard?: boolean;
}
