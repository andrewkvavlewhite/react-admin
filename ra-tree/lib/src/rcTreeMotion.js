"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: function () { return ({ height: 0 }); },
    onAppearActive: function (node) { return ({
        height: node.scrollHeight,
    }); },
    onLeaveStart: function (node) { return ({
        height: node.offsetHeight,
    }); },
    onLeaveActive: function () { return ({ height: 0 }); },
};
exports.default = motion;
