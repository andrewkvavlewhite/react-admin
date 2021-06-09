var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EventSourcePolyfill } from 'event-source-polyfill';
import debounce from 'lodash/debounce';
/**
 * Add realTime methods to a dataProvider based on a Mercure Hub inside API-Platform.
 *
 * @see https://mercure.rocks/
 * @see https://api-platform.com/docs/core/mercure/#creating-async-apis-using-the-mercure-protocol
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} mercureURL The adress of the Mercure Hub
 * @param {string} jwt The JWT to connect to the Mercure Hub
 * @param {string} topicPrefix The prefix used for each subcription topic
 *
 * @example
 *
 * const realTimeDataProvider = addRealTimeMethodsBasedOnApiPlatform(
 *     dataProvider,
 *     'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.SWKHNF9wneXTSjBg81YN5iH8Xb2iTf_JwhfUY5Iyhsw',
 *     'http://path.to.my.api/.well-known/mercure'
 * );
 *
 * await realTimeDataProvider.subscribe('resource/post', (event) => {
 *    console.log(`Post ${event.payload.id} modified`);
 * });
 *
 * await realTimeDataProvider.publish('resource/post', {
 *     topic: 'resource/post',
 *     type: 'updated',
 *     payload: { id: 1234 }
 * })
 */
var addRealTimeMethodsBasedOnApiPlatform = function (dataProvider, mercureURL, jwt, topicPrefix) {
    if (mercureURL === void 0) { mercureURL = 'https://localhost:1337/.well-known/mercure'; }
    if (jwt === void 0) { jwt = null; }
    if (topicPrefix === void 0) { topicPrefix = 'https://localhost:8443'; }
    var subscriptions = [];
    var eventSources = {};
    var openEventSource = debounce(function (topic) {
        var url = new URL(mercureURL);
        url.searchParams.append('topic', "" + topicPrefix + transformTopicFromRaRealtime(topic));
        return new Promise(function (resolve, reject) {
            var eventSource = eventSources[topic];
            if (!eventSource) {
                var params = jwt !== null
                    ? { headers: { Authorization: "Bearer " + jwt } }
                    : {};
                eventSource = new EventSourcePolyfill(url, params);
                eventSource.onmessage = function (event) {
                    var callbackEvent = transformEventFromApiPlatform(event, topic);
                    subscriptions.map(function (subscription) {
                        if (subscription.topic === topic) {
                            subscription.subscriptionCallback(callbackEvent);
                        }
                    });
                };
                eventSource.onopen = function () {
                    resolve({ data: true });
                };
                eventSource.onerror = function (error) {
                    console.warn('EventSource error: ', error);
                    reject(error);
                };
                eventSources[topic] = eventSource; // Store the event source
            }
            else {
                // The event source already exists
                resolve({ data: true });
            }
        });
    }, 500);
    var closeEventSource = function (topic) {
        if (eventSources[topic] && eventSources[topic].close) {
            eventSources[topic].close();
            delete eventSources[topic]; // Delete the event source
        }
        return Promise.resolve({ data: true });
    };
    return __assign(__assign({}, dataProvider), { subscribe: function (topic, subscriptionCallback) { return __awaiter(void 0, void 0, void 0, function () {
            var hasAlreadySubscribed;
            return __generator(this, function (_a) {
                hasAlreadySubscribed = !!subscriptions.find(function (subscription) {
                    return subscription.topic === topic &&
                        subscription.subscriptionCallback !== subscriptionCallback;
                });
                if (hasAlreadySubscribed) {
                    // Don't subscribe the same event several times
                    return [2 /*return*/, Promise.resolve({ data: true })];
                }
                subscriptions.push({
                    topic: topic,
                    subscriptionCallback: subscriptionCallback,
                });
                return [2 /*return*/, openEventSource(topic)];
            });
        }); }, unsubscribe: function (topic, subscriptionCallback) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                subscriptions = subscriptions.filter(function (subscription) {
                    return (subscription.topic !== topic ||
                        subscription.subscriptionCallback !== subscriptionCallback);
                });
                return [2 /*return*/, closeEventSource(topic)];
            });
        }); }, publish: function () {
            // Push events should be triggered by API-Platform
            return Promise.resolve();
        } });
};
export default addRealTimeMethodsBasedOnApiPlatform;
/**
 * Transform a topic written using the ra-realtime convention
 * into a topic following the API-Platform convention
 *
 * @param {*} topic The topic in ra-realtime format
 *
 * @returns A topic translated using API-Platform convention
 *
 * @example Subscribe to a record
 *
 * => Format of the ra-realtime topic: `resource/${resource}/${id}`
 * => Format of the id: `/${resource}/${originId}`
 * Should be passed to API-Platform as: `/${resource}/${originId}`
 *
 * @example Subscribe to a list:
 *
 * Format of the ra-realtime topic: `resource/${resource}`
 * => Should be passed to API-Platform as: `/${resource}/{id}`
 *
 * Note that {id} is not interpreted. It's a string meaning all the resource events.
 *
 */
function transformTopicFromRaRealtime(topic) {
    var _a = topic.split('/'), _ = _a[0], resource = _a[1], id = _a.slice(2);
    if (!id || id.length === 0) {
        return "/" + resource + "/{id}";
    }
    var originId = id[2];
    return "/" + resource + "/" + originId;
}
/**
 * Transform an event emitted by API-Platform to add a ra-realtime event type.
 *
 * The event type could be "updated" or "deleted". Creating an element is considered as an update.
 *
 * @param {*} event The event in API-Platform format
 * @param {*} topic The topic
 *
 * @returns An augmented event for ra-realtime
 *
 */
function transformEventFromApiPlatform(event, topic) {
    var eventData = JSON.parse(event.data);
    var type = eventData['@type'] != null ? 'updated' : 'deleted';
    return __assign(__assign({}, eventData), { type: type,
        topic: topic });
}
