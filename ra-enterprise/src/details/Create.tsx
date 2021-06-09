import * as React from 'react';
import { ReactElement } from 'react';
import { Create as RACreate, CreateProps } from 'react-admin';
import { ManyToManyReferenceContextProvider } from '@react-admin/ra-relationships';
import { CreateActions } from './CreateActions';

export const Create = ({
    children,
    ...props
}: CreateProps & { children: ReactElement }): ReactElement => (
    <RACreate actions={<CreateActions />} {...props}>
        <ManyToManyReferenceContextProvider>
            {children}
        </ManyToManyReferenceContextProvider>
    </RACreate>
);
