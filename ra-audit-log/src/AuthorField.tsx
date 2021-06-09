import * as React from 'react';
import { ReactElement } from 'react';
import {
    ClassesOverride,
    FieldProps,
    LinkToType,
    ReferenceField,
    TextField,
    useRecordContext,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { EventRecord } from './types';
import { AvatarField } from './AvatarField';

/**
 * A react-admin field which displays the author of an event with its avatar if available.
 */
export const AuthorField = (props: AuthorFieldProps): ReactElement => {
    const {
        authorResource,
        className,
        classes: classesOverride,
        link,
        source,
        ...rest
    } = props;
    const classes = useStyles(props);
    const record = useRecordContext<EventRecord>(props);

    if (authorResource) {
        return (
            <ReferenceField
                source="author.id"
                reference={authorResource}
                link={link}
                {...rest}
            >
                <AuthorField />
            </ReferenceField>
        );
    }

    return record ? (
        <div className={classnames(classes.root, className)}>
            <AvatarField
                source="avatar"
                record={record.author ? record.author : record}
                className={classes.small}
            />
            <TextField
                source="fullName"
                {...rest}
                record={record.author ? record.author : record}
            />
        </div>
    ) : null;
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    small: {
        display: 'inline-flex',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1),
    },
}));

AuthorField.defaultProps = {
    addLabel: true,
};

interface AuthorFieldProps extends FieldProps<EventRecord> {
    authorResource?: string;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    link?: LinkToType;
}
