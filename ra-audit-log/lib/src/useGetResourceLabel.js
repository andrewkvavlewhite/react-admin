"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetResourceLabel = void 0;
var inflection_1 = __importDefault(require("inflection"));
var react_redux_1 = require("react-redux");
var react_admin_1 = require("react-admin");
/**
 * A hook which returns function to get a translated resource name. It will use the label option of the `Resource` component if it was provided.
 *
 * @returns {GetResourceLabel} A function which takes a resource name and an optional number indicating the number of items (used for pluralization) and returns a translated string.
 * @example
 * const Menu = () => {
 *     const resources = useSelector(getResources, shallowEqual);
 *     const getResourceLabel = useGetResourceLabel();
 *
 *     return (
 *         <ul>
 *             {resources.map(resource => (
 *                 <li key={resource.name}>
 *                     {getResourceLabel(resource.name, 2)}
 *                 </li>
 *             ))}
 *         </ul>
 *     )
 * }
 */
exports.useGetResourceLabel = function () {
    var resources = react_redux_1.useSelector(react_admin_1.getResources);
    var translate = react_admin_1.useTranslate();
    return function (resource, count) {
        if (count === void 0) { count = 2; }
        var resourceDefinition = resources.find(function (r) { return (r === null || r === void 0 ? void 0 : r.name) === resource; });
        var label = translate("resources." + resource + ".name", {
            smart_count: count,
            _: resourceDefinition &&
                resourceDefinition.options &&
                resourceDefinition.options.label
                ? translate(resourceDefinition.options.label, {
                    smart_count: count,
                    _: resourceDefinition.options.label,
                })
                : inflection_1.default.humanize(count > 1
                    ? inflection_1.default.pluralize(resource)
                    : inflection_1.default.singularize(resource)),
        });
        return label;
    };
};
