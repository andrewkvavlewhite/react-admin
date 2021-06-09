/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC } from 'react';
import { Record, Labeled, useRecordContext } from 'react-admin';

import { makeStyles } from '@material-ui/core';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

export interface Props extends Partial<React.ComponentProps<typeof Viewer>> {
    source: string;
    record?: Record;
    resource?: string;
    label?: string;
    fullWidth?: boolean;
}

/**
 * An Field component for markdown content
 *
 * @example
 *
 *    import { Show, SimpleLayout, TextField } from 'react-admin';
 *    import { MarkdownField } from '@react-admin/ra-markdown';
 *
 *    const PostShow = props => (
 *        <Show {...props}>
 *            <SimpleLayout>
 *                <TextField source="title" />
 *                <MarkdownField source="description" />
 *            </SimpleLayout>
 *        </Show>
 *    );
 *
 * Based on the '@toast-ui/react-editor' package.
 */
const MarkdownField: FC<Props> = props => {
    const classes = useStyles(props);
    const { label, source, resource } = props;
    const record = useRecordContext(props);

    return (
        <Labeled
            className={classes.root}
            label={label}
            source={source}
            resource={resource}
        >
            <Viewer initialValue={record[source]} />
        </Labeled>
    );
};

MarkdownField.defaultProps = {
    fullWidth: true,
};

export default MarkdownField;

const useStyles = makeStyles(
    theme => ({
        root: {
            '& .tui-editor-contents p, .tui-editor-contents ul, .tui-editor-contents menu, .tui-editor-contents ol, .tui-editor-contents dir': {
                color: theme.palette.text.primary,
            },
            '& .tui-editor-contents pre': {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            },
            '& .tui-editor-contents a': {
                color:
                    theme.palette.type === 'light'
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
            },
        },
    }),
    {
        name: 'RaMarkdownField',
    }
);
