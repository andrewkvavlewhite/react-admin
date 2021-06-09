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
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var EditOutlined_1 = __importDefault(require("@material-ui/icons/EditOutlined"));
var UpdatePostButton = function (_a) {
    // we use the real data provider to avoid the Redux store to be automatically updated when we update a post
    var record = _a.record, dataProvider = _a.dataProvider, props = __rest(_a, ["record", "dataProvider"]);
    var handleClick = function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var post, posts, topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!record) return [3 /*break*/, 1];
                        post = record;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, dataProvider.getList('posts', {
                            pagination: { page: 1, perPage: 100 },
                            sort: { field: 'id', order: 'ASC' },
                            filter: {},
                        })];
                    case 2:
                        posts = (_a.sent()).data;
                        // choose a random post
                        post = posts[Math.floor(Math.random() * posts.length)];
                        _a.label = 3;
                    case 3: return [4 /*yield*/, dataProvider.update('posts', {
                            id: post.id,
                            data: { title: post.title + " updated " },
                            previousData: post,
                        })];
                    case 4:
                        _a.sent();
                        topic = "resource/posts/" + post.id;
                        dataProvider.publish(topic, {
                            type: 'updated',
                            topic: topic,
                            payload: { id: post.id },
                            date: new Date(),
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    return (react_1.default.createElement(react_admin_1.Button, __assign({ color: "primary", onClick: handleClick, label: "Post Modification" }, props),
        react_1.default.createElement(EditOutlined_1.default, null)));
};
exports.default = UpdatePostButton;
