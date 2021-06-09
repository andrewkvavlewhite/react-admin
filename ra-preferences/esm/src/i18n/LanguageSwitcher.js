import React from 'react';
import { useLocale } from 'react-admin';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useSetLocaleAndPreference from './useSetLocaleAndPreference';
/**
 * Language selector. Changes the locale in the app and persists it in
 * preferences so that the app opens with the right locale in the future.
 *
 * @example
 *
 *     const MyAppBar: FC = props => (
 *         <AppBar {...props}>
 *             <Box flex="1">
 *                 <Typography variant="h6" id="react-admin-title"></Typography>
 *             </Box>
 *             <LanguageSwitcher
 *                 languages={[
 *                     { locale: 'en', name: 'English' },
 *                     { locale: 'fr', name: 'Français' },
 *                 ]}
 *             />
 *         </AppBar>
 *     );
 */
var LanguageSwitcher = function (_a) {
    var languages = _a.languages, _b = _a.defaultLanguage, defaultLanguage = _b === void 0 ? '' : _b;
    var classes = useStyles();
    var _c = React.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var locale = useLocale();
    var setLocale = useSetLocaleAndPreference();
    var getNameForLocale = function (locale) {
        var language = languages.find(function (language) { return language.locale === locale; });
        return language ? language.name : defaultLanguage;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    var changeLocale = function (locale) { return function () {
        setLocale(locale);
        setAnchorEl(null);
    }; };
    var handleLanguageClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { color: "inherit", "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: handleLanguageClick },
            React.createElement(LanguageIcon, null),
            React.createElement("div", { className: classes.languageContainer }, getNameForLocale(locale)),
            React.createElement(ExpandMoreIcon, { fontSize: "small" })),
        React.createElement(Menu, { id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, languages.map(function (language) { return (React.createElement(MenuItem, { key: language.locale, onClick: changeLocale(language.locale) }, language.name)); }))));
};
export default LanguageSwitcher;
var useStyles = makeStyles(function (theme) { return ({
    languageContainer: {
        marginLeft: theme.spacing(1),
    },
}); });
