"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
require("codemirror/lib/codemirror.css");
require("@toast-ui/editor/dist/toastui-editor.css");
var react_editor_1 = require("@toast-ui/react-editor");
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
    var record = react_admin_1.useRecordContext(props);
    return (react_1.default.createElement(react_admin_1.Labeled, { className: classes.root, label: label, source: source, resource: resource },
        react_1.default.createElement(react_editor_1.Viewer, { initialValue: record[source] })));
};
MarkdownField.defaultProps = {
    fullWidth: true,
};
exports.default = MarkdownField;
var useStyles = core_1.makeStyles(function (theme) { return ({
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
