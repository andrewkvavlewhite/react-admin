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
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var useReferenceManyToManyInputController_1 = __importDefault(require("./useReferenceManyToManyInputController"));
var constants_1 = require("./constants");
/**
 * Allows to edit reference records through a relations table.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Allowing to pick the tags of a post using a SelectArrayInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <SelectArrayInput optionText="name" />
 *  </ReferenceManyToManyInput>
 *
 * @example Allowing to pick the tags of a post using a CheckboxGroupInput
 *  <ReferenceManyToManyInput
 *      label="Posts"
 *      reference="posts"
 *      through="posts_tags"
 *      using={['tag_id', 'post_id']}
 *  >
 *      <CheckboxGroupInput optionText="name" />
 *  </ReferenceManyToManyInput>
 */
var ReferenceManyToManyInput = function (_a) {
    var basePath = _a.basePath, children = _a.children, className = _a.className, idOverride = _a.id, format = _a.format, label = _a.label, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, parse = _a.parse, perPage = _a.perPage, record = _a.record, reference = _a.reference, sort = _a.sort, _b = _a.source, source = _b === void 0 ? 'id' : _b, through = _a.through, using = _a.using, validate = _a.validate, props = __rest(_a, ["basePath", "children", "className", "id", "format", "label", "onBlur", "onChange", "onFocus", "parse", "perPage", "record", "reference", "sort", "source", "through", "using", "validate"]);
    if (!using.match(constants_1.UsingRegexp)) {
        throw new Error('<ReferenceManyToManyInput> incorrect `using` props format. `using` should be a string of two fields separated by a comma such as `book_id,author_id`');
    }
    var _c = react_admin_1.useInput({
        id: idOverride,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        source: source,
        validate: validate,
        parse: parse,
        format: format,
    }), id = _c.id, isRequired = _c.isRequired;
    var _d = useReferenceManyToManyInputController_1.default({
        basePath: basePath,
        record: record,
        filter: props.filter,
        perPage: perPage,
        resource: props.resource,
        reference: reference,
        through: through,
        source: source,
        sort: sort,
        using: using,
        validate: validate,
    }), error = _d.error, loading = _d.loading, loaded = _d.loaded, choices = _d.choices, referenceManyToManyProps = __rest(_d, ["error", "loading", "loaded", "choices"]);
    var translate = react_admin_1.useTranslate();
    var translatedLabel = translate(label || "resources." + props.resource + ".fields." + source, { _: label });
    if (error) {
        return react_1.default.createElement(core_1.Typography, { color: "error" }, error.message);
    }
    var childProps = __assign(__assign(__assign({}, props), { resource: reference, basePath: "/" + reference, choices: choices,
        id: id, input: referenceManyToManyProps.input, isRequired: isRequired, label: translatedLabel, loading: loading,
        loaded: loaded, meta: __assign(__assign({}, referenceManyToManyProps.meta), { helperText: false }), translateChoice: false, limitChoicesToValue: true }), children.props);
    return react_1.cloneElement(react_1.Children.only(children), childProps);
};
ReferenceManyToManyInput.defaultProps = {
    sort: {
        field: 'id',
        order: 'DESC',
    },
};
exports.default = ReferenceManyToManyInput;
