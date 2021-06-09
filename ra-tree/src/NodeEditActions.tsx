import * as React from 'react';
import { ReactElement } from 'react';
import { TopToolbar, Button, Record } from 'react-admin';
import { Link } from 'react-router-dom';
import ContentAdd from '@material-ui/icons/Add';

const NodeEditActions = ({
    basePath,
    data,
}: NodeEditActionsProps): ReactElement => (
    <TopToolbar>
        <Button
            component={Link}
            to={{
                pathname: `${basePath}/create`,
                state: { parentId: data?.id },
            }}
            label="ra-tree.action.add_child"
        >
            <ContentAdd />
        </Button>
    </TopToolbar>
);

export interface NodeEditActionsProps {
    basePath?: string;
    data?: Record;
}
export default NodeEditActions;
