import { MutableRefObject } from 'react';
/**
 * A hook which allows user to navigate in search results with arrow keys.
 * The results items must be in an anchor (<a>) element.
 *
 * @param listRef {MutableRefObject<HTMLUListElement>} the ref of the result list
 */
export declare const useArrowKeysToNavigate: (listRef: MutableRefObject<HTMLUListElement>) => void;
