import * as React from 'react';
import { useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useShowController, ShowView, ShowProps } from 'react-admin';

import { expandNode } from './actions';

/**
 * Alternative to <Show> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
const ShowNode = (
    props: ShowProps & { children: ReactElement }
): ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(expandNode(props.resource, props.id));
    }, [dispatch, props.resource, props.id]);
    return <ShowView {...props} {...useShowController(props)} />;
};

export default ShowNode;
