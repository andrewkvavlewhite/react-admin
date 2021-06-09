import { ReactElement } from 'react';
/**
 * Hook getting columns for a Datagrid from Preferences.
 *
 * To be used in conjunction with SelectColumnsButton.
 *
 * @param {object} args
 * @param {string} args.preference The preference key, e.g. 'posts.list.columns'
 * @param {Object} args.columns An object listing the column elements, e.g. { id: <TextField source="id" />, title: <TextField source="title" /> }
 * @param {Object} args.omit An array listing the names of the columns to omit by defualt, e.globalThis. ['id']
 *
 * @example
 *
 *     import { TopToolabr, List, Datagrid, TextField, NumberField, DateField } from 'react-admin';
 *     import { useSelectedColumns, SelectColumnsButton } from '@react-admin/ra-preferences';
 *
 *     const PostList: FC = props => {
 *         const columns = useSelectedColumns({
 *             preferences: 'posts.list.columns',
 *             columns: postListColumns,
 *             omit: ['nb_views'],
 *         });
 *         return (
 *             <List actions={<PostActions />} {...props}>
 *                 <Datagrid rowClick="edit">
 *                     {columns}
 *                 </Datagrid>
 *             </List>
 *         );
 *     };
 *
 *     const PostActions: FC = () => (
 *         <TopToolbar>
 *             <SelectColumnsButton
 *                 preference="posts.list.columns"
 *                 columns={postListColumns}
 *             />
 *         </TopToolbar>
 *     );
 *
 *     const postListColumns = {
 *         title: <TextField source="title" />,
 *         teaser: <TextField source="artist" />,
 *         body: <TextField source="writer" />,
 *         author: <TextField source="producer" />,
 *         nb_views: <NumberField source="rank" />,
 *         published: <DateField source="released" />,
 *     };
 */
declare const useSelectedColumns: ({ preferences, columns, omit, }: UseSelectedColumnsArg) => ReactElement[];
export interface ColumnList {
    [key: string]: ReactElement;
}
export interface UseSelectedColumnsArg {
    preferences: string;
    columns: ColumnList;
    omit?: string[];
}
export default useSelectedColumns;
