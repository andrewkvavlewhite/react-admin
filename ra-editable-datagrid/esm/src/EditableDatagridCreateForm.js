import React, { cloneElement, useCallback, } from 'react';
import PropTypes from 'prop-types';
import { useCreate, useNotify, useRefresh, CRUD_CREATE, } from 'react-admin';
import { Route, useHistory } from 'react-router-dom';
var EditableDatagridCreateForm = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, expand = _a.expand, hasBulkActions = _a.hasBulkActions, resource = _a.resource, createForm = _a.createForm, hasStandaloneCreateForm = _a.hasStandaloneCreateForm, isStandaloneCreateFormVisible = _a.isStandaloneCreateFormVisible, closeStandaloneCreateForm = _a.closeStandaloneCreateForm;
    var history = useHistory();
    var notify = useNotify();
    var refresh = useRefresh();
    var _b = useCreate(resource, {}), create = _b[0], saving = _b[1].loading;
    var hideCreateForm = function () {
        if (hasStandaloneCreateForm) {
            closeStandaloneCreateForm();
        }
        else {
            history.push(basePath);
        }
    };
    var doCreate = useCallback(function (data) {
        return create({ payload: { data: data } }, {
            action: CRUD_CREATE,
            onSuccess: function () {
                notify('ra.notification.created', 'info', {
                    smart_count: 1,
                });
                hideCreateForm();
                refresh();
            },
            onFailure: function (error) {
                notify(typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error', 'warning');
            },
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [create, notify, basePath]);
    var createFormElement = cloneElement(createForm, {
        classes: classes,
        expand: expand,
        hasBulkActions: hasBulkActions,
        id: 'new_record',
        quitEditMode: hideCreateForm,
        record: {},
        resource: resource,
        basePath: basePath,
        save: doCreate,
        saving: saving,
        selectable: false,
    });
    if (hasStandaloneCreateForm) {
        // create form triggered by state
        return isStandaloneCreateFormVisible && createFormElement;
    }
    // create form in a route
    return React.createElement(Route, { path: basePath + "/create" }, createFormElement);
};
EditableDatagridCreateForm.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    resource: PropTypes.string,
    createForm: PropTypes.element,
    hasStandaloneCreateForm: PropTypes.bool,
    isStandaloneCreateFormVisible: PropTypes.bool.isRequired,
    closeStandaloneCreateForm: PropTypes.func.isRequired,
};
export default EditableDatagridCreateForm;
