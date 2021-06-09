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
import React, { useState } from 'react';
import TableChartIcon from '@material-ui/icons/TableChart';
import { useTranslate, Button } from 'react-admin';
import { Popover } from '@material-ui/core';
import SelectColumnsMenu from './SelectColumnsMenu';
/**
 * Button setting columns for a Datagrid in Preferences.
 *
 * @param {Object} props
 * @param {string} props.preference The preference key, e.g. 'posts.list.columns'
 * @param {Object} props.columns An object listing the column elements, e.g. { id: <TextField source="id" />, title: <TextField source="title" /> }
 *
 * @example
 *
 *     import { TopToolabr, List, Datagrid, TextField, NumberField, DateField } from 'react-admin';
 *     import { SelectColumnsButton, useSelectedColumns } from '@react-admin/ra-preferences';
 *
 *     const PostActions: FC = () => (
 *         <TopToolbar>
 *             <SelectColumnsButton
 *                 preference="posts.list.columns"
 *                 columns={postListColumns}
 *             />
 *         </TopToolbar>
 *     );
 *
 *     const PostList: FC = props => {
 *         const columns = useSelectedColumns({
 *             preferences: 'posts.list.columns',
 *             columns: postListColumns,
 *             omit: ['nb_views'],
 *         });
 *         return (
 *             <List actions={<PostActions />} {...props}>
 *                 <Datagrid rowClick="edit">
 *                     {columns}
 *                 </Datagrid>
 *             </List>
 *         );
 *     };
 *
 *     const postListColumns = {
 *         title: <TextField source="title" />,
 *         teaser: <TextField source="artist" />,
 *         body: <TextField source="writer" />,
 *         author: <TextField source="producer" />,
 *         nb_views: <NumberField source="rank" />,
 *         published: <DateField source="released" />,
 *     };
 */
var SelectColumnsButton = function (_a) {
    var preference = _a.preference, columns = _a.columns, children = _a.children, rest = __rest(_a, ["preference", "columns", "children"]);
    var _b = useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var translate = useTranslate();
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, __assign({ color: "primary", onClick: handleClick, label: translate('ra-preferences.action.choose_columns', {
                _: 'Choose columns',
            }) }, rest), children || React.createElement(TableChartIcon, null)),
        React.createElement(Popover, { open: Boolean(anchorEl), anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
            } },
            React.createElement(SelectColumnsMenu, { preference: preference, columns: columns }))));
};
export default SelectColumnsButton;
