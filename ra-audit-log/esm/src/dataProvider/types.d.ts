export interface AddAuditLogsOptions {
    name?: string;
    resources?: AddAuditLogResourceOptions[];
    shouldAudit?: ShouldAudit;
}
export declare type ShouldAudit = (action: string, ...args: any) => boolean;
export declare type AddAuditLogResourceOptions = string | [string, string[]];
