"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventLabel = void 0;
var react_admin_1 = require("react-admin");
var useGetResourceLabel_1 = require("./useGetResourceLabel");
/**
 * Returns a translated label for an event.
 * @param options The hook options
 * @param options.record Optional. The event record. Uses the record from the RecordContext if not provided.
 * @param options.variant Optional. Either 'full', 'inline' or 'short'.
 * @param options.pluralizeResource Optional. A boolean indicating whether to pluralize the resource name.
 */
exports.useEventLabel = function (options) {
    var _a = options.variant, variant = _a === void 0 ? 'full' : _a, pluralizeResource = options.pluralizeResource;
    var record = react_admin_1.useRecordContext(options);
    var getResourceLabel = useGetResourceLabel_1.useGetResourceLabel();
    var translate = react_admin_1.useTranslate();
    if (!record) {
        return null;
    }
    var pluralize = pluralizeResource != undefined
        ? pluralizeResource
        : actionPluralOptions[record.action];
    var _b = record.payload, _c = _b.data, data = _c === void 0 ? {} : _c, _d = _b.ids, ids = _d === void 0 ? [] : _d;
    var name = data.name || data.label || data.title || data.reference || data.id;
    var translateOptions = {
        name: name,
        ids: ids.join(', '),
        resource: getResourceLabel(record.resource, pluralize ? 2 : 1).toLowerCase(),
    };
    var label = translate("ra-audit-log." + variantTranslationKeys[variant] + "." + record.resource + "." + record.action, __assign(__assign({}, translateOptions), { 
        // Default generic translation when there is no resource specific translation available
        _: translate("ra-audit-log." + variantTranslationKeys[variant] + "." + record.action, translateOptions) }));
    return label;
};
var variantTranslationKeys = {
    full: 'event',
    inline: 'inline_event',
    short: 'short_event',
};
var actionPluralOptions = {
    create: false,
    delete: false,
    deleteMany: true,
    update: false,
    updateMany: true,
};
