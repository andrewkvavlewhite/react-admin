import React, { FC } from 'react';
import { useTranslate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import ContentSave from '@material-ui/icons/Save';

const SaveRowButton: FC<Props> = ({
    dirty,
    handleSubmit,
    invalid,
    quitEditMode,
    saving,
    undoable,
}) => {
    const translate = useTranslate();

    const onClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        evt.stopPropagation();
        evt.preventDefault();

        if (dirty && invalid) {
            return;
        }

        handleSubmit();

        if (undoable) {
            quitEditMode();
        }
    };

    return (
        <Tooltip
            title={translate('ra.action.save', {
                _: 'ra.action.save',
            })}
        >
            <IconButton
                disabled={saving}
                onClick={onClick}
                size="small"
                color="primary"
            >
                <ContentSave />
            </IconButton>
        </Tooltip>
    );
};

export interface Props {
    dirty: boolean;
    handleSubmit: () => void;
    invalid: boolean;
    quitEditMode?: () => void;
    saving?: boolean;
    undoable?: boolean;
}

export default SaveRowButton;
