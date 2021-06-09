import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from 'react-admin';
import AddPostButton from './simulateActions/AddPostButton';
var Dashboard = function () {
    var classes = useStyles();
    return (React.createElement("div", { className: classes.dashboard },
        React.createElement(Card, null,
            React.createElement(Title, { title: "Welcome to the administration in Real Time" }),
            React.createElement(CardContent, null,
                React.createElement(Typography, null, "To see a resource badge in the left menu,")),
            React.createElement(CardActions, null,
                React.createElement(AddPostButton, { variant: "contained" })))));
};
export default Dashboard;
var useStyles = makeStyles({
    dashboard: {
        maxWidth: '450px',
    },
});
