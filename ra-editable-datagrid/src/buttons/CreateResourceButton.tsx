import React, { FC, ComponentProps } from 'react';
import { useGetResourceLabel, useTranslate } from 'react-admin';
import { Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type Props = ComponentProps<typeof Button> & {
    resource: string;
};

const CreateResourceButton: FC<Props> = ({ resource, ...props }) => {
    const translate = useTranslate();
    const getResourceLabel = useGetResourceLabel();
    const singularResourceName = getResourceLabel(resource, 1);

    const label = translate('ra.page.create', { name: singularResourceName });

    return (
        <Tooltip title={label}>
            <Button size="small" color="primary" aria-label={label} {...props}>
                <AddIcon />
                {label}
            </Button>
        </Tooltip>
    );
};

export default CreateResourceButton;
