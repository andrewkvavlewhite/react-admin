"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var DeleteMenuItemWithConfirmation_1 = __importDefault(require("./DeleteMenuItemWithConfirmation"));
var DeleteMenuItemWithUndo_1 = __importDefault(require("./DeleteMenuItemWithUndo"));
/**
 * MenuItem used to delete a branch. Added by default by the <NodeActions> of the TreeWithDetails component.
 *
 * @typedef {Object} Props The props you can use (other props are injected if you used it in the <NodeActions>)
 * @param {Prop} props
 * @prop {boolean} undoable Confirm the deletion using an undo button in a notification or a confirmation dialog. Defaults to 'false'.
 * @prop {string} className
 * @prop {string} label MenuItem label. Defaults to 'ra.action.delete, translated.
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
var DeleteMenuItem = react_1.forwardRef(function (_a, ref) {
    var _b = _a.undoable, undoable = _b === void 0 ? true : _b, rest = __rest(_a, ["undoable"]);
    return undoable ? (React.createElement(DeleteMenuItemWithUndo_1.default, __assign({}, rest, { ref: ref }))) : (React.createElement(DeleteMenuItemWithConfirmation_1.default, __assign({}, rest, { ref: ref })));
});
DeleteMenuItem.displayName = 'DeleteMenuItem';
exports.default = DeleteMenuItem;
