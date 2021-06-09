"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getReferenceManyToManyFormField = function (_a) {
    var resource = _a.resource, through = _a.through, reference = _a.reference;
    return "@@ra-many-to-many/" + resource + "/" + through + "/" + reference;
};
exports.default = getReferenceManyToManyFormField;
