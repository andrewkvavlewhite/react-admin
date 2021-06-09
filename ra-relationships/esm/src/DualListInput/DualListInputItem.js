import * as React from 'react';
import { useChoices } from 'react-admin';
import { ListItem, ListItemText } from '@material-ui/core';
import get from 'lodash/get';
export var DualListInputItem = function (_a) {
    var choice = _a.choice, disableValue = _a.disableValue, onMove = _a.onMove, onToggleSelection = _a.onToggleSelection, optionText = _a.optionText, optionValue = _a.optionValue, selected = _a.selected, translateChoice = _a.translateChoice;
    var _b = useChoices({
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
    return (React.createElement(ListItem, { button: true, component: "li", onClick: handleToggleItemSelection, onDoubleClick: handleMoveItem, key: getChoiceValue(choice), "aria-selected": selected, selected: selected, disabled: get(choice, disableValue), role: "option" }, typeof text === 'string' ? (React.createElement(ListItemText, null, text)) : (text)));
};
