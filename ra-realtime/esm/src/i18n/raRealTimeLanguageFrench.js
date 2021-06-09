var raRealTimeFrenchMessages = {
    'ra-realtime': {
        action: {
            refresh: 'Actualiser',
        },
        event_type: {
            updated: 'mis à jour',
            created: 'créé |||| créés',
            deleted: 'supprimé |||| supprimés',
        },
        notification: {
            title: 'Attention',
            record: {
                updated: 'Cet enregistrement a été modifié par un autre utilisateur',
                deleted: "Cet enregistrement a été supprimé et n'est plus disponible",
            },
            list: {
                refreshed: 'Liste mise à jour avec %{smart_count} %{name} %{type} par un autre utilisateur',
            },
            lock: {
                lockedBySomeoneElse: 'Cet enregistrement est verrouillé par un autre utilisateur.',
                lockedByMe: 'Vous venez de verrouiller cet enregistrement.',
                unlocked: "Cet enregistrement n'est plus verrouillé.",
            },
        },
        error: {
            type: "Le type de l'évènement est manquant",
            topic: 'Le topic est manquant',
            lock: {
                noLock: "Il n'y a pas de verrou pour cet enregistrement.",
                lockedBySomeoneElse: 'Cet enregistrement est verrouillé par un autre utilisateur.',
                cannotUnlock: 'Impossible de supprimer ce verrou.',
            },
        },
    },
};
export default raRealTimeFrenchMessages;
