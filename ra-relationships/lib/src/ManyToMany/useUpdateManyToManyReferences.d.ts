import { OnFailure, Identifier } from 'react-admin';
export declare const computeReferencesDiff: (previousReferences: Identifier[], newReferences: Identifier[]) => {
    addedReferences: Identifier[];
    removedReferences: Identifier[];
};
export declare type UpdateManyToManyReferences = ({ newReferences, resourceId, through, using, }: {
    newReferences: Identifier[];
    resourceId: Identifier;
    through: string;
    using: string;
}, { onFailure, }: {
    onFailure?: OnFailure;
}) => Promise<void>;
export declare const useUpdateManyToManyReferences: () => UpdateManyToManyReferences;
