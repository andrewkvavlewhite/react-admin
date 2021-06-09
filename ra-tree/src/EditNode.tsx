import * as React from 'react';
import { useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import {
    useEditController,
    EditView,
    EditProps,
    EditContextProvider,
} from 'react-admin';

import { expandNode } from './actions';
import NodeEditActions from './NodeEditActions';

/**
 * Alternative to <Edit> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
const EditNode = (
    props: EditProps & { children: ReactElement }
): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(expandNode(props.resource, props.id));
    }, [dispatch, props.resource, props.id]);
    const controllerProps = useEditController(props);

    return (
        <EditContextProvider value={controllerProps}>
            <EditView
                {...props}
                actions={defaultActions}
                {...controllerProps}
            />
        </EditContextProvider>
    );
};

const defaultActions = <NodeEditActions />;

export default EditNode;
