"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var DeleteMenuItem_1 = __importDefault(require("./DeleteMenuItem"));
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
    var basePath = _a.basePath, _b = _a.children, children = _b === void 0 ? React.createElement(DeleteMenuItem_1.default, null) : _b, className = _a.className, data = _a.data, resource = _a.resource;
    var _c = react_1.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var classes = useStyles();
    var record = react_redux_1.useSelector(
    // @ts-ignore Ignore because we actually merge DataNode with our record
    function (state) { var _a; return (_a = state.admin.resources[resource]) === null || _a === void 0 ? void 0 : _a.data[data.id]; });
    var handleClick = function (event) {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () { return setAnchorEl(null); };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.IconButton, { className: classnames_1.default(classes.menuButton, className), onClick: handleClick },
            React.createElement(MoreVert_1.default, null)),
        React.createElement(core_1.Menu, { anchorEl: anchorEl, open: !!anchorEl, onClose: handleClose }, react_1.Children.map(children, function (child) {
            return react_1.isValidElement(child)
                ? react_1.cloneElement(child, {
                    basePath: basePath,
                    record: record,
                    resource: resource,
                })
                : null;
        }))));
};
exports.default = NodeActions;
var useStyles = core_1.makeStyles({
    menuButton: {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translate(110%, -50%)',
    },
});
