import * as React from 'react';
import { TopToolbar, Button } from 'react-admin';
import { Link } from 'react-router-dom';
import ContentAdd from '@material-ui/icons/Add';
var NodeEditActions = function (_a) {
    var basePath = _a.basePath, data = _a.data;
    return (React.createElement(TopToolbar, null,
        React.createElement(Button, { component: Link, to: {
                pathname: basePath + "/create",
                state: { parentId: data === null || data === void 0 ? void 0 : data.id },
            }, label: "ra-tree.action.add_child" },
            React.createElement(ContentAdd, null))));
};
export default NodeEditActions;
