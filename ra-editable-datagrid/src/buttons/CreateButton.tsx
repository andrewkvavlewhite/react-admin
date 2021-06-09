import React, { FC, ComponentProps } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslate } from 'react-admin';

const CreateButton: FC<Pick<
    ComponentProps<typeof IconButton>,
    'onClick'
>> = props => {
    const translate = useTranslate();

    return (
        <Tooltip
            title={translate('ra.action.create', { _: 'ra.action.create' })}
        >
            <IconButton
                size="small"
                color="primary"
                aria-label="create"
                {...props}
            >
                <AddIcon />
                {props.children}
            </IconButton>
        </Tooltip>
    );
};

export default CreateButton;
