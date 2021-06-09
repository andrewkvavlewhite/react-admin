"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionLink = exports.useGetActionLink = void 0;
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var DeleteActions = ['delete', 'deleteMany', 'deleteBranch'];
/**
 * Returns a function which computes the path for a record targetted by an Event if possible.
 *
 * @returns {GetActionLink} A function which returns the path for a record targetted by an Event or undefined. It accepts the record and an optional link type (either 'edit' or 'show'). If the link type is not provided, it will return a path to the record edit view if possible or show view otherwise. If the Resource has no edit nor show view, the function returns undefined.
 *
 * @example
 * const EventList = (props) => {
 *     const getActionLink = useGetActionLink();
 *
 *     return (
 *         <List {...props}>
 *             <Datagrid rowClick={(id, basePath, record) => getActionLink(record)}>
 *                 ...
 *             </Datagrid>
 *         </List>
 *     );
 */
exports.useGetActionLink = function () {
    var resources = react_redux_1.useSelector(react_admin_1.getResources);
    return function (record, linkType) {
        return exports.getActionLink(resources, record, linkType);
    };
};
exports.getActionLink = function (resources, record, linkType) {
    var _a;
    var resource = resources.find(function (r) { return r.name === record.resource; });
    var hasEditOrShow = resource.hasEdit || resource.hasShow;
    var recordId = record.payload.id || ((_a = record.payload.data) === null || _a === void 0 ? void 0 : _a.id);
    var isLinkable = record.resource &&
        resource &&
        recordId &&
        !DeleteActions.includes(record.action) &&
        hasEditOrShow;
    if (isLinkable) {
        if (resource) {
            var inferredLinkType = resource.hasEdit ? 'edit' : 'show';
            return react_admin_1.linkToRecord("/" + record.resource, recordId, linkType || inferredLinkType);
        }
    }
    return undefined;
};
