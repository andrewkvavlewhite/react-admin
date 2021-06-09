import { useCallback } from 'react';
import {
    CREATE,
    OnFailure,
    DELETE_MANY,
    Identifier,
    useDataProvider,
    useNotify,
} from 'react-admin';
import { UsingRegexp } from './constants';

export const computeReferencesDiff = (
    previousReferences: Identifier[],
    newReferences: Identifier[]
): {
    addedReferences: Identifier[];
    removedReferences: Identifier[];
} => {
    const removedReferences = previousReferences.filter(
        previousReference => !newReferences.includes(previousReference)
    );

    const addedReferences = newReferences.filter(
        referenceId => !previousReferences.includes(referenceId)
    );

    return {
        addedReferences,
        removedReferences,
    };
};

export type UpdateManyToManyReferences = (
    {
        newReferences,
        resourceId,
        through,
        using,
    }: {
        newReferences: Identifier[];
        resourceId: Identifier;
        through: string;
        using: string;
    },
    {
        onFailure,
    }: {
        onFailure?: OnFailure;
    }
) => Promise<void>;

export const useUpdateManyToManyReferences = (): UpdateManyToManyReferences => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    return useCallback(
        async (
            { newReferences, resourceId, through, using },
            { onFailure }
        ) => {
            try {
                const [, sourceField, targetField] = using.match(UsingRegexp);

                // Fetch the current associative records
                const throughManyReferences = await dataProvider.getManyReference(
                    through,
                    {
                        target: sourceField,
                        id: resourceId,
                        filter: {},
                        sort: { field: 'id', order: 'ASC' },
                        pagination: { page: 1, perPage: 25 },
                    }
                );

                const previousReferences = throughManyReferences.data.map(
                    throughManyReference => throughManyReference[targetField]
                );

                const {
                    addedReferences,
                    removedReferences,
                } = computeReferencesDiff(previousReferences, newReferences);

                if (removedReferences.length > 0) {
                    const ids = throughManyReferences.data
                        .filter(throughManyReference =>
                            removedReferences.includes(
                                throughManyReference[targetField]
                            )
                        )
                        .map(throughManyReference => throughManyReference.id);

                    await dataProvider.deleteMany(
                        through,
                        {
                            ids,
                        },
                        {
                            action: DELETE_MANY,
                        }
                    );
                }

                if (addedReferences.length > 0) {
                    await Promise.all(
                        addedReferences.map(referenceId =>
                            dataProvider.create(
                                through,
                                {
                                    data: {
                                        [sourceField]: resourceId,
                                        [targetField]: referenceId,
                                    },
                                },
                                {
                                    action: CREATE,
                                }
                            )
                        )
                    );
                }
            } catch (error) {
                if (onFailure) {
                    return onFailure(error);
                }
                const errorMessage =
                    typeof error === 'string'
                        ? error
                        : // NOTE: We might have to introduce a new message instead of http_error
                          error.message || 'ra.notification.http_error';
                notify(errorMessage, 'warning');
                return;
            }
        },
        [dataProvider, notify]
    );
};
