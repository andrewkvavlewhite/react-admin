import { ReactElement, ReactNode } from 'react';
import { OnFailure, OnSuccess, Record, RedirectionSideEffect, TransformData } from 'react-admin';
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
export declare const ManyToManyReferenceContextProvider: ({ children, redirect: defaultRedirect, ...props }: ManyToManyReferenceContextProviderProps) => ReactElement;
export interface ManyToManyReferenceContextProviderProps {
    basePath?: string;
    children: ReactNode;
    record?: Record;
    redirect?: string;
    resource?: string;
    save?: SaveFunction;
}
declare type SaveCallbacks = {
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
    transform?: TransformData;
};
declare type SaveFunction = (data: Partial<Record>, redirect?: RedirectionSideEffect, callbacks?: SaveCallbacks) => void;
export {};
