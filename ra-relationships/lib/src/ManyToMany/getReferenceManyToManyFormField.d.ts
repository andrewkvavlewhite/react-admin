declare const getReferenceManyToManyFormField: ({ resource, through, reference, }: Options) => string;
export default getReferenceManyToManyFormField;
interface Options {
    reference: string;
    resource: string;
    through: string;
}
