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
import { linkToRecord, getResources, useTranslate, useGetResourceLabel, } from 'react-admin';
import { useSelector, shallowEqual } from 'react-redux';
/**
 * Builds a map of paths from a resources array
 *
 * @param {array} resources
 * @param {function} translate
 *
 * The output map is of the following form:
 *
 * {
 *  songs: { label: 'Songs', to: '/songs' },
 *  songs.create: { label: 'Create Song', to: '/songs/create' },
 *  songs.show: {
 *    label: ({ record }) => `Show #${record.id}`,
 *    to: ({ record }) => `/${record.id}/show`
 *  }
 *  songs.edit: {
 *    label: ({ record }) => `Edit #${record.id}`,
 *    to: ({ record }) => `/${record.id}/edit`
 *  }
 * }
 */
export var buildResourcesBreadcrumbPaths = function (resources, translate, getResourceLabel) {
    return resources.reduce(function (paths, resource) {
        var resourcePaths = {};
        var resourceLabelPlural = getResourceLabel(resource.name, 2);
        var resourceLabelSingular = getResourceLabel(resource.name, 1);
        resourcePaths[resource.name] = {
            label: resourceLabelPlural,
            to: "/" + resource.name,
        };
        resourcePaths[resource.name + ".create"] = {
            label: !resource.hasList
                ? translate('ra.page.create', {
                    name: resourceLabelSingular,
                })
                : translate('ra.action.create'),
            to: "/" + resource.name + "/create",
        };
        resourcePaths[resource.name + ".edit"] = {
            label: function (_a) {
                var record = _a.record;
                return !record
                    ? translate('ra.action.edit')
                    : !resource.hasList
                        ? translate('ra.page.edit', {
                            name: resourceLabelSingular,
                            id: record.id,
                            record: record,
                        })
                        : "#" + record.id;
            },
            to: function (_a) {
                var record = _a.record;
                return record &&
                    linkToRecord('/' + resource.name, record.id) + "/edit";
            },
        };
        resourcePaths[resource.name + ".show"] = {
            label: function (_a) {
                var record = _a.record;
                return !record
                    ? translate('ra.action.show')
                    : !resource.hasList
                        ? translate('ra.page.show', {
                            name: resourceLabelSingular,
                            id: record.id,
                            record: record,
                        })
                        : "#" + record.id;
            },
            to: function (_a) {
                var record = _a.record;
                return record &&
                    linkToRecord('/' + resource.name, record.id) + "/show";
            },
        };
        return __assign(__assign({}, paths), resourcePaths);
    }, {});
};
/**
 * This hook is used internally to build a resource breadcrumb path map
 * The result is usually used by <ResourceBreadcrumbItems /> to render a BreadcrumbItem tree from current resources
 *
 * @see ResourceBreadcrumbItems
 */
export var useResourcesBreadcrumbPaths = function (selectedResources) {
    var resources = useSelector(getResources, shallowEqual);
    var getResourceLabel = useGetResourceLabel();
    var translate = useTranslate();
    return buildResourcesBreadcrumbPaths(resources.filter(function (resource) {
        return !selectedResources || selectedResources.includes(resource.name);
    }), translate, getResourceLabel);
};
