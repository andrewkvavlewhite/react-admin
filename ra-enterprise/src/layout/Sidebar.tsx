import React, { ReactElement } from 'react';
import { Sidebar as DefaultSidebar, SidebarProps } from 'react-admin';

/**
 * A <Sidebar> component for @react-admin/ra-enterprise
 *
 */
function Sidebar(props: SidebarProps): ReactElement {
    return <DefaultSidebar size={200} {...props} />;
}

export default Sidebar;
