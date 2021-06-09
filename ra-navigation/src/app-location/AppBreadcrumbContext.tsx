import * as React from 'react';
import { createContext, ReactElement, ReactNode, useMemo } from 'react';

export const AppBreadcrumbContext = createContext({ hasDashboard: false });

export interface AppBreadcrumbContextValue {
    hasDashboard: boolean;
}

export const AppBreadcrumbContextProvider = ({
    children,
    hasDashboard,
}: AppBreadcrumbContextProviderProps): ReactElement => {
    const context = useMemo(() => ({ hasDashboard }), [hasDashboard]);
    return (
        <AppBreadcrumbContext.Provider value={context}>
            {children}
        </AppBreadcrumbContext.Provider>
    );
};

export interface AppBreadcrumbContextProviderProps {
    children: ReactNode;
    hasDashboard?: boolean;
}
