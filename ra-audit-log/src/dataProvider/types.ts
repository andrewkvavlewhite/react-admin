export interface AddAuditLogsOptions {
    name?: string;
    resources?: AddAuditLogResourceOptions[];
    shouldAudit?: ShouldAudit;
}

export type ShouldAudit = (action: string, ...args: any) => boolean;

export type AddAuditLogResourceOptions = string | [string, string[]];
