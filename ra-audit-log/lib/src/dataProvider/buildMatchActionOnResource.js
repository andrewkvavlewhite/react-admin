"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMatchActionOnResource = void 0;
var constants_1 = require("../constants");
var options_1 = require("./options");
/**
 * Returns a function which will returns a boolean indicating a combination of a resource and action matches the targets provided.
 * Used by the `addEventsForMutations` function to determine whether an audit log should be created for a call to the dataProvider.
 * @param resources: An array of resource matching options
 * ^see addAuditLogs
 * ^see AddAuditLogResourceOptions
 */
exports.buildMatchActionOnResource = function (options) {
    if (options === void 0) { options = options_1.DefaultOptions; }
    var _a = options.name, eventsResource = _a === void 0 ? constants_1.DefaultAuditLogResource : _a, resources = options.resources;
    return function (action, resource) {
        if (typeof resource !== 'string' || resource === eventsResource) {
            return false;
        }
        if (resources == undefined) {
            return mutationsActions.includes(action);
        }
        var resourceOption = resources.find(function (resourceOption) {
            return (Array.isArray(resourceOption) &&
                resourceOption[0] === resource) ||
                resourceOption === resource;
        });
        if (!resourceOption) {
            return false;
        }
        if (typeof resourceOption === 'string') {
            return mutationsActions.includes(action);
        }
        if (resourceOption[1].includes(action)) {
            return true;
        }
        return false;
    };
};
var mutationsActions = [
    'create',
    'delete',
    'deleteMany',
    'update',
    'updateMany',
];
