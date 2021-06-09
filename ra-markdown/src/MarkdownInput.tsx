/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, useEffect, useRef, RefObject } from 'react';
import merge from 'lodash/merge';
import { Labeled, useInput } from 'react-admin';

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
const MarkdownInput: FC<Props> = ({
    fullWidth,
    isRequired,
    label,
    options,
    resource,
    source,
    ...rest
}) => {
    const editorRef: RefObject<Editor> = useRef();

    const {
        input: { onChange, value },
    } = useInput({
        source,
        isRequired,
        ...rest,
    });

    const handleChange = editor => {
        onChange(editor.getMarkdown());
    };

    useEffect(() => {
        // We have to use the addHook function of the Editor to catch changes.
        // https://nhn.github.io/tui.editor/latest/ToastUIEditor#addHook
        // This effect will be triggered only one time when the Editor is rendered.
        if (editorRef && editorRef.current) {
            const instance = editorRef.current.getInstance();
            instance.addHook('change', () => handleChange(instance));
        }
    }, [editorRef]); // eslint-disable-line react-hooks/exhaustive-deps

    const mergedOptions = merge({}, defaultOptions, options);

    return (
        <Labeled
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
            fullWidth={fullWidth}
        >
            <Editor initialValue={value} ref={editorRef} {...mergedOptions} />
        </Labeled>
    );
};

const defaultOptions = {
    previewStyle: 'vertical',
    height: '512px',
    initialEditType: 'wysiwyg',
    useCommandShortcut: true,
};

MarkdownInput.defaultProps = {
    fullWidth: true,
    options: defaultOptions,
};

export default MarkdownInput;
