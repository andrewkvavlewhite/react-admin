"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importStar(require("react"));
var merge_1 = __importDefault(require("lodash/merge"));
var react_admin_1 = require("react-admin");
require("codemirror/lib/codemirror.css");
require("@toast-ui/editor/dist/toastui-editor.css");
var react_editor_1 = require("@toast-ui/react-editor");
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
var MarkdownInput = function (_a) {
    var fullWidth = _a.fullWidth, isRequired = _a.isRequired, label = _a.label, options = _a.options, resource = _a.resource, source = _a.source, rest = __rest(_a, ["fullWidth", "isRequired", "label", "options", "resource", "source"]);
    var editorRef = react_1.useRef();
    var _b = react_admin_1.useInput(__assign({ source: source,
        isRequired: isRequired }, rest)).input, onChange = _b.onChange, value = _b.value;
    var handleChange = function (editor) {
        onChange(editor.getMarkdown());
    };
    react_1.useEffect(function () {
        // We have to use the addHook function of the Editor to catch changes.
        // https://nhn.github.io/tui.editor/latest/ToastUIEditor#addHook
        // This effect will be triggered only one time when the Editor is rendered.
        if (editorRef && editorRef.current) {
            var instance_1 = editorRef.current.getInstance();
            instance_1.addHook('change', function () { return handleChange(instance_1); });
        }
    }, [editorRef]); // eslint-disable-line react-hooks/exhaustive-deps
    var mergedOptions = merge_1.default({}, defaultOptions, options);
    return (react_1.default.createElement(react_admin_1.Labeled, { label: label, source: source, resource: resource, isRequired: isRequired, fullWidth: fullWidth },
        react_1.default.createElement(react_editor_1.Editor, __assign({ initialValue: value, ref: editorRef }, mergedOptions))));
};
var defaultOptions = {
    previewStyle: 'vertical',
    height: '512px',
    initialEditType: 'wysiwyg',
    useCommandShortcut: true,
};
MarkdownInput.defaultProps = {
    fullWidth: true,
    options: defaultOptions,
};
exports.default = MarkdownInput;
