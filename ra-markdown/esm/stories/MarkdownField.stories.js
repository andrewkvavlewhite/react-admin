/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { SimpleShowLayout } from 'react-admin';
import { TestContext } from 'ra-test';
import { ThemeProvider, createMuiTheme, Card, CardContent, } from '@material-ui/core';
import MarkdownField from '../src/MarkdownField';
export default { title: 'ra-markdown/MarkdownField' };
var record = {
    id: 123,
    body: "\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Some footnote text.\n\nTables can look like this:\n\nName           Size  Material      Color\n------------- -----  ------------  ------------\nAll Business      9  leather       brown\nRoundabout       10  hemp canvas   natural\nCinderella       11  glass         transparent\n\nTable: Shoes sizes, materials, and colors.\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nKeyword   Text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\n\noranges\n  : Citrus!\n\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm and  its definition to spread things out more.)\n\nHere's a \"line block\" (note how whitespace is honored):\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](https://marmelab.com/react-admin/assets/lego.svg \"An exemplary image\")\n\nHere's a code block:\n\n```js\nconst Component = props => {\n    console.log('Debug');\n    return (\n        <div {...props}>\n            Hello world!\n        </div>\n    );\n};\n```\n\nHere's a list:\n\n* item 1\n* item 2\n* item 3\n\n1. item 1\n2. item 1\n3. item 1\n",
};
export var Simple = function () { return (React.createElement(TestContext, { initialState: initialState },
    React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(SimpleShowLayout, { resource: "posts", record: record },
                React.createElement(MarkdownField, { label: "Body", source: "body" })))))); };
export var SimpleDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(Simple, null))); };
var initialState = {
    admin: {
        resources: {
            posts: {
                data: { 7: { id: 7 } },
            },
        },
    },
};
