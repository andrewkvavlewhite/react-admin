import {
    I18nProvider,
    mergeTranslations,
    TranslationMessages,
} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import englishMessages from 'ra-language-english';
import {
    raRealTimeLanguageEnglish,
    RaRealTimeTranslationMessages,
} from '@react-admin/ra-realtime';
import {
    raRelationshipsLanguageEnglish,
    RaRelationshipsTranslationMessages,
} from '@react-admin/ra-relationships';
import {
    raTreeLanguageEnglish,
    RaTreeTranslationMessages,
} from '@react-admin/ra-tree';
import {
    raSearchLanguageEnglish,
    RaSearchTranslationMessages,
} from '@react-admin/ra-search';
import {
    raAuditLogLanguageEnglish,
    RaAuditLogTranslationMessages,
} from '@react-admin/ra-audit-log';
import {
    raFormLayoutLanguageEnglish,
    RaFormLayoutTranslationMessages,
} from '@react-admin/ra-form-layout';

import cloneDeep from 'lodash/cloneDeep';

export interface RaEnterpriseTranslationMessages
    extends TranslationMessages,
        RaRealTimeTranslationMessages,
        RaRelationshipsTranslationMessages,
        RaTreeTranslationMessages,
        RaSearchTranslationMessages,
        RaAuditLogTranslationMessages,
        RaFormLayoutTranslationMessages {}

export const defaultMessages: Record<
    string,
    Partial<RaEnterpriseTranslationMessages>
> = {
    en: mergeTranslations(
        raRealTimeLanguageEnglish,
        raRelationshipsLanguageEnglish,
        raTreeLanguageEnglish,
        raSearchLanguageEnglish,
        raAuditLogLanguageEnglish,
        raFormLayoutLanguageEnglish,
        englishMessages
    ),
};

/**
 * Returns a configured i18n provider for the ra-enterprise modules.
 *
 * This i18n provider is based on polyglot 'polyglotI18nProvider'.
 *
 * What is pre-configured?
 * - English translations for '@react-admin/ra-realtime'
 * - English translations for '@react-admin/ra-relationships'
 * - English  translations for '@react-admin/ra-tree'
 * - English translations for '@react-admin/ra-search'
 * - English translations for '@react-admin/ra-audit-log'
 * - English translations for '@react-admin/ra-form-layout'
 *
 * @param {EnterpriseTranslationMessages} messages Your own translations including overrides of the pre-configured modules.
 * @param {string} defaultLocale The default locale. Default to 'en' for English.
 *
 * @returns An i18n provider configured to work with all the ra-enterprise modules.
 *
 * @example Add a new language (Spanish) and use it as default (es)
 *
 * import spanishMessages from '@blackbox-vision/ra-language-spanish';
 * import { buildI18nProvider } from '@react-admin/ra-enterprise';
 *
 * const messages = {
 *     es: {
 *         ...spanishMessages,
 *         'ra-relationships': {
 *              duallistinput: {
 *                  availableItems: 'Elementos disponibles',
 *                  selectedItems: 'Elementos seleccionados',
 *             },
 *         },
 *         // Configure the other modules here
 *     },
 * };
 *
 * const i18nProvider = buildI18nProvider(messages, 'es');
 *
 */
export function buildI18nProvider<
    TranslationMessagesType extends RaEnterpriseTranslationMessages = RaEnterpriseTranslationMessages
>(
    messages?: Record<string, Partial<TranslationMessagesType>>,
    defaultLocale = 'en'
): I18nProvider {
    const mergedMessages = cloneDeep(defaultMessages);

    if (messages != null) {
        Object.keys(messages).forEach(locale => {
            mergedMessages[locale] = mergeTranslations(
                mergedMessages[locale] || {},
                messages[locale]
            );
        });
    }

    return polyglotI18nProvider(
        locale => mergedMessages[locale],
        defaultLocale
    );
}
