import { defaultTheme } from 'react-admin';
import { ThemeOptions as MuiThemeOptions } from '@material-ui/core';

export type Overrides = {
    [key: string]: any;
};

export interface ThemeOptions extends MuiThemeOptions {
    overrides?: Overrides;
}

export const theme: ThemeOptions = {
    ...defaultTheme,
    overrides: {
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
    },
};
