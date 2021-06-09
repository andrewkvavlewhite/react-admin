import { AddAuditLogsOptions, ShouldAudit } from './types';
/**
 * Returns a function which will returns a boolean indicating a combination of a resource and action matches the targets provided.
 * Used by the `addEventsForMutations` function to determine whether an audit log should be created for a call to the dataProvider.
 * @param resources: An array of resource matching options
 * ^see addAuditLogs
 * ^see AddAuditLogResourceOptions
 */
export declare const buildMatchActionOnResource: (options?: AddAuditLogsOptions) => ShouldAudit;
export declare type MatchResourceAndAction = (action: string, resource: string) => boolean;
