import React, {
    isValidElement,
    cloneElement,
    ReactNode,
    ReactElement,
    FC,
} from 'react';
import { Form, FormProps } from 'react-final-form';
import {
    Record,
    Identifier,
    ExpandRowButton,
    useDatagridStyles,
} from 'react-admin';
import { TableRow, TableCell, Checkbox, makeStyles } from '@material-ui/core';

import SaveRowButton from './buttons/SaveRowButton';
import CancelEditButton from './buttons/CancelEditButton';

/**
 * A form to be rendered as a table row in an <EditableDatagrid>.
 *
 * All the props it expects are injected by <EditableDatagrid>. You should only
 * provide children to be rendered in each table cell.
 *
 * The children should be Input components, just like in a <SimpleForm>. You
 * can also pass a <Field> component as child.
 *
 * <RowForm> should have as many children as the <EditableDatagrid> that calls
 * it, or there will be a colSpan issue.
 *
 * @example
 *
 *     const ArtistForm: FC = props => (
 *         <RowForm {...props}>
 *             <TextField source="id" />
 *             <TextInput source="firstname" validate={required()} />
 *             <TextInput source="name" validate={required()} />
 *             <DateInput source="dob" label="born" validate={required()} />
 *             <SelectInput
 *                 source="prof"
 *                 label="Profession"
 *                 choices={professionChoices}
 *             />
 *         </RowForm>
 *     );
 *
 * @see EditableDatagrid
 */
const RowForm: FC<RowFormProps & Omit<FormProps, 'onSubmit'>> = props => {
    const {
        children,
        record,
        id,
        className,
        quitEditMode,
        expand,
        hasBulkActions,
        initialValues,
        selectable,
        basePath,
        resource,
        save,
        saving,
        selected,
        undoable,
        ...rest
    } = props;
    const classes = useStyles(props);

    // handle submit by enter
    const onKeyDown = handleSubmit => (
        evt: React.KeyboardEvent<HTMLDivElement>
    ): void => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            evt.stopPropagation();
            handleSubmit();
            quitEditMode();
        }
    };

    return (
        <Form
            initialValues={{ ...initialValues, ...record }}
            onSubmit={save}
            {...rest}
        >
            {({ handleSubmit, invalid, dirty }): ReactElement => (
                <TableRow
                    className={className}
                    key={id}
                    onKeyDown={onKeyDown(handleSubmit)}
                >
                    {expand && (
                        <TableCell padding="none">
                            <ExpandRowButton
                                classes={rest.classes}
                                expanded={false}
                                disabled
                            />
                        </TableCell>
                    )}
                    {hasBulkActions && (
                        <TableCell padding="checkbox">
                            {selectable && (
                                <Checkbox
                                    color="primary"
                                    checked={selected}
                                    disabled
                                />
                            )}
                        </TableCell>
                    )}
                    {React.Children.map(children, (field, index) =>
                        isValidElement(field) ? (
                            <TableCell
                                key={index}
                                className={field.props.cellClassName}
                                align={field.props.textAlign}
                            >
                                {cloneElement(field, {
                                    record,
                                    basePath: field.props.basePath || basePath,
                                    resource,
                                })}
                            </TableCell>
                        ) : null
                    )}
                    <TableCell className={classes.actionColumn}>
                        <SaveRowButton
                            dirty={dirty}
                            handleSubmit={handleSubmit}
                            invalid={invalid}
                            quitEditMode={quitEditMode}
                            saving={saving}
                            undoable={undoable}
                        />
                        <CancelEditButton cancel={quitEditMode} />
                    </TableCell>
                </TableRow>
            )}
        </Form>
    );
};

export interface RowFormProps {
    record?: Record;
    quitEditMode?: () => void;
    children: ReactNode;
    className?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    id?: Identifier;
    expand?: boolean;
    hasBulkActions?: boolean;
    selectable?: boolean;
    selected?: boolean;
    basePath?: string;
    resource?: string;
    undoable?: boolean;
    save?: (data: Partial<Record>) => void;
    saving?: boolean;
}

const useStyles = makeStyles(
    {
        actionColumn: {
            whiteSpace: 'nowrap',
            width: '5em',
        },
    },
    {
        name: 'RaRowForm',
    }
);

export default RowForm;
