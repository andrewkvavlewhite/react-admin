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
exports.groupSearchResultsByResource = void 0;
var inflection = __importStar(require("inflection"));
exports.groupSearchResultsByResource = function (data, translate) {
    var groupedSearchResultItems = data.reduce(function (acc, item) {
        if (!acc[item.type]) {
            var resourceName = translate("resources." + item.type + ".name", {
                smart_count: 2,
                _: inflection.capitalize(inflection.humanize(inflection.pluralize(item.type))),
            });
            acc[item.type] = {
                label: resourceName,
                data: [],
            };
        }
        acc[item.type].data.push(item);
        return acc;
    }, {});
    return Object.keys(groupedSearchResultItems).map(function (key) { return ({
        label: groupedSearchResultItems[key].label,
        data: groupedSearchResultItems[key].data,
    }); });
};
