import * as React from 'react';
import { ReactElement, useState } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { useTranslate } from 'react-admin';

import AddIcon from '@material-ui/icons/AddCircleOutline';

import { AddSavedQueryDialog } from './AddSavedQueryDialog';

export const AddSavedQueryIconButton = (
    props: IconButtonProps
): ReactElement => {
    const [open, setOpen] = useState(false);
    const handleOpen = (): void => {
        setOpen(true);
    };
    const handleClose = (): void => {
        setOpen(false);
    };
    const translate = useTranslate();

    return (
        <>
            <IconButton
                aria-label={translate(
                    'ra-preferences.saved_queries.new_label',
                    {
                        _: 'Save current query...',
                    }
                )}
                size="small"
                onClick={handleOpen}
                {...props}
            >
                <AddIcon />
            </IconButton>

            <AddSavedQueryDialog open={open} onClose={handleClose} />
        </>
    );
};
