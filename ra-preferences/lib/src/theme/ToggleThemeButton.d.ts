import { FC } from 'react';
/**
 * Button toggling the theme (light or dark) in the preferences.
 *
 * To be used in conjunction with PreferencesBasedThemeProvider.
 *
 * @see PreferencesBasedThemeProvider
 *
 * @example
 *
 *     const MyAppBar: FC = props => (
 *         <AppBar {...props}>
 *             <Box flex="1">
 *                 <Typography variant="h6" id="react-admin-title"></Typography>
 *             </Box>
 *             <ToggleThemeButton />
 *         </AppBar>
 *     );
 *
 *     const MyLayout: FC = props => <Layout {...props} appBar={MyAppBar} />;
 */
declare const ToggleThemeButton: FC;
export default ToggleThemeButton;
