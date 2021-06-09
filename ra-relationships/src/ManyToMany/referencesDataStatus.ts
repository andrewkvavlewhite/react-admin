import { Record, Translate } from 'react-admin';

export interface MatchingReferencesError {
    error: string;
}

const isMatchingReferencesError = (
    matchingReferences?: any
): matchingReferences is MatchingReferencesError =>
    matchingReferences && matchingReferences.error !== undefined;

export type REFERENCES_STATUS_READY = 'REFERENCES_STATUS_READY';
export type REFERENCES_STATUS_INCOMPLETE = 'REFERENCES_STATUS_INCOMPLETE';
export type REFERENCES_STATUS_EMPTY = 'REFERENCES_STATUS_EMPTY';

export const REFERENCES_STATUS_READY = 'REFERENCES_STATUS_READY';
export const REFERENCES_STATUS_INCOMPLETE = 'REFERENCES_STATUS_INCOMPLETE';
export const REFERENCES_STATUS_EMPTY = 'REFERENCES_STATUS_EMPTY';

export type REFERENCES_STATUS =
    | REFERENCES_STATUS_READY
    | REFERENCES_STATUS_INCOMPLETE
    | REFERENCES_STATUS_EMPTY;

export const getSelectedReferencesStatus = (
    input: {
        value: any;
    },
    referenceRecords: Record[]
): REFERENCES_STATUS =>
    !input.value || input.value.length === referenceRecords.length
        ? REFERENCES_STATUS_READY
        : referenceRecords.length > 0
        ? REFERENCES_STATUS_INCOMPLETE
        : REFERENCES_STATUS_EMPTY;

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

export const getStatusForArrayInput = ({
    input,
    matchingReferences,
    referenceRecords,
    translate = (x): string => x,
}: GetStatusForArrayInputParams): ReferencesStatus => {
    // selectedReferencesDataStatus can be "empty" (no data was found for references from input.value)
    // or "incomplete" (Not all of the reference data was found)
    // or "ready" (all references data was found or there is no references from input.value)
    const selectedReferencesDataStatus = getSelectedReferencesStatus(
        input,
        referenceRecords
    );

    const matchingReferencesError = isMatchingReferencesError(
        matchingReferences
    )
        ? translate(matchingReferences.error, {
              _: matchingReferences.error,
          })
        : null;

    return {
        waiting:
            (!matchingReferences &&
                input.value &&
                selectedReferencesDataStatus === REFERENCES_STATUS_EMPTY) ||
            (!matchingReferences && !input.value),
        error:
            matchingReferencesError &&
            (!input.value ||
                (input.value &&
                    selectedReferencesDataStatus === REFERENCES_STATUS_EMPTY))
                ? translate('ra.input.references.all_missing', {
                      _: 'ra.input.references.all_missing',
                  })
                : null,
        warning:
            matchingReferencesError ||
            (input.value &&
                selectedReferencesDataStatus !== REFERENCES_STATUS_READY)
                ? matchingReferencesError ||
                  translate('ra.input.references.many_missing', {
                      _: 'ra.input.references.many_missing',
                  })
                : null,
        choices: Array.isArray(matchingReferences)
            ? matchingReferences
            : referenceRecords,
    };
};
