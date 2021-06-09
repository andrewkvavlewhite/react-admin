"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDateFilters = void 0;
var startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
var startOfMonth_1 = __importDefault(require("date-fns/startOfMonth"));
var startOfQuarter_1 = __importDefault(require("date-fns/startOfQuarter"));
var startOfWeek_1 = __importDefault(require("date-fns/startOfWeek"));
exports.DefaultDateFilters = {
    'ra-audit-log.period_filters.today': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfDay_1.default(date).toISOString();
    },
    'ra-audit-log.period_filters.this_week': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfWeek_1.default(date).toISOString();
    },
    'ra-audit-log.period_filters.this_month': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfMonth_1.default(date).toISOString();
    },
    'ra-audit-log.period_filters.this_quarter': function (date) {
        if (date === void 0) { date = new Date(); }
        return startOfQuarter_1.default(date).toISOString();
    },
};
