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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DualListInput = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
var ChevronRight_1 = __importDefault(require("@material-ui/icons/ChevronRight"));
var classnames_1 = __importDefault(require("classnames"));
var DualListInputItem_1 = require("./DualListInputItem");
var DualListInputSkeleton_1 = require("./DualListInputSkeleton");
/**
 * An Input component displaying two list of selected or available items.
 * It allows multiple selections and uses an array of objects for the options.
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'programming', name: 'Programming' },
 *    { id: 'lifestyle', name: 'Lifestyle' },
 *    { id: 'photography', name: 'Photography' },
 * ];
 * <DualListInput source="tags" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <DualListInput source="authors" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <DualListInput source="authors" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <DualListInput source="authors" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.tags.programming' },
 *    { id: 'lifestyle', name: 'myroot.tags.lifestyle' },
 *    { id: 'photography', name: 'myroot.tags.photography' },
 * ];
 */
exports.DualListInput = function (props) {
    var classes = useStyles(props);
    var _a = props.addButtonLabel, addButtonLabel = _a === void 0 ? 'ra-relationships.duallistinput.select' : _a, _b = props.availableItemsLabel, availableItemsLabel = _b === void 0 ? 'ra-relationships.duallistinput.availableItems' : _b, choices = props.choices, className = props.className, _c = props.dense, dense = _c === void 0 ? true : _c, _d = props.disableValue, disableValue = _d === void 0 ? 'disabled' : _d, label = props.label, loading = props.loading, _e = props.optionText, optionText = _e === void 0 ? 'name' : _e, _f = props.optionValue, optionValue = _f === void 0 ? 'id' : _f, _g = props.removeButtonLabel, removeButtonLabel = _g === void 0 ? 'ra-relationships.duallistinput.unselect' : _g, resource = props.resource, _h = props.selectedItemsLabel, selectedItemsLabel = _h === void 0 ? 'ra-relationships.duallistinput.selectedItems' : _h, translateChoice = props.translateChoice;
    // We need a fix in react-admin as children of Reference related inputs do not have to specify their source.
    // However, useInput requires it
    // @ts-ignore
    var _j = react_admin_1.useInput(props), id = _j.id, input = _j.input, isRequired = _j.isRequired, meta = _j.meta, source = _j.source;
    var translate = react_admin_1.useTranslate();
    var getChoiceValue = react_admin_1.useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }).getChoiceValue;
    // This handle the internal selection of items which can then be moved
    // from one list to the other
    var _k = react_1.useState([]), selectedItems = _k[0], setSelectedItems = _k[1];
    // Toggle the selection of a single item
    var handleToggleItemSelection = react_1.useCallback(function (event, item) {
        setSelectedItems(function (currentSelectedItems) {
            var isItemSelected = currentSelectedItems.some(function (selectedItem) {
                return getChoiceValue(selectedItem) === getChoiceValue(item);
            });
            if (isItemSelected) {
                return currentSelectedItems.filter(function (selectedItem) {
                    return getChoiceValue(selectedItem) !==
                        getChoiceValue(item);
                });
            }
            else {
                return __spreadArrays(currentSelectedItems, [item]);
            }
        });
    }, [getChoiceValue]);
    var setInputValue = react_1.useCallback(function (value) {
        input.onChange(value);
        setSelectedItems([]);
    }, [input]);
    // Handler called when an item should be moved to the other list
    var handleMoveItem = react_1.useCallback(function (event, choice) {
        if (input.value.some(function (value) { return value === getChoiceValue(choice); })) {
            setInputValue((input.value || []).filter(function (item) { return item !== getChoiceValue(choice); }));
            return;
        }
        setInputValue(__spreadArrays(input.value, [getChoiceValue(choice)]));
    }, [getChoiceValue, input, setInputValue]);
    // Handler called when the selected items should be added to the input value
    var handleAddItems = react_1.useCallback(function () {
        var currentSet = new Set(input.value || []);
        selectedItems.forEach(function (item) { return currentSet.add(getChoiceValue(item)); });
        setInputValue(Array.from(currentSet));
    }, [getChoiceValue, input, selectedItems, setInputValue]);
    // Handler called when the selected items should be removed from the input value
    var handleRemoveItems = react_1.useCallback(function () {
        var newValue = (input.value || []).filter(function (value) {
            return !selectedItems.some(function (choice) { return getChoiceValue(choice) === value; });
        });
        setInputValue(newValue);
    }, [getChoiceValue, input, selectedItems, setInputValue]);
    return (React.createElement(react_admin_1.Labeled, { id: id, input: input, meta: meta, isRequired: isRequired, label: label, resource: resource, source: source, className: className },
        React.createElement("div", { className: classes.root },
            React.createElement("div", null,
                React.createElement(core_1.ListSubheader, { component: "div", id: "selected-items-title", className: classes.listHeader }, translate(selectedItemsLabel, {
                    _: 'Selected items',
                })),
                loading ? (React.createElement(DualListInputSkeleton_1.DualListInputSkeleton, { className: classes.list })) : (React.createElement(core_1.List, { className: classnames_1.default(classes.list, classes.selectedList), dense: dense, disablePadding: true, "aria-labelledby": "selected-items-title", "aria-multiselectable": "true", role: "listbox" }, (input.value || []).map(function (value) {
                    var choice = choices.find(function (c) { return getChoiceValue(c) === value; });
                    return (React.createElement(DualListInputItem_1.DualListInputItem, { key: value, choice: choice, disableValue: disableValue, onMove: handleMoveItem, onToggleSelection: handleToggleItemSelection, optionText: optionText, optionValue: optionValue, selected: selectedItems.some(function (selectedItem) {
                            return getChoiceValue(selectedItem) ===
                                value;
                        }), translateChoice: translateChoice }));
                })))),
            React.createElement("div", { className: classes.actions },
                React.createElement(core_1.Button, { className: classnames_1.default(classes.button, classes.addButton), onClick: handleAddItems, startIcon: React.createElement(ChevronLeft_1.default, null), variant: "contained", disabled: selectedItems.length === 0 }, translate(addButtonLabel, {
                    _: addButtonLabel,
                })),
                React.createElement(core_1.Button, { className: classnames_1.default(classes.button, classes.removeButton), onClick: handleRemoveItems, endIcon: React.createElement(ChevronRight_1.default, null), variant: "contained", disabled: selectedItems.length === 0 }, translate(removeButtonLabel, {
                    _: removeButtonLabel,
                }))),
            React.createElement("div", null,
                React.createElement(core_1.ListSubheader, { component: "div", id: "available-items-title", className: classes.listHeader }, translate(availableItemsLabel, {
                    _: 'Available items',
                })),
                loading ? (React.createElement(DualListInputSkeleton_1.DualListInputSkeleton, { className: classes.list })) : (React.createElement(core_1.List, { className: classnames_1.default(classes.list, classes.availableList), dense: dense, disablePadding: true, "aria-labelledby": "available-items-title", "aria-multiselectable": "true", role: "listbox" }, choices
                    .filter(function (choice) {
                    return !(input.value || []).some(function (val) {
                        return getChoiceValue(choice) === val;
                    });
                })
                    .map(function (choice) { return (React.createElement(DualListInputItem_1.DualListInputItem, { key: getChoiceValue(choice), choice: choice, disableValue: disableValue, onMove: handleMoveItem, onToggleSelection: handleToggleItemSelection, optionText: optionText, optionValue: optionValue, selected: selectedItems.some(function (selectedItem) {
                        return getChoiceValue(selectedItem) ===
                            getChoiceValue(choice);
                    }), translateChoice: translateChoice })); })))))));
};
exports.DualListInput.defaultProps = {
    defaultValue: [],
    source: '',
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        '& + &': {
            marginTop: theme.spacing(1),
        },
    },
    addButton: {
        justifyContent: 'start',
    },
    removeButton: {
        justifyContent: 'end',
    },
    list: {
        minWidth: 256,
        height: 256,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    listHeader: {
        borderColor: theme.palette.divider,
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottom: 'none',
    },
    selectedList: {},
    availableList: {},
}); }, {
    name: 'RaDualListInput',
});
