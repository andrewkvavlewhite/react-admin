import * as React from 'react';
import { ReactElement } from 'react';
import { Show as RAShow, ShowProps } from 'react-admin';
import { ShowActions } from './ShowActions';

export const Show = ({
    children,
    ...props
}: ShowProps & { children: ReactElement }): ReactElement => (
    <RAShow actions={<ShowActions />} {...props}>
        {children}
    </RAShow>
);
