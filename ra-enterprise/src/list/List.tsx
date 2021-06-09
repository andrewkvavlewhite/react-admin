import * as React from 'react';
import { ReactElement } from 'react';
import {
    ListContextProvider,
    ListProps,
    useCheckMinimumRequiredProps,
    useListController,
} from 'react-admin';
import { ListView } from './ListView';

export const List = (
    props: ListProps & { children: ReactElement }
): ReactElement => {
    useCheckMinimumRequiredProps('List', ['children'], props);
    const controllerProps = useListController(props);
    return (
        <ListContextProvider value={controllerProps}>
            <ListView {...props} {...controllerProps} />
        </ListContextProvider>
    );
};
