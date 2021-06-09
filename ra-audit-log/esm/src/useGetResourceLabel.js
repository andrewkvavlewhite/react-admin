import inflection from 'inflection';
import { useSelector } from 'react-redux';
import { getResources, useTranslate } from 'react-admin';
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
export var useGetResourceLabel = function () {
    var resources = useSelector(getResources);
    var translate = useTranslate();
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
                : inflection.humanize(count > 1
                    ? inflection.pluralize(resource)
                    : inflection.singularize(resource)),
        });
        return label;
    };
};
