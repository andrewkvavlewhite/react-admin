import { Identifier } from 'react-admin';
import { UseHasLock } from '../types';
/**
 * Hook to get a record lock.
 *
 * Use it to display a warning or to disable a button.
 * If you just want to lock a record,
 * please use the `useLock` hook instead.
 *
 * @param {string} resource
 * @param {any} recordId
 *
 * @returns The current request state. Destructure as { data }.
 *
 * @example Simple Usage
 *
 * function PostEdit() {
 *     const { resource, id } = props;
 *
 *     const { loading } = useLock(resource, id, 'mario');
 *
 *     if (loading) {
 *         return <CircularProgress />;
 *     }
 *
 *     return (
 *         <Edit {...props}>
 *             <SimpleForm toolbar={<CustomToolbar />}>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * }
 *
 * function CustomToolbar(props): FC<Props> {
 *     const { resource, record } = props;
 *
 *     const { loading, data: lock } = useHasLock(resource, record.id);
 *
 *     const isMarioLocker = lock?.identity === 'mario';
 *
 *     return (
 *         <Toolbar {...props}>
 *             <SaveButton disabled={loading || !isMarioLocker} />
 *         </Toolbar>
 *     );
 * }
 *
 */
declare function useHasLock(resource: string, recordId: Identifier): UseHasLock;
export default useHasLock;
