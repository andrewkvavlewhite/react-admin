/**
 * Hook that permits to define current App Location in one shot
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * @example
 *
 *  import React from 'react';
 *  import { AppLocationContext, useAppLocationState } from '@react-admin/ra-navigation';
 *  import { Admin, Resource } from 'react-admin';
 *  import { Route } from 'react-router-dom';
 *
 *  const Foo = () => {
 *    useDefineAppLocation('path.to.the.foo');
 *    return <span>It's Foo!</span>;
 *  };
 *
 *  const routes = [
 *    <Route exact path="/foo" component={Foo} />,
 *  ];
 *
 *  const PathViewer = () => {
 *    const [location] = useAppLocationState();
 *    return <h1>{`You're on the ${location.path} path!`}</h1>;
 *  };
 *
 *  const MyLayout = ({ children }) => (
 *    <AppLocationContext>
 *      <PathViewer />
 *      {children}
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} customRoutes={routes} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *        show={PostShow}
 *        create={PostCreate}
 *      />
 *    </Admin>
 *  );
 *
 * The page title will be equal to "You're on the path.to.the.foo path!" on "/foo";
 */
export declare const useDefineAppLocation: (path: string, values?: any) => void;
