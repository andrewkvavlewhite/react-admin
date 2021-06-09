"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecordEvents = void 0;
var react_admin_1 = require("react-admin");
// We just need this function to properly type the result of useRecordEvents
var useGetListOfEventRecord = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return react_admin_1.useGetList.apply(void 0, args);
};
/**
 * A hook to fetch the events related to a record.
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from store], ids: [ids from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * @param options The hook options
 * @param options.record Optional. The record for which to fetch the events. Will be inferred from the RecordContext if not provided
 * @param options.resource Optional. The resource of the record. Will be inferred from the ResourceContext if not provided
 * @param options.eventResource Optional. The resource for the events. Defaults to `events`
 * @param options.page Optional. The page of events to fetch. Defaults to 1
 * @param options.perPage Optional. The number of events to fetch. Defaults to 25
 * @param options.sort Optional. The field used to sort the events. Defaults to `date`
 * @param options.order Optional. The order into which to sort the events. Defaults to `DESC`
 * @returns The same object as the `useGetList` hook.
 */
exports.useRecordEvents = function (options) {
    var record = react_admin_1.useRecordContext(options);
    var resource = react_admin_1.useResourceContext(options);
    var _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.perPage, perPage = _b === void 0 ? 25 : _b, _c = options.sort, field = _c === void 0 ? 'date' : _c, _d = options.order, order = _d === void 0 ? 'DESC' : _d, _e = options.eventResource, eventResource = _e === void 0 ? 'events' : _e;
    return useGetListOfEventRecord(eventResource, {
        page: page,
        perPage: perPage,
    }, {
        field: field,
        order: order,
    }, {
        resource: resource,
        payload: {
            data: {
                id: record === null || record === void 0 ? void 0 : record.id,
            },
        },
    }, {
        enabled: !!record,
    });
};
