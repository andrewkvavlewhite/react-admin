import { ReactElement, FC } from 'react';
/**
 * Button setting columns for a Datagrid in Preferences.
 *
 * @param {Object} props
 * @param {string} props.preference The preference key, e.g. 'posts.list.columns'
 * @param {Object} props.columns An object listing the column elements, e.g. { id: <TextField source="id" />, title: <TextField source="title" /> }
 *
 * @example
 *
 *     import { TopToolabr, List, Datagrid, TextField, NumberField, DateField } from 'react-admin';
 *     import { SelectColumnsButton, useSelectedColumns } from '@react-admin/ra-preferences';
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
 *     const postListColumns = {
 *         title: <TextField source="title" />,
 *         teaser: <TextField source="artist" />,
 *         body: <TextField source="writer" />,
 *         author: <TextField source="producer" />,
 *         nb_views: <NumberField source="rank" />,
 *         published: <DateField source="released" />,
 *     };
 */
declare const SelectColumnsButton: FC<SelectColumnsButtonProps>;
export interface SelectColumnsButtonProps {
    preference: string;
    columns: {
        [key: string]: ReactElement;
    };
    children?: ReactElement;
}
export default SelectColumnsButton;
