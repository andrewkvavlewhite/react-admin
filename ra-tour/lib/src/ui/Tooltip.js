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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var useTour_1 = __importDefault(require("../useTour"));
/**
 * Tooltip UI Component that displays one step of a tour
 *
 * @param {Step} step The step to display
 * @param {number} index The index of the step within its tour
 * @param {boolean} isLastStep True if the current step is the last step of its tour
 * @param {boolean} continuous If true, clicking next on last step brings back to first step
 * @param {Object} tooltipProps Props passed down to the tooltip container
 * @param {Object} backProps Props passed down to the back button container
 * @param {Object} closeProps Props passed down to the close button container
 * @param {Object} primaryProps Props passed down to the primary button (next/last) container
 * @param {Object} skipProps Props passed down to the skip button container
 */
var Tooltip = function (_a) {
    var tooltipProps = _a.tooltipProps, continuous = _a.continuous, backProps = _a.backProps, closeProps = _a.closeProps, primaryProps = _a.primaryProps, skipProps = _a.skipProps, index = _a.index, isLastStep = _a.isLastStep, step = _a.step;
    var _b = useTour_1.default(), _ = _b[0], _c = _b[1], cancel = _c.cancel, stop = _c.stop, next = _c.next, previous = _c.previous;
    var content = step.content, hideBackButton = step.hideBackButton, locale = step.locale, showSkipButton = step.showSkipButton, title = step.title, styles = step.styles;
    var output = {
        primary: locale.close,
        back: null,
        skip: null,
        close: null,
    };
    if (continuous) {
        if (isLastStep) {
            output.primary = locale.last;
        }
        else {
            output.primary = locale.next;
        }
    }
    if (showSkipButton && !isLastStep) {
        output.skip = (react_1.default.createElement(Button_1.default, __assign({}, skipProps, { onClick: function () {
                cancel();
            }, "data-testid": "tour-tooltip-skip-button" }), locale.skip));
    }
    if (!hideBackButton && index > 0) {
        output.back = (react_1.default.createElement(Button_1.default, __assign({}, backProps, { onClick: function () {
                previous();
            }, "data-testid": "tour-tooltip-back-button" }), locale.back));
    }
    output.close = (react_1.default.createElement(IconButton_1.default, __assign({}, closeProps, { title: locale.close, "aria-label": locale.close, onClick: function () {
            cancel();
        }, size: "small", style: { position: 'absolute', top: 10, right: 10 } }),
        react_1.default.createElement(Close_1.default, null)));
    return (react_1.default.createElement("div", __assign({ key: "JoyrideTooltip", style: styles.tooltip }, tooltipProps),
        react_1.default.createElement("div", { style: styles.tooltipContainer },
            output.close,
            title && react_1.default.createElement("h4", { style: styles.tooltipTitle }, title),
            content && react_1.default.createElement("div", { style: styles.tooltipContent }, content)),
        react_1.default.createElement("div", { style: styles.tooltipFooter },
            output.skip,
            output.back,
            react_1.default.createElement(Button_1.default, __assign({ variant: "contained", color: "primary" }, primaryProps, { "data-testid": "tour-tooltip-primary-button", onClick: function () {
                    if (isLastStep) {
                        stop();
                        return;
                    }
                    next();
                } }), output.primary))));
};
exports.default = Tooltip;
