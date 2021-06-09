import * as React from 'react';
import {
    Children,
    cloneElement,
    isValidElement,
    MouseEvent,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
import { DataNode } from 'rc-tree/lib/interface';
import { IconButton, makeStyles, Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import DeleteMenuItem from './DeleteMenuItem';

/**
 * Provides a dropdown menu for each node.
 * It accepts children which must return a MaterialUI MenuItem component
 *
 * @example
 * import { NodeActions, DeleteMenuItem, TreeWithDetails } from '@react-admin/ra-tree';
 *
 * const MyCustomActionMenuItem = ({ record, resource, parentId }) => {
 *     const handleClick = () => {
 *         // Do something with dataProvider ?
 *     }
 *     return (
 *         <MenuItem onClick={handleClick}>
 *             Do something
 *         </MenuItem>
 *     );
 * };
 *
 * const MyActions = (props) => (
 *     <NodeActions {...props}>
 *         <MyCustomActionMenuItem />
 *         <DeleteMenuItem />
 *     </NodeActions>
 * );
 *
 * const CategoriesList: FC<Props> = props => (
 *     <TreeWithDetails
 *         titleField="name"
 *         edit={CategoriesEdit}
 *         draggable
 *         showLine
 *         nodeActions={<MyActions />}
 *         {...props}
 *     />
 * );
 */
const NodeActions = ({
    basePath,
    children = <DeleteMenuItem />,
    className,
    data,
    resource,
}: NodeActionsProps): ReactElement => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const record = useSelector(
        // @ts-ignore Ignore because we actually merge DataNode with our record
        state => state.admin.resources[resource]?.data[data.id]
    );

    const handleClick = (event: MouseEvent): void => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => setAnchorEl(null);

    return (
        <>
            <IconButton
                className={classnames(classes.menuButton, className)}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                {Children.map(children, child =>
                    isValidElement(child)
                        ? cloneElement<any>(child, {
                              basePath,
                              record,
                              resource,
                          })
                        : null
                )}
            </Menu>
        </>
    );
};

export default NodeActions;

export interface NodeActionsProps {
    basePath?: string;
    children?: ReactNode;
    className?: string;
    data?: DataNode;
    resource?: string;
}

const useStyles = makeStyles({
    menuButton: {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: 'translate(110%, -50%)',
    },
});
