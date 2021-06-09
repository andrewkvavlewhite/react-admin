export interface RaAuditLogTranslationMessages {
    'ra-audit-log': {
        event: {
            create: string;
            delete: string;
            deleteMany: string;
            update: string;
            updateMany: string;
        };
        inline_event: {
            create: string;
            delete: string;
            deleteMany: string;
            update: string;
            updateMany: string;
        };
        short_event: {
            create: string;
            delete: string;
            update: string;
        };
        author: string;
        period_filters: {
            today: string;
            this_week: string;
            this_month: string;
            this_quarter: string;
        };
        filter: {
            author: string;
            date: string;
            resource: string;
        };
        fields: {
            author: string;
            action: string;
            date: string;
            resource: string;
        };
    };
}
