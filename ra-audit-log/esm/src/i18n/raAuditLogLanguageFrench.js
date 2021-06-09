export var raAuditLogLanguageFrench = {
    'ra-audit-log': {
        event: {
            create: 'A créé un enregistrement de %{resource} %{name}',
            delete: 'A supprimé un enregistrement de %{resource} %{name}',
            deleteMany: 'A supprimé les enregistrements de %{resource} %{ids}',
            update: 'A modifié un enregistrement de %{resource} %{name}',
            updateMany: 'A modifié les enregistrements de %{resource} %{ids}',
        },
        inline_event: {
            create: 'a créé un enregistrement de %{resource} %{name}',
            delete: 'a supprimé un enregistrement de %{resource} %{name}',
            deleteMany: 'a supprimé les enregistrements de %{resource} %{ids}',
            update: 'a modifié un enregistrement de %{resource} %{name}',
            updateMany: 'a modifié les enregistrements de %{resource} %{ids}',
        },
        short_event: {
            create: 'Création',
            delete: 'Suppression',
            update: 'Modification',
        },
        author: '{fullName}',
        period_filters: {
            today: "Aujourd'hui",
            this_week: 'Cette semaine',
            this_month: 'Ce mois',
            this_quarter: 'Ce trimestre',
        },
        filter: {
            author: 'Par auteur',
            date: 'Par date',
            resource: 'Par resource',
        },
        fields: {
            author: 'Auteur',
            action: 'Action',
            date: 'Date',
            resource: 'Resource',
        },
    },
};
