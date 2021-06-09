import { useEffect, useCallback } from 'react';
// @ts-ignore
import inflection from 'inflection';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckMinimumRequiredProps, useNotify, useRedirect, useSaveModifiers, useTranslate, useVersion, CREATE, FETCH_END, } from 'react-admin';
import { useAddRootNode, useAddChildNode } from '../dataProvider';
import { CRUD_ADD_ROOT_NODE, CRUD_ADD_CHILD_NODE, CREATE_RECORD_FROM_NODE, ADD_UNSAVED_ROOT_NODE, REMOVE_UNSAVED_ROOT_NODE, ADD_UNSAVED_CHILD_NODE, REMOVE_UNSAVED_CHILD_NODE, } from '../actions';
/**
 * Prepare data for the Create view
 *
 * @param {Object} props The props passed to the Create component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Create view
 *
 * @example
 *
 * import { CreateView } from 'react-admin';
 * import { useCreateNodeController } from '@react-admin/ra-tree';
 *
 * const MyCreateNode = props => {
 *     const controllerProps = useCreateNodeController(props);
 *     return <CreateView {...controllerProps} {...props} />;
 * }
 */
var useCreateNodeController = function (props) {
    useCheckMinimumRequiredProps('Create', ['basePath', 'resource'], props);
    var basePath = props.basePath, resource = props.resource, _a = props.record, record = _a === void 0 ? {} : _a, onSuccess = props.onSuccess, onFailure = props.onFailure, transform = props.transform;
    var location = useLocation();
    var parentId = location.state && location.state.parentId;
    var isChild = typeof parentId !== 'undefined';
    var recordToUse = (location.state && location.state.record) || record;
    var _b = useAddRootNode(resource), createRoot = _b[0], savingRoot = _b[1].loading;
    var _c = useAddChildNode(resource), createChild = _c[0], savingChild = _c[1].loading;
    var create = isChild ? createChild : createRoot;
    var saving = isChild ? savingChild : savingRoot;
    var action = isChild ? CRUD_ADD_CHILD_NODE : CRUD_ADD_ROOT_NODE;
    var dispatch = useDispatch();
    // show a local new node in the tree on mount, remove it on unmount
    useEffect(function () {
        if (isChild) {
            dispatch({
                type: ADD_UNSAVED_CHILD_NODE,
                payload: { parentId: parentId },
                meta: { resource: resource },
            });
            return function () {
                return dispatch({
                    type: REMOVE_UNSAVED_CHILD_NODE,
                    payload: { parentId: parentId },
                    meta: { resource: resource },
                });
            };
        }
        else {
            dispatch({ type: ADD_UNSAVED_ROOT_NODE, meta: { resource: resource } });
            return function () {
                return dispatch({
                    type: REMOVE_UNSAVED_ROOT_NODE,
                    meta: { resource: resource },
                });
            };
        }
    }, [parentId, isChild, resource, dispatch]);
    var _d = useSaveModifiers({ onSuccess: onSuccess, onFailure: onFailure, transform: transform }), onSuccessRef = _d.onSuccessRef, setOnSuccess = _d.setOnSuccess, onFailureRef = _d.onFailureRef, setOnFailure = _d.setOnFailure, transformRef = _d.transformRef, setTransform = _d.setTransform;
    var translate = useTranslate();
    var notify = useNotify();
    var redirect = useRedirect();
    var save = useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = 'edit'; }
        var _b = _a === void 0 ? {} : _a, onSuccessFromSave = _b.onSuccess, onFailureFromSave = _b.onFailure, transformFromSave = _b.transform;
        return Promise.resolve(transformFromSave
            ? transformFromSave(data)
            : transformRef.current
                ? transformRef.current(data)
                : data).then(function (data) {
            var payload = isChild ? { data: data, parentId: parentId } : { data: data };
            return create({ payload: payload }, {
                action: action,
                onSuccess: onSuccessFromSave
                    ? onSuccessFromSave
                    : onSuccessRef.current
                        ? onSuccessRef.current
                        : function (_a) {
                            var newNode = _a.data;
                            dispatch({
                                type: CREATE_RECORD_FROM_NODE,
                                payload: { data: newNode, parentId: parentId },
                                meta: {
                                    resource: resource,
                                    fetchResponse: CREATE,
                                    fetchStatus: FETCH_END,
                                },
                            });
                            notify('ra.notification.created', 'info', {
                                smart_count: 1,
                            });
                            redirect(redirectTo, basePath, newNode.id, newNode);
                        },
                onFailure: onFailureFromSave
                    ? onFailureFromSave
                    : onFailureRef.current
                        ? onFailureRef.current
                        : function (error) {
                            notify(typeof error === 'string'
                                ? error
                                : error.message ||
                                    'ra.notification.http_error', 'warning');
                        },
            });
        });
    }, [
        dispatch,
        create,
        transformRef,
        onSuccessRef,
        onFailureRef,
        notify,
        redirect,
        basePath,
        parentId,
        isChild,
        action,
        resource,
    ]);
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.create', {
        name: "" + resourceName,
    });
    var version = useVersion();
    return {
        loading: false,
        loaded: true,
        saving: saving,
        defaultTitle: defaultTitle,
        save: save,
        setOnSuccess: setOnSuccess,
        setOnFailure: setOnFailure,
        setTransform: setTransform,
        onFailureRef: onFailureRef,
        onSuccessRef: onSuccessRef,
        transformRef: transformRef,
        resource: resource,
        basePath: basePath,
        record: recordToUse,
        redirect: 'edit',
        version: version,
    };
};
export default useCreateNodeController;
