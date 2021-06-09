import { SortPayload } from 'react-admin';
import usePreferences from '../usePreferences';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSavedQueries = (resource: string) =>
    usePreferences<SavedQuery[]>(`${resource}SavedQueries`, []);

export interface SavedQuery {
    label: string;
    value: {
        filter?: any;
        displayedFilters?: any[];
        sort?: SortPayload;
        perPage?: number;
    };
}
