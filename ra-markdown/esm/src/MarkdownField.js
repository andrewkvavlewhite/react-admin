/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Labeled, useRecordContext } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
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
var MarkdownField = function (props) {
    var classes = useStyles(props);
    var label = props.label, source = props.source, resource = props.resource;
    var record = useRecordContext(props);
    return (React.createElement(Labeled, { className: classes.root, label: label, source: source, resource: resource },
        React.createElement(Viewer, { initialValue: record[source] })));
};
MarkdownField.defaultProps = {
    fullWidth: true,
};
export default MarkdownField;
var useStyles = makeStyles(function (theme) { return ({
    root: {
        '& .tui-editor-contents p, .tui-editor-contents ul, .tui-editor-contents menu, .tui-editor-contents ol, .tui-editor-contents dir': {
            color: theme.palette.text.primary,
        },
        '& .tui-editor-contents pre': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        },
        '& .tui-editor-contents a': {
            color: theme.palette.type === 'light'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
        },
    },
}); }, {
    name: 'RaMarkdownField',
});
