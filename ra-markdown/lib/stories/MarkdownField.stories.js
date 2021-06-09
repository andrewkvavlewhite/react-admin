"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDark = exports.Simple = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ra_test_1 = require("ra-test");
var core_1 = require("@material-ui/core");
var MarkdownField_1 = __importDefault(require("../src/MarkdownField"));
exports.default = { title: 'ra-markdown/MarkdownField' };
var record = {
    id: 123,
    body: "\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Some footnote text.\n\nTables can look like this:\n\nName           Size  Material      Color\n------------- -----  ------------  ------------\nAll Business      9  leather       brown\nRoundabout       10  hemp canvas   natural\nCinderella       11  glass         transparent\n\nTable: Shoes sizes, materials, and colors.\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nKeyword   Text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\n\noranges\n  : Citrus!\n\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm and  its definition to spread things out more.)\n\nHere's a \"line block\" (note how whitespace is honored):\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](https://marmelab.com/react-admin/assets/lego.svg \"An exemplary image\")\n\nHere's a code block:\n\n```js\nconst Component = props => {\n    console.log('Debug');\n    return (\n        <div {...props}>\n            Hello world!\n        </div>\n    );\n};\n```\n\nHere's a list:\n\n* item 1\n* item 2\n* item 3\n\n1. item 1\n2. item 1\n3. item 1\n",
};
exports.Simple = function () { return (react_1.default.createElement(ra_test_1.TestContext, { initialState: initialState },
    react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(react_admin_1.SimpleShowLayout, { resource: "posts", record: record },
                react_1.default.createElement(MarkdownField_1.default, { label: "Body", source: "body" })))))); };
exports.SimpleDark = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    react_1.default.createElement(exports.Simple, null))); };
var initialState = {
    admin: {
        resources: {
            posts: {
                data: { 7: { id: 7 } },
            },
        },
    },
};
