import React, { useContext, FC } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import ContentCreate from '@material-ui/icons/Create';
import { useTranslate } from 'react-admin';

import EditableRowContext from '../EditableRowContext';

const EditRowButton: FC = () => {
    const openEditMode = useContext(EditableRowContext);
    const translate = useTranslate();

    return (
        <Tooltip title={translate('ra.action.edit', { _: 'ra.action.edit' })}>
            <IconButton
                onClick={openEditMode}
                size="small"
                color="primary"
                aria-label="edit"
            >
                <ContentCreate />
            </IconButton>
        </Tooltip>
    );
};

export default EditRowButton;
