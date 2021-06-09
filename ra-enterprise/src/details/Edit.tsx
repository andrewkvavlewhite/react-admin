import * as React from 'react';
import { ReactElement } from 'react';
import { Edit as RAEdit, EditProps } from 'react-admin';
import { ManyToManyReferenceContextProvider } from '@react-admin/ra-relationships';
import { EditActions } from './EditActions';

export const Edit = ({
    children,
    ...props
}: EditProps & { children: ReactElement }): ReactElement => (
    <RAEdit actions={<EditActions />} {...props}>
        <ManyToManyReferenceContextProvider>
            {children}
        </ManyToManyReferenceContextProvider>
    </RAEdit>
);
