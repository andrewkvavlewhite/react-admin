import React, { ComponentType, ReactElement } from 'react';
import { LayoutProps as DefaultLayoutProps, DashboardComponent } from 'react-admin';
import { TourType } from '@react-admin/ra-tour';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
export interface Tours {
    [id: string]: TourType;
}
export interface LayoutProps extends DefaultLayoutProps {
    appBar?: ComponentType;
    dashboard?: DashboardComponent;
    tours?: Tours;
    [key: string]: any;
}
/**
 * A <Layout> component for ra-enterprise which pre-configures the enterprise modules.
 *
 * What is pre-configured?
 * - A breadcrumb on every pages based on the resources (from @react-admin/ra-navigation)
 * - A synchronized sidebar which saves its open/close state in the preferences (from @react-admin/ra-preferences)
 *
 * It uses the same API as the <Layout> component from react-admin,
 * and add new props based on the enterprise edition.
 *
 * @param {object} appBar The customized <AppBar>. Default to the @react-admin/ra-enterprise <AppBar>.
 * @param {object} breadcrumb The customized <Breadcrumb>. Default to the @react-admin/ra-enterprise <Breadcrumb>.
 * @param {object} sidebar The customized <Sidebar>. Default to the @react-admin/ra-enterprise <Sidebar>.
 * @param {object} tours An object describing the tours. Default to an empty object.
 *
 * @example Customize the <Layout> main elements (the <AppBar>, the <Breadcrumb> and the <Sidebar>)
 *
 * import {
 *     Admin,
 *     AppBar,
 *     Breadcrumb,
 *     Layout,
 *     Sidebar
 * } from '@react-admin/ra-enterprise';
 *
 * function CustomAppBar(props) {
 *     return <AppBar {...props} />;
 * };
 *
 * function CustomBreadcrumb(props) {
 *     return (
 *         <Breadcrumb {...props}>
 *             // You custom beadcrumb.
 *             // See @react-admin/ra-navigation for more details about breadcrumbs.
 *         </Breadcrumb>
 *     );
 * };
 *
 * function CustomSidebar(props) {
 *     return <Sidebar {...props} />;
 * };
 *
 * function CustomLayout(props) {
 *     return (
 *         <Layout
 *             appBar={CustomAppBar}
 *             breadcrumb={CustomBreadcrumb}
 *             sidebar={CustomSidebar}
 *             {...props}
 *         />
 *     );
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin
 *              dataProvider={dataProvider}
 *              layout={CustomLayout}
 *         >
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 * @example Activate the tour (from @react-admin/ra-tour)
 *
 * import { Admin, Layout } from '@react-admin/ra-enterprise';
 *
 * const tours = {
 *     example: {
 *         steps: [
 *             // Put your tour steps here
 *         ]
 *     }
 * };
 *
 * function CustomLayout(props) {
 *     return (
 *         <Layout tours={tours} {...props} />
 *     );
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin dataProvider={dataProvider}>
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 */
declare function Layout(props: LayoutProps): ReactElement;
declare namespace Layout {
    var defaultProps: {
        appBar: typeof AppBar;
        sidebar: typeof Sidebar;
        menu: React.FC<import("./Menu").MenuProps>;
        tours: {};
    };
}
export default Layout;
