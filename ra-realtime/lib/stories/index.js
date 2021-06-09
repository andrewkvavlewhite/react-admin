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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListActions = exports.ShowActions = exports.EditActions = exports.PostShow = exports.PostList = exports.PostEdit = exports.PostCreate = exports.Dashboard = exports.Layout = void 0;
var Layout_1 = __importDefault(require("./Layout"));
exports.Layout = Layout_1.default;
var Dashboard_1 = __importDefault(require("./Dashboard"));
exports.Dashboard = Dashboard_1.default;
var PostCreate_1 = __importDefault(require("./PostCreate"));
exports.PostCreate = PostCreate_1.default;
var PostEdit_1 = __importStar(require("./PostEdit"));
exports.PostEdit = PostEdit_1.default;
Object.defineProperty(exports, "EditActions", { enumerable: true, get: function () { return PostEdit_1.EditActions; } });
var PostList_1 = __importStar(require("./PostList"));
exports.PostList = PostList_1.default;
Object.defineProperty(exports, "ListActions", { enumerable: true, get: function () { return PostList_1.ListActions; } });
var PostShow_1 = __importStar(require("./PostShow"));
exports.PostShow = PostShow_1.default;
Object.defineProperty(exports, "ShowActions", { enumerable: true, get: function () { return PostShow_1.ShowActions; } });
