import React, { FC } from 'react';
import { useTranslate, RefreshButton } from 'react-admin';
import { Alert, AlertTitle } from '@material-ui/lab';

const Warning: FC<{
    message: string;
    refresh?: boolean;
    onRefresh?: () => void;
}> = ({ message, refresh, onRefresh }) => {
    const translate = useTranslate();
    return (
        <Alert
            severity="warning"
            action={refresh && <RefreshButton onClick={onRefresh} />}
        >
            <AlertTitle>
                {translate('ra-realtime.notification.title')}
            </AlertTitle>
            {message}
        </Alert>
    );
};

export default Warning;
