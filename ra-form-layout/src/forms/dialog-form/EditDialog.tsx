import * as React from 'react';
import {
    Children,
    cloneElement,
    FC,
    MouseEventHandler,
    ReactElement,
} from 'react';
import { Route, match as Match } from 'react-router';
import {
    EditContextProvider,
    EditProps,
    ResourceMatch,
    useEditController,
    useRedirect,
} from 'react-admin';
import { Dialog, DialogProps } from '@material-ui/core';
import FormDialogTitle from './FormDialogTitle';

export interface EditDialogProps
    extends Omit<EditProps, 'classes'>,
        Omit<DialogProps, 'open' | 'id' | 'title'> {
    children?: ReactElement;
}

/**
 * A component which displays an edition form inside a dialog.
 *
 * @param {EditDialogProps} props
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
 *         <EditDialog {...props}>
 *             <SimpleForm>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </SimpleForm>
 *         </EditDialog>
 *     </>
 * );
 */
const EditDialog: FC<EditDialogProps> = (props): ReactElement => {
    const { basePath } = props;

    return (
        <Route path={`${basePath}/:id`}>
            {/*
                We use the children render prop so that the component is always rendered.
                This ensures the animation when opening/closing the modal works
            */}
            {({ match }): ReactElement => (
                <EditDialogView
                    open={matchesWithValidIdentifier(match)}
                    id={
                        !!match
                            ? decodeURIComponent(
                                  (match as ResourceMatch).params.id
                              )
                            : null
                    }
                    {...props}
                />
            )}
        </Route>
    );
};

const matchesWithValidIdentifier = (match: Match<{ id: string }>): boolean =>
    !!match && !!match?.params?.id && match.params.id !== 'create';

interface EditDialogViewProps extends EditDialogProps {
    children?: ReactElement;
    open: boolean;
    title?: ReactElement | string;
}

const EditDialogView = ({
    open,
    ...props
}: EditDialogViewProps): ReactElement => {
    const redirect = useRedirect();

    const handleClose = (): void => {
        redirect(props.basePath);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="edit-dialog-title"
            onClose={handleClose}
            {...sanitizeRestProps(props)}
        >
            {props.id && props.id !== 'create' ? (
                <EditDialogContentView {...props} onClose={handleClose} />
            ) : null}
        </Dialog>
    );
};

const EditDialogContentView = ({
    children,
    onClose,
    title,
    ...props
}: Omit<EditDialogViewProps, 'open'> & {
    onClose: MouseEventHandler;
}): ReactElement => {
    const controllerProps = useEditController(props as EditProps);
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

    return (
        <>
            <FormDialogTitle
                id="edit-dialog-title"
                title={title}
                defaultTitle={defaultTitle}
                onClose={onClose}
                record={record}
            />
            <EditContextProvider value={controllerProps}>
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
            </EditContextProvider>
        </>
    );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const sanitizeRestProps = ({
    basePath = null,
    hasCreate = null,
    hasEdit = null,
    hasShow = null,
    hasList = null,
    history = null,
    id = null,
    loaded = null,
    loading = null,
    location = null,
    match = null,
    onFailure = null,
    onSuccess = null,
    options = null,
    permissions = null,
    successMessage = null,
    ...rest
}): any => rest;

/* eslint-enable @typescript-eslint/no-unused-vars */

export default EditDialog;
