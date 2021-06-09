import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    useDataProvider,
    Identifier,
    QueryOptions,
    GET_MANY,
    FETCH_END,
} from 'react-admin';

import { CRUD_GET_CHILD_NODES, POPULATE_RECORDS_FROM_NODES } from '../actions';

const useGetChildNodesCallback = (
    resource: string
): UseGetChildNodesCallbackHookValue => {
    const dispatch = useDispatch();
    const dataProvider = useDataProvider();
    return useCallback(
        (parentId: Identifier, options: any = {}) =>
            dataProvider
                .getChildNodes(
                    resource,
                    { parentId },
                    {
                        action: CRUD_GET_CHILD_NODES,
                    }
                )
                .then(res => {
                    dispatch({
                        type: POPULATE_RECORDS_FROM_NODES,
                        payload: { data: res.data },
                        meta: {
                            resource,
                            fetchResponse: GET_MANY,
                            fetchStatus: FETCH_END,
                        },
                    });
                    options.onSuccess && options.onSuccess(res);
                }),
        [resource, dataProvider, dispatch]
    );
};

export type UseGetChildNodesCallbackHookValue = (
    parentId: Identifier,
    options?: Partial<QueryOptions>
) => Promise<void>;

export default useGetChildNodesCallback;
