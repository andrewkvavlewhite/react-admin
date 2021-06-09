import React, { ReactElement, FC } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    useTranslate,
    useListContext,
    getFieldLabelTranslationArgs,
} from 'react-admin';
import classnames from 'classnames';

import usePreferences from '../usePreferences';

const SelectColumnsMenu: FC<SelectColumnsMenuProps> = ({
    preference,
    columns,
    className,
}) => {
    const classes = useStyles();
    const [columnsPref, setColumnsPref] = usePreferences(
        preference,
        Object.keys(columns)
    );
    const translate = useTranslate();
    const { resource } = useListContext();

    const addColumn = (event): void => {
        setColumnsPref(
            Object.keys(columns).filter(
                name => name === event.target.name || columnsPref.includes(name)
            )
        );
    };

    const removeColumn = (event): void => {
        // always leave at least one column
        if (columnsPref.length > 1) {
            setColumnsPref(
                columnsPref.filter(name => name !== event.target.name)
            );
        }
    };

    return (
        <div className={classnames(classes.columnsContainer, className)}>
            {Object.keys(columns).map(name => (
                <div key={name}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={name}
                                checked={columnsPref.includes(name)}
                                onClick={
                                    columnsPref.includes(name)
                                        ? removeColumn
                                        : addColumn
                                }
                            />
                        }
                        label={translate(
                            ...getFieldLabelTranslationArgs({
                                label: columns[name].props.label,
                                resource,
                                source: name,
                            })
                        )}
                    />
                </div>
            ))}
        </div>
    );
};

export interface SelectColumnsMenuProps {
    preference: string;
    columns: {
        [key: string]: ReactElement;
    };
    className?: string;
}

export default SelectColumnsMenu;

const useStyles = makeStyles(theme => ({
    columnsContainer: {
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
}));
