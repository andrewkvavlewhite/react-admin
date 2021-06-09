"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArrowKeysToNavigate = void 0;
var react_1 = require("react");
/**
 * A hook which allows user to navigate in search results with arrow keys.
 * The results items must be in an anchor (<a>) element.
 *
 * @param listRef {MutableRefObject<HTMLUListElement>} the ref of the result list
 */
exports.useArrowKeysToNavigate = function (listRef) {
    var selectedElement = react_1.useRef(null);
    react_1.useEffect(function () {
        selectedElement.current = null;
        var navigate = function (e) {
            if (listRef.current === null) {
                return;
            }
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
                return;
            }
            var items = listRef.current.querySelectorAll('[role="button"]');
            if (e.key === 'ArrowDown') {
                selectedElement.current =
                    selectedElement.current === null ||
                        selectedElement.current + 1 >= items.length
                        ? 0
                        : selectedElement.current + 1;
            }
            if (e.key === 'ArrowUp') {
                selectedElement.current =
                    selectedElement.current === null ||
                        selectedElement.current - 1 < 0
                        ? items.length - 1
                        : selectedElement.current - 1;
            }
            items[selectedElement.current].focus();
        };
        window.addEventListener('keydown', navigate);
        return function () {
            window.removeEventListener('keydown', navigate);
        };
    }, [listRef]);
};
