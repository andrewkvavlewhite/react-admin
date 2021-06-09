"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiLevelMenu = exports.MultiLevelMenuContext = void 0;
var react_1 = require("react");
exports.MultiLevelMenuContext = react_1.createContext(undefined);
exports.useMultiLevelMenu = function () {
    var context = react_1.useContext(exports.MultiLevelMenuContext);
    if (!context && process.env.NODE_ENV !== 'production') {
        throw new Error('useMultiLevelMenu must be used within a MultiLevelMenuContext.Provider');
    }
    return context;
};
