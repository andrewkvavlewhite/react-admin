import React, {
    cloneElement,
    useState,
    useCallback,
    ReactElement,
    ReactNode,
    MouseEvent,
    FC,
} from 'react';
import {
    useUpdate,
    useNotify,
    CRUD_UPDATE,
    Record,
    Identifier,
    DatagridRow,
    useDatagridStyles,
} from 'react-admin';

import { makeStyles } from '@material-ui/core';

import EditableRowContext from './EditableRowContext';

const EditableRow: FC<EditableRowProps> = ({
    form,
    resource,
    id,
    record,
    basePath,
    children,
    rowClick,
    undoable,
    ...rest
}) => {
    const [isEdit, setEdit] = useState(false);
    const classes = useStyles(emptyObject);
    const openEditMode = (): void => {
        setEdit(true);
    };
    const quitEditMode = (): void => {
        setEdit(false);
    };
    const notify = useNotify();
    const [update, { loading: saving }] = useUpdate(
        resource,
        id,
        {}, // set by the caller
        record
    );

    const handleClick = useCallback((event: MouseEvent<HTMLElement>): void => {
        const { tbody, row, column } = getTableClickEventPosition(event);
        openEditMode();
        // once the row is replaced by a form, focus the input inside the cell clicked
        setTimeout(() => {
            // No way to know the markup of the form in advance, as developers
            // can inject a form element of their own. The only valid assumption
            // is that the form should have the same number of columns as the row.
            // So we select the input based on the column it's in.
            const input = tbody.querySelector(
                `tr:nth-child(${row}) td:nth-child(${column}) input`
            ) as HTMLInputElement;
            input && input.focus && input.focus();
        }, 100); // FIXME not super robust
    }, []);

    const save = useCallback(
        (data: Partial<Record>) =>
            update(
                { payload: { data } },
                {
                    action: CRUD_UPDATE,
                    onSuccess: (): void => {
                        notify(
                            'ra.notification.updated',
                            'info',
                            {
                                smart_count: 1,
                            },
                            undoable
                        );
                        if (!undoable) {
                            quitEditMode();
                        }
                    },
                    onFailure: (error): void => {
                        notify(
                            typeof error === 'string'
                                ? error
                                : error.message || 'ra.notification.http_error',
                            'warning'
                        );
                    },
                    undoable,
                }
            ),
        [update, undoable, notify]
    );

    return isEdit ? (
        cloneElement(form, {
            id,
            quitEditMode,
            resource,
            record,
            basePath,
            save,
            saving,
            undoable,
            ...rest,
        })
    ) : (
        <EditableRowContext.Provider value={openEditMode}>
            <DatagridRow
                resource={resource}
                id={id}
                record={record}
                basePath={basePath}
                {...rest}
                className={classes.td}
                onClick={
                    rowClick === 'edit' ? handleClick : (): void => undefined
                }
            >
                {children}
            </DatagridRow>
        </EditableRowContext.Provider>
    );
};

/**
 * Based on a MouseEvent triggered by a click on a table row,
 * get the tbody element, the row and column number of the cell clicked.
 *
 * @param {MouseEvent} event
 */
const getTableClickEventPosition = (
    event: MouseEvent<HTMLElement>
): { tbody: HTMLElement; row: number; column: number } => {
    const target = event.target as HTMLElement;
    const td = target.closest('td');
    const tr = td.parentNode;
    const columns = tr.children as HTMLCollection;
    let column: number;
    for (let index = 0; index < columns.length; index++) {
        if (columns.item(index) === td) {
            column = index + 1;
        }
    }
    const tbody = tr.parentNode as HTMLElement;
    const rows = tbody.children as HTMLCollection;
    let row: number;
    for (let index = 0; index < rows.length; index++) {
        if (rows.item(index) === tr) {
            row = index + 1;
        }
    }
    return { tbody, row, column };
};

export interface EditableRowProps {
    classes?: ReturnType<typeof useDatagridStyles>;
    form: ReactElement;
    resource?: string;
    id?: Identifier;
    record?: Record;
    basePath?: string;
    children?: ReactNode;
    undoable?: boolean;
    rowClick?: string;
    [key: string]: any;
}

const useStyles = makeStyles(
    {
        td: {
            '& td:last-of-type > *': {
                visibility: 'hidden',
            },
            '&:hover td:last-of-type > *': {
                visibility: 'visible',
            },
        },
    },
    {
        name: 'RaEditableDatagridRow',
    }
);

const emptyObject = {};

export default EditableRow;
