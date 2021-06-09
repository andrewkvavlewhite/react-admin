import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDataProvider, DataProvider } from 'react-admin';

import {
    GET_LOCKS_LOADING,
    GET_LOCKS_SUCCESS,
    GET_LOCKS,
    GET_LOCKS_FAILURE,
} from '../actions';

import { LocksDataProvider, UseHasLock } from '../types';

/**
 * Hook to get resource locks.
 *
 * Use it to list locks or to customize a row in a list of resource records
 *
 * @param {string} resource
 *
 * @returns The current request state. Destructure as { data }.
 *
 * @example Simple Usage
 *
 * const MyPostRow: FC<any> = ({ locks, ...props }) => {
 *    const recordId = props.record.id;
 *    const lock = locks.find(l => l.recordId === recordId);
 *
 *    return (
 *        <TableRow id={recordId}>
 *            <TableCell>
 *                <TextField source="title" {...props} />
 *                {lock && (
 *                    <span style={{ color: 'red' }}>
 *                        {` (Locked by ${lock.identity})`}
 *                    </span>
 *                )}
 *            </TableCell>
 *            <TableCell align="right">
 *                <EditButton {...props} />
 *            </TableCell>
 *        </TableRow>
 *    );
 *};
 *
 *const MyPostGridBody: FC<any> = ({ locks, ...props }) => (
 *    <DatagridBody {...props} row={<MyPostRow locks={locks} />} />
 *);
 *
 *const MyPostGrid: FC<any> = props => {
 *    const { data: locks } = useHasLocks(props.resource);
 *    return <Datagrid {...props} body={<MyPostGridBody locks={locks} />} />;
 *};
 *
 *const MyListView: FC<any> = props => (
 *    <List {...props}>
 *        <MyPostGrid />
 *    </List>
 *);
 *
 */
function useHasLocks(resource: string): UseHasLock {
    const dispatch = useDispatch();
    const dataProvider = useDataProvider() as DataProvider & LocksDataProvider;

    const [loading, setLoading] = useState(true);

    const data = useSelector(state =>
        state.locks[resource] ? Object.values(state.locks[resource]) : []
    );

    useEffect(() => {
        /**
         * Because of async unlock
         * We need to ensure the record is unlocked when coming back from our lock
         * So we differ records lookup to the next tick on mount
         */
        dispatch({
            type: GET_LOCKS_LOADING,
            payload: {},
            meta: {
                resource,
            },
        });

        dataProvider
            .getLocks(resource)
            .then(({ data: locks }) => {
                dispatch({
                    type: GET_LOCKS_SUCCESS,
                    payload: {
                        data: locks,
                    },
                    meta: {
                        resource,
                        fetchResponse: GET_LOCKS,
                    },
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_LOCKS_FAILURE,
                    payload: {},
                    meta: {
                        resource,
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [resource]);

    return { loading, data };
}

export default useHasLocks;
