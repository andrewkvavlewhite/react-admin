import * as React from 'react';
import { ReactElement } from 'react';
import { SaveButton, Toolbar as RaToolbar, ToolbarProps } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import DeleteButton from './DeleteButton';

const Toolbar = (props: Omit<ToolbarProps, 'width'>): ReactElement => {
    return (
        <RaToolbar {...props}>
            <InnerToolbar
                alwaysEnableSaveButton={props.alwaysEnableSaveButton}
            />
        </RaToolbar>
    );
};

const valueOrDefault = <T extends unknown = any>(
    value: T,
    defaultValue: T
): T => (typeof value === 'undefined' ? defaultValue : value);

// Required intermediate component because RaToolbar will clone its children and inject props into them
// However, we don't want these props injected on the div used for spacing
const InnerToolbar = (props: ToolbarProps): ReactElement => {
    const {
        alwaysEnableSaveButton,
        basePath,
        handleSubmitWithRedirect,
        handleSubmit,
        invalid,
        pristine,
        record,
        redirect,
        resource,
        saving,
        submitOnEnter,
        undoable,
    } = props;
    const classes = useStyles(props);
    // Use form pristine to enable or disable the save button
    // if alwaysEnableSaveButton is undefined
    const disabled = !valueOrDefault(alwaysEnableSaveButton, !pristine);

    return (
        <div className={classes.defaultToolbar}>
            <SaveButton
                handleSubmitWithRedirect={
                    handleSubmitWithRedirect || handleSubmit
                }
                disabled={disabled}
                invalid={invalid}
                redirect={redirect}
                saving={saving}
                submitOnEnter={submitOnEnter}
            />
            <DeleteButton
                basePath={basePath}
                record={record}
                resource={resource}
                undoable={undoable}
            />
        </div>
    );
};
export default Toolbar;

const useStyles = makeStyles(
    {
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
    },
    { name: 'RaToolbar' }
);
