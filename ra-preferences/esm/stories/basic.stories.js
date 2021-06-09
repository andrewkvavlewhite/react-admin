import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { usePreferences } from '../src';
export default { title: 'ra-preferences/usePreferences' };
var Preferences = function () {
    var preferences = usePreferences()[0];
    return (React.createElement(Typography, { component: "p", gutterBottom: true },
        "Preferences: ",
        JSON.stringify(preferences)));
};
var Theme = function () {
    var theme = usePreferences('theme')[0];
    return (React.createElement(Typography, { component: "p", gutterBottom: true },
        "Theme: ",
        theme));
};
var FontSize = function () {
    var fontSize = usePreferences('fontSize')[0];
    return (React.createElement(Typography, { component: "p", gutterBottom: true },
        "Font Size: ",
        fontSize));
};
export var Basic = function () { return (React.createElement(Card, null,
    React.createElement(CardContent, null,
        React.createElement(Preferences, null),
        React.createElement(Theme, null),
        React.createElement(FontSize, null)))); };
