import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDataProvider, GET_MANY, FETCH_END, } from 'react-admin';
import { CRUD_GET_CHILD_NODES, POPULATE_RECORDS_FROM_NODES } from '../actions';
var useGetChildNodesCallback = function (resource) {
    var dispatch = useDispatch();
    var dataProvider = useDataProvider();
    return useCallback(function (parentId, options) {
        if (options === void 0) { options = {}; }
        return dataProvider
            .getChildNodes(resource, { parentId: parentId }, {
            action: CRUD_GET_CHILD_NODES,
        })
            .then(function (res) {
            dispatch({
                type: POPULATE_RECORDS_FROM_NODES,
                payload: { data: res.data },
                meta: {
                    resource: resource,
                    fetchResponse: GET_MANY,
                    fetchStatus: FETCH_END,
                },
            });
            options.onSuccess && options.onSuccess(res);
        });
    }, [resource, dataProvider, dispatch]);
};
export default useGetChildNodesCallback;
