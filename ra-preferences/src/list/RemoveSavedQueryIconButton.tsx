import * as React from 'react';
import { ReactElement, useState } from 'react';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { useTranslate } from 'react-admin';

import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import { RemoveSavedQueryDialog } from './RemoveSavedQueryDialog';

export const RemoveSavedQueryIconButton = (
    props: IconButtonProps
): ReactElement => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const handleConfirmationClose = (): void => {
        setConfirmationOpen(false);
    };

    const handleRemoveQueryClick = (): void => {
        setConfirmationOpen(true);
    };
    const translate = useTranslate();

    return (
        <>
            <IconButton
                aria-label={translate(
                    'ra-preferences.saved_queries.remove_label',
                    {
                        _: 'Remove saved query',
                    }
                )}
                size="small"
                onClick={handleRemoveQueryClick}
                {...props}
            >
                <RemoveIcon />
            </IconButton>

            <RemoveSavedQueryDialog
                open={confirmationOpen}
                onClose={handleConfirmationClose}
            />
        </>
    );
};
