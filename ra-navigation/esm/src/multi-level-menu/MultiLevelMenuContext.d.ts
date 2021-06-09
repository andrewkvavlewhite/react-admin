import { MutableRefObject } from 'react';
interface MultiLevelMenuContextProps {
    hasCategories: boolean;
    initialOpen: boolean;
    isFirstLoad: boolean;
    setHasCategories(value: boolean): void;
    close: (name: string) => void;
    isOpen: (name: string) => boolean;
    open: (name: string) => void;
    setIsOpen: (name: string, isOpen: boolean) => void;
    toggle: (name: string) => void;
    rootRef: MutableRefObject<HTMLElement>;
    onOpen: (callback: (name: string) => void) => void;
    offOpen: (callback: (name: string) => void) => void;
}
export declare const MultiLevelMenuContext: import("react").Context<MultiLevelMenuContextProps>;
export declare const useMultiLevelMenu: () => MultiLevelMenuContextProps;
export {};
