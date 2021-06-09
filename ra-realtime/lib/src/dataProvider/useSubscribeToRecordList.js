"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useSubscribe_1 = __importDefault(require("./useSubscribe"));
/**
 * Hook to subscribe to the events for a record list
 * on mount (and unsubscribe on unmount).
 *
 * @example // Auto-Updated PostList
 *
 * const PostList: FC<ListProps> = (props) => {
 *     const notify = useNotify();
 *     const refresh = useRefresh();
 *     useSubscribeToRecordList('posts', () => {
 *         refresh();
 *         notify('list updated server-side');
 *     });
 *     return (
 *         <List {...props}>
 *             <Datagrid>
 *                 <TextField source="title" />
 *             </Datagrid>
 *         </List>;
 *     ):
 * };
 */
var useSubscribeToRecordList = function (resource, subscriptionCallback) {
    var topic = "resource/" + resource;
    useSubscribe_1.default(topic, subscriptionCallback);
};
exports.default = useSubscribeToRecordList;
