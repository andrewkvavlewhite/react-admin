import * as React from 'react';
import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClassesOverride } from 'react-admin';
import classnames from 'classnames';

export const TimelinePlaceholder = (
    props: TimelinePlaceholderProps
): ReactElement => {
    const { className } = props;
    const classes = useStyles(props);

    // Must be a span because it's used inside a Typography which is a p by default
    return <span className={classnames(classes.root, className)}>&nbsp;</span>;
};

export interface TimelinePlaceholderProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}

const useStyles = makeStyles(
    theme => ({
        root: {
            backgroundColor: theme.palette.grey[400],
            display: 'inline-block',
        },
    }),
    { name: 'RaTimelinePlaceholder' }
);
