import { Identifier } from 'ra-core';
import { TreeRecord, WithChildren } from '../types';

/**
 * Turn a flat array of TreeRecords into a tree structure,
 * where each tree has an array of TreeRecords as children.
 *
 * @example
 *
 * getRecordTree([
 *   { id: 1, title: 'foo1', children: [3, 4] },
 *   { id: 2, title: 'foo2', children: [] },
 *   { id: 3, title: 'foo3', children: [5] },
 *   { id: 4, title: 'foo4', children: [] },
 *   { id: 5, title: 'foo5', children: [] },
 * ]);
 * => [
 *   { id: 1, title: 'foo1', children: [
 *     { id: 3, title: 'foo3', children: [
 *       { id: 5, title: 'foo5', children: [] },
 *     ] },
 *     { id: 4, title: 'foo4', children: [] },
 *   ] },
 *   { id: 2, title: 'foo2', children: [] },
 * ]
 */
const getRecordTree = <T extends TreeRecord = TreeRecord>(
    treeRecords: T[]
): (WithChildren<T> & T)[] => {
    const treeRecordsById = treeRecords.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {});
    const childRecordIds = Array.from(
        new Set(treeRecords.flatMap(treeRecord => treeRecord.children))
    );
    const rootRecords = treeRecords.filter(
        ({ id }) => !childRecordIds.includes(id)
    );
    const addChildren = (
        record: T,
        recordId: Identifier
    ): WithChildren<T> & T => ({
        // Those two lines ensure we have the minimum props needed for rc-tree
        // even though we may not have loaded the records yet (lazy mode)
        id: recordId,
        key: recordId.toString(),
        ...record,
        children: (record?.children || []).map(id =>
            addChildren(treeRecordsById[id], id)
        ),
    });
    return rootRecords.map(record => addChildren(record, record.id));
};

export default getRecordTree;
