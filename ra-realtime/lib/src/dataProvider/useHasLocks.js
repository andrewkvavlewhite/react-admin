"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var actions_1 = require("../actions");
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
function useHasLocks(resource) {
    var dispatch = react_redux_1.useDispatch();
    var dataProvider = react_admin_1.useDataProvider();
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var data = react_redux_1.useSelector(function (state) {
        return state.locks[resource] ? Object.values(state.locks[resource]) : [];
    });
    react_1.useEffect(function () {
        /**
         * Because of async unlock
         * We need to ensure the record is unlocked when coming back from our lock
         * So we differ records lookup to the next tick on mount
         */
        dispatch({
            type: actions_1.GET_LOCKS_LOADING,
            payload: {},
            meta: {
                resource: resource,
            },
        });
        dataProvider
            .getLocks(resource)
            .then(function (_a) {
            var locks = _a.data;
            dispatch({
                type: actions_1.GET_LOCKS_SUCCESS,
                payload: {
                    data: locks,
                },
                meta: {
                    resource: resource,
                    fetchResponse: actions_1.GET_LOCKS,
                },
            });
        })
            .catch(function () {
            dispatch({
                type: actions_1.GET_LOCKS_FAILURE,
                payload: {},
                meta: {
                    resource: resource,
                },
            });
        })
            .finally(function () {
            setLoading(false);
        });
    }, [resource]);
    return { loading: loading, data: data };
}
exports.default = useHasLocks;
