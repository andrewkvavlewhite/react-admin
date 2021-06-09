"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useManyToManyReferenceContext = void 0;
var react_1 = require("react");
var ManyToManyReferenceContext_1 = require("./ManyToManyReferenceContext");
/**
 * Hook to get the `ManyToManyReferenceContext`.
 */
exports.useManyToManyReferenceContext = function () {
    var context = react_1.useContext(ManyToManyReferenceContext_1.ManyToManyReferenceContext);
    if (!context) {
        throw new Error("\nCannot get the ManyToManyReferenceContext. Have you wrapped your form with a <ManyToManyReferenceContextProvider>?\n\nFor example:\n\nimport { ManyToManyReferenceContextProvider } from '@react-admin/relationships';\n\n<Edit {...props}>\n    <ManyToManyReferenceContextProvider>\n        <SimpleForm>\n            // ...\n        </SimpleForm>\n    </ManyToManyReferenceContextProvider>\n</Edit>\n");
    }
    return context;
};
