import { RaAuditLogTranslationMessages } from './RaAuditLogTranslationMessages';

export const raAuditLogLanguageEnglish: RaAuditLogTranslationMessages = {
    'ra-audit-log': {
        event: {
            create: 'Created %{resource} %{name}',
            delete: 'Deleted %{resource} %{name}',
            deleteMany: 'Deleted %{resource} %{ids}',
            update: 'Updated %{resource} %{name}',
            updateMany: 'Updated %{resource} %{ids}',
        },
        inline_event: {
            create: 'created %{resource} %{name}',
            delete: 'deleted %{resource} %{name}',
            deleteMany: 'deleted %{resource} %{ids}',
            update: 'updated %{resource} %{name}',
            updateMany: 'updated %{resource} %{ids}',
        },
        short_event: {
            create: 'Creation',
            delete: 'Deletion',
            update: 'Update',
        },
        author: '{fullName}',
        period_filters: {
            today: 'Today',
            this_week: 'This week',
            this_month: 'This month',
            this_quarter: 'This quarter',
        },
        filter: {
            author: 'By author',
            date: 'By date',
            resource: 'By resource',
        },
        fields: {
            author: 'Author',
            action: 'Action',
            date: 'Date',
            resource: 'Resource',
        },
    },
};
