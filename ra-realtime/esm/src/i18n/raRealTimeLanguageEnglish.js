var raRealTimeEnglishMessages = {
    'ra-realtime': {
        action: {
            refresh: 'Refresh',
        },
        event_type: {
            updated: 'updated',
            created: 'created',
            deleted: 'deleted',
        },
        notification: {
            title: 'Warning',
            record: {
                updated: 'This record has been updated by another user',
                deleted: 'This record has been deleted and is no longer available',
            },
            list: {
                refreshed: 'List refreshed with %{smart_count} %{name} %{type} by another user',
            },
            lock: {
                lockedBySomeoneElse: 'This record is locked by someone else.',
                lockedByMe: 'You locked this record.',
                unlocked: 'This record has been unlocked.',
            },
        },
        error: {
            type: 'The type of the event is missing',
            topic: 'The topic is missing',
            lock: {
                noLock: 'There is no lock for this record.',
                lockedBySomeoneElse: 'This record is locked by someone else.',
                cannotUnlock: 'Impossible to unlock this record.',
            },
        },
    },
};
export default raRealTimeEnglishMessages;
