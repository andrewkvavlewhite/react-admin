import { ReactElement } from 'react';
import { ToolbarProps } from 'react-admin';
declare const Toolbar: (props: Omit<ToolbarProps, 'width'>) => ReactElement;
export default Toolbar;
