import React, { FC } from 'react';
import { Record } from 'react-admin';
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
declare const MarkdownField: FC<Props>;
export default MarkdownField;
