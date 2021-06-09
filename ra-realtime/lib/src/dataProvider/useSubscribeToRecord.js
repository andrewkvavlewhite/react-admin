"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useSubscribe_1 = __importDefault(require("./useSubscribe"));
/**
 * Hook to subscribe to the events for a record
 * on mount (and unsubscribe on unmount).
 *
 * @example // Auto-Updated PostShow
 *
 * const PostShow: FC<ShowProps> = (props) => {
 *     const notify = useNotify();
 *     const refresh = useRefresh();
 *     useSubscribeToRecord('posts', props.id, () => {
 *         refresh();
 *         notify('Record updated server-side');
 *     });
 *     return <Show {...props}/>;
 * };
 */
var useSubscribeToRecord = function (resource, id, subscriptionCallback) {
    var topic = "resource/" + resource + "/" + id;
    useSubscribe_1.default(topic, subscriptionCallback);
};
exports.default = useSubscribeToRecord;
