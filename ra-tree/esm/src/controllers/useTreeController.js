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
import { useDispatch, useSelector } from 'react-redux';
import { useGetResourceLabel, useNotify, useVersion, useTranslate, useResourceContext, } from 'react-admin';
import { useGetRootNodes, useGetTree, useGetTreeCallback, useMoveAsNthChildOf, useMoveAsNthSiblingOf, } from '../dataProvider';
import { getRCTree } from '../util';
import { changeExpandedNodes } from '../actions';
export var useTreeController = function (options) {
    var version = useVersion();
    var translate = useTranslate();
    var resource = useResourceContext(options);
    var getResourceLabel = useGetResourceLabel();
    var hideRootNodes = options.hideRootNodes, _a = options.lazy, lazy = _a === void 0 ? false : _a, _b = options.titleField, titleField = _b === void 0 ? 'title' : _b;
    // load entire tree on mount
    var treeState = useGetTree(resource, {
        enabled: !lazy,
        version: version,
    });
    // load only the root nodes on mount if lazy
    var rootNodesState = useGetRootNodes(resource, {
        enabled: lazy,
        version: version,
    });
    var _c = lazy ? rootNodesState : treeState, data = _c.data, error = _c.error, loaded = _c.loaded, loading = _c.loading;
    // prepare data structure for rc-tree
    // add key and title, and turn to recursive DataNode[] format
    var tree = data
        ? getRCTree(data, titleField, translate('ra-tree.new_node'), hideRootNodes)
        : null;
    // handle expanded persistence
    var dispatch = useDispatch();
    var expandedKeys = useSelector(function (state) {
        return state.tree[resource] ? state.tree[resource].expanded : [];
    });
    // prepare hooks for drag and drop
    var moveAsNthChildOf = useMoveAsNthChildOf(resource)[0];
    var moveAsNthSiblingOf = useMoveAsNthSiblingOf(resource)[0];
    var refreshTree = useGetTreeCallback(resource);
    var notify = useNotify();
    /**
     * Call dataProvider.moveXXX() method on drop.
     *
     * Heavily inspired by https://github.com/react-component/tree/blob/master/examples/draggable.jsx
     *
     * @see https://github.com/react-component/tree/blob/master/examples/draggable.jsx
     */
    var handleDrop = function (info) {
        var dropKey = info.node.props.eventKey;
        var dragKey = info.dragNode.props.eventKey;
        var dropPos = info.node.props.pos.split('-');
        var dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        var dataById = data.reduce(function (acc, curr) {
            acc[curr.id] = curr;
            return acc;
        }, {});
        var dragObject = dataById[dragKey];
        var targetObject = dataById[dropKey];
        // refresh tree on success
        var successSideEffect = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refreshTree()];
                    case 1:
                        _a.sent();
                        notify('ra-tree.item_moved');
                        return [2 /*return*/];
                }
            });
        }); };
        if (!info.dropToGap) {
            // Drop on a node
            // move dragObject to last child of targetObject
            moveAsNthChildOf({
                payload: {
                    source: dragObject,
                    destination: targetObject,
                    position: targetObject.children.length + 1,
                },
            }, { onSuccess: successSideEffect });
        }
        else if ((info.node.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            // drop on the top gap
            // move dragObject to first child of targetObject
            moveAsNthChildOf({
                payload: {
                    source: dragObject,
                    destination: targetObject,
                    position: 0,
                },
            }, { onSuccess: successSideEffect });
        }
        else {
            // drop between nodes
            // look for the target position
            var targetPosition_1;
            var loop_1 = function (nodes, key, callback) {
                nodes.forEach(function (item, index) {
                    if (item.key === key) {
                        callback(index);
                        return;
                    }
                    if (item.children) {
                        loop_1(item.children, key, callback);
                    }
                });
            };
            loop_1(tree, dropKey, function (index) {
                targetPosition_1 = index;
            });
            // move dragObject to sibling targetPosition of targetObject
            moveAsNthSiblingOf({
                payload: {
                    source: dragObject,
                    destination: targetObject,
                    position: dropPosition === -1 &&
                        !targetObject.children.includes(dragObject.id)
                        ? targetPosition_1
                        : targetPosition_1 + 1,
                },
            }, { onSuccess: successSideEffect });
        }
    };
    var handleExpand = function (expandedKeys) {
        // persist expanded state in Redux to show the tree in previous state when reopening
        dispatch(changeExpandedNodes(resource, expandedKeys));
    };
    var defaultTitle = translate('ra.page.list', {
        name: getResourceLabel(resource, 2),
    });
    return {
        data: data,
        defaultTitle: defaultTitle,
        error: error,
        loading: loading,
        loaded: loaded,
        tree: tree,
        expandedKeys: expandedKeys,
        handleDrop: handleDrop,
        handleExpand: handleExpand,
    };
};
