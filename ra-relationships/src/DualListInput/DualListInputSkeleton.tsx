import * as React from 'react';
import { ReactElement } from 'react';
import { useTimeout, useTranslate } from 'react-admin';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

export const DualListInputSkeleton = ({
    className,
}: DualListInputSkeletonProps): ReactElement => {
    const translate = useTranslate();
    const classes = useStyles();
    const oneSecondHasPassed = useTimeout(1000);

    if (oneSecondHasPassed) {
        return (
            <div
                aria-disabled="true"
                aria-label={translate('ra.message.loading')}
                className={classnames(className, classes.root)}
            />
        );
    }
    return null;
};

export interface DualListInputSkeletonProps {
    className?: string;
}

const useStyles = makeStyles(
    theme => ({
        root: {
            backgroundColor: theme.palette.divider,
            borderStyle: 'none',
        },
    }),
    {
        name: 'RaDualListInputSkeleton',
    }
);
