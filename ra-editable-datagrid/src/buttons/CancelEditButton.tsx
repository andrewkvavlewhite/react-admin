import React, { FC } from 'react';
import { useTranslate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const CancelEditButton: FC<Props> = ({ cancel }) => {
    const translate = useTranslate();
    return (
        <Tooltip
            title={translate('ra.action.cancel', {
                _: 'ra.action.cancel',
            })}
        >
            <IconButton onClick={cancel} size="small">
                <CancelIcon />
            </IconButton>
        </Tooltip>
    );
};

export interface Props {
    cancel: () => void;
}

export default CancelEditButton;
