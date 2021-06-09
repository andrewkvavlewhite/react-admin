import { UseHasLock } from '../types';
/**
 * Hook to get resource locks.
 *
 * Use it to list locks or to customize a row in a list of resource records
 *
 * @param {string} resource
 *
 * @returns The current request state. Destructure as { data }.
 *
 * @example Simple Usage
 *
 * const MyPostRow: FC<any> = ({ locks, ...props }) => {
 *    const recordId = props.record.id;
 *    const lock = locks.find(l => l.recordId === recordId);
 *
 *    return (
 *        <TableRow id={recordId}>
 *            <TableCell>
 *                <TextField source="title" {...props} />
 *                {lock && (
 *                    <span style={{ color: 'red' }}>
 *                        {` (Locked by ${lock.identity})`}
 *                    </span>
 *                )}
 *            </TableCell>
 *            <TableCell align="right">
 *                <EditButton {...props} />
 *            </TableCell>
 *        </TableRow>
 *    );
 *};
 *
 *const MyPostGridBody: FC<any> = ({ locks, ...props }) => (
 *    <DatagridBody {...props} row={<MyPostRow locks={locks} />} />
 *);
 *
 *const MyPostGrid: FC<any> = props => {
 *    const { data: locks } = useHasLocks(props.resource);
 *    return <Datagrid {...props} body={<MyPostGridBody locks={locks} />} />;
 *};
 *
 *const MyListView: FC<any> = props => (
 *    <List {...props}>
 *        <MyPostGrid />
 *    </List>
 *);
 *
 */
declare function useHasLocks(resource: string): UseHasLock;
export default useHasLocks;
