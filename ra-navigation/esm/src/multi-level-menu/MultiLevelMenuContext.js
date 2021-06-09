import { createContext, useContext } from 'react';
export var MultiLevelMenuContext = createContext(undefined);
export var useMultiLevelMenu = function () {
    var context = useContext(MultiLevelMenuContext);
    if (!context && process.env.NODE_ENV !== 'production') {
        throw new Error('useMultiLevelMenu must be used within a MultiLevelMenuContext.Provider');
    }
    return context;
};
