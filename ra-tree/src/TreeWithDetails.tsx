import * as React from 'react';
import {
    cloneElement,
    ComponentType,
    MouseEvent,
    ReactElement,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
    linkToRecord,
    WithPermissions,
    CreateButton,
    Record,
    ResourceMatch,
    ComponentPropType,
    Title,
    ResourceComponentProps,
    ResourceComponentPropsWithId,
} from 'react-admin';

import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EventDataNode } from 'rc-tree/lib/interface';

import { Tree, TreeProps } from './Tree';
import { useTreeController } from './controllers';
import { UNSAVED_NEW_NODE } from './constants';
import DefaultNodeActions, { NodeActionsProps } from './NodeActions';
import { useGetChildNodesCallback } from './dataProvider';

/**
 * Main Tree component, to be used instead of List in a Resource.
 *
 * You MUST include the tree reducer in the Admin for this component to work. Also,
 * the dataProvider must support tree methods, e.g. getTree, moveAsNthSiblingOf, etc.
 *
 * @example
 *
 * import React, { ComponentProps, FC } from 'react';
 * import { Admin, Resource, List, ListGuesser } from 'react-admin';
 * import { reducer as tree, TreeWithDetails } from '@react-admin/ra-tree';
 *
 * // tree-augmented dataProvider
 * import dataProvider from './dataProvider';
 * import i18nProvider from './i18nProvider';
 *
 * const CategoriesEdit: FC = props => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <TextInput source="name" />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * const CategoriesList: FC<Props> = props => (
 *     <TreeWithDetails
 *         titleField="name"
 *         edit={CategoriesEdit}
 *         draggable
 *         showLine
 *         {...props}
 *     />
 * );
 *
 * type Props = ComponentProps<typeof List>;
 *
 * export const App: FC = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         i18nProvider={i18nProvider}
 *         customReducers={{ tree }}
 *     >
 *         <Resource name="categories" list={CategoriesList} />
 *         <Resource name="products" list={ListGuesser} />
 *     </Admin>
 * );
 */
export const TreeWithDetails = ({
    allowMultipleRoots = false,
    basePath,
    create,
    edit,
    hideRootNodes,
    lazy = false,
    linkTo = 'edit',
    nodeActions = <DefaultNodeActions />,
    resource,
    show,
    showLine,
    title,
    titleField = 'title',
    ...props
}: TreeWithDetailsProps): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    // find id in location to set it as selected
    // location can be /posts, /posts/123, or /posts/123/show, or /posts/create
    const pattern = new RegExp(`${basePath}/([^/]*)/*.*`);
    const matches = pattern.exec(location.pathname);
    const idInLocation = matches && matches[1];
    const defaultSelectedKeys = useMemo(
        () =>
            idInLocation && idInLocation !== 'create'
                ? [idInLocation]
                : [UNSAVED_NEW_NODE],
        [idInLocation]
    );

    const {
        defaultTitle,
        tree,
        loaded,
        expandedKeys,
        handleDrop,
        handleExpand,
    } = useTreeController({
        hideRootNodes,
        lazy,
        resource,
        titleField,
    });

    const getChildNodes = useGetChildNodesCallback(resource);

    const handleClick = (
        event: MouseEvent,
        treeNode: EventDataNode & Record
    ): void => {
        history.push(linkToRecord(basePath, treeNode.id, linkTo));
    };

    const handleLoadData = async (node): Promise<void> => {
        await getChildNodes(node.id);
    };

    if (!loaded) {
        return null;
    }

    const canCreateNode = !tree || tree.length === 0 || allowMultipleRoots;

    return (
        <div className={classes.container}>
            <div className={classes.cardTree}>
                <Card>
                    <CardContent>
                        <Tree
                            treeData={tree}
                            onDrop={handleDrop}
                            onExpand={handleExpand}
                            onClick={handleClick}
                            expandedKeys={expandedKeys}
                            selectedKeys={defaultSelectedKeys}
                            showLine={showLine}
                            nodeActions={cloneElement(nodeActions, {
                                basePath,
                                resource,
                                ...nodeActions.props,
                            })}
                            loadData={lazy ? handleLoadData : undefined}
                            {...sanitizeRestProps(props)}
                        />
                        {canCreateNode && (
                            <CreateButton
                                label="ra-tree.action.add_root"
                                basePath={basePath}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className={classes.actionCard}>
                <Switch>
                    {create && (
                        <Route
                            path={`${basePath}/create`}
                            render={(routeProps): ReactElement => (
                                <WithPermissions
                                    component={create}
                                    basePath={basePath}
                                    resource={resource}
                                    {...routeProps}
                                />
                            )}
                        />
                    )}
                    {show && (
                        <Route
                            path={`${basePath}/:id/show`}
                            render={(routeProps): ReactElement => (
                                <WithPermissions
                                    component={show}
                                    basePath={basePath}
                                    resource={resource}
                                    id={decodeURIComponent(
                                        (routeProps.match as ResourceMatch)
                                            .params.id
                                    )}
                                    {...routeProps}
                                    {...props}
                                />
                            )}
                        />
                    )}
                    {edit && (
                        <Route
                            path={`${basePath}/:id`}
                            render={(routeProps): ReactElement => (
                                <WithPermissions
                                    component={edit}
                                    basePath={basePath}
                                    resource={resource}
                                    id={decodeURIComponent(
                                        (routeProps.match as ResourceMatch)
                                            .params.id
                                    )}
                                    {...routeProps}
                                />
                            )}
                        />
                    )}
                    <Route
                        path={basePath}
                        render={(): ReactElement => (
                            <Title title={title} defaultTitle={defaultTitle} />
                        )}
                    />
                </Switch>
            </div>
        </div>
    );
};

export interface TreeWithDetailsProps extends TreeProps {
    allowMultipleRoots?: boolean;
    basePath?: string;
    create?: ComponentType<ResourceComponentProps>;
    edit?: ComponentType<ResourceComponentPropsWithId>;
    hideRootNodes?: boolean;
    lazy?: boolean;
    linkTo?: string;
    nodeActions?: ReactElement<NodeActionsProps>;
    resource?: string;
    show?: ComponentType<ResourceComponentPropsWithId>;
    showLine?: boolean;
    title?: string | ReactElement;
    titleField?: string;
}

const sanitizeRestProps = ({
    permission,
    basePath,
    history,
    location,
    match,
    options,
    hasList,
    hasEdit,
    hasShow,
    hasCreate,
    ...rest
}: any): any => rest;

TreeWithDetails.propTypes = {
    basePath: PropTypes.string.isRequired,
    edit: ComponentPropType,
    create: ComponentPropType,
    resource: PropTypes.string.isRequired,
};

export default TreeWithDetails;

const useStyles = makeStyles({
    actionCard: {
        width: '100%',
    },
    cardTree: {
        minWidth: '300px',
        marginTop: '1em',
        marginRight: '1em',
    },
    container: {
        display: 'flex',
    },
});
