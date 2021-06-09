import * as React from 'react';
import { cloneElement, isValidElement, ReactElement } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { DataNode } from 'rc-tree/lib/interface';
import { NodeActionsProps } from './NodeActions';

const NodeTitle = ({ data, nodeActions }: NodeTitleProps): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1">{data.title}</Typography>
            {isValidElement(nodeActions) &&
                cloneElement<any>(nodeActions, {
                    className: classes.menuButton,
                    data,
                })}
        </div>
    );
};

export interface NodeTitleProps {
    data: DataNode;
    nodeActions?: ReactElement<NodeActionsProps>;
}

export default NodeTitle;

const useStyles = makeStyles({
    root: {
        position: 'relative',
        '&:hover': {
            '& $menuButton': {
                opacity: 1,
            },
        },
    },
    menuButton: {
        opacity: 0,
    },
});
