const getReferenceManyToManyFormField = ({
    resource,
    through,
    reference,
}: Options): string => `@@ra-many-to-many/${resource}/${through}/${reference}`;

export default getReferenceManyToManyFormField;

interface Options {
    reference: string;
    resource: string;
    through: string;
}
