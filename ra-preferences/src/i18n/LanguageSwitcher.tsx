import React, { FC } from 'react';
import { useLocale } from 'react-admin';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useSetLocaleAndPreference from './useSetLocaleAndPreference';

export interface Props {
    languages: { locale: string; name: string }[];
    /** @deprecated */
    defaultLanguage?: string;
}

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
const LanguageSwitcher: FC<Props> = ({ languages, defaultLanguage = '' }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const locale = useLocale();
    const setLocale = useSetLocaleAndPreference();

    const getNameForLocale = (locale: string): string => {
        const language = languages.find(language => language.locale === locale);
        return language ? language.name : defaultLanguage;
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const changeLocale = (locale: string) => (): void => {
        setLocale(locale);
        setAnchorEl(null);
    };

    const handleLanguageClick = (
        event: React.MouseEvent<HTMLElement>
    ): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleLanguageClick}
            >
                <LanguageIcon />
                <div className={classes.languageContainer}>
                    {getNameForLocale(locale)}
                </div>
                <ExpandMoreIcon fontSize="small" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {languages.map(language => (
                    <MenuItem
                        key={language.locale}
                        onClick={changeLocale(language.locale)}
                    >
                        {language.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;

const useStyles = makeStyles(theme => ({
    languageContainer: {
        marginLeft: theme.spacing(1),
    },
}));
