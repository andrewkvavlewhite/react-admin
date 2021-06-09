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
exports.DualListInputItem = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var get_1 = __importDefault(require("lodash/get"));
exports.DualListInputItem = function (_a) {
    var choice = _a.choice, disableValue = _a.disableValue, onMove = _a.onMove, onToggleSelection = _a.onToggleSelection, optionText = _a.optionText, optionValue = _a.optionValue, selected = _a.selected, translateChoice = _a.translateChoice;
    var _b = react_admin_1.useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }), getChoiceText = _b.getChoiceText, getChoiceValue = _b.getChoiceValue;
    var handleToggleItemSelection = function (event) {
        onToggleSelection(event, choice);
    };
    var handleMoveItem = function (event) {
        onMove(event, choice);
    };
    var text = getChoiceText(choice);
    return (React.createElement(core_1.ListItem, { button: true, component: "li", onClick: handleToggleItemSelection, onDoubleClick: handleMoveItem, key: getChoiceValue(choice), "aria-selected": selected, selected: selected, disabled: get_1.default(choice, disableValue), role: "option" }, typeof text === 'string' ? (React.createElement(core_1.ListItemText, null, text)) : (text)));
};
