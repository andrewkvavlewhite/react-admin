import React, {
    cloneElement,
    useCallback,
    FC,
    ReactElement,
    ReactNode,
} from 'react';

import PropTypes from 'prop-types';
import {
    useCreate,
    useNotify,
    useRefresh,
    useDatagridStyles,
    CRUD_CREATE,
    Record,
} from 'react-admin';
import { Route, useHistory } from 'react-router-dom';

const EditableDatagridCreateForm: FC<EditableDatagridCreateFormProps> = ({
    basePath,
    classes,
    expand,
    hasBulkActions,
    resource,
    createForm,
    hasStandaloneCreateForm,
    isStandaloneCreateFormVisible,
    closeStandaloneCreateForm,
}) => {
    const history = useHistory();
    const notify = useNotify();
    const refresh = useRefresh();
    const [create, { loading: saving }] = useCreate(resource, {});

    const hideCreateForm = (): void => {
        if (hasStandaloneCreateForm) {
            closeStandaloneCreateForm();
        } else {
            history.push(basePath);
        }
    };

    const doCreate = useCallback(
        (data: Partial<Record>) =>
            create(
                { payload: { data } },
                {
                    action: CRUD_CREATE,
                    onSuccess: (): void => {
                        notify('ra.notification.created', 'info', {
                            smart_count: 1,
                        });
                        hideCreateForm();
                        refresh();
                    },
                    onFailure: (error): void => {
                        notify(
                            typeof error === 'string'
                                ? error
                                : error.message || 'ra.notification.http_error',
                            'warning'
                        );
                    },
                }
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [create, notify, basePath]
    );

    const createFormElement = cloneElement(createForm, {
        classes,
        expand,
        hasBulkActions,
        id: 'new_record',
        quitEditMode: hideCreateForm,
        record: {},
        resource,
        basePath,
        save: doCreate,
        saving,
        selectable: false,
    });

    if (hasStandaloneCreateForm) {
        // create form triggered by state
        return isStandaloneCreateFormVisible && createFormElement;
    }

    // create form in a route
    return <Route path={`${basePath}/create`}>{createFormElement}</Route>;
};

export interface EditableDatagridCreateFormProps {
    basePath?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    expand?: ReactNode;
    hasBulkActions?: boolean;
    resource?: string;
    createForm?: ReactElement;
    hasStandaloneCreateForm?: boolean;
    isStandaloneCreateFormVisible: boolean;
    closeStandaloneCreateForm: () => void;
}

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
