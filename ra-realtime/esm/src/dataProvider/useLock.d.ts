import { Identifier } from 'react-admin';
import { UseLock, UseLockOptions } from '../types';
/**
 * Hook to lock a record on mount. The record is unlocked when unmounting the component.
 * Be careful, you cannot have two locks on the same record.
 * If you just want to get the current lock (for example to display a warning),
 * please use the `useHasLock` hook instead.
 *
 * @param {string} resource The resource to lock
 * @param {any} recordId The record id to lock
 * @param {string} identity The identity of the locker
 * @param {Object} options Options applied to the lock / unlock mechanism
 * @param {Function} options.onSuccess Side effect function to be executed upon lock success, e.g. `{ onSuccess: () => notify('ra-realtime.notification.lock.lockedByMe') } }`
 * @param {Function} options.onFailure Side effect function to be executed upon lock failure, e.g. `{ onFailure: error => notify(error) } }`
 * @param {Function} options.onUnlockSuccess Side effect function to be executed upon unlock success, e.g. `{ onUnlockSuccess: () => notify('ra-realtime.notification.lock.unlocked') } }`
 * @param {Function} options.onUnlockFailure Side effect function to be executed upon unlock failure, e.g. `{ onUnlockFailure: error => notify(error) } }`
 *
 * @returns The current request state. Destructure as `{ data, error, loading, loaded }`.
 *
 * @example Simple Usage
 *
 * const MyLockedEditView: FC<any> = props => {
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
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * };
 *
 */
declare function useLock(resource: string, recordId: Identifier, identity: string, options?: UseLockOptions): UseLock;
export default useLock;
