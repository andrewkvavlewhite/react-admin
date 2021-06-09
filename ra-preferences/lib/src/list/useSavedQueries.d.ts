import { SortPayload } from 'react-admin';
export declare const useSavedQueries: (resource: string) => [SavedQuery[], (value: SavedQuery[]) => void];
export interface SavedQuery {
    label: string;
    value: {
        filter?: any;
        displayedFilters?: any[];
        sort?: SortPayload;
        perPage?: number;
    };
}
