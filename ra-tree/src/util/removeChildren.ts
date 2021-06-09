import { TreeRecordWithChildren, TreeRecord } from '../types';

const removeChildren = (record: TreeRecordWithChildren): TreeRecord => ({
    ...record,
    children: record.children.map(record => record.id),
});

export default removeChildren;
