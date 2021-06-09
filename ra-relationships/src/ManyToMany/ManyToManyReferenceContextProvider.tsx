import * as React from 'react';
import { ReactElement, ReactNode, useCallback, useMemo, useRef } from 'react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

import {
    CREATE,
    OnFailure,
    OnSuccess,
    Record,
    RedirectionSideEffect,
    SaveContextProvider,
    TransformData,
    UPDATE,
    useDataProvider,
    useNotify,
    useRecordContext,
    useRedirect,
    useResourceContext,
    useSaveContext,
} from 'react-admin';
import getReferenceManyToManyFormField from './getReferenceManyToManyFormField';
import {
    ManyToManyReferenceContext,
    ManyToManyReferenceContextValue,
    ManyToManyReferenceInputOptions,
} from './ManyToManyReferenceContext';
import { useUpdateManyToManyReferences } from './useUpdateManyToManyReferences';

/**
 * A context provider component needed for `<ReferenceManyToManyInput>`. It
 * should be used inside a `<Create>` or `<Edit>`, wrapping their form child.
 *
 * @example <caption>Example usage</caption>
 * import React from 'react';
 * import {
 *    Edit,
 *    SelectArrayInput,
 *    SimpleForm,
 *    TextInput,
 * } from 'react-admin';
 * import {
 *     ManyToManyReferenceContextProvider,
 *     ReferenceManyToManyInput
 * } from '@react-admin/relationships';
 *
 * const BandEdit = props => (
 *     <Edit {...props}>
 *         <ManyToManyReferenceContextProvider>
 *             <SimpleForm redirect={false}>
 *                 <TextInput source="name" />
 *                 <ReferenceManyToManyInput
 *                     source="id"
 *                     reference="venues"
 *                     through="performances"
 *                     using="band_id,venue_id"
 *                     fullWidth
 *                     label="Performances"
 *                 >
 *                     <SelectArrayInput optionText="name" />
 *                 </ReferenceManyToManyInput>
 *             </SimpleForm>
 *         </ManyToManyReferenceContextProvider>
 *     </Edit>
 * );
 *
 * It provides a context with two functions to register and unregister
 * a many-to-many input. It then replaces the default `save` function provided
 * by either `<Create>` or `<Edit>` and handles the many-to-many resources
 * updates.
 */
