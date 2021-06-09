import { Record, Translate } from 'react-admin';
export interface MatchingReferencesError {
    error: string;
}
export declare type REFERENCES_STATUS_READY = 'REFERENCES_STATUS_READY';
export declare type REFERENCES_STATUS_INCOMPLETE = 'REFERENCES_STATUS_INCOMPLETE';
export declare type REFERENCES_STATUS_EMPTY = 'REFERENCES_STATUS_EMPTY';
export declare const REFERENCES_STATUS_READY = "REFERENCES_STATUS_READY";
export declare const REFERENCES_STATUS_INCOMPLETE = "REFERENCES_STATUS_INCOMPLETE";
export declare const REFERENCES_STATUS_EMPTY = "REFERENCES_STATUS_EMPTY";
export declare type REFERENCES_STATUS = REFERENCES_STATUS_READY | REFERENCES_STATUS_INCOMPLETE | REFERENCES_STATUS_EMPTY;
export declare const getSelectedReferencesStatus: (input: {
    value: any;
}, referenceRecords: Record[]) => REFERENCES_STATUS;
interface GetStatusForArrayInputParams {
    input: {
        value: any;
    };
    matchingReferences: Record[] | MatchingReferencesError;
    referenceRecords: Record[];
    translate: Translate;
}
interface ReferencesStatus {
    waiting: boolean;
    error?: string;
    warning?: string;
    choices: Record[];
}
export declare const getStatusForArrayInput: ({ input, matchingReferences, referenceRecords, translate, }: GetStatusForArrayInputParams) => ReferencesStatus;
export {};
