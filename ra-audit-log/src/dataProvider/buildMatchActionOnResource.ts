import { DefaultAuditLogResource } from '../constants';
import { DefaultOptions } from './options';
import { AddAuditLogsOptions, ShouldAudit } from './types';

/**
 * Returns a function which will returns a boolean indicating a combination of a resource and action matches the targets provided.
 * Used by the `addEventsForMutations` function to determine whether an audit log should be created for a call to the dataProvider.
 * @param resources: An array of resource matching options
 * ^see addAuditLogs
 * ^see AddAuditLogResourceOptions
 */
export const buildMatchActionOnResource = (
    options: AddAuditLogsOptions = DefaultOptions
): ShouldAudit => {
    const {
        name: eventsResource = DefaultAuditLogResource,
        resources,
    } = options;

    return (action: string, resource: any): boolean => {
        if (typeof resource !== 'string' || resource === eventsResource) {
            return false;
        }

        if (resources == undefined) {
            return mutationsActions.includes(action);
        }

        const resourceOption = resources.find(
            resourceOption =>
                (Array.isArray(resourceOption) &&
                    resourceOption[0] === resource) ||
                resourceOption === resource
        );

        if (!resourceOption) {
            return false;
        }

        if (typeof resourceOption === 'string') {
            return mutationsActions.includes(action);
        }

        if (resourceOption[1].includes(action)) {
            return true;
        }

        return false;
    };
};

export type MatchResourceAndAction = (
    action: string,
    resource: string
) => boolean;

const mutationsActions = [
    'create',
    'delete',
    'deleteMany',
    'update',
    'updateMany',
];