export const ManyToManyReferenceContextProvider = ({
    children,
    redirect: defaultRedirect,
    ...props
}: ManyToManyReferenceContextProviderProps): ReactElement => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const redirect = useRedirect();
    const record = useRecordContext(props);
    const resource = useResourceContext(props);
    const {
        save: originalSave,
        onSuccessRef,
        onFailureRef,
        transformRef,
        ...saveContext
    } = useSaveContext(props);
    const basePath = `/${resource}`;
    const updateManyToManyReferences = useUpdateManyToManyReferences();

    const registeredReferences = useRef<ManyToManyReferenceInputOptions[]>([]);

    const value: ManyToManyReferenceContextValue = useMemo(
        () => ({
            registerManyToManyInput: (options): void => {
                if (
                    !registeredReferences.current.find(
                        registration =>
                            registration.reference === options.reference &&
                            registration.resource === options.resource &&
                            registration.source === options.source &&
                            registration.through === options.through &&
                            registration.using === options.using
                    )
                ) {
                    registeredReferences.current.push(options);
                }
            },
            unregisterManyToManyInput: (options): void => {
                registeredReferences.current = registeredReferences.current.filter(
                    registration =>
                        registration.reference !== options.reference ||
                        registration.resource !== options.resource ||
                        registration.source !== options.source ||
                        registration.through !== options.through ||
                        registration.using !== options.using
                );
            },
        }),
        []
    );

    const save = useCallback(
        async (
            values: any,
            redirectTo?: RedirectionSideEffect,
            callbacks?: SaveCallbacks
        ) => {
            let updatedRecord: Record = record;
            const onSuccess = callbacks?.onSuccess || onSuccessRef.current;
            const onFailure = callbacks?.onFailure || onFailureRef.current;
            const transform = callbacks?.transform || transformRef.current;

            const fields = registeredReferences.current.map(
                getReferenceManyToManyFormField
            );

            const finalValues = omit(values, fields);
            const finalData = await Promise.resolve(
                transform ? transform(finalValues) : finalValues
            );

            // If the record does not have an id, it's a new one from a create form
            // In this case we must first create the record so that we have an identifier
            // with which we can create the many-to-many relations
            if (!record || !record.id) {
                try {
                    const { data } = await dataProvider.create(
                        resource,
                        {
                            data: finalData,
                        },
                        {
                            action: CREATE,
                        }
                    );

                    updatedRecord = data;
                } catch (error) {
                    if (onFailure) {
                        return onFailure(error);
                    }
                    const errorMessage =
                        typeof error === 'string'
                            ? error
                            : error.message || 'ra.notification.http_error';
                    notify(errorMessage, 'warning');
                    return;
                }
            }

            const updateReferenceField = async ({
                reference,
                resource,
                through,
                using,
            }: ManyToManyReferenceInputOptions): Promise<void> => {
                // The value of each many-to-many input relation is stored in
                // temporary field by the useReferenceManyToManyInputController
                const field = getReferenceManyToManyFormField({
                    reference,
                    resource,
                    through,
                });

                return updateManyToManyReferences(
                    {
                        newReferences: values[field],
                        resourceId: updatedRecord.id,
                        through,
                        using,
                    },
                    { onFailure }
                );
            };

            await Promise.all(
                registeredReferences.current.map(updateReferenceField)
            );

            if (record && record.id && !isEqual(finalData, record)) {
                try {
                    const { data } = await dataProvider.update(
                        resource,
                        {
                            id: record.id,
                            data: finalData,
                            previousData: record,
                        },
                        {
                            action: UPDATE,
                        }
                    );
                    updatedRecord = data;
                } catch (error) {
                    if (onFailure) {
                        return onFailure(error);
                    }
                    const errorMessage =
                        typeof error === 'string'
                            ? error
                            : error.message || 'ra.notification.http_error';
                    notify(errorMessage, 'warning');
                    return;
                }
            }

            if (onSuccess) {
                return onSuccess({ data: updatedRecord });
            }

            notify(
                record && record.id
                    ? 'ra.notification.updated'
                    : 'ra.notification.created',
                'info',
                {
                    smart_count: 1,
                },
                false
            );
            redirect(
                redirectTo || defaultRedirect,
                basePath,
                updatedRecord.id,
                updatedRecord
            );
        },
        [
            resource,
            dataProvider,
            defaultRedirect,
            basePath,
            notify,
            redirect,
            record,
            onFailureRef,
            onSuccessRef,
            transformRef,
            updateManyToManyReferences,
        ]
    );

    const newSaveContext = useMemo(
        () => ({
            ...saveContext,
            save,
        }),
        [save, saveContext]
    );

    return (
        <ManyToManyReferenceContext.Provider value={value}>
            <SaveContextProvider value={newSaveContext}>
                {React.isValidElement(children)
                    ? React.cloneElement(children, {
                          ...props,
                          ...children.props,
                          save,
                          saving: saveContext.saving,
                          resource,
                          basePath,
                      })
                    : children}
            </SaveContextProvider>
        </ManyToManyReferenceContext.Provider>
    );
};

export interface ManyToManyReferenceContextProviderProps {
    basePath?: string;
    children: ReactNode;
    record?: Record;
    redirect?: string;
    resource?: string;
    save?: SaveFunction;
}

type SaveCallbacks = {
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
    transform?: TransformData;
};

type SaveFunction = (
    data: Partial<Record>,
    redirect?: RedirectionSideEffect,
    callbacks?: SaveCallbacks
) => void;
