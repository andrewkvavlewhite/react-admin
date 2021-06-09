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
import React, { useReducer, createContext } from 'react';
import Tour from './Tour';
import reducer from './reducer';
export var StateContext = createContext({
    running: false,
    stepIndex: 0,
    activeTour: null,
});
export var DispatchContext = createContext({});
/**
 * Wait until getter returns something not null, tries every {interval}ms for {maxTries} times.
 *
 * @param {() => any} getter Function to call repetively
 * @param {number} interval Time between each function call in ms. Defaults to 100.
 * @param {number} maxTries Maximum number of function call before failing. Defaults to 10.
 *
 * @returns {any} What getter returns
 */
var waitAndReturn = function (getter, interval, maxTries) {
    if (interval === void 0) { interval = 100; }
    if (maxTries === void 0) { maxTries = 10; }
    return new Promise(function (resolve, reject) {
        var iterations;
        iterations = 0;
        var getterInterval = setInterval(function () {
            var result = getter();
            iterations++;
            if (result) {
                clearInterval(getterInterval);
                resolve(result);
            }
            if (iterations > maxTries) {
                reject();
            }
        }, interval);
    });
};
/**
 * A provider that handles tour logic and injects UI
 *
 * @example
 *   import tours from './tours';
 *
 *   const MyLayout: FC = props => (
 *       <TourProvider
 *           tours={tours}
 *       >
 *           <Layout {...props} />
 *       </TourProvider>
 *   );
 *
 * @param {{ [id: string]: TourType }} tours List of supported tours
 * @param {Object} tools Tools to be injected into before and after functions
 * @param {StateType} initialState State the tour should be initialized to
 * @param {any} joyrideProps Props passed down to react-joyride
 */
var TourProvider = function (_a) {
    var _b = _a.tours, tours = _b === void 0 ? {} : _b, _c = _a.tools, tools = _c === void 0 ? {} : _c, _d = _a.joyrideProps, joyrideProps = _d === void 0 ? {} : _d, initialState = _a.initialState, children = _a.children;
    var _e = useReducer(reducer, initialState || {
        running: false,
        stepIndex: 0,
        activeTour: null,
    }), state = _e[0], dispatch = _e[1];
    var actions = {
        start: function (tour) { return __awaiter(void 0, void 0, void 0, function () {
            var before, step, stepBefore, target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        before = tours[tour].before;
                        if (!before) return [3 /*break*/, 2];
                        return [4 /*yield*/, before(__assign(__assign({}, tools), { state: __assign({}, state) }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        step = tours[tour].steps[0];
                        stepBefore = step.before;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(step.target);
                            })];
                    case 3:
                        target = _a.sent();
                        if (!stepBefore) return [3 /*break*/, 5];
                        return [4 /*yield*/, stepBefore(__assign(__assign({}, tools), { state: __assign({}, state), target: target }))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        dispatch({ type: 'start', payload: { tour: tour } });
                        return [2 /*return*/];
                }
            });
        }); },
        stop: function () { return __awaiter(void 0, void 0, void 0, function () {
            var step, stepAfter, target, globalAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        step = tours[state.activeTour].steps[state.stepIndex];
                        stepAfter = step.after;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(step.target);
                            })];
                    case 1:
                        target = _a.sent();
                        if (!stepAfter) return [3 /*break*/, 3];
                        dispatch({ type: 'pause' });
                        return [4 /*yield*/, stepAfter(__assign(__assign({}, tools), { state: __assign({}, state), target: target }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        globalAfter = tours[state.activeTour].after;
                        if (!globalAfter) return [3 /*break*/, 5];
                        return [4 /*yield*/, globalAfter(__assign(__assign({}, tools), { state: __assign({}, state) }))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        dispatch({ type: 'stop' });
                        return [2 /*return*/];
                }
            });
        }); },
        cancel: function () { return __awaiter(void 0, void 0, void 0, function () {
            var globalAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        globalAfter = tours[state.activeTour].after;
                        if (!globalAfter) return [3 /*break*/, 2];
                        return [4 /*yield*/, globalAfter(__assign(__assign({}, tools), { state: __assign({}, state) }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        dispatch({ type: 'stop' });
                        return [2 /*return*/];
                }
            });
        }); },
        next: function () { return __awaiter(void 0, void 0, void 0, function () {
            var step, after, target, nextStep_1, before, nextTarget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        step = tours[state.activeTour].steps[state.stepIndex];
                        after = step.after;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(step.target);
                            })];
                    case 1:
                        target = _a.sent();
                        if (!after) return [3 /*break*/, 3];
                        dispatch({ type: 'pause' });
                        return [4 /*yield*/, after(__assign(__assign({}, tools), { state: __assign({}, state), target: target }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(tours[state.activeTour].steps.length > state.stepIndex + 1)) return [3 /*break*/, 6];
                        dispatch({ type: 'pause' });
                        nextStep_1 = tours[state.activeTour].steps[state.stepIndex + 1];
                        before = nextStep_1.before;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(nextStep_1.target);
                            })];
                    case 4:
                        nextTarget = _a.sent();
                        if (!before) return [3 /*break*/, 6];
                        return [4 /*yield*/, before(__assign(__assign({}, tools), { state: __assign(__assign({}, state), { stepIndex: state.stepIndex + 1 }), target: nextTarget }))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        dispatch({ type: 'next' });
                        return [2 /*return*/];
                }
            });
        }); },
        previous: function () { return __awaiter(void 0, void 0, void 0, function () {
            var step, after, target, previousStep_1, before, previousTarget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        step = tours[state.activeTour].steps[state.stepIndex];
                        after = step.after;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(step.target);
                            })];
                    case 1:
                        target = _a.sent();
                        if (!after) return [3 /*break*/, 3];
                        dispatch({ type: 'pause' });
                        return [4 /*yield*/, after(__assign(__assign({}, tools), { state: __assign({}, state), target: target }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(state.stepIndex - 1 >= 0)) return [3 /*break*/, 6];
                        dispatch({ type: 'pause' });
                        previousStep_1 = tours[state.activeTour].steps[state.stepIndex - 1];
                        before = previousStep_1.before;
                        return [4 /*yield*/, waitAndReturn(function () {
                                return document.querySelector(previousStep_1.target);
                            })];
                    case 4:
                        previousTarget = _a.sent();
                        if (!before) return [3 /*break*/, 6];
                        return [4 /*yield*/, before(__assign(__assign({}, tools), { state: __assign(__assign({}, state), { stepIndex: state.stepIndex - 1 }), target: previousTarget }))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        dispatch({ type: 'previous' });
                        return [2 /*return*/];
                }
            });
        }); },
    };
    return (React.createElement(StateContext.Provider, { value: state },
        React.createElement(DispatchContext.Provider, { value: actions },
            React.createElement(Tour, { joyrideProps: joyrideProps, tours: tours }),
            children)));
};
export default TourProvider;
