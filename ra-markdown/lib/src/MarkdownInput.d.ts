import React, { FC } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export interface Props extends Partial<React.ComponentProps<typeof Editor>> {
    source: string;
    resource?: string;
    isRequired?: boolean;
    label?: string;
    options?: any;
    fullWidth?: boolean;
}
/**
 * An Input component for markdown content
 *
 * @example
 *
 *    import { Edit, SimpleForm, TextInput } from 'react-admin';
 *    import { MarkdownInput } from '@react-admin/ra-markdown';
 *
 *    const PostEdit = props => (
 *        <Edit {...props}>
 *            <SimpleForm>
 *                <TextInput source="title" />
 *                <MarkdownInput source="description" />
 *            </SimpleForm>
 *        </Edit>
 *    );
 *
 * Based on the '@toast-ui/react-editor' package.
 *
 * @example
 *
 *    const options = {
 *        previewStyle: 'tab',
 *        height: 'auto',
 *        initialEditType: 'markdown',
 *        hideModeSwitch: true,
 *    };
 *    <MarkdownInput source="description" options={options} />
 *
 * The object passed as `options` props is passed to the <Editor> component
 * @see https://nhn.github.io/tui.editor/latest/ToastUIEditor
 */
declare const MarkdownInput: FC<Props>;
export default MarkdownInput;
