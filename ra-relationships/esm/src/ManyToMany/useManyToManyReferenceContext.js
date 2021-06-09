import { useContext } from 'react';
import { ManyToManyReferenceContext, } from './ManyToManyReferenceContext';
/**
 * Hook to get the `ManyToManyReferenceContext`.
 */
export var useManyToManyReferenceContext = function () {
    var context = useContext(ManyToManyReferenceContext);
    if (!context) {
        throw new Error("\nCannot get the ManyToManyReferenceContext. Have you wrapped your form with a <ManyToManyReferenceContextProvider>?\n\nFor example:\n\nimport { ManyToManyReferenceContextProvider } from '@react-admin/relationships';\n\n<Edit {...props}>\n    <ManyToManyReferenceContextProvider>\n        <SimpleForm>\n            // ...\n        </SimpleForm>\n    </ManyToManyReferenceContextProvider>\n</Edit>\n");
    }
    return context;
};
