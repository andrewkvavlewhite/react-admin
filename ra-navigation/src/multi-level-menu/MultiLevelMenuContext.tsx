import { createContext, useContext, MutableRefObject } from 'react';

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

export const MultiLevelMenuContext = createContext<MultiLevelMenuContextProps>(
    undefined
);

export const useMultiLevelMenu = (): MultiLevelMenuContextProps => {
    const context = useContext(MultiLevelMenuContext);

    if (!context && process.env.NODE_ENV !== 'production') {
        throw new Error(
            'useMultiLevelMenu must be used within a MultiLevelMenuContext.Provider'
        );
    }

    return context;
};
