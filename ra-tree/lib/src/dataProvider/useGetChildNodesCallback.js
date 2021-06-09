"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_admin_1 = require("react-admin");
var actions_1 = require("../actions");
var useGetChildNodesCallback = function (resource) {
    var dispatch = react_redux_1.useDispatch();
    var dataProvider = react_admin_1.useDataProvider();
    return react_1.useCallback(function (parentId, options) {
        if (options === void 0) { options = {}; }
        return dataProvider
            .getChildNodes(resource, { parentId: parentId }, {
            action: actions_1.CRUD_GET_CHILD_NODES,
        })
            .then(function (res) {
            dispatch({
                type: actions_1.POPULATE_RECORDS_FROM_NODES,
                payload: { data: res.data },
                meta: {
                    resource: resource,
                    fetchResponse: react_admin_1.GET_MANY,
                    fetchStatus: react_admin_1.FETCH_END,
                },
            });
            options.onSuccess && options.onSuccess(res);
        });
    }, [resource, dataProvider, dispatch]);
};
exports.default = useGetChildNodesCallback;
