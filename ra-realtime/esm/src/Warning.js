import React from 'react';
import { useTranslate, RefreshButton } from 'react-admin';
import { Alert, AlertTitle } from '@material-ui/lab';
var Warning = function (_a) {
    var message = _a.message, refresh = _a.refresh, onRefresh = _a.onRefresh;
    var translate = useTranslate();
    return (React.createElement(Alert, { severity: "warning", action: refresh && React.createElement(RefreshButton, { onClick: onRefresh }) },
        React.createElement(AlertTitle, null, translate('ra-realtime.notification.title')),
        message));
};
export default Warning;
