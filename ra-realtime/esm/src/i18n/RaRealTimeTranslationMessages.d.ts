export default interface RaRealTimeTranslationMessages {
    'ra-realtime': {
        action: {
            refresh: string;
        };
        event_type: {
            updated: string;
            created: string;
            deleted: string;
        };
        notification: {
            title: string;
            record: {
                updated: string;
                deleted: string;
            };
            list: {
                refreshed: string;
            };
            lock: {
                lockedBySomeoneElse: string;
                lockedByMe: string;
                unlocked: string;
            };
        };
        error: {
            type: string;
            topic: string;
            lock: {
                noLock: string;
                lockedBySomeoneElse: string;
                cannotUnlock: string;
            };
        };
    };
}
