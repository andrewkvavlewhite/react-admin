import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { GET_LOCK, GET_LOCK_LOADING, GET_LOCK_SUCCESS, GET_LOCK_FAILURE, } from '../actions';
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
function useHasLock(resource, recordId) {
    var dispatch = useDispatch();
    var dataProvider = useDataProvider();
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var data = useSelector(function (state) {
        return typeof state.locks[resource] === 'undefined'
            ? undefined
            : state.locks[resource][recordId];
    });
    useEffect(function () {
        // If there's already a lock, don't claim it
        if (data) {
            setLoading(false);
            return;
        }
        dispatch({
            type: GET_LOCK_LOADING,
            payload: {},
            meta: {
                resource: resource,
                recordId: recordId,
            },
        });
        dataProvider
            .getLock(resource, {
            resource: resource,
            recordId: recordId,
        })
            .then(function (_a) {
            var lock = _a.data;
            dispatch({
                type: GET_LOCK_SUCCESS,
                payload: {
                    data: lock,
                },
                meta: {
                    resource: resource,
                    recordId: recordId,
                    fetchResponse: GET_LOCK,
                },
            });
        })
            .catch(function () {
            dispatch({
                type: GET_LOCK_FAILURE,
                payload: {},
                meta: {
                    resource: resource,
                    recordId: recordId,
                },
            });
        })
            .finally(function () {
            setLoading(false);
        });
    }, [resource, recordId]); // eslint-disable-line react-hooks/exhaustive-deps
    return { loading: loading, data: data };
}
export default useHasLock;
