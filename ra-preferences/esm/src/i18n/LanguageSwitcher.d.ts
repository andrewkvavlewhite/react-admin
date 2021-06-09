import { FC } from 'react';
export interface Props {
    languages: {
        locale: string;
        name: string;
    }[];
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
declare const LanguageSwitcher: FC<Props>;
export default LanguageSwitcher;
