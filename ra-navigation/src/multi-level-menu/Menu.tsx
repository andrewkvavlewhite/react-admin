import * as React from 'react';
import { FC } from 'react';
import classnames from 'classnames';
import List, { ListProps } from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

export const Menu: FC<ListProps> = ({ className, ...props }) => {
    const classes = useStyles();

    return (
        <List
            className={classnames(classes.root, className)}
            disablePadding
            {...props}
            {...props}
        />
    );
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
});
