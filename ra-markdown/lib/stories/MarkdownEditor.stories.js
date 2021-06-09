"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MDEditor = void 0;
var react_1 = __importStar(require("react"));
require("codemirror/lib/codemirror.css");
require("@toast-ui/editor/dist/toastui-editor.css");
var react_editor_1 = require("@toast-ui/react-editor");
exports.default = { title: 'ra-markdown/MarkdownEditor' };
exports.MDEditor = function () {
    var _a = react_1.useState('Start a Markdown text'), valueMD = _a[0], setValueMD = _a[1];
    var _b = react_1.useState(valueMD), valueHTML = _b[0], setValueHTML = _b[1];
    var editorRef = react_1.useRef();
    var handleChange = function (editor) {
        setValueMD(editor.getMarkdown());
        setValueHTML(editor.getHtml());
    };
    react_1.useEffect(function () {
        if (editorRef && editorRef.current) {
            var instance_1 = editorRef.current.getInstance();
            instance_1.addHook('change', function () { return handleChange(instance_1); });
        }
    }, [editorRef]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_editor_1.Editor, { initialValue: valueMD, previewStyle: "vertical", height: "600px", initialEditType: "wysiwyg", useCommandShortcut: true, ref: editorRef }),
        react_1.default.createElement("h3", null, "Markdown Value"),
        react_1.default.createElement("p", null, valueMD),
        react_1.default.createElement("h3", null, "HTML Value"),
        react_1.default.createElement("p", null, valueHTML)));
};
