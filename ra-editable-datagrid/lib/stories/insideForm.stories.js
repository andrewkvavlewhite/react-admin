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
exports.InsideAForm = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var history_1 = require("history");
var src_1 = require("../src");
var dataProvider_1 = __importDefault(require("./dataProvider"));
exports.default = { title: 'ra-editable-datagrid/Inside a Form' };
var useAsideStyles = core_1.makeStyles({
    root: {
        marginLeft: '1em',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        width: 150,
    },
});
var Aside = function () {
    var classes = useAsideStyles();
    return (react_1.default.createElement("div", { className: classes.root }, "Click on a post to see an Editable datagrid of comments"));
};
var usePostListStyles = core_1.makeStyles({
    root: {
        marginTop: '1em',
    },
});
var PostList = function (props) {
    var classes = usePostListStyles(props);
    return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { aside: react_1.default.createElement(Aside, null), actions: false, className: classes.root }),
        react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
            react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
            react_1.default.createElement(react_admin_1.TextField, { source: "title" }),
            react_1.default.createElement(react_admin_1.DateField, { source: "published_at" }))));
};
var CommentForm = function (props) { return (react_1.default.createElement(src_1.RowForm, __assign({}, props),
    react_1.default.createElement(react_admin_1.TextInput, { source: "author.name", validate: react_admin_1.required() }),
    react_1.default.createElement(react_admin_1.TextInput, { source: "body", validate: react_admin_1.required() }),
    react_1.default.createElement(react_admin_1.DateInput, { source: "created_at", validate: react_admin_1.required() }))); };
var usePostEditStyles = core_1.makeStyles({
    body: {
        maxWidth: '15em',
    },
});
var PostEdit = function (_a) {
    var id = _a.id, props = __rest(_a, ["id"]);
    var classes = usePostEditStyles();
    return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props, { id: id }),
        react_1.default.createElement(react_admin_1.SimpleForm, null,
            react_1.default.createElement(react_admin_1.TextInput, { source: "title", fullWidth: true }),
            react_1.default.createElement(react_admin_1.DateInput, { source: "published_at" }),
            react_1.default.createElement(react_admin_1.ReferenceManyField, { fullWidth: true, label: "Comments", reference: "comments", target: "post_id" },
                react_1.default.createElement(src_1.EditableDatagrid, { undoable: true, createForm: react_1.default.createElement(CommentForm, { initialValues: { post_id: id } }), editForm: react_1.default.createElement(CommentForm, null), rowClick: "edit" },
                    react_1.default.createElement(react_admin_1.TextField, { source: "author.name", label: "Author" }),
                    react_1.default.createElement(react_admin_1.TextField, { source: "body", cellClassName: classes.body }),
                    react_1.default.createElement(react_admin_1.DateField, { source: "created_at" }))))));
};
exports.InsideAForm = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: PostList, edit: PostEdit }),
    react_1.default.createElement(react_admin_1.Resource, { name: "comments" }))); };
