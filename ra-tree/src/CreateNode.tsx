import * as React from 'react';
import { ReactElement } from 'react';
import { CreateView, CreateProps, CreateContextProvider } from 'react-admin';

import { useCreateNodeController } from './controllers';

/**
 * Alternative to <Create> for tree nodes.
 *
 * Upon creation, calls the dataProvider.addRootNode() or dataProvider.addChildNode()
 * (depending on the presence of a parentId in the location state) instead of
 * dataProvider.create().
 */
const CreateNode = (
    props: CreateProps & { children: ReactElement }
): ReactElement => {
    const controllerProps = useCreateNodeController(props);

    return (
        <CreateContextProvider value={controllerProps}>
            <CreateView {...props} {...controllerProps} />
        </CreateContextProvider>
    );
};

export default CreateNode;
