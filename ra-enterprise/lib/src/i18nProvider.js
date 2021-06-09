"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildI18nProvider = exports.defaultMessages = void 0;
var react_admin_1 = require("react-admin");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_realtime_1 = require("@react-admin/ra-realtime");
var ra_relationships_1 = require("@react-admin/ra-relationships");
var ra_tree_1 = require("@react-admin/ra-tree");
var ra_search_1 = require("@react-admin/ra-search");
var ra_audit_log_1 = require("@react-admin/ra-audit-log");
var ra_form_layout_1 = require("@react-admin/ra-form-layout");
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
exports.defaultMessages = {
    en: react_admin_1.mergeTranslations(ra_realtime_1.raRealTimeLanguageEnglish, ra_relationships_1.raRelationshipsLanguageEnglish, ra_tree_1.raTreeLanguageEnglish, ra_search_1.raSearchLanguageEnglish, ra_audit_log_1.raAuditLogLanguageEnglish, ra_form_layout_1.raFormLayoutLanguageEnglish, ra_language_english_1.default),
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
function buildI18nProvider(messages, defaultLocale) {
    if (defaultLocale === void 0) { defaultLocale = 'en'; }
    var mergedMessages = cloneDeep_1.default(exports.defaultMessages);
    if (messages != null) {
        Object.keys(messages).forEach(function (locale) {
            mergedMessages[locale] = react_admin_1.mergeTranslations(mergedMessages[locale] || {}, messages[locale]);
        });
    }
    return ra_i18n_polyglot_1.default(function (locale) { return mergedMessages[locale]; }, defaultLocale);
}
exports.buildI18nProvider = buildI18nProvider;
