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
exports.RealTimeShow = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var dataProvider_1 = require("./dataProvider");
var types_1 = require("./types");
var Warning_1 = __importDefault(require("./Warning"));
/**
 * <Show> equivalent, but with real-time updates
 *
 * Shows a event and refreshes the page when the record is modified by
 * another user. Also, it displays a warning when the record is deleted by
 * another user.
 *
 * @example
 *
 * import { RealTimeShow } from '@react-admin/ra-realtime'
 *
 * const PostShow = props => (
 *     <RealTimeShow {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </RealTimeShow>
 * );
 *
 * @example <caption>With custom side effects on new event</caption>
 *
 * import { SimpleShowLayout, TextField, useRefresh } from 'react-admin';
 * import { RealTimeShow } from '@react-admin/ra-realtime';
 *
 * const PostShow = props => {
 *    const refresh = useRefresh();
 *    const handleEventReceived = (event) => {
 *        refresh();
 *    };
 *
 *    return (
 *        <RealTimeShow {...props} onEventReceived={handleEventReceived}>
 *            <SimpleShowLayout>
 *                <TextField source="title" />
 *            </SimpleShowLayout>
 *        </RealTimeShow>
 *    );
 * };
 */
exports.RealTimeShow = function (_a) {
    var children = _a.children, id = _a.id, resource = _a.resource, props = __rest(_a, ["children", "id", "resource"]);
    var notify = react_admin_1.useNotify();
    var refresh = react_admin_1.useRefresh();
    var translate = react_admin_1.useTranslate();
    var _b = react_1.useState(false), deleted = _b[0], setDeleted = _b[1];
    var defaultHandleEventReceived = function (event) {
        if (event.type === types_1.EventType.Updated) {
            refresh();
            notify('ra-realtime.notification.record.updated');
        }
        else if (event.type === types_1.EventType.Deleted) {
            setDeleted(true);
        }
    };
    var _c = props.onEventReceived, onEventReceived = _c === void 0 ? defaultHandleEventReceived : _c, rest = __rest(props, ["onEventReceived"]);
    dataProvider_1.useSubscribeToRecord(resource, id, onEventReceived);
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Collapse, { in: deleted }, deleted && (React.createElement(Warning_1.default, { message: translate('ra-realtime.notification.record.deleted') }))),
        React.createElement(react_admin_1.Show, __assign({ resource: resource, id: id }, rest), children)));
};
