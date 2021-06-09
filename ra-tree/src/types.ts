import { Identifier, Record } from 'react-admin';

export interface TreeRecord extends Record {
    children: Identifier[];
}

export interface WithChildren<T> {
    children: T[];
}

export type TreeRecordWithChildren = WithChildren<TreeRecordWithChildren> &
    Record;

export interface TreeSet {
    [key: string]: Identifier[];
    [key: number]: Identifier[];
}

export interface TreeRecordSet {
    [key: string]: TreeRecord;
    [key: number]: TreeRecord;
}

export interface TreeReduxSubState {
    [resource: string]: {
        rootId: Identifier;
        nodes: TreeNodesReduxSubState;
        expanded: string[];
    };
}

export interface TreeNodesReduxSubState {
    children: TreeRecord[];
}

export interface TreeReduxState {
    tree: TreeReduxSubState;
}

export interface RCTreeDatum extends TreeRecord {
    key: Identifier;
    title: string;
}

/* dataProvider types */

export interface GetChildNodesParams {
    parentId: Identifier;
}

export interface TreeDataProvider {
    getTree: (resource: string, params: any) => Promise<{ data: TreeRecord[] }>;
    getRootNodes: (
        resource: string,
        params: any
    ) => Promise<{ data: TreeRecord[] }>;
    getParentNode: (
        resource: string,
        params: { childId: Identifier }
    ) => Promise<{ data: TreeRecord }>;
    getChildNodes: (
        resource: string,
        params: GetChildNodesParams
    ) => Promise<{ data: TreeRecord[] }>;
    moveAsNthChildOf: (
        resource: string,
        params: {
            source: TreeRecord;
            destination: TreeRecord;
            position: number;
        }
    ) => Promise<{ data: any }>;
    moveAsNthSiblingOf: (
        resource: string,
        params: {
            source: TreeRecord;
            destination: TreeRecord;
            position: number;
        }
    ) => Promise<{ data: any }>;
    addRootNode: (
        resource: string,
        params: { data: Partial<TreeRecord> }
    ) => Promise<{ data: TreeRecord }>;
    addChildNode: (
        resource: string,
        params: { parentId: Identifier; data: Partial<TreeRecord> }
    ) => Promise<{ data: TreeRecord }>;
    deleteBranch: (
        resource: string,
        params: { id: Identifier; data: Record }
    ) => Promise<{ data: Record }>;
}
