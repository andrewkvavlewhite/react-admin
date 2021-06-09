import * as React from 'react';
import { Children, cloneElement, FC, ReactElement } from 'react';
import { Route } from 'react-router';
import {
    useCreateController,
    useRedirect,
    CreateProps,
    CreateContextProvider,
} from 'react-admin';
import { Dialog, DialogProps } from '@material-ui/core';
import FormDialogTitle from './FormDialogTitle';

export interface CreateDialogProps
    extends Omit<CreateProps, 'classes'>,
        Omit<DialogProps, 'open' | 'id' | 'title'> {
    children?: ReactElement;
}

/**
 * A component which displays a creation form inside a dialog.
 *
 * @param {CreateDialogProps} props
 * @param {string} props.title The dialog's title. It accepts a translation key.
 *
 * @example
 * const PostList = props => (
 *     <>
 *         <List {...props}>
 *             <Datagrid>
 *                 ...
 *             </Datagrid>
 *         </List>
 *         <CreateDialog {...props}>
 *             <SimpleForm>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </SimpleForm>
 *         </CreateDialog>
 *     </>
 * );
 */
const CreateDialog: FC<CreateDialogProps> = (props): ReactElement => {
    const { basePath } = props;

    return (
        <Route path={`${basePath}/create`}>
            {/*
                We use the children render prop so that the component is always rendered.
                This ensures the animation when opening/closing the modal works
            */}
            {({ match }): ReactElement => (
                <CreateDialogView open={!!match} {...props} />
            )}
        </Route>
    );
};

interface CreateDialogViewProps extends CreateDialogProps {
    children?: ReactElement;
    open: boolean;
}

const CreateDialogView = ({
    children,
    open,
    title,
    ...props
}: CreateDialogViewProps): ReactElement => {
    const controllerProps = useCreateController(props as CreateProps);
    const redirect = useRedirect();
    const {
        basePath,
        defaultTitle,
        record,
        redirect: redirectTo,
        resource,
        save,
        saving,
        version,
    } = controllerProps;

    const handleClose = (): void => {
        redirect(basePath);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="create-dialog-title"
            onClose={handleClose}
            {...sanitizeRestProps(props)}
        >
            <FormDialogTitle
                id="create-dialog-title"
                title={title}
                defaultTitle={defaultTitle}
                record={record}
                onClose={handleClose}
            />
            <CreateContextProvider value={controllerProps}>
                {cloneElement(Children.only(children), {
                    basePath,
                    record,
                    redirect:
                        typeof children.props.redirect === 'undefined'
                            ? redirectTo
                            : children.props.redirect,
                    resource,
                    save,
                    saving,
                    version,
                })}
            </CreateContextProvider>
        </Dialog>
    );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const sanitizeRestProps = ({
    basePath = null,
    hasCreate = null,
    hasEdit = null,
    hasList = null,
    hasShow = null,
    history = null,
    loaded = null,
    loading = null,
    location = null,
    match = null,
    onFailure = null,
    onSuccess = null,
    options = null,
    permissions = null,
    transform = null,
    ...rest
}): any => rest;
/* eslint-enable @typescript-eslint/no-unused-vars */

export default CreateDialog;
