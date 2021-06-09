import React, { ReactElement } from 'react';
export interface ReferenceManyToManyFieldProps {
    children: ReactElement;
    filter?: Record<string, unknown>;
    reference: string;
    perPage?: number;
    source?: string;
    through: string;
    using: string;
    [key: string]: any;
}
declare const _default: React.ComponentType<ReferenceManyToManyFieldProps>;
export default _default;
