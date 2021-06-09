import { useRef, useEffect, MutableRefObject } from 'react';

/**
 * A hook which allows user to navigate in search results with arrow keys.
 * The results items must be in an anchor (<a>) element.
 *
 * @param listRef {MutableRefObject<HTMLUListElement>} the ref of the result list
 */
export const useArrowKeysToNavigate = (
    listRef: MutableRefObject<HTMLUListElement>
): void => {
    const selectedElement = useRef(null);
    useEffect(() => {
        selectedElement.current = null;
        const navigate = (e: KeyboardEvent): void => {
            if (listRef.current === null) {
                return;
            }
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
                return;
            }
            const items = listRef.current.querySelectorAll<HTMLAnchorElement>(
                '[role="button"]'
            );

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
        return (): void => {
            window.removeEventListener('keydown', navigate);
        };
    }, [listRef]);
};
