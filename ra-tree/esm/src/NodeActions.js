import * as React from 'react';
import { Children, cloneElement, isValidElement, useState, } from 'react';
import { IconButton, makeStyles, Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import DeleteMenuItem from './DeleteMenuItem';
/**
 * Provides a dropdown menu for each node.
 * It accepts children which must return a MaterialUI MenuItem component
 *
 * @example
 * import { NodeActions, DeleteMenuItem, TreeWithDetails } from '@react-admin/ra-tree';
 *
 * const MyCustomActionMenuItem = ({ record, resource, parentId }) => {
 *     const handleClick = () => {
 *         // Do something with dataProvider ?
 *     }
 *     return (
 *         <MenuItem onClick={handleClick}>
 *             Do something
 *         </MenuItem>
 *     );
 * };
 *
 * const MyActions = (props) => (
 *     <NodeActions {...props}>
 *         <MyCustomActionMenuItem />
 *         <DeleteMenuItem />
 *     </NodeActions>
 * );
 *
 * const CategoriesList: FC<Props> = props => (
 *     <TreeWithDetails
 *         titleField="name"
 *         edit={CategoriesEdit}
 *         draggable
 *         showLine
 *         nodeActions={<MyActions />}
 *         {...props}
 *     />
 * );
 */
var NodeActions = function (_a) {
    var basePath = _a.basePath, _b = _a.children, children = _b === void 0 ? React.createElement(DeleteMenuItem, null) : _b, className = _a.className, data = _a.data, resource = _a.resource;
    var _c = useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var classes = useStyles();
    var record = useSelector(
    // @ts-ignore Ignore because we actually merge DataNode with our record
    function (state) { var _a; return (_a = state.admin.resources[resource]) === null || _a === void 0 ? void 0 : _a.data[data.id]; });
    var handleClick = function (event) {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () { return setAnchorEl(null); };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { className: classnames(classes.menuButton, className), onClick: handleClick },
            React.createElement(MoreVertIcon, null)),
        React.createElement(Menu, { anchorEl: anchorEl, open: !!anchorEl, onClose: handleClose }, Children.map(children, function (child) {
            return isValidElement(child)
                ? cloneElement(child, {
                    basePath: basePath,
                    record: record,
                    resource: resource,
                })
                : null;
        }))));
};
export default NodeActions;
var useStyles = makeStyles({
    menuButton: {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translate(110%, -50%)',
    },
});
