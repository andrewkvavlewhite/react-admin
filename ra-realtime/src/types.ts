import { Identifier, Record } from 'react-admin';
import { EventSourcePolyfill } from 'event-source-polyfill';

export enum EventType {
    Updated = 'updated',
    Created = 'created',
    Deleted = 'deleted',
}

export interface Event {
    topic: string;
    type: EventType;
    [key: string]: any;
}

export interface RecordListEvent extends Event {
    payload?: {
        ids: Identifier[];
    };
}

export interface RecordEvent extends Event {
    payload?: {
        id: Identifier;
    };
}

export type SubscriptionCallback<T = Event> = (event: T) => void;

export type Subscriptions = {
    topic: string;
    subscriptionCallback: SubscriptionCallback;
}[];

export interface EventSources {
    [topic: string]: EventSourcePolyfill;
}

export type GetOrdersListEvents = (Array) => void;

export interface RealTimeDataProvider {
    subscribe: (
        topic: string,
        subscriptionCallback: SubscriptionCallback
    ) => Promise<any>;
    unsubscribe: (
        topic: string,
        subscriptionCallback: SubscriptionCallback
    ) => Promise<any>;
    publish: (topic: string, payload: Event) => Promise<any>;
}

export type Lock = {
    id?: Identifier;
    resource: string;
    recordId: Identifier;
    createdAt?: any;
    identity?: string;
};

export interface UseLockOptions {
    onSuccess?: (response: any) => any;
    onFailure?: (error?: any) => any;
    onUnlockSuccess?: (response: any) => any;
    onUnlockFailure?: (error?: any) => any;
}

export interface UseLock {
    loading: boolean;
    loaded: boolean;
    error?: any;
    data?: Record;
}

export interface UseHasLock {
    data?: any;
    loading?: boolean;
}

export interface LocksDataProvider {
    lock: (resource: string, data: Lock) => Promise<any>;
    unlock: (resource: string, data: Lock) => Promise<any>;
    getLock: (resource: string, data: Lock) => Promise<any>;
    getLocks: (resource: string) => Promise<any>;
}

export interface LocksReduxSubState {
    [resource: string]: {
        [key: string]: Lock;
    };
}

export interface LockReduxState {
    locks: LocksReduxSubState;
}
