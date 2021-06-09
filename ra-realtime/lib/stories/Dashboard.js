"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var AddPostButton_1 = __importDefault(require("./simulateActions/AddPostButton"));
var Dashboard = function () {
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.dashboard },
        react_1.default.createElement(core_1.Card, null,
            react_1.default.createElement(react_admin_1.Title, { title: "Welcome to the administration in Real Time" }),
            react_1.default.createElement(core_1.CardContent, null,
                react_1.default.createElement(core_1.Typography, null, "To see a resource badge in the left menu,")),
            react_1.default.createElement(core_1.CardActions, null,
                react_1.default.createElement(AddPostButton_1.default, { variant: "contained" })))));
};
exports.default = Dashboard;
var useStyles = styles_1.makeStyles({
    dashboard: {
        maxWidth: '450px',
    },
});
