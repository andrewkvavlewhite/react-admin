import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
export declare const AppBreadcrumbContext: React.Context<{
    hasDashboard: boolean;
}>;
export interface AppBreadcrumbContextValue {
    hasDashboard: boolean;
}
export declare const AppBreadcrumbContextProvider: ({ children, hasDashboard, }: AppBreadcrumbContextProviderProps) => ReactElement;
export interface AppBreadcrumbContextProviderProps {
    children: ReactNode;
    hasDashboard?: boolean;
}
