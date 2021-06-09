import { Record, useMutation } from 'react-admin';
/**
 * Get a callback to call the dataProvider.deleteBranch() method, the result
 * of the call (the deleted records), and the loading state.
 *
 * The return value updates according to the request state:
 *
 * - start: [callback, { loading: true, loaded: false }]
 * - success: [callback, { data: [data from response], loading: false, loaded: true }]
 * - error: [callback, { error: [error from response], loading: false, loaded: true }]
 *
 * @param resource The resource name, e.g. 'posts'
 * @param record The record to delete
 * @param options Options object to pass to the dataProvider. May include side effects to be executed upon success or failure, e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as [delete, { data, error, loading, loaded }].
 *
 * @example
 *
 * import { useDeleteBranch } from '@react-admin/ra-tree';
 *
 * const DeleteButton = ({ record }) => {
 *     const [deleteBranch, { loading, error }] = useDeleteBranch('categories', record);
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={loading} onClick={deleteBranch}>Delete</div>;
 * };
 */
const useDeleteBranch = (resource: string, record: Record, options?: any) =>
    useMutation(
        { type: 'deleteBranch', resource, payload: { data: record } },
        options
    );

export default useDeleteBranch;
