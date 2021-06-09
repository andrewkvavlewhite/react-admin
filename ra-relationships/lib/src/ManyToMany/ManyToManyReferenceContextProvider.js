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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyToManyReferenceContextProvider = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var omit_1 = __importDefault(require("lodash/omit"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_admin_1 = require("react-admin");
var getReferenceManyToManyFormField_1 = __importDefault(require("./getReferenceManyToManyFormField"));
var ManyToManyReferenceContext_1 = require("./ManyToManyReferenceContext");
var useUpdateManyToManyReferences_1 = require("./useUpdateManyToManyReferences");
/**
 * A context provider component needed for `<ReferenceManyToManyInput>`. It
 * should be used inside a `<Create>` or `<Edit>`, wrapping their form child.
 *
 * @example <caption>Example usage</caption>
 * import React from 'react';
 * import {
 *    Edit,
 *    SelectArrayInput,
 *    SimpleForm,
 *    TextInput,
 * } from 'react-admin';
 * import {
 *     ManyToManyReferenceContextProvider,
 *     ReferenceManyToManyInput
 * } from '@react-admin/relationships';
 *
 * const BandEdit = props => (
 *     <Edit {...props}>
 *         <ManyToManyReferenceContextProvider>
 *             <SimpleForm redirect={false}>
 *                 <TextInput source="name" />
 *                 <ReferenceManyToManyInput
 *                     source="id"
 *                     reference="venues"
 *                     through="performances"
 *                     using="band_id,venue_id"
 *                     fullWidth
 *                     label="Performances"
 *                 >
 *                     <SelectArrayInput optionText="name" />
 *                 </ReferenceManyToManyInput>
 *             </SimpleForm>
 *         </ManyToManyReferenceContextProvider>
 *     </Edit>
 * );
 *
 * It provides a context with two functions to register and unregister
 * a many-to-many input. It then replaces the default `save` function provided
 * by either `<Create>` or `<Edit>` and handles the many-to-many resources
 * updates.
 */
exports.ManyToManyReferenceContextProvider = function (_a) {
    var children = _a.children, defaultRedirect = _a.redirect, props = __rest(_a, ["children", "redirect"]);
    var dataProvider = react_admin_1.useDataProvider();
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var record = react_admin_1.useRecordContext(props);
    var resource = react_admin_1.useResourceContext(props);
    var _b = react_admin_1.useSaveContext(props), originalSave = _b.save, onSuccessRef = _b.onSuccessRef, onFailureRef = _b.onFailureRef, transformRef = _b.transformRef, saveContext = __rest(_b, ["save", "onSuccessRef", "onFailureRef", "transformRef"]);
    var basePath = "/" + resource;
    var updateManyToManyReferences = useUpdateManyToManyReferences_1.useUpdateManyToManyReferences();
    var registeredReferences = react_1.useRef([]);
    var value = react_1.useMemo(function () { return ({
        registerManyToManyInput: function (options) {
            if (!registeredReferences.current.find(function (registration) {
                return registration.reference === options.reference &&
                    registration.resource === options.resource &&
                    registration.source === options.source &&
                    registration.through === options.through &&
                    registration.using === options.using;
            })) {
                registeredReferences.current.push(options);
            }
        },
        unregisterManyToManyInput: function (options) {
            registeredReferences.current = registeredReferences.current.filter(function (registration) {
                return registration.reference !== options.reference ||
                    registration.resource !== options.resource ||
                    registration.source !== options.source ||
                    registration.through !== options.through ||
                    registration.using !== options.using;
            });
        },
    }); }, []);
    var save = react_1.useCallback(function (values, redirectTo, callbacks) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedRecord, onSuccess, onFailure, transform, fields, finalValues, finalData, data, error_1, errorMessage, updateReferenceField, data, error_2, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedRecord = record;
                    onSuccess = (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSuccess) || onSuccessRef.current;
                    onFailure = (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onFailure) || onFailureRef.current;
                    transform = (callbacks === null || callbacks === void 0 ? void 0 : callbacks.transform) || transformRef.current;
                    fields = registeredReferences.current.map(getReferenceManyToManyFormField_1.default);
                    finalValues = omit_1.default(values, fields);
                    return [4 /*yield*/, Promise.resolve(transform ? transform(finalValues) : finalValues)];
                case 1:
                    finalData = _a.sent();
                    if (!(!record || !record.id)) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, dataProvider.create(resource, {
                            data: finalData,
                        }, {
                            action: react_admin_1.CREATE,
                        })];
                case 3:
                    data = (_a.sent()).data;
                    updatedRecord = data;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if (onFailure) {
                        return [2 /*return*/, onFailure(error_1)];
                    }
                    errorMessage = typeof error_1 === 'string'
                        ? error_1
                        : error_1.message || 'ra.notification.http_error';
                    notify(errorMessage, 'warning');
                    return [2 /*return*/];
                case 5:
                    updateReferenceField = function (_a) {
                        var reference = _a.reference, resource = _a.resource, through = _a.through, using = _a.using;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var field;
                            return __generator(this, function (_b) {
                                field = getReferenceManyToManyFormField_1.default({
                                    reference: reference,
                                    resource: resource,
                                    through: through,
                                });
                                return [2 /*return*/, updateManyToManyReferences({
                                        newReferences: values[field],
                                        resourceId: updatedRecord.id,
                                        through: through,
                                        using: using,
                                    }, { onFailure: onFailure })];
                            });
                        });
                    };
                    return [4 /*yield*/, Promise.all(registeredReferences.current.map(updateReferenceField))];
                case 6:
                    _a.sent();
                    if (!(record && record.id && !isEqual_1.default(finalData, record))) return [3 /*break*/, 10];
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, dataProvider.update(resource, {
                            id: record.id,
                            data: finalData,
                            previousData: record,
                        }, {
                            action: react_admin_1.UPDATE,
                        })];
                case 8:
                    data = (_a.sent()).data;
                    updatedRecord = data;
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    if (onFailure) {
                        return [2 /*return*/, onFailure(error_2)];
                    }
                    errorMessage = typeof error_2 === 'string'
                        ? error_2
                        : error_2.message || 'ra.notification.http_error';
                    notify(errorMessage, 'warning');
                    return [2 /*return*/];
                case 10:
                    if (onSuccess) {
                        return [2 /*return*/, onSuccess({ data: updatedRecord })];
                    }
                    notify(record && record.id
                        ? 'ra.notification.updated'
                        : 'ra.notification.created', 'info', {
                        smart_count: 1,
                    }, false);
                    redirect(redirectTo || defaultRedirect, basePath, updatedRecord.id, updatedRecord);
                    return [2 /*return*/];
            }
        });
    }); }, [
        resource,
        dataProvider,
        defaultRedirect,
        basePath,
        notify,
        redirect,
        record,
        onFailureRef,
        onSuccessRef,
        transformRef,
        updateManyToManyReferences,
    ]);
    var newSaveContext = react_1.useMemo(function () { return (__assign(__assign({}, saveContext), { save: save })); }, [save, saveContext]);
    return (React.createElement(ManyToManyReferenceContext_1.ManyToManyReferenceContext.Provider, { value: value },
        React.createElement(react_admin_1.SaveContextProvider, { value: newSaveContext }, React.isValidElement(children)
            ? React.cloneElement(children, __assign(__assign(__assign({}, props), children.props), { save: save, saving: saveContext.saving, resource: resource,
                basePath: basePath }))
            : children)));
};
