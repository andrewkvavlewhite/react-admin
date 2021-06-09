import { useContext } from 'react';
import {
    ManyToManyReferenceContext,
    ManyToManyReferenceContextValue,
} from './ManyToManyReferenceContext';

/**
 * Hook to get the `ManyToManyReferenceContext`.
 */
export const useManyToManyReferenceContext = (): ManyToManyReferenceContextValue => {
    const context = useContext(ManyToManyReferenceContext);

    if (!context) {
        throw new Error(
            `
Cannot get the ManyToManyReferenceContext. Have you wrapped your form with a <ManyToManyReferenceContextProvider>?

For example:

import { ManyToManyReferenceContextProvider } from '@react-admin/relationships';

<Edit {...props}>
    <ManyToManyReferenceContextProvider>
        <SimpleForm>
            // ...
        </SimpleForm>
    </ManyToManyReferenceContextProvider>
</Edit>
`
        );
    }

    return context;
};
