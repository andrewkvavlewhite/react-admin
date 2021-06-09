import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { FilterProps } from 'react-admin';
/**
 * <Filter> alternative offering the ability to save queries.
 *
 * Use this component instead of <Filter> to let users store custom queries
 * that they can reuse later. The saved queries will appear as MenuItems in the
 * FilterMenu dropdown, and can be removed.
 *
 * This component uses usePreference under the hood to store saved queries in
 * localStorage, one set of saved queries per resource.
 *
 * @example
 *
 * import { FilterWithSave } from '@react-admin/ra-preferences';
 *
 * const SongFilter: FC = props => (
 *     <FilterWithSave {...props}>
 *         <SelectInput
 *             choices={[
 *                 { id: 'Apple', name: 'Apple' },
 *                 { id: 'Atlantic', name: 'Atlantic' },
 *                 { id: 'Capitol', name: 'Capitol' },
 *                 { id: 'Chess', name: 'Chess' },
 *                 { id: 'Columbia', name: 'Columbia' },
 *                 { id: 'DGC', name: 'DGC' },
 *                 { id: 'London', name: 'London' },
 *                 { id: 'Tamla', name: 'Tamla' },
 *             ]}
 *             source="recordCompany"
 *         />
 *         <DateInput source="released_gte" label="Released after" />
 *         <DateInput source="released_lte" label="Released before" />
 *     </FilterWithSave>
 * );
 *
 * const SongList: FC<Props> = props => (
 *     <List {...props} filters={<SongFilter />}>
 *         <Datagrid rowClick="edit">
 *             <TextField source="title" />
 *             <TextField source="artist" />
 *             <TextField source="writer" />
 *             <TextField source="producer" />
 *             <TextField source="recordCompany" />
 *             <NumberField source="rank" />
 *             <DateField source="released" />
 *         </Datagrid>
 *     </List>
 * );
 */
export declare const FilterWithSave: {
    (props: FilterProps): ReactElement;
    propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        classes: PropTypes.Requireable<object>;
        context: PropTypes.Requireable<string>;
    };
};
