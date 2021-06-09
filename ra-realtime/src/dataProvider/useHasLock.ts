import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDataProvider, DataProvider, Identifier } from 'react-admin';

import {
    GET_LOCK,
    GET_LOCK_LOADING,
    GET_LOCK_SUCCESS,
    GET_LOCK_FAILURE,
} from '../actions';

import { LocksDataProvider, UseHasLock } from '../types';

/**
 * Hook to get a record lock.
 *
 * Use it to display a warning or to disable a button.
 * If you just want to lock a record,
 * please use the `useLock` hook instead.
 *
 * @param {string} resource
 * @param {any} recordId
 *
 * @returns The current request state. Destructure as { data }.
 *
 * @example Simple Usage
 *
 * function PostEdit() {
 *     const { resource, id } = props;
 *
 *     const { loading } = useLock(resource, id, 'mario');
 *
 *     if (loading) {
 *         return <CircularProgress />;
 *     }
 *
 *     return (
 *         <Edit {...props}>
 *             <SimpleForm toolbar={<CustomToolbar />}>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * }
 *
 * function CustomToolbar(props): FC<Props> {
 *     const { resource, record } = props;
 *
 *     const { loading, data: lock } = useHasLock(resource, record.id);
 *
 *     const isMarioLocker = lock?.identity === 'mario';
 *
 *     return (
 *         <Toolbar {...props}>
 *             <SaveButton disabled={loading || !isMarioLocker} />
 *         </Toolbar>
 *     );
 * }
 *
 */
function useHasLock(resource: string, recordId: Identifier): UseHasLock {
    const dispatch = useDispatch();
    const dataProvider = useDataProvider() as DataProvider & LocksDataProvider;
    const [loading, setLoading] = useState(true);

    const data = useSelector(state =>
        typeof state.locks[resource] === 'undefined'
            ? undefined
            : state.locks[resource][recordId]
    );

    useEffect(() => {
        // If there's already a lock, don't claim it
        if (data) {
            setLoading(false);
            return;
        }

        dispatch({
            type: GET_LOCK_LOADING,
            payload: {},
            meta: {
                resource,
                recordId,
            },
        });
        dataProvider
            .getLock(resource, {
                resource,
                recordId,
            })
            .then(({ data: lock }) => {
                dispatch({
                    type: GET_LOCK_SUCCESS,
                    payload: {
                        data: lock,
                    },
                    meta: {
                        resource,
                        recordId,
                        fetchResponse: GET_LOCK,
                    },
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_LOCK_FAILURE,
                    payload: {},
                    meta: {
                        resource,
                        recordId,
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [resource, recordId]); // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, data };
}

export default useHasLock;
