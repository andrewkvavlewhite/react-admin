import { ThemeOptions as MuiThemeOptions } from '@material-ui/core';
export declare type Overrides = {
    [key: string]: any;
};
export interface ThemeOptions extends MuiThemeOptions {
    overrides?: Overrides;
}
export declare const theme: ThemeOptions;
