import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
export declare const LocationContext: React.Context<any[]>;
/**
 * AppLocation type defines all required location information needed to define a location
 * It is mainly used by the location state object in LocationContext
 *
 * @type {Object}
 * @property {string} path dot based location path (eg: foo.bar.baz)
 * @property {Object} values location context values (eg: { record }, ...)
 */
export declare type AppLocation = {
    path: string;
    values?: any;
};
export declare const defaultLocation: {
    path: any;
    values: {};
};
declare type AppLocationContextProps = {
    children: ReactNode;
    hasDashboard?: boolean;
    initialLocation?: AppLocation;
};
/**
 * The <AppLocationContext /> component allows to wrap our application inside an unique location context.
 * This component must be contained by our admin to be able to access the current registred resources from the redux store.
 *
 * So, the easiest way to include it is to use a custom Layout as a wrapper since you (probably) need to insert your breadcrumb here too.
 *
 * @example
 *
 *  import { AppLocationContext } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout } from 'react-admin';
 *
 *  const MyLayout = ({ children, ...props }) => {
 *      const classes = useStyles();
 *
 *      return (
 *          <AppLocationContext>
 *              <Layout {...props}>
 *                  {children}
 *              </Layout>
 *          </AppLocationContext>
 *      );
 *  };
 *
 *  const App = () => (
 *      <Admin dataProvider={dataProvider} layout={MyLayout}>
 *          <Resource name="posts" list={PostList} />
 *      </Admin>
 *  );
 */
export declare const AppLocationContext: ({ children, initialLocation, hasDashboard, }: AppLocationContextProps) => ReactElement;
export {};
