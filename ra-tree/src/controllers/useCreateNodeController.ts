import { useEffect, useCallback } from 'react';
// @ts-ignore
import inflection from 'inflection';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    useCheckMinimumRequiredProps,
    useNotify,
    useRedirect,
    useSaveModifiers,
    useTranslate,
    useVersion,
    CREATE,
    FETCH_END,
    CreateProps,
    Identifier,
    Record,
    CreateControllerProps,
} from 'react-admin';

import { useAddRootNode, useAddChildNode } from '../dataProvider';
import {
    CRUD_ADD_ROOT_NODE,
    CRUD_ADD_CHILD_NODE,
    CREATE_RECORD_FROM_NODE,
    ADD_UNSAVED_ROOT_NODE,
    REMOVE_UNSAVED_ROOT_NODE,
    ADD_UNSAVED_CHILD_NODE,
    REMOVE_UNSAVED_CHILD_NODE,
} from '../actions';

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
const useCreateNodeController = (props: CreateProps): CreateControllerProps => {
    useCheckMinimumRequiredProps('Create', ['basePath', 'resource'], props);
    const {
        basePath,
        resource,
        record = {},
        onSuccess,
        onFailure,
        transform,
    } = props;

    const location = useLocation<{ parentId: Identifier; record: Record }>();
    const parentId = location.state && location.state.parentId;
    const isChild = typeof parentId !== 'undefined';
    const recordToUse = (location.state && location.state.record) || record;

    const [createRoot, { loading: savingRoot }] = useAddRootNode(resource);
    const [createChild, { loading: savingChild }] = useAddChildNode(resource);
    const create = isChild ? createChild : createRoot;
    const saving = isChild ? savingChild : savingRoot;
    const action = isChild ? CRUD_ADD_CHILD_NODE : CRUD_ADD_ROOT_NODE;

    const dispatch = useDispatch();

    // show a local new node in the tree on mount, remove it on unmount
    useEffect(() => {
        if (isChild) {
            dispatch({
                type: ADD_UNSAVED_CHILD_NODE,
                payload: { parentId },
                meta: { resource },
            });
            return (): void =>
                dispatch({
                    type: REMOVE_UNSAVED_CHILD_NODE,
                    payload: { parentId },
                    meta: { resource },
                });
        } else {
            dispatch({ type: ADD_UNSAVED_ROOT_NODE, meta: { resource } });
            return (): void =>
                dispatch({
                    type: REMOVE_UNSAVED_ROOT_NODE,
                    meta: { resource },
                });
        }
    }, [parentId, isChild, resource, dispatch]);

    const {
        onSuccessRef,
        setOnSuccess,
        onFailureRef,
        setOnFailure,
        transformRef,
        setTransform,
    } = useSaveModifiers({ onSuccess, onFailure, transform });

    const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();

    const save = useCallback(
        (
            data: Partial<Record>,
            redirectTo = 'edit',
            {
                onSuccess: onSuccessFromSave,
                onFailure: onFailureFromSave,
                transform: transformFromSave,
            } = {}
        ) =>
            Promise.resolve(
                transformFromSave
                    ? transformFromSave(data)
                    : transformRef.current
                    ? transformRef.current(data)
                    : data
            ).then(data => {
                const payload = isChild ? { data, parentId } : { data };
                return create(
                    { payload },
                    {
                        action,
                        onSuccess: onSuccessFromSave
                            ? onSuccessFromSave
                            : onSuccessRef.current
                            ? onSuccessRef.current
                            : ({ data: newNode }): void => {
                                  dispatch({
                                      type: CREATE_RECORD_FROM_NODE,
                                      payload: { data: newNode, parentId },
                                      meta: {
                                          resource,
                                          fetchResponse: CREATE,
                                          fetchStatus: FETCH_END,
                                      },
                                  });
                                  notify('ra.notification.created', 'info', {
                                      smart_count: 1,
                                  });
                                  redirect(
                                      redirectTo,
                                      basePath,
                                      newNode.id,
                                      newNode
                                  );
                              },
                        onFailure: onFailureFromSave
                            ? onFailureFromSave
                            : onFailureRef.current
                            ? onFailureRef.current
                            : (error): void => {
                                  notify(
                                      typeof error === 'string'
                                          ? error
                                          : error.message ||
                                                'ra.notification.http_error',
                                      'warning'
                                  );
                              },
                    }
                );
            }),
        [
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
        ]
    );

    const resourceName = translate(`resources.${resource}.name`, {
        smart_count: 1,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    const defaultTitle = translate('ra.page.create', {
        name: `${resourceName}`,
    });

    const version = useVersion();

    return {
        loading: false,
        loaded: true,
        saving,
        defaultTitle,
        save,
        setOnSuccess,
        setOnFailure,
        setTransform,
        onFailureRef,
        onSuccessRef,
        transformRef,
        resource,
        basePath,
        record: recordToUse,
        redirect: 'edit',
        version,
    };
};

export default useCreateNodeController;
