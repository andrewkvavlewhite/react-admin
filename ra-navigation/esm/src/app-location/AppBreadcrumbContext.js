import * as React from 'react';
import { createContext, useMemo } from 'react';
export var AppBreadcrumbContext = createContext({ hasDashboard: false });
export var AppBreadcrumbContextProvider = function (_a) {
    var children = _a.children, hasDashboard = _a.hasDashboard;
    var context = useMemo(function () { return ({ hasDashboard: hasDashboard }); }, [hasDashboard]);
    return (React.createElement(AppBreadcrumbContext.Provider, { value: context }, children));
};
