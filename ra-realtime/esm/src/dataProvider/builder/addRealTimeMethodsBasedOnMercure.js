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
import qs from 'querystring';
import debounce from 'lodash/debounce';
/**
 * Add realTime methods to a dataProvider based on a Mercure Hub.
 *
 * @see https://mercure.rocks/
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} mercureURL The adress of the Mercure hub
 * @param {string} jwt The JWT to connect to Mercure hub
 * @param {string} topicPrefix The prefix used for each subcription topics (without slash at the end)
 *
 * @example
 *
 * const realTimeDataProvider = addRealTimeMethodsBasedOnMercure(
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
var addRealTimeMethodsBasedOnMercure = function (dataProvider, mercureURL, jwt, topicPrefix) {
    if (jwt === void 0) { jwt = 'set_jwt_key'; }
    if (topicPrefix === void 0) { topicPrefix = 'http://localhost/mercure'; }
    var subscriptions = [];
    var eventSource;
    var openEventSource = debounce(function () {
        eventSource && eventSource.close && eventSource.close();
        var url = new URL(mercureURL);
        var topics = Array.from(new Set(subscriptions.map(function (subscription) { return subscription.topic; })));
        topics.forEach(function (topic) {
            return url.searchParams.append('topic', topicPrefix + "/" + topic);
        });
        return new Promise(function (resolve, reject) {
            eventSource = new EventSourcePolyfill(url, {
                headers: { Authorization: "Bearer " + jwt },
            });
            eventSource.onmessage = function (e) {
                var event = JSON.parse(e.data);
                subscriptions.map(function (subscription) {
                    event.topic === subscription.topic &&
                        subscription.subscriptionCallback(event);
                });
            };
            eventSource.onopen = function () { return resolve({ data: true }); };
            eventSource.onerror = function (err) {
                // eslint-disable-next-line no-console
                console.warn('EventSource error: ', err);
                reject(err);
            };
            return { data: true };
        });
    }, 500);
    var setPromise = function (error) {
        return new Promise(function (resolve, reject) {
            if (error) {
                return reject(error);
            }
            try {
                return { data: true };
            }
            catch (e) {
                return reject(e);
            }
        });
    };
    var pushEvent = function (topic, payload) {
        var body = {
            topic: topicPrefix + "/" + topic,
            data: payload,
        };
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: "Bearer " + jwt,
        };
        return fetch(mercureURL, {
            method: 'POST',
            body: qs.stringify(body),
            headers: headers,
        })
            .then(function (mercureRes) {
            console.log('Push mercure done'); // eslint-disable-line no-console
            console.log(mercureRes); // eslint-disable-line no-console
            return { data: true };
        })
            .catch(function (mercureError) {
            return { data: new Error(mercureError) };
        });
    };
    return __assign(__assign({}, dataProvider), { subscribe: function (topic, subscriptionCallback) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                subscriptions.push({ topic: topic, subscriptionCallback: subscriptionCallback });
                return [2 /*return*/, openEventSource()];
            });
        }); }, unsubscribe: function (topic, subscriptionCallback) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                subscriptions = subscriptions.filter(function (subscription) {
                    return subscription.topic !== topic ||
                        subscription.subscriptionCallback !== subscriptionCallback;
                });
                return [2 /*return*/, openEventSource()];
            });
        }); }, publish: function (topic, event) {
            if (!topic) {
                return setPromise(new Error('ra-realtime.error.topic'));
            }
            if (!event.type) {
                return setPromise(new Error('ra-realtime.error.type'));
            }
            var payload = JSON.stringify(event);
            return pushEvent(topic, payload);
        } });
};
export default addRealTimeMethodsBasedOnMercure;
