import { Identifier, QueryOptions } from 'react-admin';
declare const useGetChildNodesCallback: (resource: string) => UseGetChildNodesCallbackHookValue;
export declare type UseGetChildNodesCallbackHookValue = (parentId: Identifier, options?: Partial<QueryOptions>) => Promise<void>;
export default useGetChildNodesCallback;
