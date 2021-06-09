import { ComponentType, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ResourceComponentProps, ResourceComponentPropsWithId } from 'react-admin';
import { TreeProps } from './Tree';
import { NodeActionsProps } from './NodeActions';
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
export declare const TreeWithDetails: {
    ({ allowMultipleRoots, basePath, create, edit, hideRootNodes, lazy, linkTo, nodeActions, resource, show, showLine, title, titleField, ...props }: TreeWithDetailsProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Validator<string>;
        edit: (props: any, propName: any, componentName: any) => Error;
        create: (props: any, propName: any, componentName: any) => Error;
        resource: PropTypes.Validator<string>;
    };
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
export default TreeWithDetails;
