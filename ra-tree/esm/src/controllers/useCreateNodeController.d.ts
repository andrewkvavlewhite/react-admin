import { CreateProps, CreateControllerProps } from 'react-admin';
/**
 * Prepare data for the Create view
 *
 * @param {Object} props The props passed to the Create component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Create view
 *
 * @example
 *
 * import { CreateView } from 'react-admin';
 * import { useCreateNodeController } from '@react-admin/ra-tree';
 *
 * const MyCreateNode = props => {
 *     const controllerProps = useCreateNodeController(props);
 *     return <CreateView {...controllerProps} {...props} />;
 * }
 */
declare const useCreateNodeController: (props: CreateProps) => CreateControllerProps;
export default useCreateNodeController;
