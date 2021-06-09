import React, { ReactElement } from 'react';
import { SortPayload } from 'react-admin';
export interface ReferenceManyToManyInputProps {
    children: ReactElement;
    filter?: Record<string, unknown>;
    perPage?: number;
    reference: string;
    sort?: SortPayload;
    source?: string;
    through: string;
    using: string;
    [key: string]: any;
}
declare const _default: React.ComponentType<ReferenceManyToManyInputProps>;
export default _default;
