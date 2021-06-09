import React, { useRef, useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export default { title: 'ra-markdown/MarkdownEditor' };
export var MDEditor = function () {
    var _a = useState('Start a Markdown text'), valueMD = _a[0], setValueMD = _a[1];
    var _b = useState(valueMD), valueHTML = _b[0], setValueHTML = _b[1];
    var editorRef = useRef();
    var handleChange = function (editor) {
        setValueMD(editor.getMarkdown());
        setValueHTML(editor.getHtml());
    };
    useEffect(function () {
        if (editorRef && editorRef.current) {
            var instance_1 = editorRef.current.getInstance();
            instance_1.addHook('change', function () { return handleChange(instance_1); });
        }
    }, [editorRef]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Editor, { initialValue: valueMD, previewStyle: "vertical", height: "600px", initialEditType: "wysiwyg", useCommandShortcut: true, ref: editorRef }),
        React.createElement("h3", null, "Markdown Value"),
        React.createElement("p", null, valueMD),
        React.createElement("h3", null, "HTML Value"),
        React.createElement("p", null, valueHTML)));
};
